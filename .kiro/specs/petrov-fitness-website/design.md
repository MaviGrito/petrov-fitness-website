# Documento de Diseño: Petrov Fitness Website

## Visión General

Petrov Fitness Website es un sitio web estático generado con Astro v4, estilizado con TailwindCSS, con contenido de blog gestionado mediante Decap CMS. El sitio es moderno, bold y energético, orientado a captar clientes de entrenamiento personal en Adelaide, South Australia.

El stack técnico elegido prioriza rendimiento (sitio estático), facilidad de mantenimiento (CMS visual), y cero costos de servidor (hosting en Netlify/Vercel con tier gratuito).

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────┐
│                     Netlify / Vercel                     │
│  ┌─────────────────────────────────────────────────┐    │
│  │              Astro Static Site                   │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │    │
│  │  │  Pages   │  │ Layouts  │  │  Components  │  │    │
│  │  └──────────┘  └──────────┘  └──────────────┘  │    │
│  │  ┌──────────────────────────────────────────┐   │    │
│  │  │         Content Collections (Blog)        │   │    │
│  │  │         Markdown/MDX files               │   │    │
│  │  └──────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────┘    │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Decap CMS   │  │  Cal.com     │  │ Netlify Forms│  │
│  │  (/admin)    │  │  (Booking)   │  │  (Contact)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Flujo de datos del blog:**
1. Admin edita post en Decap CMS (/admin)
2. Decap CMS hace commit al repositorio Git (archivos .md en src/content/blog/)
3. Netlify/Vercel detecta el commit y dispara un nuevo build
4. Astro genera las páginas estáticas con el nuevo contenido
5. El sitio actualizado se despliega automáticamente

---

## Componentes e Interfaces

### Layouts

```
src/layouts/
├── Layout.astro          # Layout base: <html>, <head> con SEO, Header, Footer, WhatsApp button
├── PageLayout.astro      # Extiende Layout, agrega hero de página interior
└── BlogLayout.astro      # Extiende Layout, estructura específica para posts de blog
```

**Layout.astro props:**
```typescript
interface Props {
  title: string;
  description: string;
  image?: string;        // Para Open Graph
  canonicalURL?: string;
  schema?: object;       // JSON-LD Schema Markup
}
```

### Páginas

```
src/pages/
├── index.astro           # Homepage
├── services.astro        # Página de servicios
├── blog.astro            # Listado de blog
├── blog/
│   └── [...slug].astro   # Post individual (dynamic route)
├── contact.astro         # Página de contacto
└── 404.astro             # Página de error 404
```

### Componentes

```
src/components/
├── layout/
│   ├── Header.astro          # Navegación principal con mobile menu
│   ├── Footer.astro          # Footer con links, contacto y redes sociales
│   └── WhatsAppButton.astro  # Botón flotante de WhatsApp
├── home/
│   ├── Hero.astro            # Sección hero con CTA
│   ├── AboutSection.astro    # Bio y certificaciones
│   ├── ServicesPreview.astro # Grid de 5 servicios (preview)
│   ├── SpecialtiesSection.astro # Especialidades
│   ├── StatsCounter.astro    # Contadores animados
│   ├── TestimonialsSection.astro # Carrusel de testimonios
│   ├── BlogPreview.astro     # 3 posts recientes
│   ├── BookingSection.astro  # Cal.com embed + CTA
│   └── LocationSection.astro # Mapa + datos de contacto
├── blog/
│   ├── BlogCard.astro        # Tarjeta de post para grid
│   ├── BlogCarousel.astro    # Carrusel Swiper.js para posts
│   ├── BlogFilter.astro      # Filtros por categoría
│   ├── ShareButtons.astro    # Botones de compartir
│   ├── AuthorBio.astro       # Bio del autor
│   └── RelatedPosts.astro    # Posts relacionados
├── services/
│   ├── ServiceCard.astro     # Tarjeta de servicio detallada
│   └── FAQSection.astro      # Acordeón de preguntas frecuentes
├── contact/
│   └── ContactForm.astro     # Formulario con validación
└── shared/
    ├── CalComEmbed.astro     # Widget Cal.com embebido
    ├── CalComPopup.astro     # Botón que abre Cal.com como popup
    ├── CTASection.astro      # Sección CTA reutilizable
    └── SectionTitle.astro    # Título de sección con estilo consistente
```

---

## Modelos de Datos

### Blog Post (Content Collection)

Definido en `src/content/config.ts` usando Zod:

```typescript
import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum([
      'Workouts & Training',
      'Nutrition',
      'Mindset & Motivation',
      'Boxing',
      'Client Success Stories',
      'General'
    ]),
    featured_image: z.string(),
    carousel_images: z.array(z.object({
      image: z.string(),
      caption: z.string().optional()
    })).optional(),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
    author: z.string().default('Mikhail Petrov'),
    draft: z.boolean().default(false)
  })
});

export const collections = { blog: blogCollection };
```

**Frontmatter de ejemplo (Markdown):**
```yaml
---
title: "5 Hypertrophy Training Principles for Maximum Muscle Growth"
date: 2024-01-15
category: "Workouts & Training"
featured_image: "/uploads/hypertrophy-training.webp"
carousel_images:
  - image: "/uploads/hypertrophy-1.webp"
    caption: "Progressive overload in action"
  - image: "/uploads/hypertrophy-2.webp"
    caption: "Proper form for compound lifts"
excerpt: "Discover the 5 key principles that will transform your muscle-building results..."
tags: ["hypertrophy", "muscle building", "strength training"]
author: "Mikhail Petrov"
---
```

### Servicios (datos estáticos)

```typescript
// src/data/services.ts
interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  modality: string;
  calEventType: string;  // slug del evento en Cal.com
  icon: string;          // nombre del icono SVG
  features: string[];
}

const services: Service[] = [
  {
    id: 'personal-training',
    name: 'Personal Training (1-on-1)',
    duration: '60 min',
    modality: 'Goodlife Payneham o Online',
    calEventType: 'personal-training',
    // ...
  },
  // ... 4 servicios más
];
```

### Testimonios (datos estáticos)

```typescript
// src/data/testimonials.ts
interface Testimonial {
  name: string;
  text: string;
  rating: number;  // 1-5
  service: string;
}
```

### Configuración de Cal.com

```typescript
// src/data/calcom.ts
const calConfig = {
  username: 'mikhail-petrov',  // username en Cal.com
  theme: 'dark',
  brandColor: '#e1c340',
  eventTypes: {
    firstSession: 'first-pt-session',
    regularSession: 'regular-pt-session',
    freeConsultation: 'free-consultation',
    onlineCoaching: 'online-coaching-consultation',
    boxingClass: 'boxing-class'
  }
};
```

---

## Diseño Visual y Sistema de Estilos

### Configuración de TailwindCSS

```javascript
// tailwind.config.cjs
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-white': '#FFFFFF',
        'brand-yellow': '#e1c340',
        'brand-blue': '#163853',
      },
      fontFamily: {
        heading: ['Montserrat', 'Bebas Neue', 'sans-serif'],
        body: ['Open Sans', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
```

### Estructura de Secciones de la Homepage

```
/ (Homepage)
├── <Header />                    # sticky, fondo negro, logo + nav
├── <Hero />                      # full-height, bg negro, texto blanco/amarillo, CTA
├── <AboutSection />              # bg blanco, foto + bio + certificaciones
├── <ServicesPreview />           # bg negro, grid 3 cols (desktop), tarjetas amarillas
├── <SpecialtiesSection />        # bg azul profundo, iconos + texto
├── <StatsCounter />              # bg amarillo, 4 contadores negros
├── <TestimonialsSection />       # bg negro, carrusel de testimonios
├── <BlogPreview />               # bg blanco, 3 tarjetas de blog
├── <BookingSection />            # bg negro, Cal.com embed
├── <LocationSection />           # bg blanco, mapa + datos de contacto
└── <Footer />                    # bg negro, links + redes sociales
```

---

## Integración de Terceros

### Cal.com

**Embed inline (BookingSection):**
```html
<!-- Cal.com inline embed -->
<div id="cal-booking-embed"></div>
<script>
  (function (C, A, L) {
    let p = function (a, ar) { a.q.push(ar); };
    let d = C.document;
    C.Cal = C.Cal || function () {
      let cal = C.Cal;
      let ar = arguments;
      if (!cal.loaded) {
        cal.ns = {};
        cal.q = cal.q || [];
        d.head.appendChild(d.createElement("script")).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments); };
        const namespace = ar[1];
        api.q = api.q || [];
        typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
        return;
      }
      p(cal, ar);
    };
  })(window, "https://app.cal.com/embed/embed.js", "init");
  Cal("init", { origin: "https://app.cal.com" });
  Cal("inline", {
    elementOrSelector: "#cal-booking-embed",
    calLink: "mikhail-petrov/free-consultation",
    config: { theme: "dark", brandColor: "#e1c340" }
  });
</script>
```

**Popup (botones CTA):**
```html
<button data-cal-link="mikhail-petrov/first-pt-session"
        data-cal-config='{"theme":"dark","brandColor":"#e1c340"}'>
  Book First Session (50% OFF)
</button>
```

### Decap CMS

**public/admin/config.yml:**
```yaml
backend:
  name: git-gateway
  branch: main

media_folder: "public/uploads"
public_folder: "/uploads"

collections:
  - name: "blog"
    label: "Blog Posts"
    folder: "src/content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Date", name: "date", widget: "datetime" }
      - { label: "Category", name: "category", widget: "select",
          options: ["Workouts & Training", "Nutrition", "Mindset & Motivation",
                    "Boxing", "Client Success Stories", "General"] }
      - { label: "Featured Image", name: "featured_image", widget: "image" }
      - label: "Carousel Images"
        name: "carousel_images"
        widget: "list"
        required: false
        fields:
          - { label: "Image", name: "image", widget: "image" }
          - { label: "Caption", name: "caption", widget: "string", required: false }
      - { label: "Excerpt", name: "excerpt", widget: "text" }
      - { label: "Body", name: "body", widget: "markdown" }
      - { label: "Tags", name: "tags", widget: "list", required: false }
      - { label: "Author", name: "author", widget: "string", default: "Mikhail Petrov" }
      - { label: "Draft", name: "draft", widget: "boolean", default: false }
```

### Netlify Forms

```html
<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field">
  <input type="hidden" name="form-name" value="contact" />
  <input type="hidden" name="bot-field" />
  <!-- campos del formulario -->
</form>
```

---

## SEO y Schema Markup

### Meta Tags por Página

Cada página recibe props de SEO a través del Layout base:

```astro
---
// src/layouts/Layout.astro
const { title, description, image, canonicalURL, schema } = Astro.props;
const siteURL = 'https://petrovfitness.com.au';
const defaultImage = '/images/og-default.jpg';
---
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonicalURL || siteURL + Astro.url.pathname} />

  <!-- Open Graph -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image || defaultImage} />
  <meta property="og:url" content={canonicalURL || siteURL + Astro.url.pathname} />
  <meta property="og:type" content="website" />

  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image || defaultImage} />

  <!-- Schema Markup -->
  {schema && <script type="application/ld+json" set:html={JSON.stringify(schema)} />}
</head>
```

### Schema Markup (Homepage)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "Petrov Fitness",
      "description": "Professional personal training in Adelaide, South Australia",
      "url": "https://petrovfitness.com.au",
      "telephone": "+61415522832",
      "email": "petrovcoachfitness@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "7 Portrush Rd",
        "addressLocality": "Payneham",
        "addressRegion": "SA",
        "postalCode": "5070",
        "addressCountry": "AU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -34.9085,
        "longitude": 138.6370
      }
    },
    {
      "@type": "Person",
      "name": "Mikhail Petrov",
      "jobTitle": "Personal Trainer",
      "worksFor": { "@type": "Organization", "name": "Petrov Fitness" }
    }
  ]
}
```

---

## Manejo de Errores

- **Página 404**: Página personalizada con diseño consistente y CTA para volver al inicio
- **Formulario de contacto**: Validación client-side con mensajes de error inline; fallback a validación HTML5 nativa
- **Cal.com no disponible**: Fallback con link directo a `https://cal.com/mikhail-petrov`
- **Imágenes rotas**: Atributo `onerror` en imágenes críticas para mostrar placeholder
- **JavaScript deshabilitado**: El sitio es estático y funciona sin JS; Cal.com muestra link de fallback; el carrusel muestra imágenes en lista

---

## Estrategia de Testing

### Enfoque Dual

El proyecto usa dos tipos de tests complementarios:

1. **Tests unitarios**: Verifican ejemplos específicos, casos borde y condiciones de error
2. **Tests de propiedades**: Verifican propiedades universales sobre todos los inputs posibles

Para property-based testing se usará **fast-check** (TypeScript/JavaScript), configurado con mínimo 100 iteraciones por propiedad.

### Herramientas

- **Vitest**: Test runner para unit tests y property tests
- **fast-check**: Librería de property-based testing para JavaScript/TypeScript
- **@testing-library/dom**: Para tests de componentes DOM

### Configuración de Property Tests

Cada property test debe estar anotado con:
```typescript
// Feature: petrov-fitness-website, Property N: [descripción de la propiedad]
```

---

## Propiedades de Corrección

*Una propiedad es una característica o comportamiento que debe ser verdadero en todas las ejecuciones válidas del sistema — esencialmente, una declaración formal sobre lo que el sistema debe hacer. Las propiedades sirven como puente entre las especificaciones legibles por humanos y las garantías de corrección verificables por máquinas.*


### Propiedad 1: Filtrado de blog por categoría es correcto

*Para cualquier* lista de posts de blog y cualquier categoría válida, aplicar el filtro de categoría debe retornar únicamente posts cuya categoría coincida exactamente con la categoría filtrada.

**Validates: Requirements 4.2**

---

### Propiedad 2: Posts relacionados pertenecen a la misma categoría

*Para cualquier* post de blog, la función `getRelatedPosts` debe retornar únicamente posts que pertenezcan a la misma categoría que el post original, excluyendo el post original de los resultados.

**Validates: Requirements 4.7**

---

### Propiedad 3: Validación de formulario rechaza inputs inválidos

*Para cualquier* combinación de campos del formulario de contacto donde al menos un campo requerido esté vacío o el email tenga formato inválido, la función de validación debe retornar un objeto de errores con al menos un error presente.

**Validates: Requirements 5.3, 5.4**

---

### Propiedad 4: Meta tags presentes en todas las páginas

*Para cualquier* página del sitio generada por el Layout base, el HTML resultante debe contener un elemento `<title>` no vacío y un meta tag `description` con contenido no vacío.

**Validates: Requirements 8.1**

---

### Propiedad 5: Sitemap incluye todas las páginas y posts

*Para cualquier* conjunto de posts de blog publicados (draft: false), la lista de URLs del sitemap debe incluir la URL de cada post individual, además de todas las páginas estáticas del sitio.

**Validates: Requirements 8.7**

---

### Propiedad 6: Imágenes tienen atributos de accesibilidad y rendimiento

*Para cualquier* imagen renderizada a través de los componentes del sitio, el elemento `<img>` resultante debe tener un atributo `alt` con valor no vacío y el atributo `loading="lazy"`.

**Validates: Requirements 9.1, 9.3**

---

## Estrategia de Testing (Detalle)

### Tests Unitarios (Vitest)

Cubren casos específicos y condiciones de error:

- Verificar que la Homepage renderiza las secciones requeridas (Hero, About, Services, Stats, Testimonials, Blog Preview, Booking, Location)
- Verificar que la página 404 existe y contiene un CTA de retorno al inicio
- Verificar que el componente `BlogCarousel` renderiza el carrusel cuando `carousel_images` está definido
- Verificar que el script de Cal.com se genera con `theme: "dark"` y `brandColor: "#e1c340"`
- Verificar que el Schema Markup de LocalBusiness contiene nombre, teléfono, email y dirección
- Verificar que el `WhatsAppButton` tiene `href` apuntando a `wa.me/61415522832`
- Verificar que el CMS config.yml contiene todos los campos requeridos de la colección blog

### Tests de Propiedades (fast-check + Vitest)

Cada test de propiedad debe ejecutarse con mínimo 100 iteraciones:

```typescript
// Feature: petrov-fitness-website, Property 1: Filtrado de blog por categoría es correcto
it('filterPostsByCategory returns only posts of the given category', () => {
  fc.assert(fc.property(
    fc.array(arbitraryBlogPost()),
    fc.constantFrom(...BLOG_CATEGORIES),
    (posts, category) => {
      const filtered = filterPostsByCategory(posts, category);
      return filtered.every(post => post.category === category);
    }
  ), { numRuns: 100 });
});
```

```typescript
// Feature: petrov-fitness-website, Property 2: Posts relacionados pertenecen a la misma categoría
it('getRelatedPosts returns only posts of the same category excluding the original', () => {
  fc.assert(fc.property(
    fc.array(arbitraryBlogPost(), { minLength: 1 }),
    fc.integer({ min: 0 }),
    (posts, idx) => {
      const post = posts[idx % posts.length];
      const related = getRelatedPosts(post, posts);
      return related.every(r => r.category === post.category && r.slug !== post.slug);
    }
  ), { numRuns: 100 });
});
```

```typescript
// Feature: petrov-fitness-website, Property 3: Validación de formulario rechaza inputs inválidos
it('validateContactForm returns errors for invalid inputs', () => {
  fc.assert(fc.property(
    arbitraryInvalidContactForm(),
    (formData) => {
      const errors = validateContactForm(formData);
      return Object.keys(errors).length > 0;
    }
  ), { numRuns: 100 });
});
```

```typescript
// Feature: petrov-fitness-website, Property 4: Meta tags presentes en todas las páginas
it('generatePageMeta always returns non-empty title and description', () => {
  fc.assert(fc.property(
    arbitraryPageMeta(),
    (metaProps) => {
      const meta = generatePageMeta(metaProps);
      return meta.title.length > 0 && meta.description.length > 0;
    }
  ), { numRuns: 100 });
});
```

```typescript
// Feature: petrov-fitness-website, Property 5: Sitemap incluye todas las páginas y posts
it('generateSitemapURLs includes all published posts and static pages', () => {
  fc.assert(fc.property(
    fc.array(arbitraryPublishedBlogPost()),
    (posts) => {
      const urls = generateSitemapURLs(posts);
      const postURLs = posts.map(p => `/blog/${p.slug}`);
      return postURLs.every(url => urls.includes(url));
    }
  ), { numRuns: 100 });
});
```

```typescript
// Feature: petrov-fitness-website, Property 6: Imágenes tienen atributos de accesibilidad y rendimiento
it('renderImage always includes non-empty alt and loading=lazy', () => {
  fc.assert(fc.property(
    arbitraryImageProps(),
    (props) => {
      const html = renderImage(props);
      return html.includes('loading="lazy"') && /alt="[^"]+"/.test(html);
    }
  ), { numRuns: 100 });
});
```
