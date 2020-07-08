export interface Vector3d {
    readonly x: number,
    readonly y: number,
    readonly z: number


}


export interface Grid3d {

    arr: Float32Array;
    dim: Vector3d;

    index(x:number,y:number,z:number)

}



