
class Cell {

    readonly coord;

    move0: Cell | null = null;

    move1: Cell | null = null;

    move2: Cell | null = null;

    move3: Cell | null = null;

    move4: Cell | null = null;

    move5: Cell | null = null;

    move6: Cell | null = null;

    move7: Cell | null = null;

    constructor(coord: [number, number]) {
        this.coord = coord;
    }
}

export default Cell
