import {Grid3d} from "../../../domain/domain";
import {index3x3} from "../index";

export const convolute =
    (kernel: Grid3d) =>


        (source: Grid3d, px, py, pz) => {

            const kernelOffsetX = 1
            const kernelOffsetY = 1
            const kernelOffsetZ = 1

            let value = 0
            for (let x = 0; x < kernel.dim.x; x++) {
                for (let y = 0; y < kernel.dim.y; y++) {
                    for (let z = 0; z < kernel.dim.z; z++) {
                        value += kernel.arr[kernel.index(x, y, z)] * source.arr[source.index(px - kernelOffsetX + x, py - kernelOffsetY + y, pz - kernelOffsetZ + z)]
                    }
                }
            }

            return value;
        }


export const createKernel3x3x1Values = () => {


    return [
        0.05, 0.2, 0.05,
        0.2, -1, 0.2,
        0.05, 0.2, 0.05
    ]


}

export const createKernel3x3x3Values = () => {

    const kernel: number[] = [];


    let distSum = 0;

    for (let i = 0; i < 27; i++) {
        kernel.push(0);
    }

    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 3; y++) {
            for (let z = 0; z < 3; z++) {

                const dx = 1 - x;
                const dy = 1 - y;
                const dz = 1 - z;

                const distSq = dx ** 2 + dy ** 2 + dz ** 2;
                const v = Math.exp(-distSq)


                if(dx==0 && dy==0 && dz==0){

                }else{
                    distSum += v
                }


                kernel[index3x3(x, y, z)] = v;

            }
        }
    }

    console.log("dist sum", distSum)



    kernel[index3x3(1, 1, 1)] = -distSum;

    for (let i = 0; i < 27; i++) {
        kernel[i] /= distSum;
    }




    let g=0;
    for (let i = 0; i < 27; i++) {
        g+=kernel[i];
    }

    console.log("kernel sum", g)




    // const ov = [
    //
    //     0,0,0,
    //     0,1.3,0,
    //     0,0,0,
    //
    //     0.05, 0.13, 0.05,
    //     0.13, -1, 0.13,
    //     0.05, 0.13, 0.05,
    //
    //     0,0,0,
    //     0,1.3,0,
    //     0,0,0,
    //
    //
    // ]

    return kernel;

}

