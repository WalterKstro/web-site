import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeHomeAportesFrontendFields {
    area?: EntryFields.Symbol;
    aportes?: EntryFields.Symbol[];
    fields:EntrySkeletonType;
    contentTypeId:string;
}

export type TypeHomeAportesFrontend = Entry<TypeHomeAportesFrontendFields>;
