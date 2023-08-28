import type { Entry, EntryFields, EntrySkeletonType } from "contentful";

export interface TypeHomeWelcomeFields {
    greeting?: EntryFields.Symbol;
    name?: EntryFields.Symbol;
    position?: EntryFields.Symbol;
    introduction?: EntryFields.Text;
}

export type TypeHomeWelcome = Entry<TypeHomeWelcomeFields>;
