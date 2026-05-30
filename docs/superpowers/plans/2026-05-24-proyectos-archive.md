# Página de Archivo de Proyectos (/proyectos) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Crear una página administrable desde Payload CMS que liste todos los proyectos con estilo consistente al sitio, accesible en `/proyectos`.

**Architecture:** Nuevo bloque `PortfolioProjectsArchive` (config + componente server) que se registra en la colección `Pages`. El usuario crea una página con slug `proyectos` y añade este bloque. La ruta `[slug]/page.tsx` resuelve automáticamente.

**Tech Stack:** Payload CMS 3.x, Next.js 16, React 19, TypeScript, Tailwind CSS v4, Lucide React

---

### Task 1: Crear config del bloque PortfolioProjectsArchive

**Files:**
- Create: `src/blocks/PortfolioProjectsArchive/config.ts`

- [ ] **Step 1: Escribir config del bloque**

```ts
import type { Block } from 'payload'

export const PortfolioProjectsArchive: Block = {
  slug: 'portfolioProjectsArchive',
  interfaceName: 'PortfolioProjectsArchiveBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      defaultValue: 'Proyectos',
    },
    {
      name: 'sectionId',
      type: 'text',
      defaultValue: 'proyectos',
      label: 'Section ID',
    },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/blocks/PortfolioProjectsArchive/config.ts
git commit -m "feat: add PortfolioProjectsArchive block config"
```

---

### Task 2: Crear componente PortfolioProjectsArchive

**Files:**
- Create: `src/blocks/PortfolioProjectsArchive/Component.tsx`

- [ ] **Step 1: Escribir el componente server**

```tsx
import React from 'react'
import { ArrowUpRight, ArrowUpRightSquare } from 'lucide-react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { PortfolioProjectsArchiveBlock as PortfolioProjectsArchiveBlockProps, Project } from '@/payload-types'

export const PortfolioProjectsArchiveBlock: React.FC<PortfolioProjectsArchiveBlockProps> = async (props) => {
  const { heading, sectionId } = props

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'projects',
    limit: 1000,
    pagination: false,
    overrideAccess: false,
  })

  const projects = (result.docs || []) as Project[]

  if (!projects.length) {
    return (
      <section id={sectionId || 'proyectos'} className="py-16">
        <p className="text-center text-pf-text-muted">No hay proyectos disponibles.</p>
      </section>
    )
  }

  const sortedProjects = [...projects].sort((a, b) => {
    return (a.order || 0) - (b.order || 0)
  })

  return (
    <section id={sectionId || 'proyectos'} className="py-16" aria-labelledby="projects-heading">
      <h1
        id="projects-heading"
        className="text-3xl font-bold text-pf-text-heading mb-12"
      >
        {heading || 'Proyectos'}
      </h1>

      {/* Desktop Table Header */}
      <div className="hidden md:grid md:grid-cols-[2fr_2fr_1fr] gap-4 pb-3 border-b border-pf-line mb-2">
        <span className="text-sm font-semibold text-pf-text-heading uppercase tracking-wider">
          Proyecto
        </span>
        <span className="text-sm font-semibold text-pf-text-heading uppercase tracking-wider">
          Tecnologías
        </span>
        <span className="text-sm font-semibold text-pf-text-heading uppercase tracking-wider text-right">
          Enlace
        </span>
      </div>

      <div className="divide-y divide-pf-line">
        {sortedProjects.map((project) => {
          const hasLink = project.projectUrl || project.githubUrl
          const linkUrl = project.projectUrl || project.githubUrl

          return (
            <article
              key={project.id}
              className="group py-6 md:grid md:grid-cols-[2fr_2fr_1fr] md:gap-4 md:items-start hover:bg-pf-hover transition-colors duration-200 rounded-lg px-2 -mx-2"
            >
              {/* Project Info */}
              <div className="mb-2 md:mb-0">
                <h3 className="text-base font-medium text-pf-text-heading">
                  {project.title}
                </h3>
                {project.description && (
                  <p className="text-sm text-pf-text-muted mt-1 line-clamp-2">
                    {typeof project.description === 'string'
                      ? project.description
                      : ''}
                  </p>
                )}
              </div>

              {/* Technologies */}
              <div className="mb-3 md:mb-0">
                {project.technologies && project.technologies.length > 0 ? (
                  <ul className="flex flex-wrap gap-2" aria-label={`Tecnologías usadas en ${project.title}`}>
                    {project.technologies.map((tech, i) => (
                      <li
                        key={i}
                        className="px-3 py-1 text-xs font-medium text-pf-accent bg-pf-accent-bg rounded-full"
                      >
                        {tech.technology}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-sm text-pf-text-subtle">—</span>
                )}
              </div>

              {/* Link */}
              <div className="md:text-right">
                {hasLink ? (
                  <a
                    href={linkUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-pf-text-muted hover:text-pf-accent transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-pf-focus focus-visible:outline-offset-2 rounded group/link"
                  >
                    <span className="truncate max-w-[120px] md:max-w-[150px]">
                      {new URL(linkUrl || '').hostname.replace(/^www\./, '')}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(abre en nueva pestaña)</span>
                  </a>
                ) : (
                  <span className="text-sm text-pf-text-subtle">—</span>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/blocks/PortfolioProjectsArchive/Component.tsx
git commit -m "feat: add PortfolioProjectsArchive block component"
```

---

### Task 3: Registrar bloque en colección Pages

**Files:**
- Modify: `src/collections/Pages/index.ts`

- [ ] **Step 1: Añadir import y registrar en layout.blocks**

En `src/collections/Pages/index.ts`:

Añadir import después de la línea 14:
```ts
import { PortfolioProjectsArchive } from '../../blocks/PortfolioProjectsArchive/config'
```

Añadir `PortfolioProjectsArchive` al array `blocks` (línea 75-86), después de `PortfolioFooter`:
```ts
blocks: [
  CallToAction,
  Content,
  MediaBlock,
  Archive,
  FormBlock,
  PortfolioAbout,
  PortfolioExperience,
  PortfolioProjects,
  PortfolioWriting,
  PortfolioFooter,
  PortfolioProjectsArchive,
],
```

- [ ] **Step 2: Commit**

```bash
git add src/collections/Pages/index.ts
git commit -m "feat: register PortfolioProjectsArchive block in Pages collection"
```

---

### Task 4: Registrar bloque en RenderBlocks

**Files:**
- Modify: `src/blocks/RenderBlocks.tsx`

- [ ] **Step 1: Añadir import y mapeo**

En `src/blocks/RenderBlocks.tsx`:

Añadir import después de la línea 14:
```ts
import { PortfolioProjectsArchiveBlock } from '@/blocks/PortfolioProjectsArchive/Component'
```

Añadir al objeto `blockComponents` (después de `portfolioFooter`):
```ts
portfolioProjectsArchive: PortfolioProjectsArchiveBlock,
```

- [ ] **Step 2: Commit**

```bash
git add src/blocks/RenderBlocks.tsx
git commit -m "feat: register PortfolioProjectsArchive in RenderBlocks"
```

---

### Task 5: Traducir enlace en PortfolioProjects (home)

**Files:**
- Modify: `src/blocks/PortfolioProjects/Component.tsx`

- [ ] **Step 1: Traducir texto**

En `src/blocks/PortfolioProjects/Component.tsx`, línea 130, cambiar:
```tsx
View Full Project Archive
```
a:
```tsx
Ver archivo completo de proyectos
```

- [ ] **Step 2: Commit**

```bash
git add src/blocks/PortfolioProjects/Component.tsx
git commit -m "i18n: translate View Full Project Archive to Spanish"
```

---

### Task 6: Generar tipos y verificar build

**Files:**
- Modify: `src/payload-types.ts` (auto-generado)

- [ ] **Step 1: Generar tipos de Payload**

```bash
pnpm generate:types
```

Expected: El comando completa sin errores. El archivo `src/payload-types.ts` se actualiza con la nueva interfaz `PortfolioProjectsArchiveBlock`.

- [ ] **Step 2: Verificar build de Next.js**

```bash
pnpm build
```

Expected: El build completa sin errores de TypeScript o compilación.

- [ ] **Step 3: Commit**

```bash
git add src/payload-types.ts
git commit -m "chore: regenerate payload types for PortfolioProjectsArchive"
```

---

### Task 7: Verificación manual (post-implementation)

- [ ] **Step 1: Crear página en Payload**
  1. Ir al panel de admin (`/admin`)
  2. Crear nueva `Page` con:
     - **Title:** "Proyectos"
     - **Slug:** `proyectos`
     - **Layout:** Añadir bloque `Portfolio Projects Archive`
  3. Publicar la página

- [ ] **Step 2: Verificar la ruta**
  - Visitar `http://localhost:3000/proyectos`
  - Confirmar que se muestran todos los proyectos en formato lista
  - Confirmar que el diseño usa las variables CSS del portfolio (colores consistentes)

- [ ] **Step 3: Verificar enlace desde home**
  - Visitar `/`
  - Confirmar que el link inferior dice "Ver archivo completo de proyectos"
  - Click en el link → debe redirigir a `/proyectos`

---

## Spec Coverage Checklist

| Spec Requirement | Implementing Task |
|------------------|-----------------|
| Nuevo bloque `PortfolioProjectsArchive` con config y componente | Task 1, Task 2 |
| Fetch de todos los proyectos (sin límite) | Task 2 (limit: 1000) |
| Layout tipo lista/tabla con columnas Proyecto/Tecnologías/Enlace | Task 2 |
| Mismas características CSS que la home (`--pf-*` variables) | Task 2 |
| Registro en colección `Pages` | Task 3 |
| Registro en `RenderBlocks` | Task 4 |
| Traducir "View Full Project Archive" → español | Task 5 |
| Administrable desde panel Payload | Enfoque A (page con slug `proyectos`) |
| Responsive (desktop tabla / mobile apilado) | Task 2 |
| Mensaje cuando no hay proyectos | Task 2 |
| Generación de tipos | Task 6 |

## Placeholder Scan

- ✅ No hay "TBD", "TODO", "implement later"
- ✅ Cada step tiene código completo
- ✅ Comandos exactos con expected output
- ✅ Tipos y nombres consistentes a través de las tareas
