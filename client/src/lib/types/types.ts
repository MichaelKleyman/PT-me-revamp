export type MenuRef = {
  current: HTMLDivElement | null;
};

export type MenuRefs = {
  [key: string]: MenuRef;
};

/** Replace fields in a type with new values */
export type Replace<OriginalT, NewT> = Omit<OriginalT, keyof NewT> & NewT;
