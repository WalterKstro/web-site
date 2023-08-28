import type { Entry, EntryFields, EntrySkeletonType } from "contentful";
import type { TypeHomeAportesBackendFields } from "./TypeHomeAportesBackend";
import type { TypeHomeAportesFrontendFields } from "./TypeHomeAportesFrontend";

export interface TypeHomeAportesFields {
    title?: EntryFields.Symbol;
    frontend?: Entry<TypeHomeAportesFrontendFields>;
    backend?: Entry<TypeHomeAportesBackendFields>;
    fields:EntrySkeletonType;
    contentTypeId:string;
}

export type TypeHomeAportes = Entry<TypeHomeAportesFields>;
