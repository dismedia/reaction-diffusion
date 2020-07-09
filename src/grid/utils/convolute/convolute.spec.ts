import {grid3d} from "../../grid";
import {convolute} from "./convolute";


describe("convolute", () => {


    test("should calculate", () => {

        const grid = grid3d({x: 3, y: 3, z: 1}, new Float32Array(
            [
                1, 10, 100,
                1, 10, 100,
                1, 10, 100
            ]
        ));


        const kernel = convolute(grid3d({x: 3, y: 3, z: 1},
            new Float32Array(
                [
                    1, 1, 1,
                    2, 2, 2,
                    3, 3, 3,

                ])
        ))

        const output=kernel(grid,1,1,1)
        console.log(output)


    })

})
