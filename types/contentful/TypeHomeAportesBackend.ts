import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeHomeAportesBackendFields {
    area?: EntryFields.Symbol;
    aportes?: EntryFields.Symbol[];
    fields:EntrySkeletonType;
    contentTypeId:string;
}

export type TypeHomeAportesBackend = Entry<TypeHomeAportesBackendFields>;
