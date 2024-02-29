// types.ts
export type CoActorInfo = {
  [personId: number]: {
    count: number;
    works: string[];
  };
};
