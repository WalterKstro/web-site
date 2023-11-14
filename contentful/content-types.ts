import type { Asset, ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeHomeAportesFields {
    title: EntryFieldTypes.Symbol;
    frontend: EntryFieldTypes.EntryLink<TypeHomeAportesFrontendSkeleton>;
    backend: EntryFieldTypes.EntryLink<TypeHomeAportesBackendSkeleton>;
    complemento: EntryFieldTypes.EntryLink<TypeHomeAportesComplementosSkeleton>;
}

export type TypeHomeAportesSkeleton = EntrySkeletonType<TypeHomeAportesFields, "homeAportes">;
export type TypeHomeAportes<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeAportesSkeleton, Modifiers, Locales>;

export interface TypeHomeAportesBackendFields {
    area: EntryFieldTypes.Symbol;
    aportes: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeHomeAportesBackendSkeleton = EntrySkeletonType<TypeHomeAportesBackendFields, "homeAportesBackend">;
export type TypeHomeAportesBackend<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeAportesBackendSkeleton, Modifiers, Locales>;

export interface TypeHomeAportesComplementosFields {
    area: EntryFieldTypes.Symbol;
    aportes: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeHomeAportesComplementosSkeleton = EntrySkeletonType<TypeHomeAportesComplementosFields, "homeAportesComplementos">;
export type TypeHomeAportesComplementos<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeAportesComplementosSkeleton, Modifiers, Locales>;

export interface TypeHomeAportesFrontendFields {
    area: EntryFieldTypes.Symbol;
    aportes: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeHomeAportesFrontendSkeleton = EntrySkeletonType<TypeHomeAportesFrontendFields, "homeAportesFrontend">;
export type TypeHomeAportesFrontend<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeAportesFrontendSkeleton, Modifiers, Locales>;

export interface TypeHomePageFields {
    sectionIntroduction: EntryFieldTypes.EntryLink<TypeHomeWelcomeSkeleton>;
    sectionProjects: EntryFieldTypes.EntryLink<TypeHomeProjectsSkeleton>;
    sectionAreas: EntryFieldTypes.EntryLink<TypeHomeAportesSkeleton>;
    title: EntryFieldTypes.Symbol;
}

export type TypeHomePageSkeleton = EntrySkeletonType<TypeHomePageFields, "homePage">;
export type TypeHomePage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomePageSkeleton, Modifiers, Locales>;

export interface TypeHomeProjectsFields {
    title: EntryFieldTypes.Symbol;
    introduction: EntryFieldTypes.Text;
    images: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeHomeProjectsSkeleton = EntrySkeletonType<TypeHomeProjectsFields, "homeProjects">;
export type TypeHomeProjects<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeProjectsSkeleton, Modifiers, Locales>;

export interface TypeHomeWelcomeFields {
    greeting: EntryFieldTypes.Symbol;
    name: EntryFieldTypes.Symbol;
    position: EntryFieldTypes.Symbol;
    introduction: EntryFieldTypes.Text;
}

export type TypeHomeWelcomeSkeleton = EntrySkeletonType<TypeHomeWelcomeFields, "homeWelcome">;
export type TypeHomeWelcome<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeWelcomeSkeleton, Modifiers, Locales>;

export interface TypeProjectFields {
    title: EntryFieldTypes.Symbol;
    extract: EntryFieldTypes.Text;
    images: Asset[]
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    links: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeProjectSkeleton = EntrySkeletonType<TypeProjectFields, "project">;
export type TypeProject<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProjectSkeleton, Modifiers, Locales>;

export interface TypeProjectsPageFields {
    title: EntryFieldTypes.Symbol;
    seccionBackend: EntryFieldTypes.EntryLink<TypeProyectosBackendSkeleton>;
    seccionFrontend: EntryFieldTypes.EntryLink<TypeProyectosFrontendSkeleton>;
    seccionEjercicios: EntryFieldTypes.EntryLink<TypeProyectosEjerciciosSkeleton>;
}

export type TypeProjectsPageSkeleton = EntrySkeletonType<TypeProjectsPageFields, "projectsPage">;
export type TypeProjectsPage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProjectsPageSkeleton, Modifiers, Locales>;

export interface TypeProyectosBackendFields {
    title: EntryFieldTypes.Symbol;
    proyectos: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectSkeleton>>;
}

export type TypeProyectosBackendSkeleton = EntrySkeletonType<TypeProyectosBackendFields, "proyectosBackend">;
export type TypeProyectosBackend<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProyectosBackendSkeleton, Modifiers, Locales>;

export interface TypeProyectosEjerciciosFields {
    title: EntryFieldTypes.Symbol;
    ejercicios: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectSkeleton>>;
}

export type TypeProyectosEjerciciosSkeleton = EntrySkeletonType<TypeProyectosEjerciciosFields, "proyectosEjercicios">;
export type TypeProyectosEjercicios<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProyectosEjerciciosSkeleton, Modifiers, Locales>;

export interface TypeProyectosFrontendFields {
    title: EntryFieldTypes.Symbol;
    proyectos: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeProjectSkeleton>>;
}

export type TypeProyectosFrontendSkeleton = EntrySkeletonType<TypeProyectosFrontendFields, "proyectosFrontend">;
export type TypeProyectosFrontend<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProyectosFrontendSkeleton, Modifiers, Locales>;
