import {Vector3d} from "./domain/domain";
import {grid3d} from "./grid/grid";
import {convolute, createKernel3x3x1Values, createKernel3x3x3Values} from "./grid/utils/convolute/convolute";

var Jimp = require('jimp');


const d = 200

const dh = d / 2;
const dw = 15;

const experiment = {

    dim: {x: d, y: d, z: 1},
    dA: 1,
    dB: 0.5,
    feed: 0.055,
    k: 0.062

}


const mediumA1 = grid3d(experiment.dim)
const mediumB1 = grid3d(experiment.dim)

const mediumA2 = grid3d(experiment.dim)
const mediumB2 = grid3d(experiment.dim)

//const kernel = convolute(grid3d({x: 3, y: 3, z: 3}, new Float32Array(createKernel3x3x3Values())));
const kernel = convolute(grid3d({x: 3, y: 3, z: 1}, new Float32Array(createKernel3x3x1Values())));


for (let i = 0; i < mediumA1.arr.length; i++) {

    mediumA1.arr[i] = 1;
    mediumA2.arr[i] = 1;
    mediumB1.arr[i] = 0;
    mediumB2.arr[i] = 0;

}


for (let x = dh - dw; x < dh + dw; x++) {
    for (let y = dh - dw; y < dh + dw - 1; y++) {
        for (let z = 0; z < 1; z++) {
            const index = mediumB1.index(x, y, z)
            mediumB1.arr[index] = 1;
            mediumB2.arr[index] = 1;

        }
    }
}


for (let iteration = 0; iteration < 1000; iteration += 2) {

    console.time("pass")
    for (let z = 0; z < 1; z++) {
        for (let y = 1; y < experiment.dim.y - 1; y++) {
            for (let x = 1; x < experiment.dim.x - 1; x++) {


                const index = mediumA1.index(x, y, z)
                const a = mediumA1.arr[index];
                const b = mediumB1.arr[index];


                const da = experiment.dA * kernel(mediumA1, x, y, z) - a * b * b + experiment.feed * (1 - a);
                const db = experiment.dB * kernel(mediumB1, x, y, z) + a * b * b - (experiment.k + experiment.feed) * b

                mediumA2.arr[index] = Math.max(Math.min(a + da, 1), 0);
                mediumB2.arr[index] = Math.max(Math.min(b + db, 1), 0);


                // mediumA2.arr[index] =a + da;
                // mediumB2.arr[index] = b + db;


            }
        }
    }
    for (let z = 0; z < 1; z++) {
        for (let y = 1; y < experiment.dim.y - 1; y++) {
            for (let x = 1; x < experiment.dim.x - 1; x++) {


                const index = mediumA2.index(x, y, z)
                const a = mediumA2.arr[index];
                const b = mediumB2.arr[index];


                const da = experiment.dA * kernel(mediumA2, x, y, z) - a * b * b + experiment.feed * (1 - a)
                const db = experiment.dB * kernel(mediumB2, x, y, z) + a * b * b - (experiment.k + experiment.feed) * b

                mediumA1.arr[index] = Math.max(Math.min(a + da, 1), 0);
                mediumB1.arr[index] = Math.max(Math.min(b + db, 1), 0);

                // mediumA1.arr[index] =a + da;
                // mediumB1.arr[index] = b + db;


            }
        }
    }

    console.timeEnd("pass")
    console.log(iteration)

}


let fileContent = ""

// for (let x = 1; x < experiment.dim.x - 1; x++) {
//     for (let y = 1; y < experiment.dim.y - 1; y++) {
//         for (let z = 1; z < experiment.dim.z - 1; z++) {
//
//             const index = mediumA1.index(x, y, z)
//             const a = mediumA1.arr[index];
//             const b = mediumB1.arr[index];
//
//             const v=a-b;
//             if(v<0.2){
//                 fileContent+=`v ${x} ${y} ${z} \n`
//             }
//
//
//         }
//     }
// }


new Jimp(d, d, (err, image) => {

    let z = 0
    for (let x = 1; x < experiment.dim.x - 1; x++) {
        for (let y = 1; y < experiment.dim.y - 1; y++) {


            const index = mediumA1.index(x, y, z)


            const a = mediumA1.arr[index];
            const b = mediumB1.arr[index];

            const v = Math.floor(Math.max(Math.min((a - b), 1), 0) * 255)

            //console.log(index ,a,b,v);


            image.setPixelColor(Jimp.rgbaToInt(v, v, v, 255), x, y)


            // if(v<0.2){
            //     fileContent+=`v ${x} ${y} ${z} \n`
            // }


        }
    }
    image.write('lena-small-bw.png');
});


/*
const fs = require('fs');
fs.writeFile('a1.obj', fileContent, function (err) {
    if (err) return console.log(err);
    console.log('obj saved');
});
*/
