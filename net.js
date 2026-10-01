// Capa de red de Cinco Años: Firebase (Auth anónima + Firestore).
// Si no hay configuración o falla la conexión, el juego sigue funcionando en modo contra bots.
const CFG = window.CINCO_CONFIG || {};
const SDK = "https://www.gstatic.com/firebasejs/" + (CFG.firebaseSdk || "10.12.2");
const Net = { ok: false, uid: null, reason: "" };
window.Net = Net;
(async () => {
  try {
    if (!CFG.firebase || !CFG.firebase.apiKey) { Net.reason = "sin-config"; return; }
    const [{ initializeApp }, auth, fs] = await Promise.all([
      import(SDK + "/firebase-app.js"), import(SDK + "/firebase-auth.js"), import(SDK + "/firebase-firestore.js")]);
    const app = initializeApp(CFG.firebase);
    const db = fs.initializeFirestore(app, { ignoreUndefinedProperties: true });
    const a = auth.getAuth(app);
    const cred = await auth.signInAnonymously(a);
    Net.uid = cred.user.uid;
    const ref = code => fs.doc(db, "games", code);
    Net.create = async (code, data) => {
      await fs.runTransaction(db, async tx => {
        const s = await tx.get(ref(code)); if (s.exists()) throw new Error("existe");
        tx.set(ref(code), data);
      });
    };
    Net.watch = (code, onData, onErr) => fs.onSnapshot(ref(code), sn => onData(sn.exists() ? sn.data() : null), onErr);
    // Aplica fn(estado) de forma atómica. fn devuelve un texto si la jugada no es válida.
    Net.update = async (code, fn) => {
      let userErr = null;
      try {
        await fs.runTransaction(db, async tx => {
          userErr = null;
          const sn = await tx.get(ref(code)); if (!sn.exists()) { userErr = "La partida no existe."; return; }
          const s = structuredClone(sn.data()); const e = fn(s);
          if (e) { userErr = e; return; }
          s.v = (s.v || 0) + 1; tx.set(ref(code), s);
        });
      } catch (e) { return "No se pudo guardar la jugada. Revisa tu conexión."; }
      return userErr;
    };
    Net.saveStats = data => fs.addDoc(fs.collection(db, "stats"), { ...data, at: fs.serverTimestamp() });
    Net.saveFeedback = data => fs.addDoc(fs.collection(db, "feedback"), { ...data, at: fs.serverTimestamp() });
    Net.ok = true;
  } catch (e) { Net.reason = "error"; console.warn("Firebase no disponible:", e); }
  finally { window.__netResolve && window.__netResolve(Net); }
})();
