import type { Entry, EntryFields, EntrySkeletonType } from "contentful";
import type { TypeHomeAportesFields } from "./TypeHomeAportes";
import type { TypeHomeProjectsFields } from "./TypeHomeProjects";
import type { TypeHomeWelcomeFields } from "./TypeHomeWelcome";

export interface TypeHomePageFields{
    sectionIntroduction?: Entry<TypeHomeWelcomeFields>;
    sectionProjects?: Entry<TypeHomeProjectsFields>;
    sectionAreas?: Entry<TypeHomeAportesFields>;
    title?: EntryFields.Symbol;
}

export type TypeHomePage = Entry<TypeHomePageFields>;
