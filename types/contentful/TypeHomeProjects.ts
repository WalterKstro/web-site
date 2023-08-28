import type { Asset, Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeHomeProjectsFields {
    title?: EntryFields.Symbol;
    introduction?: EntryFields.Text;
    images?: Asset[];
    fields:EntrySkeletonType;
    contentTypeId:string;
}

export type TypeHomeProjects = Entry<TypeHomeProjectsFields>;
