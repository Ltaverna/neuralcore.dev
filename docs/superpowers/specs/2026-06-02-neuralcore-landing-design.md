# NeuralCore — Diseño de la landing (neuralcore.dev)

**Fecha:** 2026-06-02
**Estado:** Diseño aprobado verbalmente · pendiente de revisión final del spec y de escribir el plan de implementación.

---

## 1. Resumen

Landing de **NeuralCore**, una consultora/agencia **full-stack de IA**. Se construye **desde cero** (descartamos el `index.html` actual de "NeuralDev").

- **Marca:** NeuralCore (dominio `neuralcore.dev`).
- **Objetivo:** generar leads y transmitir credibilidad técnica.
- **Servicios:** Machine Learning · Data Engineering · Software · Cloud / DevOps.
- **Mensaje central:** acompañamos de extremo a extremo, ingeniería que sale a producción.

---

## 2. Stack y arquitectura

- **Astro** (sitio estático).
- Despliegue a **GitHub Pages** vía **GitHub Action** (build de Astro). Se mantiene el archivo `CNAME` con `neuralcore.dev`.
- **Tailwind CSS** integrado en Astro (no por CDN como en la versión vieja).
- **i18n bilingüe ES/EN** con el routing nativo de Astro (`/es`, `/en`), con selector de idioma en el nav.
- **Componentes Astro reutilizables:** `Nav`, `Hero`, `ServiceCard`, `ProcessStep`, `CaseCard`, `StackTags`, `ContactForm`, `Footer`.
- **Contenido en archivos de datos** (JSON/MD) separado de la maqueta, para no duplicar texto entre idiomas.

---

## 3. Identidad visual

Dirección elegida: **fusión "Técnico mono-grid" + "Dark neón"**, con acento **verde lima**.

- **Fondo:** oscuro (`#070a07` aprox.), con **rejilla mono-grid** sutil y **glows de neón** (radiales verde lima / esmeralda).
- **Acento de marca:** **verde lima** `#a3e635` (con `text-shadow`/`box-shadow` glow en CTAs y detalles).
- **Tipografía:**
  - **Mono** (p. ej. JetBrains Mono) para labels, prompts, numeración y tags.
  - **Sans** (Inter) para titulares y cuerpo, para que sea legible y "venda".
- **Motivos recurrentes:**
  - Prompts de terminal: `user@neuralcore:~$`.
  - Numeración de secciones: `// 01`, `// 02`, …
  - Tags de servicios: `[ml] [data] [sw] [cloud]`.
- **Equilibrio buscado:** técnico y distintivo, pero NO "terminal pura" gimmicky — titulares legibles en sans para no perder conversión.

---

## 4. Estructura de la home (en orden)

1. **Nav** — logo (`◇ neuralcore.dev` placeholder), links a secciones, selector **ES/EN**, CTA de contacto.
2. **Hero** — prompt + titular ("Construimos el **núcleo de IA** de tu producto") + subtítulo + 2 CTAs (*iniciar proyecto* / *ver casos*). Fondo con grid + glow.
3. **Servicios** — grid 2×2 de las 4 disciplinas (ML / Data / Software / Cloud), cada una con tag mono + título + descripción corta.
4. **Proceso / Cómo trabajamos** — 4 pasos: **discovery → build → ship → scale**.
5. **Casos / Portfolio** — 3 tarjetas, cada una con una **métrica destacada** (placeholder por ahora).
6. **Stack tecnológico** — tags de tecnologías (Python, PyTorch, AWS, PostgreSQL, Docker, React, …).
7. **Contacto** — formulario (nombre, email, mensaje) vía **Formspree** + CTA.
8. **Footer** — marca, links legales (privacidad / términos), copyright.

---

## 5. Responsive y detalles

- **Mobile-first:** grids colapsan a 1 columna; nav pasa a menú hamburguesa.
- **Animaciones sutiles:** fade-in al hacer scroll, glow en hover de CTAs. Sin exagerar.
- **Accesibilidad:** contraste AA, foco visible, respetar `prefers-reduced-motion`.

---

## 6. Decisiones tomadas (registro)

| Tema | Decisión |
|------|----------|
| Nombre de marca | **NeuralCore** (no NeuralDev, no NeuralCode) |
| Tipo de negocio | Consultora / agencia, lead gen + credibilidad |
| Alcance | Empezar **desde cero** |
| Servicios | ML · Data · Software · Cloud (los 4) |
| Stack | **Astro** |
| Estilo visual | Técnico mono-grid **+** dark neón |
| Color de acento | **Verde lima** `#a3e635` |
| Secciones | Hero, Servicios, Proceso, Casos, Stack, Contacto (todas) |
| Idioma | **Bilingüe ES/EN** (i18n Astro) |
| Formulario | **Formspree** |

---

## 7. Pendientes que necesitarán input al implementar

- **Texto real** de casos/portfolio (ahora van placeholders con métricas inventadas).
- **ID de Formspree** (requiere crear cuenta en formspree.io).
- **Logo definitivo** (se usa placeholder `◇ neuralcore.dev`).
- Confirmar **fuente mono** concreta (propuesta: JetBrains Mono).
- (Opcional, a decidir) ¿sección de **equipo / "sobre nosotros"**? No incluida por ahora.

---

## 8. Próximo paso

Revisar este spec y, si está OK, pasar a **writing-plans** para generar el plan de implementación detallado (scaffolding de Astro, i18n, componentes, estilos, GitHub Action de deploy).

---

## Anexo · Mockups del companion visual

Los wireframes y mockups generados durante el brainstorming están en:
`.superpowers/brainstorm/2699865-1780426851/content/`
(no versionado en git — está en `.gitignore`). Archivo clave: `home-wireframe.html`.
