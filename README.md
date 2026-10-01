# Vacancia · versión web (Beta 0.1)

Juego gratuito sobre el Congreso del Perú. Funciona en cualquier navegador. Sin configuración, se puede jugar **contra bots**; con Firebase configurado, también **en línea**, con estadísticas anónimas y formulario de opinión.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | El juego (interfaz) |
| `engine.js` | Motor de reglas y bots |
| `net.js` | Conexión con Firebase (partidas online, estadísticas, opiniones) |
| `config.js` | **Lo único que debes editar**: Firebase, QR de Yape y enlace de Ko-fi |
| `firestore.rules` | Reglas de seguridad para pegar en Firebase |
| `assets/yape-qr.png` | Reemplázalo por la captura de tu QR de Yape |
| `privacidad.html` / `novedades.html` | Páginas de privacidad y cambios |

## Paso 1 · Firebase (partidas online)

1. Entra a la consola de Firebase y crea un proyecto.
2. **Authentication → Método de acceso → Anónimo → Habilitar.**
3. **Firestore Database → Crear base de datos** (modo producción, región cercana, por ejemplo `southamerica-east1`).
4. **Firestore → Reglas:** pega el contenido de `firestore.rules` y publica.
5. **Configuración del proyecto → Tus apps → Web (</>):** registra la app y copia el objeto `firebaseConfig` dentro de `config.js`.
6. **Authentication → Configuración → Dominios autorizados:** agrega el dominio donde publicarás el juego.

Revisa los límites del plan gratuito de Firebase antes de difundir el juego.

## Paso 2 · Publicar la página

Cualquier hosting de sitios estáticos sirve. Dos opciones gratuitas:

- **GitHub Pages:** sube la carpeta a un repositorio y activa *Settings → Pages*.
- **Cloudflare Pages:** crea un proyecto y sube la carpeta.

Revisa las condiciones de uso del hosting elegido, porque la página tendrá botones de donación.

## Paso 2b · Vista previa al compartir

En `index.html`, cambia `content="og.png"` por la dirección completa de la imagen (por ejemplo `https://tuusuario.github.io/vacancia/og.png`). WhatsApp y las redes necesitan la dirección completa para mostrar la imagen.

## Paso 3 · Donaciones

- Reemplaza `assets/yape-qr.png` por tu QR de Yape (recomendado: no publicar el número de celular).
- En `config.js`, completa `yapeName` (opcional) y `kofi` con tu enlace de Ko-fi.

## Paso 4 · Leer estadísticas y opiniones

En **Firestore** verás dos colecciones:

- `stats`: una fila por partida terminada (versión, expansiones, jugadores, duración, cambios de presidente, ruta ganadora…).
- `feedback`: las opiniones (diversión del 1 al 5, qué sobra, qué falta).

Se pueden exportar para analizarlas y ajustar las reglas.

## Paso 5 · Nueva versión

1. Cambia `version` en `config.js` (por ejemplo, `Beta 0.2`).
2. Anota los cambios en `novedades.html`.
3. Vuelve a subir los archivos.

## Pendientes antes del lanzamiento

- Completar el correo de contacto en `privacidad.html`.
- Registrar la marca del juego en INDECOPI.
- Opcional: una política de TTL en Firestore para borrar partidas viejas de `games`.

## Arte y sonido finales

El juego trae arte, animaciones, música y efectos **provisionales** generados en el navegador. Para usar el material definitivo del estudio, completa `window.VACANCIA_ASSETS` en `config.js` con las rutas de los archivos (música en bucle, mascota y efectos). No hay que tocar el código del juego.
