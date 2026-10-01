// ===== Configuración de Vacancia (edítala antes de publicar) =====
window.CINCO_CONFIG = {
  version: "Beta 0.7",
  // Pega aquí la configuración web de tu proyecto de Firebase (Consola > Configuración del proyecto > Tus apps > Web).
  // Si la dejas vacía, el juego funciona solo contra bots.
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  },
  firebaseSdk: "10.12.2",
  // Apoyo
  yapeQR: "",                      // cuando tengas tu QR: guarda la captura como assets/yape-qr.png y escribe aquí "assets/yape-qr.png"
  yapeName: "",                    // nombre que verá quien escanee (opcional)
  yapeNumero: "",                  // número de celular para Yape/Plin (opcional; recomendado dejar vacío)
  feedbackWhatsApp: "",            // número con código de país, p. ej. "51999999999": si no hay Firebase, las opiniones llegan por WhatsApp
  feedbackEmail: "",               // alternativa: las opiniones llegan por correo
  kofi: ""                         // por ejemplo: https://ko-fi.com/tuusuario
};

// ===== Arte y sonido finales (opcional) =====
// Cuando el estudio entregue el material definitivo, pon aquí las rutas y el juego lo usará
// en lugar del arte y el sonido provisionales. Deja vacío lo que aún no exista.
window.VACANCIA_ASSETS = {
  music: "",        // p. ej. "assets/musica.mp3" (se repite en bucle)
  otorongo: "",     // p. ej. "assets/otorongo.svg" (mascota)
  sfx: {            // efectos: gavel, stamp, drum, flip, dice, coins, applause, boo, ping, win, lose
  }
};
