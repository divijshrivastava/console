import { page } from '$app/stores';
import type { Models } from '@appwrite.io/console';
import { derived, writable } from 'svelte/store';

//TODO: remove `side` after SDK update
export type Attributes =
    | Models.AttributeBoolean
    | Models.AttributeEmail
    | Models.AttributeEnum
    | Models.AttributeFloat
    | Models.AttributeInteger
    | Models.AttributeIp
    | Models.AttributeString
    | Models.AttributeUrl
    | (Models.AttributeRelationship & { side: string; default?: never });

type Collection = Omit<Models.Collection, 'attributes'> & {
    attributes: Array<Attributes>;
};
export type Column = {
    id: string;
    title: string;
    show: boolean;
    type?: string;
    twoWay?: string;
    width?: number;
};

export const collection = derived(page, ($page) => $page.data.collection as Collection);
export const attributes = derived(
    page,
    ($page) => $page.data.collection.attributes as Attributes[]
);
export const indexes = derived(page, ($page) => $page.data.collection.indexes as Models.Index[]);

export const columns = writable<Column[]>([]);
