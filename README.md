# IncluAula IA — Interfaz del integrante A

Frontend en React, Framer Motion y Lucide React. Requiere Node.js 22.13 o posterior compatible (también Node.js 24). Ejecutar `npm install` y `npm run dev`. Para generar la versión de publicación: `npm run build`. Vite produce `dist/`.

## Alcance

- Sistema de diseño con tokens semánticos en `src/styles.css`: colores, tipografías, espaciado, radios, foco y superficies.
- Temas claro, oscuro y alto contraste; texto al 100 %, 112 % y 125 %; espaciado de lectura; reducción de movimiento y modo concentración.
- Layout adaptable, navegación, biblioteca de muestra, búsqueda, filtros y favoritos locales.
- Panel modal de preferencias con controles nativos, foco contenido en el panel, cierre con Escape y restauración del foco.
- Enlace para saltar al contenido, regiones semánticas, nombres de controles, estados de selección y avisos para lectores de pantalla.
- Preferencias persistentes en localStorage. Si el navegador bloquea el almacenamiento, los controles siguen funcionando durante la visita y se muestra un aviso.
- Animaciones con Framer Motion; se respeta `prefers-reduced-motion` y la preferencia interna. Iconos de Lucide React.
- Rutas `#/inicio`, `#/biblioteca` y `#/guardados` compatibles con enlaces directos y con Atrás/Adelante del navegador.
- Tipografía mínima de 0.75 rem (12 px al tamaño normal); bordes interactivos independientes de los separadores decorativos.

## Límites de integración

Las tarjetas son ejemplos, no lecciones implementadas. No se implementan endpoints de IA, transcripción, VTT, resúmenes, lenguaje claro, alt-text generado, ARASAAC, TTS ni vista de clase. No se incluyen prototipo Figma, auditorías de herramientas externas, estudios con usuarios, informe ni presentación. Esas tareas corresponden a B y C.

Los datos de muestra están en `src/data/materials.js`. El panel de detalle muestra solo metadatos. Se puede conectar después con los contenidos y rutas que implementen los demás integrantes. No hay backend ni llamadas a servicios de IA.

## Componentes

`src/main.jsx` monta la aplicación. `App` coordina el layout y los estados. `Layout` reúne la navegación y la cabecera. `HomeIntro` presenta el inicio. `MaterialCard` presenta una tarjeta. `Preferences` reúne preferencias. `Switch` asocia nombre y descripción. `Modal` usa el elemento nativo `dialog`. `IconButton` exige una etiqueta accesible. `icons.jsx` oculta los iconos decorativos del árbol accesible. `useNavigation` sincroniza la vista con la URL. Las funciones de validación y lectura de preferencias están en `src/preferences.js`.

Framer Motion usa `LazyMotion` y carga sus funciones de animación en un archivo separado.

## Tokens y estados

Los temas redefinen las variables `--bg`, `--surface`, `--surface-soft`, `--text`, `--muted`, `--border`, `--primary`, `--primary-hover`, `--on-primary`, `--accent` y `--focus` sin cambiar los componentes. Los atributos `data-theme`, `data-spacing`, `data-motion` y `data-focus` del elemento raíz reflejan las preferencias. `--font-scale` escala la tipografía en rem.

La paleta de referencia Blue Hour usa `#111522`, `#1E263B`, `#303D59`, `#536684`, `#98A9C4` y `#DCE3EF`. El tema claro combina superficies azul hielo con texto azul profundo; el oscuro invierte esa relación. Alto contraste usa azul hielo sobre azul noche y refuerza los bordes. Los tonos intermedios se asignan a bordes, superficies e ilustraciones según el contraste de cada combinación. Las superficies más claras son variantes de la misma paleta.

La tipografía usa fuentes del sistema; no hace solicitudes a Google Fonts. Favoritos y preferencias se almacenan solo en el navegador actual; no representan cuentas ni progreso académico real.

## Comprobaciones del frontend

`npm run check` ejecuta lint, doce pruebas de regresión del frontend y la compilación. `npm run format:check` comprueba el formato. Las pruebas cubren nombres accesibles, iconos decorativos, guardados, descripciones de interruptores, persistencia, rutas y búsqueda sin tildes. Las pruebas de paleta leen los tokens reales de CSS y verifican texto y botones a 4.5:1 o más, texto a 7:1 o más en alto contraste, y bordes de controles y foco a 3:1 o más. La configuración de GitHub Actions ejecuta esas mismas comprobaciones cuando el repositorio se aloja en GitHub. Estas pruebas no reemplazan las auditorías ni los estudios con usuarios del integrante C.

Esta implementación incluye mecanismos de accesibilidad, pero no constituye una certificación ni sustituye la evaluación asignada al integrante C.
