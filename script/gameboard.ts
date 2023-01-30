import Cell from "./cell";

type Number = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

class Gameboard {

    board: Cell[];

    #knightSteps = [
        [1, 2],
        [2, 1],
        [-1, 2],
        [-2, 1],
        [1, -2],
        [2, -1],
        [-1, -2],
        [-2, -1]
    ]

    constructor(side: number) {
        this.board = this.#makeBoard(side)
    }

    #makeOneArrRow(num: number, side: number) {
        const arr: [number, number][] = [];
        for(let i = 0; i < side; i += 1) {
            arr.push([num, i])
        }
        return arr;
    } 

    #makeBoardArr(side: number) {
        const arr: [number, number][] = [];
        for (let i = 0; i < side; i += 1) {
            arr.push(...this.#makeOneArrRow(i, side))
        }
        return arr
    }

    #checkNumber(num: number): num is Number {
        return num >= 0 && num < 8
    }

    #makeBoard(side: number) {
        const arr = this.#makeBoardArr(side);
        const boardArr: Cell[] = []
        for (let i = 0; i < arr.length; i += 1) {
            boardArr[i] = new Cell(arr[i]);
        }

        for (let i = 0; i < boardArr.length; i += 1) { 

            for (let j = 0; j < this.#knightSteps.length; j += 1) { 
                const move = boardArr.find((value) => {
                    const coords = [...boardArr[i].coord];
                    coords[0] += this.#knightSteps[j][0];
                    coords[1] += this.#knightSteps[j][1];
                    if (
                        value.coord[0] === coords[0] &&
                        value.coord[1] === coords[1]
                    ) {
                        return true;
                    }
                    return false;
                })

                if (this.#checkNumber(j)) {
                    boardArr[i][`move${j}`] = move || null;
                }
            }
        }

        return boardArr;
    }

    find(start: [number, number]) {
        const cell = this.board.find((value) => {
            if (
                value.coord[0] === start[0] &&
                value.coord[1] === start[1]
            ) {
                return true
            }
            return false
        })

        return cell || null
    }        
        
}

export default Gameboard;