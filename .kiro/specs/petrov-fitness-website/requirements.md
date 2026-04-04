# Documento de Requisitos

## Introducción

Petrov Fitness Website es un sitio web profesional para Mikhail Petrov, entrenador personal en Adelaide, South Australia. El sitio tiene como objetivo atraer nuevos clientes, mostrar los servicios ofrecidos, publicar contenido de blog con carruseles de imágenes, y permitir la reserva de sesiones directamente desde el sitio mediante integración con Cal.com. El diseño es moderno, bold y energético, con una paleta de colores negro, blanco, amarillo mostaza y azul profundo.

## Glosario

- **Website**: El sitio web completo de Petrov Fitness
- **CMS**: Sistema de gestión de contenido (Decap CMS)
- **Blog_Post**: Artículo de blog con campos: título, fecha, categoría, imagen destacada, carrusel de imágenes, extracto, cuerpo en markdown, etiquetas y autor
- **Carousel**: Componente de carrusel de imágenes implementado con Swiper.js
- **Booking_Widget**: Widget embebido de Cal.com para reservar sesiones
- **Service**: Uno de los 5 servicios ofrecidos por Petrov Fitness
- **Testimonial**: Reseña o testimonio de un cliente
- **CTA**: Call to Action, botón o sección que invita al usuario a realizar una acción
- **SEO**: Search Engine Optimization, optimización para motores de búsqueda
- **Schema_Markup**: Datos estructurados en formato JSON-LD para motores de búsqueda
- **WhatsApp_Button**: Botón flotante de WhatsApp en la esquina inferior derecha
- **Stats_Counter**: Animación de contadores de estadísticas (años, clientes, horas, satisfacción)
- **Netlify_Form**: Formulario de contacto procesado por Netlify Forms
- **Open_Graph**: Protocolo de metadatos para compartir en redes sociales

---

## Requisitos

### Requisito 1: Estructura y Navegación del Sitio

**User Story:** Como visitante del sitio, quiero navegar fácilmente entre las páginas del sitio, para que pueda encontrar la información que necesito sobre los servicios de entrenamiento personal.

#### Criterios de Aceptación

1. THE Website SHALL incluir las siguientes páginas: Homepage (/), Services (/services), Blog (/blog), Blog Post individual (/blog/[slug]) y Contact (/contact)
2. THE Website SHALL incluir un Header con navegación a todas las páginas principales
3. THE Website SHALL incluir un Footer con links de navegación, información de contacto y redes sociales
4. WHEN un usuario accede a una URL inexistente, THE Website SHALL mostrar una página 404 personalizada
5. THE Website SHALL ser completamente responsive con diseño mobile-first
6. WHEN un usuario navega entre páginas, THE Website SHALL mantener el Header y Footer consistentes en todas las páginas

---

### Requisito 2: Homepage

**User Story:** Como visitante potencial, quiero ver una página de inicio impactante, para que pueda entender rápidamente quién es Mikhail Petrov y qué servicios ofrece.

#### Criterios de Aceptación

1. THE Homepage SHALL incluir una sección Hero con headline, subheadline, y al menos un botón CTA que abra el Booking_Widget de Cal.com
2. THE Homepage SHALL incluir una sección About con la bio del entrenador y sus certificaciones
3. THE Homepage SHALL incluir una sección de Services con tarjetas para cada uno de los 5 servicios
4. THE Homepage SHALL incluir una sección de Specialties destacando: Hypertrophy Training, Body Recomposition/Fat Loss, Boxing Fitness, Strength Training y Youth Fitness
5. THE Homepage SHALL incluir una sección de Stats_Counter con animación mostrando: 5+ Years, 150+ Clients, 1000+ Hours, 98% Satisfaction
6. THE Homepage SHALL incluir una sección de Testimonials con reseñas de clientes
7. THE Homepage SHALL incluir una sección de Blog preview con los 3 posts más recientes
8. THE Homepage SHALL incluir una sección de Booking CTA con el Booking_Widget embebido de Cal.com
9. THE Homepage SHALL incluir una sección de Location/Contact con mapa de Google Maps embebido y datos de contacto
10. WHEN un usuario hace scroll, THE Stats_Counter SHALL iniciar la animación de conteo al entrar en el viewport

---

### Requisito 3: Página de Servicios

**User Story:** Como visitante interesado, quiero ver el detalle de cada servicio disponible, para que pueda decidir cuál se adapta mejor a mis necesidades.

#### Criterios de Aceptación

1. THE Services_Page SHALL mostrar los 5 servicios con nombre, descripción, duración, modalidad y precio (o CTA de contacto)
2. THE Services_Page SHALL incluir los siguientes servicios: Personal Training (1-on-1), Online Coaching, Boxing Fitness Classes, Body Composition Assessment y Group Training
3. THE Services_Page SHALL incluir una sección de FAQ con preguntas frecuentes sobre los servicios
4. WHEN un usuario hace clic en un CTA de servicio, THE Booking_Widget SHALL abrirse como popup con el tipo de evento correspondiente
5. THE Services_Page SHALL incluir un CTA general de booking al final de la página

---

### Requisito 4: Blog

**User Story:** Como visitante interesado en fitness, quiero leer artículos de blog sobre entrenamiento y nutrición, para que pueda aprender y confiar en la experiencia del entrenador.

#### Criterios de Aceptación

1. THE Blog_Page SHALL mostrar todos los Blog_Posts en un grid con imagen destacada, título, fecha, categoría y extracto
2. THE Blog_Page SHALL permitir filtrar posts por categoría: Workouts & Training, Nutrition, Mindset & Motivation, Boxing, Client Success Stories, General
3. WHEN un usuario hace clic en un Blog_Post, THE Website SHALL navegar a la página individual del post en /blog/[slug]
4. THE Blog_Post_Page SHALL mostrar el contenido completo del post incluyendo el Carousel de imágenes si está disponible
5. THE Blog_Post_Page SHALL incluir botones de compartir en redes sociales (WhatsApp, Facebook, Twitter/X, LinkedIn)
6. THE Blog_Post_Page SHALL incluir una sección de bio del autor (Mikhail Petrov)
7. THE Blog_Post_Page SHALL incluir una sección de posts relacionados (mínimo 2 posts de la misma categoría)
8. WHEN un Blog_Post tiene carousel_images definidas, THE Carousel SHALL mostrar las imágenes con navegación (flechas y paginación)
9. THE Website SHALL incluir 3 sample Blog_Posts con contenido real sobre fitness y con carousel_images configuradas

---

### Requisito 5: Formulario de Contacto

**User Story:** Como visitante interesado, quiero poder enviar un mensaje de contacto, para que pueda hacer preguntas o solicitar información adicional.

#### Criterios de Aceptación

1. THE Contact_Page SHALL incluir un formulario con campos: nombre, email, teléfono (opcional), servicio de interés (select), y mensaje
2. WHEN un usuario envía el formulario con todos los campos requeridos completos, THE Netlify_Form SHALL procesar el envío y mostrar un mensaje de confirmación
3. IF un usuario intenta enviar el formulario con campos requeridos vacíos, THEN THE Contact_Page SHALL mostrar mensajes de validación en los campos correspondientes
4. IF un usuario ingresa un email con formato inválido, THEN THE Contact_Page SHALL mostrar un mensaje de error de validación
5. THE Contact_Page SHALL incluir información de contacto directa: teléfono, email, dirección del gym y links a redes sociales
6. THE Contact_Page SHALL incluir un mapa de Google Maps embebido con la ubicación del gym

---

### Requisito 6: Integración de Booking con Cal.com

**User Story:** Como cliente potencial, quiero poder reservar una sesión directamente desde el sitio web, para que pueda agendar fácilmente sin necesidad de llamar o enviar emails.

#### Criterios de Aceptación

1. THE Booking_Widget SHALL estar embebido en la sección de booking de la Homepage con theme dark y brandColor #e1c340
2. WHEN un usuario hace clic en cualquier botón CTA de booking, THE Booking_Widget SHALL abrirse como popup
3. THE Booking_Widget SHALL ofrecer los siguientes tipos de eventos: First PT Session (50% OFF), Regular PT Session, Free Consultation, Online Coaching Consultation, Boxing Class
4. THE Booking_Widget SHALL funcionar correctamente en dispositivos móviles y de escritorio
5. WHERE el usuario tiene JavaScript deshabilitado, THE Website SHALL mostrar un link directo al perfil de Cal.com como fallback

---

### Requisito 7: CMS con Decap CMS

**User Story:** Como administrador del sitio, quiero gestionar el contenido del blog desde una interfaz visual, para que pueda publicar y editar posts sin necesidad de modificar código.

#### Criterios de Aceptación

1. THE CMS SHALL estar accesible en la ruta /admin del sitio
2. THE CMS SHALL incluir una colección "Blog Posts" con los campos: title, date, category, featured_image, carousel_images (lista con image + caption), excerpt, body (markdown), tags y author
3. WHEN un administrador crea o edita un Blog_Post en el CMS, THE Website SHALL reflejar los cambios tras el siguiente build/deploy
4. THE CMS SHALL permitir subir imágenes a la carpeta /public/uploads/
5. THE CMS SHALL incluir las categorías predefinidas: Workouts & Training, Nutrition, Mindset & Motivation, Boxing, Client Success Stories, General
6. THE CMS SHALL requerir autenticación mediante Netlify Identity para acceder al panel de administración

---

### Requisito 8: SEO y Metadatos

**User Story:** Como propietario del sitio, quiero que el sitio esté optimizado para motores de búsqueda, para que los clientes potenciales en Adelaide puedan encontrar a Mikhail Petrov fácilmente.

#### Criterios de Aceptación

1. THE Website SHALL incluir meta tags completos (title, description, keywords) en cada página
2. THE Website SHALL incluir Open_Graph tags para compartir en redes sociales en cada página
3. THE Website SHALL incluir Twitter Cards en cada página
4. THE Website SHALL incluir Schema_Markup de tipo LocalBusiness con los datos del gym en la Homepage
5. THE Website SHALL incluir Schema_Markup de tipo Person con los datos de Mikhail Petrov en la Homepage
6. THE Website SHALL incluir Schema_Markup de tipo Service para cada uno de los 5 servicios
7. THE Website SHALL generar automáticamente un sitemap.xml usando @astrojs/sitemap
8. THE Website SHALL incluir un archivo robots.txt que permita el indexado de todas las páginas públicas
9. WHEN se genera el sitemap, THE Website SHALL incluir todas las páginas públicas incluyendo posts de blog individuales
10. THE Website SHALL usar las keywords primarias: "personal trainer Adelaide", "personal training Adelaide", "PT Adelaide" en los meta tags de la Homepage

---

### Requisito 9: Rendimiento y Accesibilidad

**User Story:** Como visitante del sitio, quiero que el sitio cargue rápidamente y sea accesible, para que pueda tener una buena experiencia independientemente de mi dispositivo o conexión.

#### Criterios de Aceptación

1. THE Website SHALL implementar lazy loading para todas las imágenes
2. THE Website SHALL servir imágenes en formato WebP cuando el navegador lo soporte
3. THE Website SHALL incluir atributos alt descriptivos en todas las imágenes
4. THE Website SHALL tener un score de Lighthouse Performance de al menos 85 en desktop
5. THE Website SHALL ser completamente navegable con teclado
6. THE Website SHALL usar colores con suficiente contraste según WCAG 2.1 AA
7. WHEN se carga una imagen, THE Website SHALL mostrar un placeholder o skeleton mientras carga

---

### Requisito 10: Elementos de UI Adicionales

**User Story:** Como visitante del sitio, quiero tener acceso rápido a WhatsApp y ver estadísticas del entrenador, para que pueda contactar fácilmente y evaluar la experiencia del entrenador.

#### Criterios de Aceptación

1. THE WhatsApp_Button SHALL estar visible en todas las páginas como botón flotante en la esquina inferior derecha
2. WHEN un usuario hace clic en el WhatsApp_Button, THE Website SHALL abrir wa.me/61415522832 en una nueva pestaña
3. THE Website SHALL usar la paleta de colores definida: #000000 (negro), #FFFFFF (blanco), #e1c340 (amarillo mostaza), #163853 (azul profundo)
4. THE Website SHALL usar Montserrat Bold o Bebas Neue para headings y Open Sans o Roboto para body text
5. THE Website SHALL incluir animaciones sutiles de hover en botones, tarjetas y links de navegación
6. THE Website SHALL incluir un botón "Back to Top" o scroll suave entre secciones de la Homepage
