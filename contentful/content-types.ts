import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeHomeAportesFields {
    title: EntryFieldTypes.Symbol;
    frontend: Entry<TypeHomeAportesFrontendSkeleton>;
    backend: Entry<TypeHomeAportesBackendSkeleton>;
    complemento: Entry<TypeHomeAportesComplementosSkeleton>;
}

export type TypeHomeAportesSkeleton = EntrySkeletonType<TypeHomeAportesFields, "homeAportes">;
export type TypeHomeAportes<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeAportesSkeleton, Modifiers, Locales>;

export interface TypeHomeAportesBackendFields {
    area: EntryFieldTypes.Symbol;
    aportes: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeHomeAportesBackendSkeleton = EntrySkeletonType<TypeHomeAportesBackendFields, "homeAportesBackend">;
export type TypeHomeAportesBackend<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeAportesBackendSkeleton, Modifiers, Locales>;

export interface TypeHomeAportesFrontendFields {
    area?: EntryFieldTypes.Symbol;
    aportes?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeHomeAportesFrontendSkeleton = EntrySkeletonType<TypeHomeAportesFrontendFields, "homeAportesFrontend">;
export type TypeHomeAportesFrontend<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeAportesFrontendSkeleton, Modifiers, Locales>;

export interface TypeHomeAportesComplementosFields {
    area: EntryFieldTypes.Symbol;
    aportes: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeHomeAportesComplementosSkeleton = EntrySkeletonType<TypeHomeAportesComplementosFields, "homeAportesComplementos">;
export type TypeHomeAportesComplementos<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeAportesComplementosSkeleton, Modifiers, Locales>;


export interface TypeHomePageFields {
    sectionIntroduction: Entry<TypeHomeWelcomeSkeleton>;
    sectionProjects: Entry<TypeHomeProjectsSkeleton>;
    sectionAreas: Entry<TypeHomeAportesSkeleton>;
    title: EntryFieldTypes.Symbol;
}

export type TypeHomePageSkeleton = EntrySkeletonType<TypeHomePageFields, "homePage">;
export type TypeHomePage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomePageSkeleton, Modifiers, Locales>;

export interface TypeHomeProjectsFields {
    title?: EntryFieldTypes.Symbol;
    introduction?: EntryFieldTypes.Text;
    images?: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
}

export type TypeHomeProjectsSkeleton = EntrySkeletonType<TypeHomeProjectsFields, "homeProjects">;
export type TypeHomeProjects<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeProjectsSkeleton, Modifiers, Locales>;

export interface TypeHomeWelcomeFields {
    greeting?: EntryFieldTypes.Symbol;
    name?: EntryFieldTypes.Symbol;
    position?: EntryFieldTypes.Symbol;
    introduction?: EntryFieldTypes.Text;
}

export type TypeHomeWelcomeSkeleton = EntrySkeletonType<TypeHomeWelcomeFields, "homeWelcome">;
export type TypeHomeWelcome<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeHomeWelcomeSkeleton, Modifiers, Locales>;
