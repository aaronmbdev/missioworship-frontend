export interface ISimple<val> {
    id: number,
    name: string,
    value?: val
}
export interface ISimplePack<val>{
    [key:string]:ISimple<val>;
}
export interface ISimplePacks<val>{
    [key:string]:ISimple<val>[];
}