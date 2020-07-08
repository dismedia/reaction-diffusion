import {Vector3d, Grid3d} from "../domain/domain";


export const grid3d: (dim: Vector3d, data?: Float32Array) => Grid3d = (dim: Vector3d, data: Float32Array) => {


    const arr: Float32Array = new Float32Array(dim.x * dim.y * dim.z);

    if (data) {
        arr.set(data)
    }


    const copy = () => {
        grid3d(dim, arr)
    }

    return {
        arr,
        dim,
        copy,
        index: (x: number, y: number, z: number) => x + y * dim.x + z * dim.y * dim.x


    }

}



