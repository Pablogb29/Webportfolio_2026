# 🎨 Guía de Personalización

Esta guía te ayudará a personalizar tu portfolio con tu información personal.

## 📝 Pasos de Personalización

### 1. Información Personal

#### Hero Section (`components/Hero.tsx`)
- Línea 20: Cambia "Pablo" por tu nombre
- Línea 22: Ajusta el título si es necesario
- Línea 28: Modifica la descripción profesional
- Línea 35-37: Actualiza la descripción breve

#### About Section (`components/About.tsx`)
- Líneas 20-30: Reemplaza el texto con tu propia biografía
- Líneas 44-50: Actualiza las áreas de enfoque según tus habilidades

### 2. Skills Matrix (`components/Skills.tsx`)

Edita el array `skillCategories` para reflejar tus habilidades:

```typescript
const skillCategories: SkillCategory[] = [
  {
    title: "Tu Categoría",
    icon: <Shield size={24} />,
    skills: ["Skill 1", "Skill 2", "Skill 3"],
  },
  // ... más categorías
];
```

### 3. Proyectos

#### Proyectos Destacados (`components/FeaturedProjects.tsx`)
- Edita el array `featuredProjects` con tus proyectos reales
- Actualiza URLs de repositorios

#### Todos los Proyectos (`app/projects/page.tsx`)
- Modifica el array `allProjects` con todos tus proyectos

### 4. HTB Labs (`app/labs/page.tsx`)

Actualiza el array `htbMachines` con tus máquinas resueltas:

```typescript
const htbMachines: HTBMachine[] = [
  {
    name: "Nombre de la máquina",
    category: "Windows" | "Linux",
    difficulty: "Easy" | "Medium" | "Hard" | "Insane",
    skills: ["Skill 1", "Skill 2"],
    writeupUrl: "URL de tu writeup",
    htbUrl: "URL de tu perfil HTB",
  },
];
```

### 5. Blog/Research (`app/blog/page.tsx`)

Modifica el array `blogPosts` con tus artículos:

```typescript
const blogPosts: BlogPost[] = [
  {
    title: "Título del artículo",
    excerpt: "Resumen del artículo",
    category: "Categoría",
    date: "YYYY-MM-DD",
    readTime: "X min read",
    url: "URL del artículo",
  },
];
```

### 6. Contacto (`app/contact/page.tsx`)

- Línea 50: Actualiza los enlaces de redes sociales en `socialLinks`
- Línea 58: Cambia el email en `mailto:`
- Líneas 100-110: Personaliza el formulario de contacto (necesitarás un backend para procesarlo)

### 7. Footer (`components/Footer.tsx`)

- Actualiza los enlaces de GitHub, LinkedIn, y email
- Ajusta el año si es necesario

### 8. Metadata (`app/layout.tsx`)

- Líneas 19-23: Actualiza los metadatos SEO con tu información

### 9. Resume PDF

1. Coloca tu resume PDF en la carpeta `public/` con el nombre `resume.pdf`
2. El botón "Download Resume" en el Hero automáticamente lo enlazará

## 🎨 Personalización de Colores

Edita `tailwind.config.ts` para cambiar la paleta de colores:

```typescript
colors: {
  background: "#0A0A0A",        // Fondo principal
  container: "#111827",          // Contenedores
  "container-alt": "#1E1E2E",   // Contenedores alternativos
  accent: "#00FF9A",            // Verde neón (acento principal)
  "cyber-blue": "#1E90FF",      // Azul ciber
  "gray-light": "#D1D5DB",      // Gris claro
}
```

## 🔧 Configuración del Formulario de Contacto

El formulario de contacto actualmente solo muestra una alerta. Para hacerlo funcional:

1. **Opción 1: Usar un servicio de terceros**
   - Formspree
   - EmailJS
   - SendGrid

2. **Opción 2: Crear API Route en Next.js**
   - Crea `app/api/contact/route.ts`
   - Implementa el envío de emails usando Nodemailer o similar

Ejemplo básico con API Route:

```typescript
// app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  // Procesar y enviar email
  return NextResponse.json({ success: true });
}
```

## 📱 Verificación Responsive

Asegúrate de probar el sitio en diferentes tamaños de pantalla:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🚀 Optimizaciones Adicionales

1. **Imágenes**: Agrega imágenes optimizadas en `public/` y úsalas con el componente `Image` de Next.js
2. **Analytics**: Considera agregar Google Analytics o Vercel Analytics
3. **SEO**: Mejora los metadatos y agrega Open Graph tags
4. **Performance**: Usa `next/image` para todas las imágenes

## 📦 Deploy

Una vez personalizado, despliega en Vercel:

1. Push a GitHub
2. Importa en Vercel
3. Configura variables de entorno si es necesario
4. Deploy!

---

¡Listo! Tu portfolio está personalizado y listo para producción.

