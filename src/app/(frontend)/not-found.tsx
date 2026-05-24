import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <div className="relative">
        {/* Decorative background glow */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-64 w-64 rounded-full bg-pf-accent/5 blur-3xl" />
        </div>

        {/* 404 Number */}
        <h1
          className="font-[family-name:var(--font-nunito)] text-[8rem] font-bold leading-none tracking-tighter text-pf-text-heading sm:text-[10rem] md:text-[12rem]"
          aria-label="404"
        >
          404
        </h1>
      </div>

      {/* Divider */}
      <div className="my-8 h-px w-16 bg-pf-line" />

      {/* Message */}
      <div className="max-w-md space-y-4">
        <h2 className="font-[family-name:var(--font-nunito)] text-xl font-semibold text-pf-text-heading sm:text-2xl">
          Página no encontrada
        </h2>
        <p className="text-base text-pf-text-muted">
          La página que estás buscando no existe o ha sido movida a otra
          ubicación.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-10">
        <Button
          asChild
          className="bg-pf-accent text-white hover:bg-pf-accent/90 dark:bg-pf-accent dark:text-slate-900 dark:hover:bg-pf-accent/90"
        >
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  )
}
