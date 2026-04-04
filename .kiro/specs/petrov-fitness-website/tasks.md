# Plan de Implementación: Petrov Fitness Website

## Visión General

Implementación incremental del sitio web de Petrov Fitness usando Astro v4, TailwindCSS, Decap CMS y Cal.com. Cada tarea construye sobre la anterior, comenzando por la estructura base y terminando con la integración completa de todos los componentes.

El lenguaje de implementación es **TypeScript/JavaScript** con **Astro** como framework.

---

## Tareas

- [x] 1. Inicializar proyecto Astro con dependencias y configuración base
  - Crear proyecto Astro v4 con `npm create astro@latest`
  - Instalar dependencias: `@astrojs/tailwind`, `@astrojs/sitemap`, `tailwindcss`, `swiper`, `@tailwindcss/typography`, `vitest`, `fast-check`
  - Configurar `astro.config.mjs` con integraciones tailwind y sitemap, y site URL
  - Configurar `tailwind.config.cjs` con colores brand (`brand-black`, `brand-white`, `brand-yellow`, `brand-blue`), fuentes (`heading`, `body`) y plugin typography
  - Crear `src/content/config.ts` con el schema Zod de la colección `blog` (campos: title, date, category, featured_image, carousel_images, excerpt, tags, author, draft)
  - Crear estructura de directorios: `src/components/`, `src/layouts/`, `src/pages/`, `src/data/`, `src/content/blog/`, `public/images/`, `public/uploads/`, `public/admin/`
  - _Requirements: 1.1, 7.2_

- [x] 2. Implementar Layout base y componentes de estructura
  - [x] 2.1 Crear `src/layouts/Layout.astro` con props SEO (title, description, image, canonicalURL, schema), meta tags completos, Open Graph, Twitter Cards, y slot para contenido
    - Incluir carga de fuentes Google (Montserrat, Open Sans) via `<link>` en `<head>`
    - Incluir script de Cal.com embed global
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ]* 2.2 Escribir test unitario para Layout base
    - Verificar que el HTML generado contiene `<title>` no vacío y meta `description` no vacío
    - _Requirements: 8.1_

  - [ ]* 2.3 Escribir property test para meta tags (Propiedad 4)
    - **Property 4: Meta tags presentes en todas las páginas**
    - **Validates: Requirements 8.1**
    - Usar fast-check para generar props de meta tags arbitrarios y verificar que title y description nunca son vacíos
    - `// Feature: petrov-fitness-website, Property 4: Meta tags presentes en todas las páginas`

  - [x] 2.4 Crear `src/components/layout/Header.astro` con logo "Petrov Fitness", navegación a todas las páginas, y menú hamburguesa para mobile
    - Links: Home, Services, Blog, Contact
    - Fondo negro, texto blanco, hover en amarillo mustaza
    - _Requirements: 1.2, 1.6_

  - [x] 2.5 Crear `src/components/layout/Footer.astro` con links de navegación, datos de contacto (teléfono, email, dirección), links a redes sociales (Instagram, Facebook) y copyright
    - _Requirements: 1.2, 1.6_

  - [x] 2.6 Crear `src/components/layout/WhatsAppButton.astro` como botón flotante en esquina inferior derecha con href `https://wa.me/61415522832` y target `_blank`
    - _Requirements: 10.1, 10.2_

  - [ ]* 2.7 Escribir test unitario para WhatsAppButton
    - Verificar que el href es exactamente `https://wa.me/61415522832`
    - _Requirements: 10.1, 10.2_

  - [x] 2.8 Crear `src/layouts/PageLayout.astro` extendiendo Layout con hero de página interior (título + breadcrumb)
    - _Requirements: 1.1_

  - [x] 2.9 Crear `src/layouts/BlogLayout.astro` extendiendo Layout con estructura específica para posts (imagen destacada, metadatos del post)
    - _Requirements: 4.4_

- [x] 3. Implementar datos estáticos y funciones utilitarias
  - [x] 3.1 Crear `src/data/services.ts` con los 5 servicios (Personal Training, Online Coaching, Boxing Fitness, Body Composition Assessment, Group Training) con campos: id, name, description, duration, modality, calEventType, icon, features
    - _Requirements: 3.1, 3.2_

  - [x] 3.2 Crear `src/data/testimonials.ts` con al menos 4 testimonios de clientes con campos: name, text, rating, service
    - _Requirements: 2.6_

  - [x] 3.3 Crear `src/data/calcom.ts` con configuración de Cal.com: username, theme, brandColor y eventTypes (firstSession, regularSession, freeConsultation, onlineCoaching, boxingClass)
    - _Requirements: 6.1, 6.3_

  - [x] 3.4 Crear `src/utils/blog.ts` con funciones: `filterPostsByCategory(posts, category)`, `getRelatedPosts(post, allPosts, limit)`, `sortPostsByDate(posts)`
    - _Requirements: 4.1, 4.2, 4.7_

  - [x]* 3.5 Escribir property test para filterPostsByCategory (Propiedad 1)
    - **Property 1: Filtrado de blog por categoría es correcto**
    - **Validates: Requirements 4.2**
    - Usar fast-check para generar arrays de posts arbitrarios y verificar que el filtro retorna solo posts de la categoría solicitada
    - `// Feature: petrov-fitness-website, Property 1: Filtrado de blog por categoría es correcto`

  - [x]* 3.6 Escribir property test para getRelatedPosts (Propiedad 2)
    - **Property 2: Posts relacionados pertenecen a la misma categoría**
    - **Validates: Requirements 4.7**
    - Usar fast-check para verificar que todos los posts relacionados tienen la misma categoría y no incluyen el post original
    - `// Feature: petrov-fitness-website, Property 2: Posts relacionados pertenecen a la misma categoría`

  - [x] 3.7 Crear `src/utils/validation.ts` con función `validateContactForm(formData)` que valida campos requeridos (nombre, email, mensaje) y formato de email
    - _Requirements: 5.3, 5.4_

  - [x]* 3.8 Escribir property test para validateContactForm (Propiedad 3)
    - **Property 3: Validación de formulario rechaza inputs inválidos**
    - **Validates: Requirements 5.3, 5.4**
    - Usar fast-check para generar formularios con campos inválidos y verificar que siempre retorna errores
    - `// Feature: petrov-fitness-website, Property 3: Validación de formulario rechaza inputs inválidos`

  - [x] 3.9 Crear `src/utils/sitemap.ts` con función `generateSitemapURLs(posts)` que retorna todas las URLs del sitio incluyendo posts publicados
    - _Requirements: 8.7, 8.9_

  - [x]* 3.10 Escribir property test para generateSitemapURLs (Propiedad 5)
    - **Property 5: Sitemap incluye todas las páginas y posts**
    - **Validates: Requirements 8.7**
    - Usar fast-check para generar arrays de posts publicados y verificar que todas sus URLs están en el sitemap
    - `// Feature: petrov-fitness-website, Property 5: Sitemap incluye todas las páginas y posts`

- [x] 4. Checkpoint — Verificar que todos los tests pasan
  - Ejecutar `npx vitest --run` y asegurarse de que todos los tests pasan. Consultar al usuario si hay dudas.

- [x] 5. Implementar componentes compartidos y de booking
  - [x] 5.1 Crear `src/components/shared/CalComEmbed.astro` con el script de Cal.com inline embed, aceptando props: `calLink` (string), `elementId` (string)
    - Incluir fallback con link directo cuando JS está deshabilitado (`<noscript>`)
    - _Requirements: 6.1, 6.4, 6.5_

  - [x] 5.2 Crear `src/components/shared/CalComPopup.astro` como botón que abre Cal.com como popup, aceptando props: `calLink`, `label`, `variant` (primary/secondary)
    - Usar atributos `data-cal-link` y `data-cal-config`
    - _Requirements: 6.2, 6.3_

  - [ ]* 5.3 Escribir test unitario para CalComEmbed
    - Verificar que el script generado contiene `theme: "dark"` y `brandColor: "#e1c340"`
    - _Requirements: 6.1_

  - [x] 5.4 Crear `src/components/shared/CTASection.astro` reutilizable con título, subtítulo y botón CTA (CalComPopup)
    - _Requirements: 2.8, 3.5_

  - [x] 5.5 Crear `src/components/shared/SectionTitle.astro` con título y subtítulo opcionales, con estilos consistentes
    - _Requirements: 10.3, 10.4_

- [x] 6. Implementar secciones de la Homepage
  - [x] 6.1 Crear `src/components/home/Hero.astro` con headline "Transform Your Body, Transform Your Life", subheadline, foto de Mikhail, y dos CTAs: "Book First Session (50% OFF)" y "Free Consultation"
    - Fondo negro, texto blanco/amarillo, full-height
    - _Requirements: 2.1_

  - [x] 6.2 Crear `src/components/home/AboutSection.astro` con foto del entrenador, bio completa, lista de certificaciones y badges de especialidades
    - _Requirements: 2.2_

  - [x] 6.3 Crear `src/components/home/ServicesPreview.astro` con grid de 5 tarjetas de servicio (nombre, descripción corta, icono, CTA)
    - _Requirements: 2.3_

  - [x] 6.4 Crear `src/components/home/SpecialtiesSection.astro` con las 5 especialidades (Hypertrophy, Body Recomposition, Boxing, Strength, Youth Fitness) con iconos y descripciones
    - _Requirements: 2.4_

  - [x] 6.5 Crear `src/components/home/StatsCounter.astro` con 4 contadores: "5+ Years", "150+ Clients", "1000+ Hours", "98% Satisfaction"
    - Implementar animación de conteo con Intersection Observer API al entrar en viewport
    - _Requirements: 2.5, 2.10_

  - [x] 6.6 Crear `src/components/home/TestimonialsSection.astro` con carrusel de testimonios usando los datos de `src/data/testimonials.ts`
    - _Requirements: 2.6_

  - [x] 6.7 Crear `src/components/home/BlogPreview.astro` que obtiene los 3 posts más recientes de la colección blog y los muestra como tarjetas
    - _Requirements: 2.7_

  - [x] 6.8 Crear `src/components/home/BookingSection.astro` con CalComEmbed para "free-consultation" y texto de apoyo
    - _Requirements: 2.8, 6.1_

  - [x] 6.9 Crear `src/components/home/LocationSection.astro` con iframe de Google Maps (URL: https://maps.app.goo.gl/3qtWFmGKsGg4A65w6), dirección, teléfono, email y links a redes sociales
    - _Requirements: 2.9_

  - [x] 6.10 Crear `src/pages/index.astro` ensamblando todas las secciones de la Homepage con el Layout base y Schema Markup (LocalBusiness + Person)
    - Meta title: "Mikhail Petrov | Personal Trainer Adelaide | Petrov Fitness"
    - Meta description con keywords primarias: "personal trainer Adelaide", "personal training Adelaide", "PT Adelaide"
    - _Requirements: 2.1-2.9, 8.4, 8.5, 8.10_

  - [ ]* 6.11 Escribir test unitario para Homepage
    - Verificar que la página contiene las secciones requeridas (Hero, About, Services, Stats, Testimonials, Blog Preview, Booking, Location)
    - Verificar que el Schema Markup de LocalBusiness contiene nombre, teléfono, email y dirección
    - _Requirements: 2.1-2.9, 8.4_

- [x] 7. Implementar página de Servicios
  - [x] 7.1 Crear `src/components/services/ServiceCard.astro` con diseño detallado: nombre, descripción completa, duración, modalidad, lista de features y botón CTA (CalComPopup)
    - _Requirements: 3.1, 3.2_

  - [x] 7.2 Crear `src/components/services/FAQSection.astro` con acordeón de al menos 6 preguntas frecuentes sobre los servicios, implementado con CSS puro o JS mínimo
    - _Requirements: 3.3_

  - [x] 7.3 Crear `src/pages/services.astro` con PageLayout, grid de ServiceCards para los 5 servicios, FAQSection y CTASection al final
    - Schema Markup de tipo Service para cada servicio
    - _Requirements: 3.1-3.5, 8.6_

  - [ ]* 7.4 Escribir test unitario para página de Servicios
    - Verificar que los 5 servicios están presentes en la página
    - _Requirements: 3.1, 3.2_

- [x] 8. Implementar Blog
  - [x] 8.1 Crear `src/components/blog/BlogCard.astro` con imagen destacada (lazy loading, WebP), título, fecha, categoría, extracto y link al post
    - _Requirements: 4.1, 9.1, 9.2_

  - [x] 8.2 Crear `src/components/blog/BlogFilter.astro` con botones de filtro por categoría, usando JavaScript del lado del cliente para filtrar las tarjetas visibles
    - _Requirements: 4.2_

  - [x] 8.3 Crear `src/pages/blog.astro` con PageLayout, BlogFilter y grid de BlogCards para todos los posts publicados (draft: false), ordenados por fecha descendente
    - _Requirements: 4.1, 4.2_

  - [x] 8.4 Crear `src/components/blog/BlogCarousel.astro` usando Swiper.js v11 con navegación (flechas prev/next), paginación (dots), y soporte para captions
    - Importar estilos de Swiper y inicializar con JavaScript
    - _Requirements: 4.4, 4.8_

  - [ ]* 8.5 Escribir test unitario para BlogCarousel
    - Verificar que cuando `carousel_images` está definido y no vacío, el componente renderiza el contenedor de Swiper
    - _Requirements: 4.8_

  - [x] 8.6 Crear `src/components/blog/ShareButtons.astro` con botones para compartir en WhatsApp, Facebook, Twitter/X y LinkedIn, usando la URL y título del post actual
    - _Requirements: 4.5_

  - [x] 8.7 Crear `src/components/blog/AuthorBio.astro` con foto, nombre "Mikhail Petrov", título "Personal Trainer | Adelaide, SA", bio corta y links a redes sociales
    - _Requirements: 4.6_

  - [x] 8.8 Crear `src/components/blog/RelatedPosts.astro` que recibe el post actual y todos los posts, y muestra hasta 3 posts de la misma categoría
    - _Requirements: 4.7_

  - [x] 8.9 Crear `src/pages/blog/[...slug].astro` con BlogLayout, contenido del post en markdown, BlogCarousel (si hay carousel_images), ShareButtons, AuthorBio y RelatedPosts
    - _Requirements: 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_

  - [x] 8.10 Crear 3 sample blog posts en `src/content/blog/` con contenido real sobre fitness:
    - `hypertrophy-training-principles.md` (categoría: Workouts & Training, con 3 carousel_images)
    - `nutrition-for-muscle-gain.md` (categoría: Nutrition, con 2 carousel_images)
    - `boxing-fitness-benefits.md` (categoría: Boxing, con 3 carousel_images)
    - _Requirements: 4.9_

- [x] 9. Checkpoint — Verificar que todos los tests pasan
  - Ejecutar `npx vitest --run` y asegurarse de que todos los tests pasan. Consultar al usuario si hay dudas.

- [x] 10. Implementar página de Contacto
  - [x] 10.1 Crear `src/components/contact/ContactForm.astro` con campos: nombre (required), email (required), teléfono (optional), servicio de interés (select con los 5 servicios), mensaje (required)
    - Atributos Netlify Forms: `data-netlify="true"`, `netlify-honeypot="bot-field"`, `name="contact"`
    - Validación client-side usando la función `validateContactForm` de `src/utils/validation.ts`
    - Mostrar mensajes de error inline bajo cada campo inválido
    - Mostrar mensaje de confirmación tras envío exitoso
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [ ]* 10.2 Escribir property test para validación del formulario (Propiedad 3 — si no se implementó en tarea 3.8)
    - **Property 3: Validación de formulario rechaza inputs inválidos**
    - **Validates: Requirements 5.3, 5.4**

  - [x] 10.3 Crear `src/pages/contact.astro` con PageLayout, ContactForm, información de contacto directa (teléfono, email, dirección, redes sociales) e iframe de Google Maps
    - _Requirements: 5.1-5.6_

  - [ ]* 10.4 Escribir test unitario para página de Contacto
    - Verificar que el formulario tiene los campos requeridos y los atributos de Netlify Forms
    - _Requirements: 5.1, 5.2_

- [x] 11. Implementar SEO completo y archivos públicos
  - [x] 11.1 Crear `public/robots.txt` permitiendo el indexado de todas las páginas públicas y referenciando el sitemap
    - _Requirements: 8.8_

  - [x] 11.2 Configurar `@astrojs/sitemap` en `astro.config.mjs` para generar `sitemap-index.xml` automáticamente con todas las páginas
    - _Requirements: 8.7, 8.9_

  - [ ]* 11.3 Escribir property test para generateSitemapURLs (Propiedad 5 — si no se implementó en tarea 3.10)
    - **Property 5: Sitemap incluye todas las páginas y posts**
    - **Validates: Requirements 8.7**

  - [x] 11.4 Verificar que cada página (index, services, blog, contact, blog/[slug]) tiene meta tags únicos y relevantes, Open Graph y Twitter Cards correctamente configurados
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 11.5 Agregar Schema Markup de tipo Service en `src/pages/services.astro` para cada uno de los 5 servicios
    - _Requirements: 8.6_

- [x] 12. Implementar Decap CMS
  - [x] 12.1 Crear `public/admin/index.html` con el HTML estándar de Decap CMS que carga el script del CMS
    - _Requirements: 7.1_

  - [x] 12.2 Crear `public/admin/config.yml` con la configuración completa: backend git-gateway, media_folder, public_folder, y colección "blog" con todos los campos requeridos (title, date, category, featured_image, carousel_images, excerpt, body, tags, author, draft)
    - _Requirements: 7.2, 7.4, 7.5, 7.6_

  - [x]* 12.3 Escribir test unitario para config.yml del CMS
    - Verificar que el archivo YAML contiene todos los campos requeridos de la colección blog
    - _Requirements: 7.2_

- [x] 13. Implementar accesibilidad y rendimiento de imágenes
  - [x] 13.1 Auditar todos los componentes con imágenes (`BlogCard`, `Hero`, `AboutSection`, `BlogCarousel`) y asegurar que cada `<img>` tiene `loading="lazy"`, `alt` no vacío, y `width`/`height` para evitar CLS
    - _Requirements: 9.1, 9.2, 9.3_

  - [x]* 13.2 Escribir property test para atributos de imagen (Propiedad 6)
    - **Property 6: Imágenes tienen atributos de accesibilidad y rendimiento**
    - **Validates: Requirements 9.1, 9.3**
    - Usar fast-check para generar props de imagen arbitrarios y verificar que el HTML resultante siempre incluye `loading="lazy"` y `alt` no vacío
    - `// Feature: petrov-fitness-website, Property 6: Imágenes tienen atributos de accesibilidad y rendimiento`

  - [x] 13.3 Verificar que todos los elementos interactivos (botones, links, inputs) son navegables con teclado y tienen estados de focus visibles
    - _Requirements: 9.5_

- [x] 14. Crear página 404 y documentación
  - [x] 14.1 Crear `src/pages/404.astro` con diseño consistente, mensaje de error amigable y CTA para volver al inicio
    - _Requirements: 1.4_

  - [ ]* 14.2 Escribir test unitario para página 404
    - Verificar que la página 404 existe y contiene un link de retorno al inicio
    - _Requirements: 1.4_

  - [x] 14.3 Crear `README.md` con instrucciones de instalación, desarrollo local y estructura del proyecto
  - [x] 14.4 Crear `ADMIN-GUIDE.md` con instrucciones para usar Decap CMS (crear posts, subir imágenes, configurar carousel)
  - [x] 14.5 Crear `CAL-COM-SETUP.md` con instrucciones para configurar Cal.com (crear event types, obtener username, configurar tema)
  - [x] 14.6 Crear `DEPLOYMENT-GUIDE.md` con instrucciones para desplegar en Netlify (conectar repo, configurar Netlify Identity, variables de entorno)

- [x] 15. Checkpoint Final — Verificar que todos los tests pasan
  - Ejecutar `npx vitest --run` y asegurarse de que todos los tests pasan. Consultar al usuario si hay dudas antes de considerar el proyecto completo.

---

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- Los property tests validan propiedades universales de corrección
- Los tests unitarios validan ejemplos específicos y casos borde
- El sitio web debe estar completamente en inglés; este documento de planificación está en español
