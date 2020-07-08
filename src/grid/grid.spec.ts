import {Vector3d} from "../domain/domain";
import {grid3d} from "./grid";


describe("grid", () => {
    test("it should have correct  dimensions", () => {

        const dim: Vector3d = {
            x: 10,
            y: 20,
            z: 3
        }

        const grid = grid3d(dim);
        expect(grid.arr.length).toEqual(600);

    }),

        test("it should be able to create from an array-like object", () => {

            const dim: Vector3d = {
                x: 2,
                y: 2,
                z: 2
            }


            const grid = grid3d(dim, new Float32Array([1, 2, 3, 4, 5, 6, 7, 8]));
            expect(grid.arr.length).toEqual(8);
            expect(grid.arr[0]).toEqual(1)
            expect(grid.arr[7]).toEqual(8)

        })
})

