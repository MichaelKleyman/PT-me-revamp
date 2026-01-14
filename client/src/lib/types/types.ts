export type MenuRef = {
  current: HTMLDivElement | null;
};

export type MenuRefs = {
  [key: string]: MenuRef;
};

/** Replace fields in a type with new values */
export type Replace<OriginalT, NewT> = Omit<OriginalT, keyof NewT> & NewT;

/**
 * Helper types used to cleanup types for easier debugging (e.x. {a: number} & {b: string})
 * https://github.com/microsoft/TypeScript/issues/32562#issuecomment-515235948
 */
export type Identity<T> = T;

/**
 * Helper types used to cleanup types for easier debugging (e.x. {a: number} & {b: string})
 * https://github.com/microsoft/TypeScript/issues/32562#issuecomment-515235948
 */
export type MergeClean<T> = Identity<{ [k in keyof T]: T[k] }>;

/** Helper to create XOR types */
export type XOR<T1 extends object, T2 extends object> =
  | MergeClean<T1 & { [K in keyof T2]?: never }>
  | MergeClean<T2 & { [K in keyof T1]?: never }>;
