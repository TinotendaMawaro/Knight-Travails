import Cell from "./cell";
import Gameboard from "./gameboard";

class Knight {

    board: Gameboard;

    constructor(side = 8) {
        this.board = new Gameboard(side);
    }

    #isKey(key: string, obj: Cell): key is keyof Cell {
        if (key !== "coord" && key in obj) {
            return true
        }

        return false
    }


    #knightMoves(start: [number, number], end: [number, number]): [number, number][] | null {
        const startCell = this.board.find(start);
        let endCell: [number, number][] | null = null;

        if (startCell) {
            const queue: [Cell, [number, number][]][] = [[startCell, []]]
            const visited: Cell[] = [];

            for (let i = 0; i < queue.length; i += 1) {
                const value = queue[i];
                if (!endCell) {
                    if (!visited.includes(value[0])) {
                        if (
                            value[0].coord[0] === end[0] &&
                            value[0].coord[1] === end[1]
                        ) {
                            endCell = [...value[1], value[0].coord];
                        } else {
                            const keys = Object.keys(value[0]);
                            keys.forEach((key) => {
                                if (this.#isKey(key, value[0])) {
                                    const cell = value[0][key];
                                    if (cell instanceof Cell) {
                                        queue.push([cell, [...value[1], value[0].coord]]);
                                    }
                                }
                            })

                            visited.push(value[0])
                            queue.shift();
                        }
                    }
                }
            }
            
        } else {
            return null
        }

        return endCell;
    }

    
    knightMoves(start: [number, number], end: [number, number]) {
        const path = this.#knightMoves(start, end);
        if (path) {
            console.log(`=> You made it in ${path.length - 1} moves! Here's your path: \n`);
            path.forEach((value) => {
                console.log(`[${value}] \n`)
            })
        }
        return path
    }

}

console.dir(new Knight().knightMoves([0, 0], [7, 7]), {depth: 1})