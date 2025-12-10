# 🚀 Web Portfolio Project – Offensive Security / Red Team

Este documento define el briefing completo para que el modelo (Claude 3.5 Sonnet o GPT-4.1) diseñe y construya un **portfolio web profesional, moderno y orientado a ciberseguridad ofensiva**.  
El objetivo es producir un sitio excepcionalmente sólido, elegante y técnico.

---

## 🎯 Objetivo del proyecto

Diseñar y desarrollar un **portfolio web premium**, pensado para reclutadores y empresas de ciberseguridad ofensiva, que refleje:

- Profesionalidad y experiencia técnica.
- Especialización en **Pentesting, Red Team, OSCP Preparation y Offensive Security Research**.
- Dominio de tecnologías modernas.
- Estética seria, oscura, minimalista y de alto nivel.

---

## 🎨 Estilo visual

El diseño debe seguir una estética **dark-tech minimalista**.

### Colores recomendados
- Fondo principal: `#0A0A0A`
- Contenedores: `#111827` o `#1E1E2E`
- Acento verde neón: `#00FF9A`
- Azul ciber: `#1E90FF`
- Gris claro: `#D1D5DB`

### Tipografías
- **Inter** (UI)
- **JetBrains Mono** o **Roboto Mono** (elementos técnicos)

### Sensación general
- Profesional, limpio, técnico.
- Uso sutil de animaciones micro-interactivas.
- No recargar visualmente.

---

## 🧱 Secciones obligatorias

### 1. **Hero Section**
- Nombre: **Pablo – Offensive Security Engineer**
- Título principal:  
  *"Red Team • Pentesting • OSCP Preparation • Exploit Development"*
- Breve descripción profesional.
- Botones:
  - **View Projects**
  - **Download Resume**

---

### 2. **About Me**
- Resumen directo, técnico y profesional.
- Enfoque en:
  - Pentesting
  - AD Attack Paths
  - Web/API Security
  - Exploit Research
  - Scripting (Python, Bash, PowerShell)

---

### 3. **Skills Matrix**
Clasificación por áreas:

- **Red Team & Pentesting**
  - Nmap, Burp, Cobalt Strike, Beacon Object Files, Phishing infra, etc.
- **Active Directory Attacks**
  - Impacket, BloodHound, Kerberoasting, AS-REP, RBCD, ACL abuse.
- **Web Security**
  - OWASP Top 10, API Security, SSRF, SQLi, XXE, deserialization.
- **Exploit Development**
  - Buffer overflow, ROP, Windows internals, Linux ELF analysis.
- **Malware / Reverse Engineering**
  - Ghidra, Radare2, IDA (free), static/dynamic analysis.

---

### 4. **Projects (case-study style)**
Cada proyecto incluirá:

- Imagen o terminal estilizado
- Descripción
- Stack técnico
- Resultado o impacto
- Enlace al repositorio

---

### 5. **HTB Writeups / Labs**
Página dedicada a:

- Máquinas resueltas
- Categoría (Windows/Linux)
- Dificultad
- Skills adquiridos
- Enlace al writeup

Diseño tipo **Cyber Range Dashboard**.

---

### 6. **Research / Blog**
Artículos técnicos sobre:

- AD exploitation
- Web security
- Offensive automation
- AI + Cybersecurity

---

### 7. **Contact**
- Formulario minimalista
- LinkedIn
- GitHub
- HTB Profile

---

## ⚙️ Requisitos técnicos

Framework recomendado:  
➡️ **Next.js 14 (App Router) + TypeScript**

Stack técnico completo:

- **Next.js 14**
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** (animaciones)
- **Shadcn/UI** (opcional)
- **Vercel** como entorno de despliegue
- Componentes reutilizables:
  - Cards
  - Timeline
  - Terminal component estilizado
  - Grid responsive

---

## 📦 Lo que quiero que generes

El modelo debe producir:

### 1. Arquitectura del proyecto
- Estructura de carpetas optimizada.
- Rutas principales (`/`, `/projects`, `/labs`, `/contact`).

### 2. Código base inicial
- Configuración completa de Next.js + Tailwind.
- Layout global con tipografías y metadatos.
- Diseño responsive.

### 3. Componentes UI fundamentales
- Hero section
- About section
- Skills matrix
- Project cards
- HTB listing grid
- Contact section

### 4. Animaciones sugeridas
- Fade-in progresivo
- Hover con brillo cyber
- Líneas de escaneo tipo terminal (muy sutiles)

### 5. Guía de estilos
- Colores
- Tipografías
- Espaciados
- Comportamientos de botones
- Iconografía

---

## 📌 Instrucciones para el modelo

Quiero que generes el proyecto como si fueras un **Lead Frontend Engineer especializado en UI/UX moderno** para un portfolio de ciberseguridad ofensiva.

Debes:

- Proponer arquitectura limpia.
- Escribir código escalable.
- Crear componentes reutilizables.
- Mantener un estilo impecable y profesional.
- Optimizar la experiencia para reclutadores europeos que busquen roles de:
  - Pentester
  - Red Team Operator
  - Security Consultant

---

## 🧠 Modelo recomendado

**Usar como modelo en Cursor:**  
➡️ **Claude 4.5 Sonnet** (recomendado)  
o  
➡️ **GPT-5.1** (para lógica/animaciones avanzadas)

---

## 🏁 Resultado esperado

Un portfolio moderno, minimalista, extremadamente profesional, totalmente responsive y con una estética alineada con la ciberseguridad ofensiva.

El asistente debe generar continuamente código, diseño y mejoras hasta tener el sitio **listo para producción**.

