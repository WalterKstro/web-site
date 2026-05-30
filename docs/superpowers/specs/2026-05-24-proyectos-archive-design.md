# Design: Página de Archivo de Proyectos (/proyectos)

**Date:** 2026-05-24
**Status:** Approved

## Overview

Crear una página dedicada (`/proyectos`) que liste **todos** los proyectos administrables desde el panel de Payload CMS. La página principal actual solo muestra un subconjunto (limitado por el bloque `PortfolioProjects`). La nueva página replicará el estilo visual del sitio (variables CSS del portfolio) con un layout tipo tabla/lista.

## Goals

1. Ser 100% administrable desde el panel de Payload CMS.
2. Usar las mismas características CSS que la página de inicio (variables `--pf-*`).
3. Renderizar un layout tipo lista/tabla con todos los proyectos (sin límite).
4. Traducir el enlace "View Full Project Archive" de la home a español.

## Architecture

### Enfoque Seleccionado: A — Página Payload + Nuevo Bloque Archive

Se crea un bloque Payload independiente (`PortfolioProjectsArchive`) que se registra en la colección `Pages`. El usuario crea una página con slug `proyectos` en el panel y añade este bloque a su layout. La ruta dinámica `[slug]/page.tsx` resuelve `/proyectos` automáticamente.

## Components

### 1. Bloque `PortfolioProjectsArchive`

**Location:** `src/blocks/PortfolioProjectsArchive/`

| File | Purpose |
|------|---------|
| `config.ts` | Define los campos del bloque en Payload (`heading`, `sectionId`) |
| `Component.tsx` | Server Component que hace fetch a `projects` y renderiza la lista |

#### Campos del Bloque

- `heading`: `text`, default `"Proyectos"`
- `sectionId`: `text`, default `"proyectos"`, label `"Section ID"`

#### Comportamiento del Componente

1. **Data Fetching:**
   - Usa `getPayload({ config: configPromise })`.
   - Llama `payload.find({ collection: 'projects', limit: 1000, pagination: false, overrideAccess: false })`.
   - Ordena los resultados por `order` ascendente.

2. **Render:**
   - Renderiza un `<section>` con `id={sectionId}`.
   - Encabezado `<h2>` con `heading`.
   - Lista de proyectos en formato tipo tabla/lista.

3. **Columnas (basadas en el schema existente):**
   - **Proyecto:** Título (con link a `projectUrl` si existe) + descripción truncada a 2 líneas.
   - **Tecnologías:** Tags redondeados (`technologies[].technology`).
   - **Enlace:** Link externo con icono `ArrowUpRight`.

4. **Estilos (Tailwind + CSS Variables del Portfolio):**
   - Fondo: hereda `bg-pf-bg` del body.
   - Texto: `text-pf-text`, `text-pf-text-heading` para títulos.
   - Tags: `bg-pf-accent-bg`, `text-pf-accent`.
   - Hover fila: `hover:bg-pf-hover`.
   - Separadores: `border-b border-pf-line`.
   - Links: `hover:text-pf-accent` con transición suave.

5. **Responsive:**
   - Desktop: layout en filas tipo tabla alineadas.
   - Mobile: cada proyecto se apila en tarjeta vertical con espaciado claro.

### 2. Integración en el Sistema

#### Registro en `Pages` Collection

En `src/collections/Pages/index.ts`, añadir `PortfolioProjectsArchive` al campo `layout.blocks`.

#### Registro en `RenderBlocks.tsx`

En `src/blocks/RenderBlocks.tsx`, añadir el nuevo bloque al switch de renderizado.

#### Traducción del Link en Home

En `src/blocks/PortfolioProjects/Component.tsx` (línea 130):
- Cambiar `"View Full Project Archive"` → `"Ver archivo completo de proyectos"`.

## Data Flow

```
Usuario visita /proyectos
  ↓
[slug]/page.tsx resuelve slug = "proyectos"
  ↓
queryPageBySlug() → encuentra Page con slug "proyectos"
  ↓
RenderBlocks → itera layout → detecta PortfolioProjectsArchive
  ↓
PortfolioProjectsArchive/Component.tsx
  → getPayload() → payload.find({ collection: 'projects' })
  → renderiza lista completa ordenada
```

## Error Handling

- Si no hay proyectos: renderiza mensaje `"No hay proyectos disponibles."` centrado con estilo `text-pf-text-muted`.
- Errores de fetch: delegados al error boundary de Next.js (`error.tsx`).

## Testing

- **Manual:** Crear página con slug `proyectos`, añadir bloque, verificar que lista todos los proyectos y que el link desde la home funciona.
- **Visual:** Verificar dark/light mode, responsive, hover states.

## Files to Create / Modify

### New Files
- `src/blocks/PortfolioProjectsArchive/config.ts`
- `src/blocks/PortfolioProjectsArchive/Component.tsx`

### Modified Files
- `src/collections/Pages/index.ts` — registrar bloque en `layout.blocks`
- `src/blocks/RenderBlocks.tsx` — añadir render del nuevo bloque
- `src/blocks/PortfolioProjects/Component.tsx` — traducir link

## Dependencies

- Ninguna dependencia nueva. Reutiliza `payload`, `next/image`, `lucide-react`, `tailwindcss`.

## Open Questions

- Ninguna. El diseño ha sido aprobado por el usuario.
