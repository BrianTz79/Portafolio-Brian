# Koko — Compañía de escritorio para sentirse cerca

## La idea

Un amigo quería una forma de sentirse cerca de alguien especial mientras trabajaban a la distancia — sin abrir un chat, sin hacer una videollamada, sin interrumpir. Solo... estar ahí.

De esa conversación nació Koko: una pequeña mascota que vive de forma transparente sobre el escritorio de otra persona. La puedes mover, mandarle mensajes, dejarle notas adhesivas o enviarle una imagen — todo aparece directamente en su pantalla, sin que tenga que abrir nada.

El nombre viene de *Kokoro* (心) — corazón en japonés.

---

## ¿Qué es Koko?

Koko es una aplicación de escritorio de **co-presencia** para parejas, amigos y familiares a distancia. Dos personas se conectan con un código y cada una controla una mascota que aparece sobre la pantalla del otro: transparente, siempre visible, sin tapar el trabajo.

No es una herramienta de productividad. No reemplaza a un chat. Es presencia compartida — la sensación de que alguien está ahí mientras cada quien hace lo suyo.

### Qué pueden hacer juntos

- **Mover el avatar** por la pantalla del otro con clic y arrastre o con las flechas del teclado
- **Enviar mensajes en burbuja** que aparecen flotando sobre la mascota durante unos segundos
- **Dejar notas adhesivas** que se quedan en la pantalla hasta que el otro las cierre
- **Enviar imágenes y GIFs** que aparecen flotando en grande
- **Ver la pantalla del otro** en miniatura y en tiempo real, para saber dónde está la mascota y qué está haciendo
- **Elegir su mascota favorita** entre cinco avatares: tortuga 🐢, pollito 🐤, conejo 🐰, gatito 🐱 y ranita 🐸

---

## Por qué lo construí

Quería explorar algo fuera del software utilitario de siempre. Koko es deliberadamente *no productivo* — existe solo para conectar a dos personas de una forma lúdica y sin fricción.

Técnicamente fue un reto interesante: una ventana de Electron completamente transparente con click-through que vive sobre el escritorio, una conexión P2P directa entre dos máquinas sin un servidor de relay de contenido, y un sistema de avatares que viaja por la red para vivir en la pantalla del otro.

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Framework de escritorio | Electron 39 |
| Build tool | electron-vite 5 |
| UI | React 19 + TypeScript |
| Avatares | CSS puro — emojis con keyframes y animaciones |
| Video P2P | WebRTC nativo (`RTCPeerConnection`) |
| Eventos en tiempo real | Socket.io |
| Servidor de señalización | Node.js |
| Infraestructura | Cloudflare Tunnel → servidor propio |
| Build Windows | electron-builder → NSIS (instalador .exe) |
| Build Linux | electron-builder → AppImage |
| Auto-update | electron-updater con feed self-hosted |
| Sitio web | HTML/CSS/JS estático · Nginx · Docker |

---

## Arquitectura

### Modelo de co-presencia

El diseño más no obvio del proyecto: **tu avatar vive en la pantalla del otro, no en la tuya**. Cuando mueves la mascota o mandas un mensaje, el evento viaja por la red y se renderiza en el overlay del compañero. Tú ves el resultado por el video feed de su pantalla — hay latencia inherente, y eso forma parte de la experiencia.

### Ventana overlay

La ventana de Electron es completamente transparente, sin frame, always-on-top y con click-through (`setIgnoreMouseEvents`). Vive sobre todo lo demás en la pantalla del compañero sin interrumpir su trabajo. Los avatares y burbujas se renderizan en CSS puro — PixiJS/WebGL fue descartado porque WebGL no funciona en ventanas transparentes de Electron en Windows.

### Conexión

```
[Usuario A]                              [Usuario B]
  App ──────── Socket.io (señalización) ──────── App
               mina.stellarbanana.com

       ◄──────────── WebRTC P2P ───────────────►
              (video + eventos directos)
```

La señalización SDP/ICE pasa por el servidor propio vía Cloudflare Tunnel. Una vez establecida, el video y todos los eventos van P2P directo entre los dos clientes — sin pasar por ningún servidor. El contenido nunca se almacena.

### WebRTC nativo

Se migró de `simple-peer` a `RTCPeerConnection` nativo porque simple-peer es CJS y Vite externaliza los módulos `events`/`stream` de Node que necesita, rompiendo el bundle en runtime. El cliente de Socket.io usa `upgrade: false` para quedarse en HTTP polling — Cloudflare dropea eventos durante el upgrade a WebSocket.

### Auto-update self-hosted

El servidor de señalización también sirve el feed de actualizaciones (`/updates/`) con soporte de Range requests para las descargas diferenciales por blockmap de electron-updater. El endpoint `/download` y `/download/linux` siempre apuntan al instalador más reciente, con nombre limpio sin versión para la web.

---

## Plataformas

### Windows
- Instalador NSIS silencioso, instalación por usuario (sin UAC)
- Auto-update: descarga en segundo plano, aviso discreto en el header, reinicia para aplicar

### Linux
- Distribuido como **AppImage** — ejecutable portátil, sin instalación
- Funciona en Ubuntu, Fedora, Arch, Debian y derivados (x64)
- Fuerza X11 internamente para que el overlay transparente y click-through funcionen de forma fiable en entornos Wayland (via XWayland)
- Auto-update funciona igual que en Windows: electron-updater detecta el AppImage automáticamente

### Compatibilidad cruzada
Windows ↔ Linux funciona sin configuración adicional — la conexión P2P no depende de la plataforma.

---

## Sitio web

**[koko.ourocore.net](https://koko.ourocore.net)** — sitio estático desplegado con Docker + Nginx, expuesto a través de Cloudflare Tunnel.

- Detección automática de sistema operativo: recomienda la versión correcta al visitante
- Instrucciones de instalación para Windows y Linux (AppImage)
- Changelog completo leído desde un JSON, sin hardcodear las versiones en el HTML
- SEO completo: JSON-LD Schema.org (SoftwareApplication), Open Graph, Twitter Cards, sitemap, robots.txt

---

## Detalles que me enorgullecen

- **Sin cuenta, sin registro**: solo un código de 6 caracteres. Los intercambian una vez y quedan conectados.
- **Cero almacenamiento de contenido**: mensajes, notas, imágenes y video van P2P y no tocan ningún servidor.
- **Auto-update transparente**: los usuarios siempre tienen la versión más reciente sin visitar ninguna web.
- **Avatar en la pantalla del otro**: un detalle de diseño contraintuitivo que hace que la experiencia se sienta compartida de verdad.
- **Modo AFK**: si nadie mueve la mascota, la tortuga se mete en su caparazón; los demás avatares muestran 💤. Una señal silenciosa de que estás alejado.

---

## Estado actual

- Versión **0.9.0** — en uso activo
- Disponible para **Windows 10/11** y **Linux x64**
- Funcionalidades principales completas: overlay, video P2P, avatares, mensajes, notas, imágenes/GIFs, auto-update
- Próximo: mascotas dibujadas a mano (la arquitectura ya soporta PNG), TURN server para NATs restrictivos

---

## Links

- **Sitio web**: [koko.ourocore.net](https://koko.ourocore.net)
- **Descargar**: [koko.ourocore.net/descarga](https://koko.ourocore.net/descarga)
- **Creado por**: Brian Tellez · [OuroCore](https://www.ourocore.net)
