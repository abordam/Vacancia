
const V2 = (() => {
const BLOCKS=26, SEN=12, TH={firmas:8,admision:11,aprob:18,senado:8,simple:14,acusSen:8,interFirmas:4,interAdm:9,censFirmas:7};
const CRISIS_BASE={2:9,3:10,4:8,5:6};
const COLORS=["#2F5DA8","#2E8B57","#E07A1F","#7B4FA3","#1A9AA0"];
const AGENDA=[
 ...Array(4).fill({t:"crisis",n:"Paro de transportistas",k:"Orden"}),...Array(4).fill({t:"crisis",n:"Huaico en la sierra",k:"Regional"}),
 ...Array(4).fill({t:"crisis",n:"Alza del dólar",k:"Económica"}),...Array(4).fill({t:"crisis",n:"Obra paralizada",k:"Obras"}),
 ...Array(3).fill({t:"crisis",n:"Ola de extorsiones",k:"Orden"}),...Array(3).fill({t:"crisis",n:"Conflicto minero",k:"Regional"}),
 ...Array(3).fill({t:"crisis",n:"Déficit fiscal",k:"Económica"}),...Array(3).fill({t:"crisis",n:"Puente colapsado",k:"Obras"}),
 ...Array(5).fill({t:"oportunidad",n:"Transferencia a tu región",x:"+3 de Influencia"}),...Array(3).fill({t:"oportunidad",n:"Foto con el ganador",x:"+2 de Influencia y roba 1 Botín"}),
 ...Array(4).fill({t:"escandalo",n:"Reportaje dominical",x:"+1 escándalo"}),...Array(2).fill({t:"escandalo",n:"Chat filtrado",x:"+1 escándalo y -1 de Influencia"})];
const BOTIN={
 refuerzo:{n:"Bono de gestión",x:"Juégala en tu Crisis: +3 de poder.",c:6,when:"crisis_own"},
 sabotaje:{n:"Paro convocado",x:"Juégala en la Crisis de otro: +3 de dificultad.",c:6,when:"crisis_other"},
 punalada:{n:"Puñalada en el pleno",x:"En la Crisis de otro: finges apoyo, pero suma +3 de dificultad; si fracasa, le robas 1 carta.",c:4,when:"crisis_other"},
 destape:{n:"Destape",x:"Acción: +1 escándalo al jugador que elijas.",c:6,when:"action",target:true},
 aporte:{n:"Aporte voluntario",x:"Acción: tu despacho «dona» parte de su sueldo. +4 de Influencia y +1 escándalo.",c:4,when:"action",corr:1},
 testigo:{n:"Testigo que se retracta",x:"Acción: retira 2 de tus escándalos.",c:3,when:"action"},
 transfuga:{n:"Transfuguismo",x:"Acción: paga 2 y un bloque del jugador que elijas pasa a ti.",c:4,when:"action",target:true},
 lealtad:{n:"Lealtad de bancada",x:"Pasiva: anula el próximo Transfuguismo contra ti.",c:3,when:"passive"},
 almuerzo:{n:"Almuerzo en el Congreso",x:"Acción: amarra 2 independientes gratis este año.",c:3,when:"action"},
 encuesta:{n:"Encuesta a favor",x:"Acción: si eres presidente +1 Aprobación; si no, -1 al presidente.",c:3,when:"action"},
 audio:{n:"Audio filtrado",x:"Acción: +1 escándalo al jugador que elijas; si es el presidente, además -1 Aprobación.",c:6,when:"action",target:true},
 rebelion:{n:"Rebelión en la bancada",x:"Acción: en las votaciones de esta legislatura, 2 bloques del jugador que elijas votan por su cuenta (como independientes).",c:3,when:"action",target:true},
 asesor:{n:"Asesor de confianza",x:"Acción: contratas a un pariente. +2 de Influencia; con 1-2 en el dado, +1 escándalo.",c:2,when:"action",corr:1},
 conexion:{n:"Conexión clandestina",x:"Acción: te cuelgas de la luz, el agua o el cable. +2 de Influencia; con 1-3 en el dado, +1 escándalo.",c:2,when:"action",corr:1},
 curriculum:{n:"Currículum creativo",x:"Acción: roba 2 cartas y recibes 1 escándalo.",c:2,when:"action",corr:1},
 financista:{n:"Financista generoso",x:"Acción: +5 de Influencia; con 1-3 en el dado, +2 escándalos.",c:2,when:"action",corr:1},
 reunion:{n:"Reunión fuera de agenda",x:"Acción: +3 de Influencia y +1 escándalo.",c:2,when:"action",corr:1},
 juez:{n:"Llamada al juez",x:"Pasiva: anula el próximo Destape, Audio o Comisión investigadora contra ti.",c:2,when:"passive"},
 diario:{n:"Diario amigo",x:"Acción: retira 1 escándalo tuyo; si eres presidente, además +1 Aprobación.",c:2,when:"action"},
 plazo:{n:"Se venció el plazo",x:"Acción: retira todos tus escándalos y pierdes 2 de Influencia.",c:1,when:"action"},
 comision:{n:"Comisión investigadora",x:"Acción: +1 escándalo a un jugador que no sea el presidente.",c:2,when:"action",target:true},
 ley:{n:"Ley con nombre propio",x:"Acción: presentas un proyecto de ley. Diputados (14) y Senado (7) lo votan; si pasa y se promulga, ganas 3 y cada aliado que votó a favor gana 1.",c:3,when:"action"},
 gabinete:{n:"Cambio de gabinete",x:"Acción, solo presidente: paga 2, retira 2 escándalos y pierdes 1 de Aprobación.",c:2,when:"action",pres:1},
 obra:{n:"Obra emblemática",x:"Acción, solo presidente: paga 3 y ganas +2 de Aprobación.",c:2,when:"action",pres:1},
 senador:{n:"Senador tránsfuga",x:"Acción: paga 3 y un senador del jugador que elijas pasa a tu bancada.",c:2,when:"action",target:true},
 victima:{n:"★ La víctima soy yo",x:"Acción: absuelto y ofendido. Retira 2 escándalos y cobra 3 de indemnización.",c:1,when:"action",sp:1},
 borron:{n:"★ Borrón y cuenta nueva",x:"Acción: si tienes 3 bloques o menos, 2 independientes pasan a tu bancada.",c:1,when:"action",sp:1},
 camara:{n:"★ Cámara escondida",x:"Acción: grabas a un colega. Recibe 1 escándalo por cada carta de corrupción en su mano (máximo 3).",c:1,when:"action",target:true,sp:1},
 video:{n:"★ El video del siglo",x:"Acción, solo oposición: el presidente recibe 3 escándalos y pierde 1 de Aprobación.",c:1,when:"action",sp:1},
 fuga:{n:"★ Fuga a medianoche",x:"Solo presidente, en una votación de vacancia: la vacancia fracasa, pero 2 de tus bloques pasan a independientes.",c:1,when:"vote",sp:1},
 cerrado:{n:"★ Caso cerrado",x:"Acción: cancela una moción presentada en esta legislatura (a quien la presentó se le devuelve el costo).",c:1,when:"action",sp:1},
 habeas:{n:"★ Hábeas corpus",x:"Acción: un independiente pasa a tu bancada y retiras 1 escándalo.",c:1,when:"action",sp:1},
 zorro:{n:"★ Zorro cuidando gallinas",x:"Acción: presides la comisión de control. En esta legislatura y la siguiente nadie puede jugar Destape, Audio, Comisión ni Cámara contra ti.",c:1,when:"action",sp:1},
 campana:{n:"★ Campaña millonaria",x:"Acción: si eres presidente, +1 Aprobación y +2 de Influencia; si no, +4 de Influencia.",c:1,when:"action",sp:1},
 camiseta:{n:"★ Cambio de camiseta exprés",x:"Acción: paga 2 y un bloque del jugador que elijas pasa a ti. Lealtad de bancada no lo detiene.",c:1,when:"action",target:true,sp:1},
 semana:{n:"★ Semana de representación",x:"Acción: viaje pagado. +2 de Influencia, pero tus bloques no votan en esta legislatura.",c:1,when:"action",sp:1},
 indulto:{n:"★ Indulto presidencial",x:"Acción, solo presidente: borra todos los escándalos del jugador que elijas. Nada lo obliga a devolver el favor... en teoría.",c:2,when:"action",target:true,pres:1,sp:1},
 prescripcion:{n:"Ley de prescripción exprés",x:"Acción: presentas una ley que beneficia a todos los congresistas. Si se promulga, cada jugador que no sea presidente retira 1 escándalo y el gobierno pierde 1 de Aprobación por el rechazo ciudadano.",c:2,when:"action",law:"prescripcion"},
 autoblindaje:{n:"Ley de autoblindaje",x:"Acción: presentas una ley. Si se promulga, durante 2 legislaturas las acusaciones constitucionales necesitan 2 bloques más.",c:2,when:"action",law:"autoblindaje"},
 reeleccion:{n:"★ Reelección inmediata",x:"Acción: presentas una ley. Si se promulga, en la próxima disolución o elección anticipada cada jugador que no sea presidente suma 1 bloque.",c:1,when:"action",law:"reeleccion",sp:1},
 reportaje:{n:"Reportaje dominical",x:"Acción: si el jugador que elijas tiene 1 o más escándalos, recibe 2 más (si es presidente, además -1 Aprobación). Si está limpio, el reportaje sale en falso y tú pierdes 2 de Influencia.",c:2,when:"action",target:true,press:1},
 investigacion:{n:"Unidad de investigación",x:"Acción: se revisa la mano del jugador que elijas. Por cada carta de corrupción que tenga, +1 escándalo (máximo 2).",c:2,when:"action",target:true,press:1},
 chats:{n:"Filtración de chats",x:"Acción: +1 escándalo al jugador que elijas y a cada jugador con quien tenga promesas u obras este año.",c:2,when:"action",target:true,press:1},
 difamacion:{n:"Demanda por difamación",x:"Pasiva: anula la próxima carta de periodista contra ti. Si eres presidente, pierdes 1 de Aprobación porque se ve mal.",c:2,when:"passive"},
 blindaje:{n:"Otorongo no come otorongo",x:"Pasiva: la próxima moción contra ti necesita 2 bloques más.",c:2,when:"passive"}};
const EVENTS=[{n:"Crecimiento económico",x:"+1 Aprobación",a:1},{n:"Protestas en regiones",x:"-1 Aprobación",a:-1},{n:"Fenómeno El Niño",x:"-1 Aprobación",a:-1},
 {n:"Encuesta favorable",x:"+1 Aprobación",a:1},{n:"Semestre tranquilo",x:"Sin efecto",a:0},{n:"Escándalo en el MTC",x:"+1 escándalo al presidente",e:1},{n:"Clasificación al Mundial",x:"+2 Aprobación",a:2},{n:"Paro nacional",x:"-2 Aprobación",a:-2}];
const CARDMOD={gabinete:"gobierno",comision:"gobierno",juez:"gobierno",diario:"gobierno",plazo:"gobierno",rebelion:"gobierno",
 reportaje:"prensa",investigacion:"prensa",chats:"prensa",difamacion:"prensa",
 asesor:"escandalos",conexion:"escandalos",curriculum:"escandalos",financista:"escandalos",victima:"escandalos",borron:"escandalos",camara:"escandalos",video:"escandalos",fuga:"escandalos",cerrado:"escandalos",habeas:"escandalos",zorro:"escandalos",campana:"escandalos",camiseta:"escandalos",semana:"escandalos",
 ley:"leyes",prescripcion:"leyes",autoblindaje:"leyes",reeleccion:"leyes",senador:"leyes"};
const MODS={gobierno:"Palacio de Gobierno",prensa:"Cuarto Poder",escandalos:"Escándalos",bicameral:"Bicameral",leyes:"Leyes con nombre propio",golpe:"5 de Abril"};
const EMB=["sol","montana","ola","estrella","chakana"];
const IDENT=[{name:"Bancada Naranja",color:"#E07A1F",emb:"sol"},{name:"Frente Andino",color:"#2E8B57",emb:"montana"},{name:"Renovación Costeña",color:"#1A9AA0",emb:"ola"},{name:"Alianza del Pueblo",color:"#7B4FA3",emb:"estrella"},{name:"Poder Regional",color:"#2F5DA8",emb:"chakana"}];
function assignIdent(s){const used=new Set();const idOf={};s.order.forEach(id=>{const k=IDENT.findIndex(x=>x.name===P(s,id).name);if(k>=0&&!used.has(k)){used.add(k);idOf[id]=k}});
 s.order.forEach(id=>{if(idOf[id]==null){const k=IDENT.findIndex((x,i)=>!used.has(i));used.add(k);idOf[id]=k}});s.order.forEach(id=>{const I=IDENT[idOf[id]];P(s,id).color=I.color;P(s,id).emb=I.emb})}
const EMBINFO={sol:{n:"Sol",x:"Oficialista: empieza con +2 de Influencia."},montana:{n:"Montaña",x:"Caciquismo: fichar independientes cuesta 3."},ola:{n:"Ola",x:"Populista: +1 al dado en todas sus Crisis."},estrella:{n:"Estrella",x:"Disciplina: inmune al transfuguismo y sin díscolos."},chakana:{n:"Chakana",x:"Oposición: presentar vacancia o censuras cuesta 1."}};
const AGENDAS={bancada:{n:"El Operador de Bancada",x:"Terminar con la bancada más grande (sin empate)."},sillon:{n:"El Sillón de Pizarro",x:"Tener la banda presidencial al cerrar el año 5."},magnate:{n:"El Magnate de la Sombra",x:"Terminar con 22 o más de Influencia."},intocable:{n:"El Intocable",x:"Terminar con 0 escándalos sin ser presidente."},kingmaker:{n:"Kingmaker",x:"Que el rival que elijas en el año 1 termine con la banda."},caos:{n:"Caos Parlamentario",x:"Que haya 2 o más caídas presidenciales (vacancia o renuncia), una disolución o un golpe."},comisiones:{n:"Operador de Comisiones",x:"Controlar 2 o más comisiones y que la Aprobación termine en 3 o menos."}};
const COMIS={fisc:{n:"Fiscalización",x:"Cada año, +1 escándalo al rival con más cartas en la mano (si tiene 2 o más)."},presu:{n:"Presupuesto",x:"+1 de Influencia cada vez que se supera una Crisis de Obras."},const:{n:"Constitución",x:"Tu voto mueve 1 bloque extra en todas las mociones."}};
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const d6=()=>1+Math.floor(Math.random()*6);
const P=(s,id)=>s.players[id];const nm=(s,id)=>id!=null&&s.players[id]?s.players[id].name:"—";
function head(s,txt){s.heads=s.heads||[];s.heads.push({y:s.year,t:txt});if(s.heads.length>40)s.heads=s.heads.slice(-40);s.head={y:s.year,t:txt}}
function pst(s,id,k,n){const p=P(s,id);if(!p)return;p.st=p.st||{};p.st[k]=(p.st[k]||0)+(n||1)}
function bump(s,k){s.stats=s.stats||{};s.stats[k]=(s.stats[k]||0)+1}
function log(s,t){s.log.push({y:s.year,t});if(s.log.length>90)s.log=s.log.slice(-90)}
function clampA(s){const c=s.cfg||{};s.aprob=Math.max(c.aprobMin??0,Math.min(c.aprobMax??10,s.aprob))}
function A10(s){const c=s.cfg||{};const lo=c.aprobMin??0,hi=c.aprobMax??10;return (s.aprob-lo)*10/(hi-lo)}
function vacU(s){return (s.cfg&&s.cfg.manual&&s.order.length===3)?14:TH.aprob}
function pactoOn(s,id){const pc=s.pactos&&s.pactos[id];return !!(pc&&pc.y===s.year&&pc.by===s.pres&&s.aprob>(s.cfg.aprobMin??0))}
function giveDraw(s,id){if(s.cfg.market===false){drawBo(s,id);return}s.pend[id]=(s.pend[id]||0)+1}
function refillMarket(s){while(s.market.length<3){if(!s.decks.bo.length){s.decks.bo=shuffle(s.disc.bo);s.disc.bo=[]}const c=s.decks.bo.pop();if(!c)break;s.market.push(c)}}
function takeCard(s,id,idx){if(!(s.pend[id]>0))return"No tienes robos pendientes.";const p=P(s,id);if(p.hand.length>=6){s.pend[id]=0;log(s,`${p.name} tiene la mano llena y pierde su robo.`);return null}
 if(idx==null||idx<0){drawBo(s,id)}else{const c=s.market[idx];if(!c)return"Esa carta ya no está.";s.market.splice(idx,1);p.hand.push(c);refillMarket(s);log(s,`${p.name} toma «${BOTIN[c].n}» de los Pasos Perdidos.`)}
 s.pend[id]--;return null}
function flushDraws(s){s.order.forEach(id=>{while(s.pend[id]>0){if(takeCard(s,id,-1))break}})}
function drawBo(s,id){const p=P(s,id);if(p.hand.length>=6)return;if(!s.decks.bo.length){s.decks.bo=shuffle(s.disc.bo);s.disc.bo=[]}const c=s.decks.bo.pop();if(c)p.hand.push(c)}
function drawAg(s){if(!s.decks.ag.length){s.decks.ag=shuffle(s.disc.ag);s.disc.ag=[]}return s.decks.ag.pop()}
function amarreTotal(s){return Object.values(s.amarres).reduce((a,b)=>a+b,0)}
function freeNeutral(s){return s.neutral-amarreTotal(s)}
function successor(s){if(s.vp1!=null&&s.vp1!==s.pres)return s.vp1;if(s.vp2!=null&&s.vp2!==s.pres)return s.vp2;return s.congreso}
function weak(s){if(s.pres==null)return 0;const p=P(s,s.pres);const c=s.cfg||{};return Math.max(0,Math.min(1,p.esc*0.15+Math.max(0,(c.aprobPivot??6)-s.aprob)*(c.aprobSlope??0.1)))}
function largestExcept(s,ex){let b=null,bv=-1;s.order.forEach(id=>{if(ex.includes(id))return;const v=P(s,id).blocks;if(v>bv){bv=v;b=id}});return b}
function setup(s,cfg){
 const N=s.order.length;const mods=Object.assign({gobierno:true,prensa:true,escandalos:true,bicameral:true,leyes:true,golpe:true},(cfg&&cfg.mods)||{});
 const B=!mods.bicameral;const RAP=!!(cfg&&cfg.rapido)&&!B;
 const AGT=(B||RAP)?{caos:({3:2,4:2,5:2})[N]||2,magnate:({3:33,4:33,5:35})[N]||33}:{caos:({3:3,4:4,5:4})[N]||4,magnate:({3:36,4:36,5:38})[N]||36};
 const MAN=!!(cfg&&cfg.manual===true); // por defecto: ideas del manual 0.2 con las reglas verificadas
 s.cfg=Object.assign({manual:MAN,rankVP:MAN,pacto:MAN,aprobMin:MAN?-2:0,aprobMax:MAN?5:10,aprobStart:MAN?2:6,aprobPivot:MAN?3:6,aprobSlope:MAN?0.12:0.1,pasarInf:MAN?1:0,caosRen:!MAN,caos:MAN?2:AGT.caos,magnate:MAN?22:AGT.magnate,comisRule:MAN?"dos":"uno",wearSoft:!MAN,crisis:(CRISIS_BASE[N]||9)-(B?1:0)+(RAP?1:0),comp:1,maxProm:3,senBonus:0,generales:!B,runoff:!B,budget:1,legs:(B||RAP)?1:2,drawLeg:(B||RAP)?true:N<=4,presBonus:B?({3:0,4:4,5:4})[N]??4:RAP?0:3,score:B?{banda:4,electo:1,vp:0,encargado:0,agenda:N>=5?3:4}:RAP?({3:{banda:4,electo:1,vp:-1,encargado:2,agenda:5},4:{banda:4,electo:2,vp:-1,encargado:2,agenda:4},5:{banda:4,electo:3,vp:-2,encargado:2,agenda:3}})[N]:{banda:4,electo:1,vp:N===3?3:2,encargado:-1,agenda:({3:4,4:3,5:3})[N]||4},freeMotion:B||RAP,comisiones:mods.gobierno,premier:mods.gobierno,wear:mods.gobierno,copies:B?{destape:4,audio:4}:null},cfg||{});s.cfg.mods=mods;
 let sizes=shuffle([3,4,5,6,7,8]).slice(0,N);let tot=0;
 if(s.cfg.generales){const lists={};s.order.forEach(id=>{const f=(s.cfg.listFor&&s.cfg.listFor[id]!=null)?s.cfg.listFor[id]:0.3+Math.random()*0.5;lists[id]=Math.round(12*f)});s.listSpend=lists;
  const T=Object.values(lists).reduce((a,b)=>a+b,0);sizes=s.order.map(id=>Math.max(2,Math.round(20*lists[id]/T)));}
 if(B){const eq={3:6,4:5,5:4}[N]||5;sizes=s.order.map(()=>eq)}
 const agds=shuffle(Object.keys(AGENDAS).filter(k=>mods.gobierno?k!=="bancada":k!=="comisiones"));
 s.order.forEach((id,i)=>{const p=P(s,id);p.agenda=s.cfg.agendas===false?null:agds[i%agds.length];p.km=null;p.blocks=sizes[i];p.b0=sizes[i];p.inf=B?(s.cfg.baseInf||8):s.cfg.generales?12-s.listSpend[id]:4+Math.round(s.cfg.comp*(8-sizes[i]));p.esc=0;p.hand=[];p.min=false;p.noMin=false;p.skip=false;p.camp=d6();tot+=sizes[i]});
 s.neutral=BLOCKS-tot;let st=0;s.order.forEach(id=>{const p=P(s,id);p.sen=Math.floor(p.blocks*SEN/BLOCKS)+(s.cfg.senBonus&&p.blocks<=4?1:0);st+=p.sen});s.senN=Math.max(0,SEN-st);
 const deckBo=[];Object.entries(BOTIN).forEach(([k,c])=>{const m=CARDMOD[k]||"base";if(m!=="base"&&!mods[m])return;const n=(s.cfg.copies&&s.cfg.copies[k]!=null)?s.cfg.copies[k]:c.c;for(let i=0;i<n;i++)deckBo.push(k)});
 s.decks={ag:shuffle(AGENDA.map((c,i)=>i)),bo:shuffle(deckBo)};s.disc={ag:[],bo:[]};
 if(s.cfg.generales&&!s.cfg.listFor){s.order.forEach(id=>{const p=P(s,id);p.blocks=0;p.b0=0;p.sen=0;p.inf=12});s.neutral=BLOCKS;s.senN=SEN;}
 assignIdent(s);
 s.order.forEach(id=>{for(let i=0;i<3;i++)drawBo(s,id)});
 if(s.cfg.abilities!==false)s.order.forEach(id=>{if(P(s,id).emb==="sol")P(s,id).inf+=2});
 s.market=[];if(s.cfg.market!==false)for(let i=0;i<3;i++){const c=s.decks.bo.pop();if(c)s.market.push(c)}
 s.pend={};s.comis={fisc:null,presu:null,const:null};
 Object.assign(s,{pactos:{},year:0,aprob:s.cfg.aprobStart,pres:null,presType:null,vp1:null,vp2:null,congreso:null,presSen:null,presDip:null,gabCens:0,amarres:{},mociones:[],votes:{},bids:{},promesas:{},obras:{},budget:0,phase:"eleccion",winner:null,crisis:null,turn:null,mesaVotes:{},gen:{}});
 if(s.cfg.generales&&!s.cfg.listFor){s.phase="generales";log(s,"Elecciones generales: cada bancada reparte 12 de Influencia entre su lista al Congreso y su campaña presidencial.");}
 else log(s,"Reparto de bancadas: "+s.order.map(id=>`${nm(s,id)} ${P(s,id).blocks} bloques`).join(", ")+`. Independientes: ${s.neutral}.`);
}
function submitGen(s,id,list,forId,amt){list=Math.max(0,Math.min(12,list|0));amt=Math.max(0,Math.min(12-list,amt|0));if(!s.players[forId])forId=id;s.gen[id]={list,bid:{for:forId,amt}};return null}
function resolveGenerales(s){
 const arr=s.cfg.arrastre??1;const votes={};s.order.forEach(id=>{const g=s.gen[id];votes[id]=g.list+(g.bid.for===id?arr*g.bid.amt:0)});
 const T=s.order.reduce((a,id)=>a+votes[id],0);let tot=0;
 s.order.forEach(id=>{const p=P(s,id),g=s.gen[id];p.blocks=T?Math.max(2,Math.round(20*votes[id]/T)):4;p.b0=p.blocks;p.inf=12-g.list+(s.cfg.abilities!==false&&p.emb==="sol"?2:0);tot+=p.blocks});
 while(tot>BLOCKS){const big=s.order.slice().sort((a,b)=>P(s,b).blocks-P(s,a).blocks)[0];P(s,big).blocks--;P(s,big).b0--;tot--}
 s.neutral=BLOCKS-tot;let st=0;s.order.forEach(id=>{const p=P(s,id);p.sen=Math.floor(p.blocks*SEN/BLOCKS);st+=p.sen});s.senN=Math.max(0,SEN-st);
 log(s,"Resultado al Congreso: "+s.order.map(id=>`${nm(s,id)} ${P(s,id).blocks} bloques (lista ${s.gen[id].list})`).join(", ")+`. Independientes: ${s.neutral}.`);
 s.order.forEach(id=>{s.bids[id]=s.gen[id].bid});resolveElection(s);
}
function endorse(s,id,forId,amt){if(s.phase!=="segunda")return"No hay segunda vuelta.";const R=s.runoff;if(forId!==R.a&&forId!==R.b)return"Solo puedes apoyar a un finalista.";amt=Math.max(0,Math.min(P(s,id).inf,amt|0));s.endorse[id]={for:forId,amt};return null}
function bidOf(s,id){const b=s.bids[id];return typeof b==="number"?{for:id,amt:b}:b}
function resolveElection(s){
 if(s.cfg.rankVP){s.order.forEach(id=>{const b=bidOf(s,id);s.bids[id]={for:id,amt:P(s,id).inhab?0:b.amt}})}
 if(s.cfg.runoff&&!s.runoff){
  let cands=s.order.filter(id=>bidOf(s,id).for===id);if(!cands.length)cands=[...new Set(s.order.map(id=>bidOf(s,id).for))];
  const tot={};cands.forEach(c=>{tot[c]=P(s,c).camp;s.order.forEach(id=>{const b=bidOf(s,id);if(b.for===c)tot[c]+=b.amt})});
  const T=Object.values(tot).reduce((a,b)=>a+b,0);const r=shuffle(cands).sort((a,b)=>tot[b]-tot[a]);
  log(s,"Primera vuelta: "+r.map(c=>`${nm(s,c)} ${tot[c]} (${Math.round(tot[c]/T*100)}%)`).join(", ")+".");
  if(r.length>=2&&tot[r[0]]*2<=T){s.runoff={a:r[0],b:r[1],base:{[r[0]]:tot[r[0]],[r[1]]:tot[r[1]]}};s.endorse={};s.phase="segunda";bump(s,'segunda');log(s,`Nadie supera la mitad: segunda vuelta entre ${nm(s,r[0])} y ${nm(s,r[1])}.`);return}
 }
 if(s.runoff){const R=s.runoff;const tot={[R.a]:R.base[R.a],[R.b]:R.base[R.b]};Object.entries(s.endorse).forEach(([id,e])=>{if(e&&tot[e.for]!=null)tot[e.for]+=e.amt});
  const w=tot[R.a]===tot[R.b]?(Math.random()<.5?R.a:R.b):(tot[R.a]>tot[R.b]?R.a:R.b);
  Object.entries(s.endorse).forEach(([id,e])=>{if(e&&e.for===w)P(s,id).inf=Math.max(0,P(s,id).inf-e.amt)});
  s.secondRound=Object.keys(s.endorse).filter(id=>s.endorse[id]&&s.endorse[id].for===w&&id!==w);
  log(s,`Segunda vuelta: ${nm(s,R.a)} ${tot[R.a]} vs ${nm(s,R.b)} ${tot[R.b]}.`+(s.secondRound.length?` Endosos al ganador: ${s.secondRound.map(x=>nm(s,x)).join(", ")}.`:""));
  s.order.forEach(id=>{const b=bidOf(s,id);if(b.for!==w&&b.for!==R.a&&b.for!==R.b)s.bids[id]={for:id,amt:0}});
  s.forceWinner=w;s.runoff=null;s.endorse=null;
 }
 let cands=s.order.filter(id=>bidOf(s,id).for===id&&!P(s,id).inhab);if(!cands.length)cands=[...new Set(s.order.map(id=>bidOf(s,id).for))];const tot={};
 cands.forEach(c=>{tot[c]=P(s,c).camp;s.order.forEach(id=>{const b=bidOf(s,id);if(b.for===c)tot[c]+=b.amt})});
 const r=shuffle(cands).sort((a,b)=>tot[b]-tot[a]);const w=s.forceWinner!=null?s.forceWinner:r[0];s.forceWinner=null;
 s.gabCens=0;s.aprob=s.cfg.aprobStart;s.order.forEach(id=>P(s,id).min=false);
 s.pres=w;s.presType="electo";s.elected=w;if(s.firstElected==null)s.firstElected=w;s.tenure=Math.max(1,s.year);s.premier=null;s.premierOk=false;
 const allies=s.order.filter(id=>id!==w&&bidOf(s,id).for===w).sort((a,b)=>bidOf(s,b).amt-bidOf(s,a).amt);
 s.order.forEach(id=>{const b=bidOf(s,id);if(b.for===w)P(s,id).inf-=b.amt});
 s.vp1=allies[0]??null;s.vp2=allies[1]??null;
 if(s.cfg.rankVP){const rest=r.filter(x=>x!==w&&!P(s,x).inhab);s.vp1=rest[0]??null;s.vp2=rest[1]??null;[s.vp1,s.vp2].forEach(x=>{if(x!=null)P(s,x).inf=Math.max(0,P(s,x).inf-bidOf(s,x).amt)})}
 head(s,`${nm(s,w).toUpperCase()} GANA LA PRESIDENCIA`);log(s,"Elección: "+r.map(c=>`${nm(s,c)} ${tot[c]}`).join(", ")+`. Gana la plancha de ${nm(s,w)}`+(s.vp1!=null?` con ${nm(s,s.vp1)} como 1.er VP`+(s.vp2!=null?` y ${nm(s,s.vp2)} como 2.º VP`:""):" sin vicepresidentes aliados")+".");
 if(s.year===0)startYear(s);else s.phase="mesa";
}
function setPlancha(s){}
function startYear(s){
 s.year++;s.leg=1;s.freeUsed={};s.amarres={};s.mociones=[];s.votes={};s.mesaVotes={};s.promesas={};s.obras={};s.budget=s.cfg.budget||0;
 const e=EVENTS[Math.floor(Math.random()*EVENTS.length)];s.lastEvent=e;
 if(e.a)s.aprob+=e.a;if(e.e)P(s,s.pres).esc+=e.e;clampA(s);
 s.order.forEach(id=>{const p=P(s,id);p.inf+=2+(id===s.pres?1:0)+(p.min?1:0)+(id===s.congreso?1:0)+(id===s.premier&&s.premierOk?1:0);if(!s.cfg.drawLeg)giveDraw(s,id)});
 log(s,`Año ${s.year}. Evento: ${e.n} (${e.x}).`);
 if(s.comis&&s.comis.fisc!=null&&s.year>1){const fo=s.comis.fisc;const tg=s.order.filter(x=>x!==fo&&P(s,x).hand.length>=2).sort((a,b)=>P(s,b).hand.length-P(s,a).hand.length)[0];if(tg!=null){P(s,tg).esc++;log(s,`La comisión de Fiscalización (${nm(s,fo)}) investiga a ${nm(s,tg)}: +1 escándalo.`)}}
 if(s.golpista!=null&&s.golpista===s.pres&&(s.regimenHasta||0)<legIdx(s)&&d6()<=2){P(s,s.pres).esc+=3;s.aprob-=2;clampA(s);bump(s,'videos');log(s,"Se difunde un video comprometedor del entorno del régimen: +3 escándalos y -2 Aprobación al presidente.")}
 if(s.snap&&s.reeleccion){s.order.forEach(x=>{if(x!==s.pres&&s.neutral>0){P(s,x).blocks++;s.neutral--}});s.reeleccion=false;log(s,"Reelección inmediata: cada congresista suma 1 bloque.")}
 if(s.snap){s.snap=false;s.bids={};s.order.forEach(id=>{P(s,id).camp=d6();P(s,id).noMin=false});s.phase="eleccion";log(s,"Elecciones anticipadas convocadas por el presidente encargado.");}
 else s.phase="mesa";
}
function setMesaVote(s,id,sen,dip){if(sen===s.pres||dip===s.pres)return"No puedes votar por el presidente.";s.mesaVotes[id]={sen,dip};return null}
function mesaWinner(s,ch){const t={};s.order.forEach(id=>{const v=s.mesaVotes[id];const c=v&&v[ch];if(c!=null&&c!==s.pres)t[c]=(t[c]||0)+(ch==="sen"?P(s,id).sen:P(s,id).blocks)});
 let best=null,bv=-1;shuffle(Object.keys(t)).forEach(k=>{if(t[k]>bv){bv=t[k];best=k}});return best!=null?best:largestExcept(s,[s.pres])}
function bidComis(s,id,b){const p=P(s,id);const f=Math.max(0,b.fisc|0),pr=Math.max(0,b.presu|0),co=Math.max(0,b.const|0);if(f+pr+co>p.inf)return`Solo tienes ${p.inf}.`;s.cbids[id]={fisc:f,presu:pr,const:co};return null}
function resolveComis(s){["fisc","presu","const"].forEach(k=>{let best=0,who=[];s.order.forEach(id=>{const v=(s.cbids[id]||{})[k]||0;if(v>best){best=v;who=[id]}else if(v===best&&v>0)who.push(id)});
  if(best>0){const w=who[Math.floor(Math.random()*who.length)];s.comis[k]=w;P(s,w).inf-=best;log(s,`Comisión de ${COMIS[k].n}: la gana ${nm(s,w)} con ${best}.`)}else log(s,`Comisión de ${COMIS[k].n}: nadie pujó.`)});
 s.cbids=null;beginLeg(s)}
function resolveMesa(s){
 const go=()=>{if(s.year===1&&s.cfg.comisiones!==false&&!s.comisDone){s.comisDone=true;s.cbids={};s.phase="comisiones";log(s,"Subasta de comisiones: Fiscalización, Presupuesto y Constitución.");return}beginLeg(s)};
 if(!s.cfg.mods.bicameral){s.presDip=mesaWinner(s,"dip");s.presSen=null;s.congreso=s.presDip;log(s,`Presidencia del Congreso: ${nm(s,s.congreso)}.`);go();return}
 s.presSen=mesaWinner(s,"sen");s.presDip=mesaWinner(s,"dip");
 s.congreso=s.year%2===1?s.presSen:s.presDip;
 log(s,`Presidencia del Senado: ${nm(s,s.presSen)}. Presidencia de Diputados: ${nm(s,s.presDip)}. Este año preside el Congreso ${nm(s,s.congreso)} (${s.year%2===1?"Senado":"Diputados"}).`);
 go();
}
function beginLeg(s){s.rebel={};s.semana={};lawsTick(s);
 (s.laws||[]).forEach(L=>{if(L.state==="observada"){L.state="insistencia";s.mociones.push({id:"ins_"+L.id,type:"insistencia",by:L.by,target:null,law:L.id})}});if(s.cfg.drawLeg)s.order.forEach(id=>giveDraw(s,id));
 if(s.premierInv!=null){s.mociones.push({id:"inv_"+legIdx(s),type:"investidura",by:s.pres,target:s.premierInv});s.premierInv=null}const i=s.order.indexOf(s.pres);s.turn={order:[...s.order.slice(i),...s.order.slice(0,i)],idx:0,step:"expediente",acted:false};s.phase="turno";if(s.cfg.legs>1)log(s,`${s.leg===1?"Primera":"Segunda"} legislatura del año ${s.year}.`);skipCheck(s)}
function legIdx(s){return s.year*2+(s.leg||1)}
function current(s){return s.turn.order[s.turn.idx]}
function skipCheck(s){while(s.phase==="turno"&&P(s,current(s)).skip){const p=P(s,current(s));p.skip=false;log(s,`${p.name} pierde su turno (inhabilitado).`);advance(s)}}
function advance(s){s.turn.idx++;s.turn.step="expediente";s.turn.acted=false;if(s.turn.idx>=s.turn.order.length){endTurns(s)}else skipCheck(s)}
function openExp(s,id){bump(s,'turnos');
 const ci=drawAg(s);s.disc.ag.push(ci);const c=AGENDA[ci];const p=P(s,id);
 if(c.t==="crisis"){bump(s,'crisis');s.crisis={card:ci,owner:id,base:s.cfg.crisis,roll:d6(),own:d6(),bonus:0,extra:0,resp:{},pun:[]};s.phase="crisis";log(s,`${p.name} abre expediente: Crisis «${c.n}».`);return}
 if(c.n==="Transferencia a tu región")p.inf+=3;
 else if(c.n==="Foto con el ganador"){p.inf+=2;drawBo(s,id)}
 else if(c.n==="Reportaje dominical"){p.esc++;if(id===s.pres){s.aprob--;clampA(s)}}
 else if(c.n==="Chat filtrado"){p.esc++;p.inf=Math.max(0,p.inf-1)}
 log(s,`${p.name} abre expediente: ${c.t==="oportunidad"?"Oportunidad":"Escándalo"} «${c.n}» (${c.x}).`);
 s.turn.step="accion";
}
function crisisPower(s){const c=s.crisis,o=P(s,c.owner);let pow=o.blocks+c.own+c.bonus+(c.owner===s.pres?(s.cfg.presBonus||0):0)+(s.cfg.abilities!==false&&o.emb==="ola"?1:0);Object.entries(c.resp).forEach(([id,r])=>{if(r==="apoyo")pow+=Math.ceil(P(s,id).blocks/2)});return pow}
function tenureYears(s){return s.pres==null?0:s.year-(s.tenure||1)+1}
function pacto(s,id,target){if(!s.cfg.pacto)return"El Pacto de Obras no está activo.";if(id!==s.pres)return"Solo el presidente.";if(!(s.phase==="turno"&&current(s)===id))return"Solo en tu turno.";
 if(s.pactoLeg===legIdx(s))return"Ya hiciste un Pacto de Obras en esta legislatura.";if(target===id||!s.players[target])return"Elige a un rival.";if(s.aprob<=(s.cfg.aprobMin??0))return"Con la aprobación en el piso, nadie firma pactos.";
 const cost=tenureYears(s)>=3?2:1;const p=P(s,id);if(p.inf<cost)return`Necesitas ${cost}.`;p.inf-=cost;P(s,target).inf+=1;s.pactos[target]={y:s.year,by:id};s.pactoLeg=legIdx(s);bump(s,'pactos');
 log(s,`Pacto de Obras: ${nm(s,id)} da +1 de Influencia a ${nm(s,target)}, que no podrá impulsar ni votar la vacancia este año.`);return null}
function wear(s){if(s.cfg.wear===false||s.pres==null)return 0;const y=s.year-(s.tenure||1)+1;if(s.cfg.wearSoft)return y>=3?1:0;return y>=3?2:y===2?1:0}
function crisisDiff(s){const c=s.crisis;return c.base+c.roll+c.extra+(c.owner===s.pres?wear(s):0)}
function crisisRespond(s,id,r,cardIdx){
 const c=s.crisis;if(!c||id===c.owner||c.resp[id])return"Ya respondiste.";const p=P(s,id);
 if(r==="sabotaje"||r==="punalada"){const i=p.hand.indexOf(r);if(i<0)return"No tienes esa carta.";p.hand.splice(i,1);s.disc.bo.push(r);c.extra+=3;if(r==="punalada")c.pun.push(id)}
 if(r==="punalada")bump(s,'pun');if(r==="punalada"||r==="sabotaje")bump(s,'cartas');if(r==="sabotaje")bump(s,'sab');if(r==="apoyo")bump(s,"apoyo");if(r==="pasar")bump(s,"crisisPasa");c.resp[id]=r==="punalada"?"apoyo_falso":r;return null;
}
function crisisBoost(s,id){const c=s.crisis,p=P(s,id);if(id!==c.owner)return"Solo en tu Crisis.";const i=p.hand.indexOf("refuerzo");if(i<0)return"No tienes Bono de gestión.";p.hand.splice(i,1);s.disc.bo.push("refuerzo");c.bonus+=3;bump(s,'cartas');return null}
function crisisResolve(s){
 const c=s.crisis,o=P(s,c.owner),card=AGENDA[c.card];const pow=crisisPower(s),diff=crisisDiff(s);
 if(pow>=diff&&card.k==="Obras"&&s.comis&&s.comis.presu!=null){P(s,s.comis.presu).inf+=1;log(s,`La comisión de Presupuesto cobra por la obra: ${nm(s,s.comis.presu)} +1.`)}
 const lab=r=>r==="apoyo"?"apoya":r==="sabotaje"?"sabotea":r==="apoyo_falso"?"¡apuñala!":"pasa";
 const rs=Object.entries(c.resp).map(([id,r])=>`${nm(s,id)} ${lab(r)}`);if(rs.length)log(s,`Respuestas reveladas: ${rs.join(", ")}.`);
 const sup=Object.entries(c.resp).filter(([k,r])=>r==="apoyo").map(([k])=>k);
 if(pow>=diff){o.inf+=2;if(c.owner===s.pres){s.aprob++;clampA(s)}sup.forEach(id=>P(s,id).inf+=1);
  log(s,`Crisis «${card.n}» superada (${pow} vs ${diff}). ${o.name} +2 Influencia${c.owner===s.pres?", +1 Aprobación":""}${sup.length?"; aliados +1":""}.`)}
 else{o.esc++;if(c.owner===s.pres){s.aprob--;clampA(s)}
  c.pun.forEach(id=>{pst(s,id,"traicion");if(o.hand.length){const k=Math.floor(Math.random()*o.hand.length);P(s,id).hand.push(o.hand.splice(k,1)[0])}});
  const sabs=Object.entries(c.resp).filter(([k,r])=>r==="sabotaje").map(([k])=>k);if(s.cfg.sabPrize!==false)sabs.forEach(id=>{P(s,id).inf+=1;pst(s,id,"sabotaje")});
  if(c.pun.length)head(s,`¡PUÑALADA EN EL PLENO! ${c.pun.map(x=>nm(s,x)).join(" y ")} hunde${c.pun.length>1?"n":""} a ${o.name} en plena crisis`);
  else if(c.owner===s.pres)head(s,`${card.n.toUpperCase()}: el gobierno de ${o.name} no da la talla`);
  log(s,`Crisis «${card.n}» fracasa (${pow} vs ${diff}). ${o.name} +1 escándalo${c.owner===s.pres?", -1 Aprobación":""}${c.pun.length?". Puñalada de "+c.pun.map(x=>nm(s,x)).join(", "):""}${(s.cfg.sabPrize!==false&&Object.values(c.resp).includes("sabotaje"))?". Los saboteadores capitalizan el fracaso (+1)":""}.`)}
 s.crisis=null;s.phase="turno";s.turn.step="accion";
}
const MOC={investidura:"Investidura del Premier (confianza)",ley:"Ley con nombre propio",insistencia:"Insistencia sobre ley observada",interpelacion:"Interpelación al gabinete",confianza:"Cuestión de confianza del gabinete",vacancia:"Vacancia presidencial",gabinete:"Censura al gabinete",acusacion:"Acusación constitucional",mesa:"Censura a la Presidencia del Congreso",encargado:"Censura al presidente encargado"};
function canMocion(s,id,type,target){
 if(["interpelacion","gabinete","confianza","acusacion","mesa"].includes(type)&&!s.cfg.mods.gobierno)return"Esa moción es de la expansión Palacio de Gobierno.";
 if(s.mociones.some(m=>m.type===type&&(type!=="acusacion"||m.target===target)))return"Ya hay una moción de ese tipo este año.";
 if(type==="confianza"){if(id!==s.pres)return"Solo el presidente plantea la confianza.";if(!s.order.some(x=>P(s,x).min))return"Necesitas un gabinete.";}
 if(type==="vacancia"&&pactoOn(s,id))return"Tienes un Pacto de Obras vigente con el gobierno.";
 if(type==="acusacion"&&(s.inmunidadHasta||0)>=legIdx(s))return"La ley de inmunidad impide acusaciones por ahora.";
 if(type==="vacancia"){if(id===s.pres)return"El presidente no se vaca a sí mismo.";if(s.presType==="encargado")return"Al encargado se le censura, no se le vaca.";}
 if(type==="encargado"){if(s.presType!=="encargado")return"El presidente no es encargado.";if(id===s.pres)return"No puedes.";}
 if((s.regimenHasta||0)>=legIdx(s)&&["vacancia","gabinete","acusacion","interpelacion","encargado","mesa"].includes(type))return"Congreso Constituyente: no hay mociones de control por ahora.";
 if(type==="interpelacion"){if(id===s.pres)return"No puedes.";if(!s.order.some(x=>P(s,x).min))return"No hay gabinete que interpelar.";}
 if(type==="gabinete"){if(id===s.pres)return"No puedes.";if(!s.order.some(x=>P(s,x).min))return"No hay gabinete.";}
 if(type==="acusacion"){if(target==null||target===id)return"Elige un objetivo.";if(P(s,target).inmune>=legIdx(s))return"Está protegido tras su renuncia.";if(target===s.pres)return"Al presidente se le vaca.";if(P(s,target).esc<2)return"Necesita 2 o más escándalos.";}
 if(type==="mesa"){if(id===s.congreso)return"Ya presides el Congreso.";if(id===s.pres)return"No puedes.";}
 return null;
}
function doAction(s,id,a,arg,arg2){
 const p=P(s,id),isP=id===s.pres;
 if(a==="pasar"){bump(s,"pasar");const pi=s.cfg.pasarInf||0;p.inf+=pi;log(s,`${p.name} pasa${pi?" (+"+pi+" de Influencia)":""}.`);advance(s);return null}
 if(a==="fichar"){const fc=(s.cfg.abilities!==false&&p.emb==="montana")?3:4;if(p.inf<fc)return`Necesitas ${fc}.`;if(freeNeutral(s)<1)return"No hay independientes libres.";p.inf-=fc;s.neutral--;p.blocks++;log(s,`${p.name} ficha a un independiente.`)}
 else if(a==="amarrar"){const n=Math.max(1,parseInt(arg)||1);if(freeNeutral(s)<n)return`Solo hay ${freeNeutral(s)} libres.`;if(p.inf<2*n)return"No te alcanza (2 por bloque).";p.inf-=2*n;s.amarres[id]=(s.amarres[id]||0)+n;log(s,`${p.name} amarra ${n} bloque(s) independiente(s).`)}
 else if(a==="control"){if(p.inf<3)return"Necesitas 3.";if(p.esc<1)return"No tienes escándalos.";p.inf-=3;p.esc--;log(s,`${p.name} hace control de daños (-1 escándalo).`)}
 else if(a==="mocion"){const e=canMocion(s,id,arg,arg2);if(e)return e;const cost=(arg==="interpelacion"||(s.cfg.abilities!==false&&p.emb==="chakana"&&["vacancia","encargado","gabinete"].includes(arg)))?1:2;if(p.inf<cost)return`Necesitas ${cost}.`;if(s.cfg.freeMotion&&!(s.freeUsed&&s.freeUsed[id])&&["vacancia","encargado"].includes(arg)){s.freeUsed=s.freeUsed||{};s.freeUsed[id]=true;p.inf+=cost}if(arg==="vacancia")head(s,`SE PRESENTA MOCIÓN DE VACANCIA: ${p.name} va por ${nm(s,s.pres)}`);bump(s,'mociones');p.inf-=cost;s.mociones.push({id:"m"+s.mociones.length,type:arg,by:id,target:arg2??null});log(s,`${p.name} presenta: ${MOC[arg]}${arg2!=null?" contra "+nm(s,arg2):""}.`)}
 else if(a==="disolver"){if(!isP)return"Solo el presidente.";if(s.gabCens<2)return"Necesitas dos gabinetes censurados.";dissolve(s)}
 else if(a==="carta"){const e=playCard(s,id,arg,arg2);if(e)return e}
 else return"Acción desconocida.";
 advance(s);return null;
}
function playCard(s,id,idx,target){
 const p=P(s,id),k=p.hand[idx],c=BOTIN[k];if(!c)return"Carta no encontrada.";if(c.when!=="action")return"Esa carta no se juega como acción.";
 if(c.target&&(target==null||target===id))return"Elige un objetivo.";
 const t=target!=null?P(s,target):null;
 if(k==="transfuga"){if(p.inf<2)return"Necesitas 2.";if(t.blocks<1)return"No tiene bloques.";}
 if(k==="almuerzo"&&freeNeutral(s)<1)return"No hay independientes libres.";
 if(c.pres&&id!==s.pres)return"Solo el presidente.";
 if(k==="video"&&id===s.pres)return"El presidente no puede jugarla.";
 if(k==="gabinete"&&p.inf<2)return"Necesitas 2.";if(k==="obra"&&p.inf<3)return"Necesitas 3.";
 if(k==="senador"){if(p.inf<3)return"Necesitas 3.";if(t.sen<1)return"No tiene senadores.";}
 if((k==="camiseta"||k==="transfuga")&&t&&s.cfg.abilities!==false&&t.emb==="estrella")return`La bancada de ${t.name} (Estrella) es inmune al transfuguismo.`;
 if(k==="camiseta"){if(p.inf<2)return"Necesitas 2.";if(t.blocks<1)return"No tiene bloques.";}
 if(k==="comision"&&target===s.pres)return"No se puede contra el presidente.";
 if(k==="borron"&&p.blocks>3)return"Solo con 3 bloques o menos.";
 if(k==="cerrado"&&!s.mociones.length)return"No hay mociones que cancelar.";
 if(["destape","audio","comision","camara"].includes(k)&&t&&t.zorro>=legIdx(s))return`${t.name} está protegido por Zorro cuidando gallinas.`;
 p.hand.splice(idx,1);s.disc.bo.push(k);bump(s,'cartas');
 if(c.press){const di=t.hand.indexOf("difamacion");if(di>=0){t.hand.splice(di,1);s.disc.bo.push("difamacion");if(target===s.pres){s.aprob--;clampA(s)}log(s,`${t.name} responde con una demanda por difamación: se anula ${c.n}${target===s.pres?" (-1 Aprobación)":""}.`);return null}}
 if(["destape","audio","comision"].includes(k)){const ji=t.hand.indexOf("juez");if(ji>=0){t.hand.splice(ji,1);s.disc.bo.push("juez");log(s,`${t.name} hace una Llamada al juez: se anula ${c.n}.`);return null}}
 const d=d6(),freeIdx=()=>freeNeutral(s)>0;
 switch(k){
  case"indulto":t.esc=0;s.indultos=s.indultos||{};s.indultos[target]=legIdx(s);log(s,`${p.name} concede un indulto a ${t.name}: sus escándalos quedan en 0.`);break;
  case"asesor":p.inf+=2;if(d<=2)p.esc++;log(s,`${p.name} contrata a un asesor de confianza (dado ${d}${d<=2?": +1 escándalo":""}).`);break;
  case"conexion":p.inf+=2;if(d<=3)p.esc++;log(s,`${p.name} hace una conexión clandestina (dado ${d}${d<=3?": +1 escándalo":""}).`);break;
  case"curriculum":drawBo(s,id);drawBo(s,id);p.esc++;log(s,`${p.name} presenta un currículum creativo: roba 2 cartas, +1 escándalo.`);break;
  case"financista":p.inf+=5;if(d<=3)p.esc+=2;log(s,`${p.name} recibe un financista generoso (+5)${d<=3?"; se descubre: +2 escándalos":""}.`);break;
  case"reunion":p.inf+=3;p.esc++;log(s,`${p.name} tiene una reunión fuera de agenda: +3, +1 escándalo.`);break;
  case"diario":p.esc=Math.max(0,p.esc-1);if(id===s.pres){s.aprob++;clampA(s)}log(s,`Un diario amigo limpia la imagen de ${p.name}.`);break;
  case"plazo":p.esc=0;p.inf=Math.max(0,p.inf-2);log(s,`Se venció el plazo: ${p.name} queda sin escándalos.`);break;
  case"comision":t.esc++;log(s,`${p.name} abre una comisión investigadora a ${t.name}: +1 escándalo.`);break;
  case"ley":case"prescripcion":case"autoblindaje":case"reeleccion":bump(s,'mociones');s.mociones.push({id:"m"+s.mociones.length+"_"+s.leg,type:"ley",kind:c.law||"propio",by:id,target:null});log(s,`${p.name} presenta: ${c.n}.`);break;
  case"reportaje":if(t.esc>=1){t.esc+=2;if(target===s.pres){s.aprob--;clampA(s)}bump(s,'prensa');log(s,`Reportaje dominical sobre ${t.name}: +2 escándalos.`)}else{p.inf=Math.max(0,p.inf-2);log(s,`El reportaje sobre ${t.name} sale en falso: ${p.name} pierde 2 de Influencia.`)}break;
  case"investigacion":{const n=Math.min(2,t.hand.filter(x=>BOTIN[x]&&BOTIN[x].corr).length);t.esc+=n;if(n)bump(s,'prensa');log(s,`Unidad de investigación revisa a ${t.name}: ${n?"encuentra "+n+" irregularidad(es) (+"+n+" escándalos)":"no encuentra nada"}.`);break}
  case"chats":{const net=new Set([target]);Object.keys(s.promesas||{}).forEach(x=>{if(target===successor(s))net.add(x);if(x===target)net.add(successor(s))});Object.keys(s.obras||{}).forEach(x=>{if(target===s.pres)net.add(x);if(x===target)net.add(s.pres)});net.delete(null);net.delete(undefined);[...net].forEach(x=>{if(P(s,x))P(s,x).esc++});bump(s,'prensa');log(s,`Filtración de chats: salpica a ${[...net].map(x=>nm(s,x)).join(", ")} (+1 escándalo c/u).`);break}
  case"gabinete":p.inf-=2;p.esc=Math.max(0,p.esc-2);s.aprob--;clampA(s);log(s,"Cambio de gabinete: -2 escándalos, -1 Aprobación.");break;
  case"obra":p.inf-=3;s.aprob+=2;clampA(s);log(s,"Obra emblemática: +2 Aprobación.");break;
  case"senador":p.inf-=3;t.sen--;p.sen++;log(s,`Un senador de ${t.name} se pasa a ${p.name}.`);break;
  case"victima":p.esc=Math.max(0,p.esc-2);p.inf+=3;log(s,`${p.name} se declara víctima: -2 escándalos, +3.`);break;
  case"borron":{let n=0;while(n<2&&freeIdx()){s.neutral--;p.blocks++;n++}log(s,`Borrón y cuenta nueva: ${n} independiente(s) se suman a ${p.name}.`);break}
  case"camara":{const n=Math.min(3,t.hand.filter(x=>BOTIN[x]&&BOTIN[x].corr).length);t.esc+=n;log(s,`Cámara escondida: ${t.name} tenía ${n} carta(s) de corrupción (+${n} escándalos).`);break}
  case"video":P(s,s.pres).esc+=3;s.aprob--;clampA(s);log(s,`${p.name} difunde el video del siglo: +3 escándalos y -1 Aprobación al presidente.`);break;
  case"cerrado":{const m=s.mociones.pop();if(m.type!=="ley")P(s,m.by).inf+=(m.type==="interpelacion"?1:2);log(s,`Caso cerrado: se cancela ${MOC[m.type]||"la ley"} de ${nm(s,m.by)}.`);break}
  case"habeas":if(freeIdx()){s.neutral--;p.blocks++}p.esc=Math.max(0,p.esc-1);log(s,`Hábeas corpus a favor de ${p.name}.`);break;
  case"zorro":p.zorro=legIdx(s)+1;log(s,`${p.name} preside la comisión de control: protegido esta legislatura y la siguiente.`);break;
  case"campana":if(id===s.pres){s.aprob++;clampA(s);p.inf+=2}else p.inf+=4;log(s,`${p.name} lanza una campaña millonaria.`);break;
  case"camiseta":p.inf-=2;t.blocks--;p.blocks++;log(s,`Cambio de camiseta exprés: un bloque de ${t.name} pasa a ${p.name}.`);break;
  case"semana":p.inf+=2;s.semana=s.semana||{};s.semana[id]=true;log(s,`${p.name} se va de semana de representación: no vota esta legislatura.`);break;
  case"destape":if(target===s.pres)head(s,`DESTAPE: nuevo escándalo golpea a ${t.name}`);t.esc++;if(target===s.pres){s.aprob--;clampA(s)}log(s,`${p.name} destapa a ${t.name}: +1 escándalo.`);break;
  case"audio":head(s,`AUDIO FILTRADO complica a ${t.name}`);t.esc++;if(target===s.pres){s.aprob--;clampA(s)}log(s,`Se filtra un audio de ${t.name}: +1 escándalo.`);break;
  case"rebelion":s.rebel=s.rebel||{};s.rebel[target]=(s.rebel[target]||0)+1;log(s,`Se rebelan 2 bloques de la bancada de ${t.name} en esta legislatura.`);break;
  case"aporte":p.inf+=4;p.esc++;log(s,`${p.name} recibe un «aporte voluntario»: +4 Influencia, +1 escándalo.`);break;
  case"testigo":p.esc=Math.max(0,p.esc-2);log(s,`Un testigo se retracta: ${p.name} -2 escándalos.`);break;
  case"transfuga":{head(s,`TRANSFUGUISMO: un bloque de ${t.name} se pasa a ${p.name}`);p.inf-=2;const li=t.hand.indexOf("lealtad");if(li>=0){t.hand.splice(li,1);s.disc.bo.push("lealtad");log(s,`${t.name} frena el transfuguismo con Lealtad de bancada.`)}else{t.blocks--;p.blocks++;log(s,`Un bloque de ${t.name} se pasa a ${p.name}.`)}break}
  case"almuerzo":{const n=Math.min(2,freeNeutral(s));s.amarres[id]=(s.amarres[id]||0)+n;log(s,`${p.name} invita a almorzar: amarra ${n} independiente(s).`);break}
  case"encuesta":s.aprob+=id===s.pres?1:-1;clampA(s);log(s,`${p.name} publica una encuesta.`);break;
 }return null;
}
function dissolve(s){bump(s,'dis');
 let bids=s.order.map(id=>({id,b:Math.max(1,Math.floor(P(s,id).inf/2))}));bids.forEach(x=>P(s,x.id).inf-=x.b);
 const tb=bids.reduce((a,x)=>a+x.b,0);let used=0;bids.forEach(x=>{const nb=Math.max(1,Math.floor(x.b/tb*18));P(s,x.id).blocks=nb;used+=nb});
 s.neutral=Math.max(0,BLOCKS-used);s.gabCens=0;s.amarres={};
 if(s.reeleccion){s.order.forEach(x=>{if(x!==s.pres&&s.neutral>0){P(s,x).blocks++;s.neutral--}});s.reeleccion=false;log(s,"Reelección inmediata: cada congresista suma 1 bloque.")}
 head(s,'¡DISOLUCIÓN! El presidente cierra la Cámara de Diputados');log(s,`¡Disolución de la Cámara de Diputados! Nuevas elecciones: `+s.order.map(id=>`${nm(s,id)} ${P(s,id).blocks}`).join(", ")+`. El Senado sigue igual.`);
}
function endTurns(s){flushDraws(s);if(s.mociones.length){s.phase="votacion";s.votes={};s.mociones.forEach(m=>{s.votes[m.id]={}});autoVotes(s)}else closeYear(s)}
function autoVotes(s){s.mociones.forEach(m=>{const v=s.votes[m.id];v[m.by]="si";
 if(m.type==="vacancia"||m.type==="gabinete"||m.type==="interpelacion")v[s.pres]="no";if(m.type==="investidura"){v[s.pres]="si";if(m.target!=null)v[m.target]="si"}if(m.type==="insistencia")v[s.pres]="no";if(m.type==="confianza")v[s.pres]="si";if(m.type==="acusacion")v[m.target]="no";if(m.type==="mesa"&&s.congreso!=null)v[s.congreso]="no";if(m.type==="encargado")v[s.pres]="no"})}
function neutralShare(s,m){if(m.type==="investidura")return 1-weak(s);if(m.type==="ley"||m.type==="insistencia")return 0.4;if(m.type==="interpelacion")return Math.min(1,weak(s)+0.2);if(m.type==="confianza")return 1-weak(s);if(m.type==="vacancia"||m.type==="gabinete")return weak(s);if(m.type==="acusacion")return Math.min(1,P(s,m.target).esc*0.2);if(m.type==="encargado")return 0.5;return 0.3}
function discolos(s,id){const p=P(s,id);if(s.cfg.abilities!==false&&p.emb==="estrella")return 0;return Math.min(p.blocks,(p.esc>=2?1:0)+2*((s.rebel&&s.rebel[id])||0))}
function forecast(s,m){const by=P(s,m.by);const sure=Math.max(0,by.blocks-discolos(s,m.by))+(s.amarres[m.by]||0);let dis=0;s.order.forEach(id=>dis+=discolos(s,id));
 const indep=Math.round((freeNeutral(s)+dis)*neutralShare(s,m));const need=m.type==="vacancia"?vacU(s):m.type==="interpelacion"?TH.interAdm:TH.simple;
 return{sure,indep,need,faltan:Math.max(0,need-sure-indep)}}
function tally(s,m){const v=s.votes[m.id];let f=0,sf=0,dis=0;const co=s.comis&&s.comis.const;if(co!=null&&!(s.semana&&s.semana[co])){if(v[co]==="si")f+=1;else if(v[co]==="no")f-=1}
 s.order.forEach(id=>{if(s.semana&&s.semana[id])return;const d=discolos(s,id);dis+=d;if(v[id]==="si"){f+=P(s,id).blocks-d+(s.amarres[id]||0);sf+=P(s,id).sen}});
 const sh=neutralShare(s,m);f+=Math.round((freeNeutral(s)+dis)*sh);sf+=Math.round(s.senN*sh);return{f,sf}}
function lawEffect(s,L){const k=L.kind||"propio";
 if(k==="propio"){P(s,L.by).inf+=3;L.voters.forEach(x=>P(s,x).inf+=1);return"autor +3; aliados +1"}
 P(s,L.by).inf+=1;bump(s,'autoblindaje');
 if(k==="prescripcion"){s.order.forEach(x=>{if(x!==s.pres)P(s,x).esc=Math.max(0,P(s,x).esc-1)});s.aprob--;clampA(s);return"cada congresista retira 1 escándalo; el gobierno pierde 1 de Aprobación"}
 if(k==="autoblindaje"){s.blindajeHasta=legIdx(s)+2;return"las acusaciones necesitan 2 bloques más por dos legislaturas"}
 if(k==="reeleccion"){s.reeleccion=true;return"reelección inmediata para la próxima disolución o elección anticipada"}}
function promulgate(s,L,insist){L.state="promulgada";pst(s,L.by,"leyes");if(L.kind&&L.kind!=="propio")head(s,`EL CONGRESO SE BLINDA: se promulga la ley de ${nm(s,L.by)}`);const fx=lawEffect(s,L);bump(s,'leyes');
 if(insist){s.aprob--;clampA(s);log(s,`El Congreso insiste y su presidente promulga la ley de ${nm(s,L.by)} (${fx}). El Ejecutivo queda desautorizado (-1 Aprobación).`)}
 else log(s,`Se promulga la ley de ${nm(s,L.by)} (${fx}).`)}
function decideLaw(s,id,lawId,obs){if(id!==s.pres)return"Solo el presidente promulga u observa.";const L=(s.laws||[]).find(l=>l.id===lawId&&l.state==="pendiente");if(!L)return"No hay esa ley pendiente.";
 if(obs){L.state="observada";log(s,`${nm(s,id)} observa la ley de ${nm(s,L.by)}. El Congreso puede insistir en la próxima legislatura.`)}else promulgate(s,L,false);return null}
function playVoteCard(s,id,k){if(s.phase!=="votacion")return"Solo durante una votación.";const p=P(s,id),i=p.hand.indexOf(k);if(i<0)return"No tienes esa carta.";
 if(k==="fuga"){if(id!==s.pres||!s.mociones.some(m=>m.type==="vacancia"))return"Solo el presidente, con una vacancia en votación.";s.fuga=true}else return"Esa carta no se juega aquí.";
 p.hand.splice(i,1);s.disc.bo.push(k);bump(s,'cartas');log(s,`${p.name} juega ${BOTIN[k].n}.`);return null}
function needExtra(s,target){if(target==null)return 0;const p=P(s,target);const i=p.hand.indexOf("blindaje");if(i>=0){p.hand.splice(i,1);s.disc.bo.push("blindaje");log(s,`${p.name} activa «Otorongo no come otorongo»: +2 votos necesarios.`);return 2}return 0}
function revealVotes(s){s.mociones.forEach(m=>{const v=s.votes[m.id];const lab=x=>x==="si"?"a favor":x==="abs"?"abstención":"en contra";log(s,`Votación «${MOC[m.type]||m.type}»: `+s.order.map(id=>`${nm(s,id)} ${lab(v[id])}`).join(", ")+".")})}
function resolveVotes(s){s.mociones.forEach(m=>{if(m.type!=="vacancia")return;const v=s.votes[m.id];s.order.forEach(id=>{if(v[id]==="si"&&pactoOn(s,id)){v[id]="no";log(s,`${nm(s,id)} cumple su Pacto de Obras y vota en contra.`)}})});revealVotes(s);
 const order=["investidura","ley","insistencia","interpelacion","confianza","acusacion","gabinete","mesa","vacancia","encargado"];
 const ms=s.mociones.slice().sort((a,b)=>order.indexOf(a.type)-order.indexOf(b.type));
 for(const m of ms){const {f,sf}=tally(s,m);const by=P(s,m.by);
  if(m.type==="acusacion"){const ex=needExtra(s,m.target)+((s.blindajeHasta||0)>=legIdx(s)?2:0);if(f>=TH.simple+ex&&sf>=TH.acusSen){const t=P(s,m.target);t.min=false;t.inf=Math.floor(t.inf/2);t.skip=true;t.esc=0;if(s.vp1===m.target)s.vp1=null;if(s.vp2===m.target)s.vp2=null;if(s.congreso===m.target)s.congreso=largestExcept(s,[s.pres,m.target]);if(s.presSen===m.target)s.presSen=null;if(s.presDip===m.target)s.presDip=null;bump(s,'acus');head(s,`INHABILITADO: el Congreso acusa a ${t.name}`);log(s,`Acusación aprobada (${f} bloques, ${sf} senadores): ${t.name} queda inhabilitado.`)}else log(s,`Acusación contra ${nm(s,m.target)} rechazada (${f}/${TH.simple+ex}, Senado ${sf}/${TH.acusSen}).`)}
  else if(m.type==="confianza"){if(f>=TH.simple){s.aprob+=2;clampA(s);log(s,`El Congreso otorga la confianza (${f} bloques): +2 Aprobación.`)}else{s.gabCens++;s.order.forEach(id=>P(s,id).min=false);log(s,`¡Confianza denegada (${f}/${TH.simple})! Cae el gabinete. Gabinetes caídos: ${s.gabCens}${s.gabCens>=2?". El presidente ya puede disolver Diputados":""}.`)}}
  else if(m.type==="investidura"){if(s.premier===m.target&&s.pres===m.by){if(f>=TH.simple){s.premierOk=true;log(s,`El Congreso otorga la confianza al Premier ${nm(s,m.target)} (${f} bloques).`)}else{log(s,`Confianza denegada al Premier ${nm(s,m.target)} (${f}/${TH.simple}): renuncia el gabinete.`);s.premier=null;if(s.cfg.mods.gobierno){s.gabCens++;log(s,`Gabinetes caídos: ${s.gabCens}.`)}}}}
  else if(m.type==="ley"||m.type==="insistencia"){const ok=f>=TH.simple&&sf>=7;
   if(!ok)log(s,`${m.type==="ley"?"La ley":"La insistencia"} de ${by.name} no pasa (Diputados ${f}/${TH.simple}, Senado ${sf}/7).`);
   else if(m.type==="ley"){s.laws=s.laws||[];s.laws.push({id:m.id,kind:m.kind||"propio",by:m.by,voters:s.order.filter(x=>s.votes[m.id][x]==="si"&&x!==m.by),leg:legIdx(s),state:"pendiente"});log(s,`La ley de ${by.name} pasa Diputados y Senado. Espera promulgación del Ejecutivo.`)}
   else{const L=(s.laws||[]).find(l=>l.id===m.law);if(L){promulgate(s,L,true)}}}
  else if(m.type==="interpelacion"){if(f<TH.interFirmas)log(s,`La interpelación no reunió firmas (${f}/${TH.interFirmas}).`);else if(f>=TH.interAdm){s.aprob--;clampA(s);bump(s,'inter');log(s,`Interpelación admitida (${f} bloques): el gabinete responde en el Pleno y el gobierno se desgasta (-1 Aprobación).`)}else log(s,`Interpelación no admitida (${f}/${TH.interAdm}).`)}
  else if(m.type==="gabinete"&&f<TH.censFirmas){log(s,`La censura no reunió firmas (${f}/${TH.censFirmas}).`)}
  else if(m.type==="gabinete"){if(f>=TH.simple){s.gabCens++;s.order.forEach(id=>P(s,id).min=false);s.aprob--;clampA(s);log(s,`Gabinete censurado (${f} bloques). Gabinetes caídos: ${s.gabCens}.`)}else log(s,`Censura al gabinete rechazada (${f}/${TH.simple}).`)}
  else if(m.type==="mesa"){if(f>=TH.simple){s.congreso=m.by;log(s,`Presidencia del Congreso censurada: ahora la preside ${by.name}.`)}else log(s,`Censura a la Mesa rechazada (${f}/${TH.simple}).`)}
  else if(m.type==="vacancia"&&s.presType!=="encargado"&&s.fuga){s.fuga=false;let k=0;const pp=P(s,s.pres);while(k<2&&pp.blocks>0){pp.blocks--;s.neutral++;k++}log(s,`¡Fuga a medianoche! La vacancia fracasa, pero ${pp.name} pierde ${k} bloques.`)}
  else if(m.type==="vacancia"&&s.presType!=="encargado"){const ex=needExtra(s,s.pres);
   if(f<TH.firmas){by.inf=Math.max(0,by.inf-2);log(s,`La vacancia no reunió firmas (${f}/${TH.firmas}).`)}
   else if(f<TH.admision){if(s.cfg.manual){by.inf=Math.max(0,by.inf-2);s.aprob--;clampA(s)}log(s,`La vacancia no fue admitida (${f}/${TH.admision}).${s.cfg.manual?" Quien la impulsó pierde 2 y el gobierno 1 de Aprobación.":""}`)}
   else if(f<vacU(s)+ex){s.aprob--;clampA(s);if(vacU(s)+ex-f>2)head(s,`${nm(s,s.pres).toUpperCase()} SOBREVIVE: la vacancia se queda en ${f} votos`);if(vacU(s)+ex-f<=2){head(s,`¡SALVADO POR UN PELO! ${nm(s,s.pres)} sobrevive a la vacancia por ${vacU(s)+ex-f} voto(s)`);pst(s,s.pres,"salvado")}if(s.cfg.manual)by.inf=Math.max(0,by.inf-2);log(s,`Vacancia admitida pero rechazada (${f}/${vacU(s)+ex}). El gobierno queda golpeado (-1 Aprobación).`)}
   else if(sf<TH.senado){log(s,`Diputados aprobó la vacancia (${f}), pero el Senado la frenó (${sf}/${TH.senado}).`)}
   else{const v=s.votes[m.id];s.order.forEach(id=>{if(P(s,id).min&&v[id]==="si"){P(s,id).inf+=3;bump(s,'saltos');pst(s,id,"traicion");log(s,`${nm(s,id)} salta del barco: +3 Influencia.`)}});
    const loyal=s.order.filter(id=>id!==s.pres&&v[id]==="no");loyal.forEach(id=>P(s,id).inf=Math.max(0,P(s,id).inf-1));if(loyal.length)log(s,`Caen con el gobierno (-1 Influencia): ${loyal.map(x=>nm(s,x)).join(", ")}. Quienes se abstuvieron se salvan.`);
    const old=P(s,s.pres);old.esc+=2;log(s,`${old.name} sale vacado y queda expuesto: +2 escándalos.`);vacate(s,f,sf)}}
  else if(m.type==="encargado"&&s.presType==="encargado"){if(f>=TH.simple){bump(s,'encCens');s.tenure=s.year;s.premier=null;s.premierOk=false;if(s.cfg.premier!==false)s.premierPend=m.by;const old=s.pres;s.pres=m.by;s.presType="encargado";if(s.congreso===m.by)s.congreso=largestExcept(s,[m.by]);s.order.forEach(id=>P(s,id).min=false);log(s,`Censura aprobada: ${nm(s,old)} deja el mando. Asume como encargado ${by.name}.`)}else log(s,`Censura al encargado rechazada (${f}/${TH.simple}).`)}
 }
 closeYear(s);
}
function discredit(s){const others=s.order.filter(x=>x!==s.pres);const avg=others.reduce((a,x)=>a+P(s,x).esc,0)/Math.max(1,others.length);return((s.stats&&s.stats.autoblindaje)||0)>=2||avg>=2?2:0}
function autogolpe(s,id){if(!s.cfg.mods.golpe)return"El autogolpe es de la expansión 5 de Abril.";if(id!==s.pres)return"Solo el presidente.";if(s.golpeUsado)return"Ya hubo un intento de disolución inconstitucional en esta partida.";
 if(!(s.phase==="votacion"||(s.phase==="turno"&&current(s)===id&&s.turn.step==="accion")))return"Solo en tu acción o antes de las votaciones.";
 s.golpeUsado=true;bump(s,'golpes');const p=P(s,id),roll=d6(),dis=discredit(s),resp=s.aprob+roll+dis;
 log(s,`MENSAJE A LA NACIÓN: ${p.name} anuncia la disolución del Congreso. Respaldo: aprobación ${s.aprob} + dado ${roll}${dis?" + Congreso desprestigiado "+dis:""} = ${resp} (necesita 12).`);
 const wasVote=s.phase==="votacion";
 if(resp>=12){bump(s,'golpeOk');
  if(s.vp1!=null||s.vp2!=null){{const vv=[s.vp1,s.vp2].filter(x=>x!=null);log(s,`La plancha se rompe: ${vv.map(x=>nm(s,x)).join(" y ")} ${vv.length>1?"desconocen el golpe y dejan de ser vicepresidentes":"desconoce el golpe y deja de ser vicepresidente"}.`)};s.vp1=null;s.vp2=null}
  const bids=s.order.map(x=>({x,b:Math.max(1,Math.floor(P(s,x).inf/2))}));bids.forEach(o=>P(s,o.x).inf-=o.b);const pb=bids.find(o=>o.x===id);pb.b*=2;
  const tb=bids.reduce((a,o)=>a+o.b,0);let used=0;bids.forEach(o=>{const nb=Math.max(1,Math.floor(o.b/tb*20));P(s,o.x).blocks=nb;used+=nb});s.neutral=Math.max(0,BLOCKS-used);
  let st=0;s.order.forEach(x=>{P(s,x).sen=Math.floor(P(s,x).blocks*SEN/BLOCKS);st+=P(s,x).sen});s.senN=Math.max(0,SEN-st);
  s.order.forEach(x=>{if(P(s,x).min){P(s,x).esc++}});s.amarres={};s.gabCens=0;s.aprob=Math.min(10,s.aprob+1);
  s.regimenHasta=legIdx(s)+2;s.golpista=id;s.congreso=largestExcept(s,[id]);s.mociones=[];s.votes={};
  head(s,`¡AUTOGOLPE! ${p.name} cierra el Congreso`);log(s,`¡El golpe triunfa con respaldo militar! Se cierran ambas cámaras y se elige un Congreso Constituyente: ${s.order.map(x=>nm(s,x)+" "+P(s,x).blocks).join(", ")}. Durante dos legislaturas no hay mociones de control. Los ministros que lo avalaron quedan marcados (+1 escándalo).`);
  if(wasVote)closeYear(s);else advance(s);
 } else {bump(s,'golpeFail');
  head(s,`FRACASA EL AUTOGOLPE: ${p.name} es vacado en horas`);log(s,`El golpe fracasa: las Fuerzas Armadas no lo respaldan y los ministros renuncian. El Congreso lo vaca de inmediato.`);
  const half=Math.floor(p.blocks/2);p.blocks-=half;s.neutral+=half;p.esc+=3;p.skip=true;s.order.forEach(x=>P(s,x).min=false);
  s.mociones=s.mociones.filter(m=>m.type!=="vacancia"&&m.type!=="confianza");
  log(s,`${p.name} pierde ${half} bloque(s), recibe 3 escándalos y pierde su próximo turno.`);
  vacate(s,null,null);
  if(wasVote){if(s.mociones.length&&s.order.every(x=>s.mociones.every(mm=>s.votes[mm.id]&&s.votes[mm.id][x])))resolveVotes(s);else if(!s.mociones.length)closeYear(s)}
  else advance(s);
 }return null}
function setPremier(s,id,target){if(s.premierPend!==id||id!==s.pres)return"No te toca nombrar Premier.";if(target===id||!s.players[target])return"Elige a un rival.";s.premier=target;s.premierOk=false;s.premierPend=null;s.premierInv=target;s.premierOf=id;log(s,`${nm(s,id)} nombra Premier (PCM) a ${nm(s,target)}. Deberá pedir el voto de confianza al Congreso (investidura).`);return null}
function resign(s,id){if(s.phase!=="votacion"||id!==s.pres)return"Solo el presidente, durante las votaciones.";const i=s.mociones.findIndex(m=>m.type==="vacancia");if(i<0)return"No hay vacancia en votación.";if(s.presType==="encargado")return"No aplica al encargado.";
 const m=s.mociones.splice(i,1)[0];delete s.votes[m.id];const p=P(s,id);p.inmune=legIdx(s)+2;bump(s,'renuncias');
 log(s,`${p.name} RENUNCIA a la presidencia antes de la votación de vacancia. Conserva su Influencia, evita el escarnio y queda protegido de acusaciones por dos legislaturas.`);
 vacate(s,null,null,true);if(!s.mociones.length){closeYear(s);return null}if(s.order.every(x=>s.mociones.every(mm=>s.votes[mm.id][x])))resolveVotes(s);return null}
function vacate(s,f,sf,renuncia){if(!renuncia)bump(s,'vac');
 const old=s.pres,su=successor(s);
 if(su===s.vp1)s.vp1=null;else if(su===s.vp2)s.vp2=null;
 const type=(su===s.congreso)?"encargado":"vp";s.pres=su;s.presType=type;s.aprob=s.cfg.aprobStart;s.gabCens=0;
 if(type==="encargado"){const other=s.year%2===1?s.presDip:s.presSen;s.congreso=(other!=null&&other!==su)?other:largestExcept(s,[su]);if(s.year<=3){s.snap=true;log(s,"Como el impedimento es permanente y quedan más de 2 años, el encargado deberá convocar elecciones al inicio del próximo año.")}}
 s.order.forEach(id=>P(s,id).min=false);s.tenure=s.year;s.premier=null;s.premierOk=false;if(s.cfg.premier!==false)s.premierPend=su;
 const prom=Object.keys(s.promesas).filter(id=>id!==su);
 log(s,`${renuncia?"Tras la renuncia de "+nm(s,old):"¡VACANCIA! ("+f+" bloques, "+sf+" senadores). "+nm(s,old)+" cae"}. Asume ${nm(s,su)} como ${type==="vp"?"vicepresidente sucesor":"presidente encargado"}.${prom.length?" Promesas pendientes: "+prom.map(x=>nm(s,x)).join(", ")+".":""}`);
 head(s,renuncia?`RENUNCIA ${nm(s,old).toUpperCase()}: ${nm(s,su)} asume la presidencia`:`¡VACADO! ${nm(s,old)} cae con ${f} votos; asume ${nm(s,su)}`);
 s.stamp={y:s.year,nw:su};
}
function lawsTick(s){(s.laws||[]).forEach(L=>{if(L.state==="pendiente"&&legIdx(s)>L.leg){L.state="promulgada";const fx=lawEffect(s,L);bump(s,'leyes');log(s,`El Ejecutivo no se pronunció: el presidente del Congreso promulga la ley de ${nm(s,L.by)} (${fx}).`)}})}
function agendaText(s,k){const c=s&&s.cfg||{};const A=AGENDAS[k];if(!A)return"";
 if(k==="magnate")return`Terminar con ${c.magnate||22} o más de Influencia.`;
 if(k==="caos")return`Que haya ${c.caos||2} o más caídas presidenciales (vacancia o renuncia), una disolución o un golpe.`;
 if(k==="comisiones")return c.comisRule==="uno"?"Controlar al menos 1 comisión y que la Aprobación termine en 3 o menos.":"Controlar 2 o más comisiones y que la Aprobación termine en 3 o menos.";
 return A.x}
function agendaMet(s,id){const p=P(s,id),a=p.agenda;if(!a)return false;const st=s.stats||{};const nc=Object.values(s.comis||{}).filter(x=>x===id).length;
 if(a==="bancada"){const mx=Math.max(...s.order.filter(x=>x!==id).map(x=>P(s,x).blocks));return p.blocks>mx}if(a==="sillon")return s.pres===id;if(a==="magnate")return p.inf>=(s.cfg.magnate||22);if(a==="intocable")return p.esc===0&&s.pres!==id;if(a==="kingmaker")return p.km!=null&&p.km===s.pres;
 if(a==="caos")return((st.vac||0)+(st.renuncias||0))>=(s.cfg.caos||2)||(st.dis||0)>=1||(st.golpeOk||0)>=1;if(a==="comisiones")return s.cfg.comisRule==="uno"?(nc>=1&&s.aprob<=3):nc>=2&&s.aprob<=3;return false}
function setKingmaker(s,id,target){if(s.year>1)return"Solo se elige durante el año 1.";if(target===id||!s.players[target])return"Elige a un rival.";P(s,id).km=target;return null}
function closeYear(s){if(s.year===1)s.order.forEach(id=>{const p=P(s,id);if(p.agenda==="kingmaker"&&p.km==null){const r=s.order.filter(x=>x!==id);p.km=r[Math.floor(Math.random()*r.length)]}});s.mociones=[];s.votes={};if(s.cfg.legs>1&&s.leg===1&&s.phase!=="fin"){s.leg=2;s.amarres={};beginLeg(s);return}if(s.year>=5){s.phase="fin";s.winner=s.pres;log(s,`Fin del periodo. ${nm(s,s.pres)} termina con la banda presidencial.`);
  if(s.premier!=null&&s.premierOk&&s.premierOf===s.pres){const pp=P(s,s.premier);pp.inf+=3;pp.esc=0;log(s,`El gobierno sobrevivió: el Premier ${pp.name} recibe +3 de Influencia y limpia sus escándalos.`)}
  s.agendaWins=[];s.order.forEach(id=>{if(agendaMet(s,id))s.agendaWins.push(id)});
  const top=(f,min)=>{let b=null,bv=min||0;s.order.forEach(id=>{const v=f(id);if(v>bv){bv=v;b=id}});return b==null?null:{id:b,v:bv}};
  const st=id=>P(s,id).st||{};s.awards=[];
  const a1=top(id=>st(id).traicion||0);if(a1)s.awards.push({n:"Mayor traidor",id:a1.id,x:`${a1.v} puñalada(s) o salto(s) del barco`});
  const a2=top(id=>P(s,id).esc);if(a2)s.awards.push({n:"Más escandaloso",id:a2.id,x:`${a2.v} escándalos al cierre`});
  const a3=top(id=>st(id).leyes||0);if(a3)s.awards.push({n:"Rey de las leyes con nombre propio",id:a3.id,x:`${a3.v} ley(es) promulgada(s)`});
  const a4=top(id=>st(id).salvado||0);if(a4)s.awards.push({n:"Salvado por un pelo",id:a4.id,x:`sobrevivió ${a4.v} vacancia(s) por 1 o 2 votos`});
  const a5=top(id=>st(id).sabotaje||0);if(a5)s.awards.push({n:"Opositor implacable",id:a5.id,x:`${a5.v} sabotaje(s) que hundieron crisis`});
  const a6=top(id=>P(s,id).inf,0);if(a6)s.awards.push({n:"Bolsillo más lleno",id:a6.id,x:`${a6.v} de Influencia`});
  if(s.agendaWins.length)log(s,"Agendas secretas cumplidas: "+s.agendaWins.map(id=>`${nm(s,id)} (${AGENDAS[P(s,id).agenda].n})`).join(", ")+".");
  if(s.cfg.scoring===false){s.winners=[s.pres,...s.agendaWins.filter(x=>x!==s.pres)];return}
  const N=s.order.length;const sc=Object.assign({banda:4,agenda:({3:6,4:5,5:5})[N]||5,electo:1,infDiv:8,escDiv:2},s.cfg.score||{});s.scoreRule=sc;s.scores={};
  s.order.forEach(id=>{const p=P(s,id);s.scores[id]=(id===s.pres?sc.banda+(s.presType==="electo"&&s.pres===s.elected?sc.electo:0)+(s.presType==="encargado"?(sc.encargado||0):0)+(s.presType==="vp"?(sc.vp||0):0):0)+(s.agendaWins.includes(id)?sc.agenda:0)+Math.floor(p.inf/sc.infDiv)-Math.floor(p.esc/sc.escDiv)});
  const rank=s.order.slice().sort((a,b)=>(s.scores[b]-s.scores[a])||((b===s.pres)-(a===s.pres))||(P(s,b).inf-P(s,a).inf));
  s.winner=rank[0];s.winners=[rank[0]];
  log(s,"Recuento final (banda "+sc.banda+" ajustada por su origen, agenda cumplida "+sc.agenda+", +1 por cada "+sc.infDiv+" de Influencia, -1 por cada "+sc.escDiv+" escándalos): "+rank.map(id=>`${nm(s,id)} ${s.scores[id]}`).join(", ")+`. GANA ${nm(s,rank[0])}.`);return}startYear(s)}
function setCabinet(s,id,target,on){if(!s.cfg.mods.gobierno)return"El gabinete es de la expansión Palacio de Gobierno.";if(id!==s.pres)return"Solo el presidente.";const t=P(s,target);if(!t||target===s.pres)return"Objetivo inválido.";
 if(on){if(s.order.filter(x=>P(s,x).min).length>=3)return"Máximo 3 ministerios.";t.min=true;log(s,`${nm(s,id)} nombra ministro a ${t.name}.`)}
 else{t.min=false;log(s,`${t.name} deja el gabinete.`)}return null}
function giveObras(s,id,target,n){if(id!==s.pres)return"Solo el presidente asigna obras.";if(target===id)return"No puedes darte obras.";n=Math.max(1,n|0);if(s.budget<n)return`Solo quedan ${s.budget} de presupuesto.`;s.budget-=n;P(s,target).inf+=n;s.obras[target]=(s.obras[target]||0)+n;log(s,`${nm(s,id)} asigna obras por ${n} a la región de ${nm(s,target)}.`);return null}
function promise(s,id,target){if(id!==successor(s))return"Solo el sucesor puede prometer ministerios.";if(Object.keys(s.promesas).length>=s.cfg.maxProm)return`Máximo ${s.cfg.maxProm} promesas por año.`;if(target===id||target===s.pres)return"Objetivo inválido.";s.promesas[target]=true;log(s,`${nm(s,id)} promete ${s.cfg.mods.gobierno?"un ministerio":"un cargo"} a ${nm(s,target)} si llega al poder.`);return null}
/* ---------- bots ---------- */
function botGen(s,id){const fx=s.cfg.fixedGen&&s.cfg.fixedGen[id];if(fx){const l=Math.round(12*fx[0]);return fx[1]?[l,id,12-l]:[l,id,Math.floor((12-l)*0.5)]}const list=Math.round(12*(0.3+Math.random()*0.5));const p=P(s,id);const save=p.inf;p.inf=12-list;const b=botBid(s,id);p.inf=save;return[list,b.for,b.amt]}
function botBid(s,id){const p=P(s,id);if(s.cfg.allIn&&s.cfg.allIn===id)return{for:id,amt:p.inf};if(s.cfg.rankVP)return{for:id,amt:Math.floor(p.inf*(0.3+Math.random()*0.4))};const rank=s.order.slice().sort((a,b)=>(P(s,b).inf+P(s,b).camp)-(P(s,a).inf+P(s,a).camp));
 const nRun=Math.max(2,Math.ceil(s.order.length/2));const fac=p.agenda==="magnate"||p.agenda==="intocable"?0.4:p.agenda==="sillon"?1.35:1;const amt=Math.min(p.inf,Math.floor(p.inf*(0.3+Math.random()*0.4)*fac));
 if(rank.indexOf(id)<nRun)return{for:id,amt};const c=rank[Math.floor(Math.random()*nRun)];return{for:c,amt}}
function botPlancha(s){const c=s.order.filter(x=>x!==s.pres);const byB=c.slice().sort((a,b)=>P(s,b).blocks-P(s,a).blocks);const vp1=(Math.random()<.5||byB.length<2)?byB[0]:byB[1];const vp2=s.order.length>=5?c.filter(x=>x!==vp1).sort((a,b)=>P(s,a).blocks-P(s,b).blocks)[0]:null;return[vp1,vp2]}
function botMesaVote(s,id){const gov=s.order.filter(x=>P(s,x).min).sort((a,b)=>P(s,b).blocks-P(s,a).blocks)[0];const pick=(id===s.pres||P(s,id).min)&&gov!=null?gov:(id===s.pres?largestExcept(s,[s.pres]):id);return{sen:pick,dip:pick}}
function botCabinet(s){if(!s.pres||!P(s,s.pres).bot||!s.cfg.mods.gobierno)return;const su=successor(s);const want=s.order.filter(x=>x!==s.pres&&x!==su).sort((a,b)=>P(s,b).blocks-P(s,a).blocks).slice(0,Math.max(0,Math.min(2,s.order.length-3)));s.order.forEach(x=>{P(s,x).min=want.includes(x)})}
function botCrisisResp(s,id){const c=s.crisis,p=P(s,id);
 if(p.agenda==="kingmaker"&&p.km===c.owner)return"apoyo";
 if(c.owner===s.pres&&p.min)return p.hand.includes("punalada")&&weak(s)>=0.5&&Math.random()<.4?"punalada":"apoyo";
 if(c.owner===s.pres&&(p.agenda==="caos"||p.agenda==="comisiones")){if(p.hand.includes("sabotaje"))return"sabotaje";if(p.hand.includes("punalada"))return"punalada"}
 if(c.owner===s.pres&&p.hand.includes("punalada")&&Math.random()<.45)return"punalada";
 if(c.owner!==s.pres&&c.owner!==id&&P(s,c.owner).blocks>=P(s,id).blocks&&p.hand.includes("sabotaje")&&Math.random()<.25)return"sabotaje";
 if(c.owner===s.pres&&id===successor(s)){if(p.hand.includes("punalada"))return"punalada";if(p.hand.includes("sabotaje"))return"sabotaje"}
 if(c.owner===s.pres&&p.hand.includes("sabotaje")&&Math.random()<.55)return"sabotaje";
 if(s.promesas[c.owner]||(c.owner===successor(s)&&s.promesas[id]))return"apoyo";
 return"pasar"}
function botVote(s,id,m){const f=favorFor(s,id,m);if(f)return"si";
 if((m.type==="vacancia"||m.type==="gabinete")&&id!==s.pres&&!P(s,id).min&&weak(s)>=0.35&&Math.random()<.5)return"abs";
 if(m.type==="vacancia"&&s.indultos&&s.indultos[id]!=null&&Math.random()<.5)return"abs";return"no"}
function favorFor(s,id,m){
 if(m.type==="vacancia"||m.type==="gabinete"){if(id===s.pres)return false;if(id===successor(s))return true;const p=P(s,id);
  if(p.agenda==="kingmaker"&&p.km===s.pres)return false;if(p.agenda==="caos"||(p.agenda==="comisiones"&&s.aprob>3))return true;if(s.indultos&&s.indultos[id]!=null&&Math.random()<.6)return false;const ob=(s.obras&&s.obras[id])||0;if(ob>=2&&weak(s)<0.5+0.1*ob)return false;if(s.promesas[id])return !p.min||weak(s)>=0.1;if(p.min)return false;return Math.random()<0.15+weak(s)*0.5}
 if(m.type==="ley"||m.type==="insistencia"){if(id===m.by)return true;const kind=m.kind||((s.laws||[]).find(l=>l.id===m.law)||{}).kind||"propio";
  if(id===s.pres)return kind==="propio"&&P(s,m.by).min&&m.type==="ley";if(kind!=="propio")return Math.random()<0.85;return Math.random()<0.55}
 if(m.type==="investidura"){if(id===s.pres||id===m.target)return true;if(id===successor(s))return false;return Math.random()<0.6-weak(s)*0.5}
 if(m.type==="interpelacion"){if(id===s.pres||P(s,id).min)return false;return Math.random()<0.45+weak(s)*0.4}
 if(m.type==="confianza"){if(id===s.pres||P(s,id).min)return true;if(id===successor(s))return false;const ob=(s.obras&&s.obras[id])||0;if(ob>=1)return Math.random()<.8;return Math.random()<0.6-weak(s)*0.5}
 if(m.type==="acusacion"){if(id===m.target)return false;if(m.target===successor(s)&&id===s.pres)return true;return Math.random()<0.3+P(s,m.target).esc*0.1}
 if(m.type==="encargado"){if(id===s.pres)return false;return id===m.by||Math.random()<.5}
 if(m.type==="mesa"){if(id===s.congreso)return false;return id===m.by||Math.random()<.35}
 return false}
function botObras(s){if(!s.budget)return;const su=successor(s);const cands=s.order.filter(x=>x!==s.pres&&x!==su).sort((a,b)=>P(s,b).blocks-P(s,a).blocks);let i=0;while(s.budget>0&&cands.length){giveObras(s,s.pres,cands[i%cands.length],Math.min(2,s.budget));i++}}
function botLaws(s){(s.laws||[]).filter(L=>L.state==="pendiente").forEach(L=>{const obs=L.by!==s.pres&&(L.kind!=="propio"?Math.random()<.7:!P(s,L.by).min&&Math.random()<.6);decideLaw(s,s.pres,L.id,obs)})}
function botTurn(s,id){const p=P(s,id),isP=id===s.pres,su=successor(s);if(isP&&P(s,id).bot){botObras(s);botLaws(s)}
 if(s.turn.step==="expediente"){openExp(s,id);return}
 // cartas útiles
 const play=(k,t)=>{const i=p.hand.indexOf(k);if(i<0)return false;return !doAction(s,id,"carta",i,t)};
 if(p.esc>=2&&(play("testigo")||play("plazo")||play("victima")||play("diario")))return;
 if(play("ley")||(id!==s.pres&&(play("prescripcion")||play("autoblindaje")||play("reeleccion"))))return;
 if(id!==s.pres){const pe=P(s,s.pres).esc>=1;if(pe&&play("reportaje",s.pres))return;
  if(p.hand.includes("reportaje")){const t=s.order.filter(x=>x!==id&&P(s,x).esc>=1).sort((a,b)=>P(s,b).blocks-P(s,a).blocks)[0];if(t!=null&&play("reportaje",t))return}
  if(p.hand.includes("investigacion")){const t=s.order.filter(x=>x!==id).sort((a,b)=>P(s,b).hand.length-P(s,a).hand.length)[0];if(play("investigacion",t))return}
  if(p.hand.includes("chats")&&play("chats",s.pres))return;}if(play("zorro"))return;if(play("campana"))return;if(play("habeas"))return;if(p.blocks<=3&&play("borron"))return;
 if(isP){botCabinet(s);
  if(s.gabCens>=2&&weak(s)>0.4&&!doAction(s,id,"disolver"))return;
  if(p.esc>=2&&p.inf>=3&&!doAction(s,id,"control"))return;
  if(weak(s)>=0.3&&p.inf>=2&&!s.mociones.some(m=>m.type==="confianza")&&(s.gabCens===1||Math.random()<.5)&&!doAction(s,id,"mocion","confianza"))return;
  if(s.vp1!=null&&P(s,s.vp1).esc>=2&&p.inf>=2&&Math.random()<.6&&!doAction(s,id,"mocion","acusacion",s.vp1))return;
  if(p.hand.includes("indulto")){const t=s.order.filter(x=>x!==id&&x!==su&&P(s,x).esc>=2).sort((a,b)=>P(s,b).blocks-P(s,a).blocks)[0];if(t!=null&&play("indulto",t))return}
  if(p.esc>=2&&p.inf>=2&&play("gabinete"))return;if(s.aprob<=6&&p.inf>=3&&play("obra"))return;
  if(play("encuesta"))return;if(play("almuerzo"))return;
  const n=Math.min(freeNeutral(s),Math.floor(p.inf/2/2));if(n>0&&!doAction(s,id,"amarrar",n))return;
  if(p.inf<4&&play("aporte"))return;
  doAction(s,id,"pasar");return}
 if(id===su&&s.presType!=="encargado"&&!s.mociones.some(m=>m.type==="vacancia")){
  s.order.filter(x=>x!==s.pres&&x!==id).sort((a,b)=>P(s,b).blocks-P(s,a).blocks).slice(0,s.cfg.maxProm).forEach(x=>s.promesas[x]=true);
  let est=0;s.order.forEach(x=>{if(x===id||(s.promesas[x]&&(!P(s,x).min||weak(s)>=0.1)))est+=P(s,x).blocks});
  if(est+freeNeutral(s)>=TH.admision&&p.inf>=2&&!doAction(s,id,"mocion","vacancia"))return;}
 if(s.presType==="encargado"&&id!==s.pres&&p.inf>=2&&!s.mociones.some(m=>m.type==="encargado")&&!doAction(s,id,"mocion","encargado"))return;
 if(!p.min&&s.order.some(x=>P(s,x).min)&&!s.mociones.some(m=>m.type==="interpelacion")&&Math.random()<.35&&!doAction(s,id,"mocion","interpelacion"))return;
 if(play("almuerzo"))return;
 if(s.mociones.some(m=>m.type==="vacancia")&&p.hand.includes("rebelion")&&play("rebelion",s.pres))return;
 if(play("video"))return;
 if(p.hand.includes("destape")&&play("destape",s.pres))return;
 if(p.hand.includes("camara")){const t=s.order.filter(x=>x!==id).sort((a,b)=>P(s,b).hand.length-P(s,a).hand.length)[0];if(play("camara",t))return}
 if(p.inf>=3&&p.hand.includes("senador")){const t=s.order.filter(x=>x!==id&&P(s,x).sen>0).sort((a,b)=>P(s,b).sen-P(s,a).sen)[0];if(t!=null&&play("senador",t))return}
 if(p.inf>=2&&p.hand.includes("camiseta")){const t=s.order.filter(x=>x!==id).sort((a,b)=>P(s,b).blocks-P(s,a).blocks)[0];if(play("camiseta",t))return}
 if(p.hand.includes("comision")){const t=s.order.filter(x=>x!==id&&x!==s.pres).sort((a,b)=>P(s,b).blocks-P(s,a).blocks)[0];if(t!=null&&play("comision",t))return}if(p.hand.includes("audio")&&play("audio",s.pres))return;
 if(p.inf>=4&&p.hand.includes("transfuga")){const t=s.order.filter(x=>x!==id).sort((a,b)=>P(s,b).blocks-P(s,a).blocks)[0];if(play("transfuga",t))return}
 if(s.aprob<=4&&!p.min&&Math.random()<.4&&!doAction(s,id,"mocion","gabinete"))return;
 const tg=s.order.filter(x=>x!==id&&x!==s.pres&&P(s,x).esc>=2).sort((a,b)=>P(s,b).blocks-P(s,a).blocks)[0];if(tg!=null&&p.inf>=2&&Math.random()<.4&&!doAction(s,id,"mocion","acusacion",tg))return;
 if(p.agenda==="intocable"&&p.esc>=1&&p.inf>=3&&!doAction(s,id,"control"))return;
 if(p.agenda==="caos"&&s.presType!=="encargado"&&!s.mociones.some(m=>m.type==="vacancia")&&weak(s)>=0.3&&p.inf>=2&&!doAction(s,id,"mocion","vacancia"))return;
 if(p.agenda==="bancada"&&p.inf>=4&&freeNeutral(s)>0&&!doAction(s,id,"fichar"))return;
 if(p.agenda!=="intocable"&&(p.inf<4||p.agenda==="magnate")&&(play("aporte")||play("reunion")||play("asesor")||play("conexion")||play("financista")||play("curriculum")))return;
 if(p.agenda!=="magnate"&&p.inf>=6&&freeNeutral(s)>0&&!doAction(s,id,"fichar"))return;
 doAction(s,id,"pasar")}
const GOODC=["punalada","sabotaje","audio","destape","indulto","testigo","video","reportaje","refuerzo","transfuga","fuga","camiseta"];
function botTake(s,id){if(!(s.pend[id]>0))return false;const i=s.market.findIndex(c=>GOODC.includes(c));takeCard(s,id,i>=0&&Math.random()<.8?i:-1);return true}
function botStep(s){ // ejecuta UNA decisión de bot pendiente; devuelve true si hizo algo
 {const bb=s.order.filter(id=>P(s,id).bot);
  if(s.phase==="comisiones"){const b=bb.find(id=>!s.cbids[id]);if(b!=null){const p=P(s,b);const r=()=>Math.random()<.5?0:1+Math.floor(Math.random()*2);let bid={fisc:r(),presu:r(),const:r()};if(p.agenda==="comisiones")bid={fisc:2+Math.floor(Math.random()*2),presu:1,const:2};if(p.agenda==="magnate")bid={fisc:0,presu:0,const:0};if(bid.fisc+bid.presu+bid.const>p.inf)bid={fisc:0,presu:0,const:0};bidComis(s,b,bid);if(s.order.every(id=>s.cbids[id]))resolveComis(s);return true}return false}
  if(s.premierPend!=null&&P(s,s.premierPend).bot&&s.premierPend===s.pres){const su=successor(s);const t=s.order.filter(x=>x!==s.pres&&x!==su).sort((a,b)=>P(s,b).blocks-P(s,a).blocks)[0]??s.order.find(x=>x!==s.pres);setPremier(s,s.pres,t);return true}
  const kb=bb.find(id=>P(s,id).agenda==="kingmaker"&&P(s,id).km==null&&s.year===1);if(kb!=null){const r=s.order.filter(x=>x!==kb);setKingmaker(s,kb,r[Math.floor(Math.random()*r.length)]);return true}
  if(s.phase==="turno"){const cur=current(s);if(P(s,cur).bot&&botTake(s,cur))return true}}
 const bots=s.order.filter(id=>P(s,id).bot);if(!bots.length)return false;
 if(s.phase==="generales"){const b=bots.find(id=>!s.gen[id]);if(b!=null){const [l,f,a]=botGen(s,b);submitGen(s,b,l,f,a);if(s.order.every(id=>s.gen[id]))resolveGenerales(s);return true}return false}
 if(s.phase==="segunda"){const R=s.runoff;const b=bots.find(id=>s.endorse[id]==null&&id!==R.a&&id!==R.b);
  if(b!=null){const my=bidOf(s,b).for;let f=my===R.a||my===R.b?my:(P(s,R.a).blocks<=P(s,R.b).blocks?R.a:R.b);endorse(s,b,f,Math.floor(P(s,b).inf*0.3));return true}
  const fin=[R.a,R.b].find(id=>P(s,id).bot&&s.endorse[id]==null);if(fin!=null){endorse(s,fin,fin,Math.floor(P(s,fin).inf*0.5));return true}
  if(s.order.every(id=>s.endorse[id]!=null)){resolveElection(s);return true}return false}
 if(s.phase==="eleccion"){const b=bots.find(id=>s.bids[id]==null);if(b!=null){s.bids[b]=botBid(s,b);if(s.order.every(id=>s.bids[id]!=null))resolveElection(s);return true}return false}

 if(s.phase==="mesa"){const b=bots.find(id=>s.mesaVotes[id]==null);if(b!=null){s.mesaVotes[b]=botMesaVote(s,b);if(s.order.every(id=>s.mesaVotes[id]!=null))resolveMesa(s);return true}return false}
 if(s.phase==="turno"&&P(s,current(s)).bot){botTurn(s,current(s));return true}
 if(s.phase==="crisis"){const c=s.crisis;const b=bots.find(id=>id!==c.owner&&!c.resp[id]);if(b!=null){const r=botCrisisResp(s,b);if(crisisRespond(s,b,r))c.resp[b]="pasar";return true}
  if(s.order.every(id=>id===c.owner||c.resp[id])){const ow=P(s,c.owner);
   if(ow.bot){if(crisisPower(s)<crisisDiff(s)&&crisisPower(s)+3>=crisisDiff(s))crisisBoost(s,c.owner);crisisResolve(s);return true}
   if(s.cfg.autoResolve!==false&&!ow.hand.includes("refuerzo")){crisisResolve(s);return true}}return false}
 if(s.phase==="votacion"){const pp0=P(s,s.pres);if(pp0.bot&&!s.golpeUsado&&s.cfg.mods.golpe){const vm=s.mociones.find(m=>m.type==="vacancia");if(vm&&s.order.every(x=>s.votes[vm.id][x])){const tt=tally(s,vm);if(tt.f>=vacU(s)&&tt.sf>=TH.senado&&s.aprob+3.5+discredit(s)>=12-(Math.random()<.25?4:0)){autogolpe(s,s.pres);return true}}}}
 if(s.phase==="votacion"){const pp=P(s,s.pres);
  if(pp.bot&&s.presType!=="encargado"){const vm=s.mociones.find(m=>m.type==="vacancia");if(vm&&s.order.every(x=>s.votes[vm.id][x])){const tt=tally(s,vm);if(tt.f>=vacU(s)&&tt.sf>=TH.senado&&!pp.hand.includes("fuga")&&pp.esc>=1&&Math.random()<.6){resign(s,s.pres);return true}}}if(pp.bot&&!s.fuga&&pp.hand.includes("fuga")){const vm=s.mociones.find(m=>m.type==="vacancia");if(vm&&tally(s,vm).f>=vacU(s)-2){playVoteCard(s,s.pres,"fuga");return true}}
 for(const m of s.mociones){const v=s.votes[m.id];const b=bots.find(id=>!v[id]);if(b!=null){v[b]=botVote(s,b,m);return true}}
  if(s.order.every(id=>s.mociones.every(m=>s.votes[m.id][id]))&&(s.cfg.autoResolve!==false||P(s,s.order.find(id=>!P(s,id).bot)??s.order[0]).bot)){resolveVotes(s);return true}return false}
 return false}
return {IDENT,forecast,agendaText,EMBINFO,AGENDAS,COMIS,takeCard,bidComis,resolveComis,setPremier,setKingmaker,agendaMet,wear,MODS,CARDMOD,autogolpe,discredit,resign,decideLaw,playVoteCard,legIdx,endorse,discolos,submitGen,resolveGenerales,setMesaVote,giveObras,BLOCKS,SEN,TH,COLORS,AGENDA,BOTIN,EVENTS,MOC,P,nm,setup,resolveElection,setPlancha,resolveMesa,current,openExp,crisisRespond,crisisBoost,crisisResolve,crisisPower,crisisDiff,doAction,promise,setCabinet,resolveVotes,successor,weak,freeNeutral,tally,botStep,log};
})();

if(typeof module!=="undefined")module.exports=V2;
