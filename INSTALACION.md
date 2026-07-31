# Cómo instalar Qué Comemos, paso a paso

Esta guía está pensada para que puedas instalar y usar la app **sin saber nada de programación**. Solo seguí los pasos en orden. Todo el proceso toma entre 10 y 15 minutos, una sola vez — después, abrir la app es un doble click.

## Qué vas a necesitar

- Una computadora con **Mac** o **Windows**.
- Conexión a internet (para instalar y para que la IA lea tus fotos).
- Una **API Key** de un proveedor de inteligencia artificial (en el Paso 4 te explicamos qué es y cómo conseguirla — cuesta unos pocos centavos por plan).

---

## Paso 1 — Instalar Node.js (una sola vez)

Node.js es el motor que hace funcionar la app. Es gratis y de instalación común y corriente.

1. Entrá a **[nodejs.org](https://nodejs.org)**.
2. Hacé click en el **botón verde** que dice *LTS* (es la versión recomendada).
3. Abrí el archivo que se descargó:
   - **Mac**: se abre un instalador — tocá *Continuar* en cada pantalla hasta que termine.
   - **Windows**: se abre un instalador — tocá *Next* en cada pantalla hasta que termine. No hace falta cambiar ninguna opción.
4. Listo. No vas a ver ningún programa nuevo en tu escritorio: Node.js trabaja detrás de escena.

> ¿No sabés si ya lo tenés instalado? No importa: si falta, la app te lo va a avisar con un mensaje claro cuando la abras, y volvés a este paso.

## Paso 2 — Descargar Qué Comemos

1. Entrá a la página de la app en GitHub: **github.com/alaimo-labs/que-comemos**.
2. Tocá el **botón verde "Code"** y elegí **"Download ZIP"**.
3. Andá a tu carpeta de **Descargas** y descomprimí el ZIP:
   - **Mac**: doble click sobre el archivo ZIP.
   - **Windows**: click derecho sobre el archivo ZIP → **"Extraer todo…"** → *Extraer*.
4. Te queda una carpeta llamada `que-comemos-main`. **Movela a un lugar definitivo** (por ejemplo, Documentos). Ahí adentro está todo lo que la app necesita — no muevas ni borres archivos sueltos de adentro.

## Paso 3 — Abrir la app por primera vez

Dentro de la carpeta hay dos archivos "lanzadores". Usá el de tu sistema:

### En Mac

1. Doble click en **`Iniciar QueComemos.command`**.
2. **La primera vez es probable que Mac lo bloquee** ("no se puede abrir porque proviene de un desarrollador no identificado"). Es normal: hacé **click derecho sobre el archivo → Abrir → Abrir**. Esto se hace una sola vez.
3. Si en cambio te dice que **no tiene permisos**: abrí la app **Terminal** (buscala con la lupa 🔍 de arriba a la derecha), escribí `chmod +x ` (con un espacio al final), **arrastrá el archivo** `Iniciar QueComemos.command` adentro de la ventana de Terminal, y presioná Enter. Después volvé al doble click.

### En Windows

1. Doble click en **`Iniciar QueComemos.bat`**.
2. **Si aparece una pantalla azul** de "Windows protegió tu PC": tocá **"Más información"** y después **"Ejecutar de todas formas"**. Se hace una sola vez.

### Qué vas a ver

- Se abre una **ventana negra con texto** (la "sala de máquinas" de la app). La primera vez dice *"Instalando Qué Comemos (solo la primera vez, puede tardar unos minutos)"* — dejala trabajar, puede tomar varios minutos según tu internet.
- Cuando termina, dice *"Qué Comemos corriendo en http://localhost:4321"* y **se abre sola una pestaña en tu navegador** con la app.
- **No cierres la ventana negra mientras usás la app** — es la app misma. Podés minimizarla.

## Paso 4 — Conseguir tu API Key

La app usa un servicio de inteligencia artificial para reconocer los alimentos de tus fotos y armar el plan de comidas. Ese servicio lo pagás directo al proveedor con una **API Key**: una clave personal, como una tarjeta prepaga. El costo real de uso es muy bajo (cada plan cuesta centavos).

Elegí **uno** de estos dos proveedores:

**Opción A — Anthropic (Claude):**
1. Entrá a [platform.claude.com](https://platform.claude.com) y creá una cuenta.
2. Cargá un crédito mínimo (por ejemplo, 5 dólares) en la sección de facturación (*Billing*).
3. Andá a *API Keys* → *Create Key*, ponele un nombre cualquiera y **copiá la clave** que aparece (empieza con `sk-ant-`). **Se muestra una sola vez**: pegala en la app enseguida (Paso 5) o guardala en un lugar seguro.

**Opción B — OpenAI:**
1. Entrá a [platform.openai.com](https://platform.openai.com) y creá una cuenta.
2. Cargá un crédito mínimo en *Billing*.
3. Andá a *API Keys* → *Create new secret key* y **copiá la clave** (empieza con `sk-`). También se muestra una sola vez.

## Paso 5 — Configurar la API Key en la app

1. En la app, tocá **Ajustes** (abajo a la derecha) y entrá a la pestaña **IA**.
2. Elegí tu proveedor (Anthropic u OpenAI).
3. **Pegá la API Key** en el campo y tocá **Guardar**.
4. Abajo de todo, tocá **"Probar conexión IA"**. Si dice *"Conexión exitosa"*, quedó lista. Si da error, revisá que la clave esté bien pegada y que tengas crédito cargado.

Mientras estás ahí, pasá por la pestaña **Tu Hogar** y contale a la app cuántos son en casa, para cuántos días planificás, qué comidas querés planificar y si hay restricciones (alergias, gustos). Todo se puede cambiar cuando quieras.

## Paso 6 — Tu primer plan

1. Tocá **Plan** (abajo a la izquierda) → **"Empezar con una foto"**.
2. Sacale fotos a tu heladera, freezer, alacena o a la compra — o arrastrá fotos que ya tengas (según el modo de captura configurado en Ajustes › IA).
3. Tocá **"Leer las fotos"**, repasá la lista que la app encontró (corregí, sacá o agregá lo que falte) y tocá **"Armar el plan"**.
4. En segundos tenés las comidas del período — y podés mandarlas al WhatsApp de tu casa con un toque.

---

## Uso diario

- **Para abrir la app**: doble click en el lanzador (`Iniciar QueComemos.command` en Mac, `.bat` en Windows). Ya no tarda: se abre en segundos.
- **Para cerrarla**: cerrá la ventana negra.
- **Para desinstalarla**: borrá la carpeta. No deja nada instalado en ningún otro lado (Node.js queda, por si lo usa otro programa).

## Problemas frecuentes

| Qué pasa | Qué hacer |
|---|---|
| "Falta instalar Node.js en esta computadora" | Es el aviso del Paso 1: instalá Node.js desde [nodejs.org](https://nodejs.org) y volvé a hacer doble click en el lanzador. |
| Mac bloquea el lanzador la primera vez | Click derecho sobre el archivo → **Abrir** → **Abrir**. |
| Mac dice que el archivo no tiene permisos | El truco de Terminal del Paso 3: `chmod +x ` + arrastrar el archivo + Enter. |
| Windows muestra "Windows protegió tu PC" | **Más información** → **Ejecutar de todas formas**. |
| La instalación se cortó a la mitad (se fue internet) | Cerrá la ventana y volvé a hacer doble click en el lanzador: retoma solo. |
| El navegador no se abrió solo | Abrí tu navegador y entrá a **http://localhost:4321**. Si no responde, mirá la ventana negra: ahí dice en qué dirección está corriendo (si el 4321 estaba ocupado, usa 4322, 4323…). |
| "Falta el build de la interfaz" | Cerrá la ventana y volvé a abrir el lanzador — completa la instalación que quedó a medias. |
| "Probar conexión IA" da error | Revisá que la API Key esté bien pegada (sin espacios), que sea del proveedor elegido y que la cuenta tenga crédito. |

## Tu privacidad

Todo corre **en tu computadora**: tus fotos, tus datos y tu API Key no se suben a ningún servidor nuestro (no existe tal servidor). Lo único que sale de tu máquina son las fotos y la lista de alimentos que viajan al proveedor de IA que elegiste, usando tu propia clave.

> ⚠️ La carpeta `data/` (adentro de la carpeta de la app) contiene tu API Key y tus datos. Si le pasás la app a alguien, borrá antes esa carpeta.
