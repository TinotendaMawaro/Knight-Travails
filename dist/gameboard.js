"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Gameboard_instances, _Gameboard_knightSteps, _Gameboard_makeOneArrRow, _Gameboard_makeBoardArr, _Gameboard_checkNumber, _Gameboard_makeBoard;
Object.defineProperty(exports, "__esModule", { value: true });
const cell_1 = __importDefault(require("./cell"));
class Gameboard {
    constructor(side) {
        _Gameboard_instances.add(this);
        _Gameboard_knightSteps.set(this, [
            [1, 2],
            [2, 1],
            [-1, 2],
            [-2, 1],
            [1, -2],
            [2, -1],
            [-1, -2],
            [-2, -1]
        ]);
        this.board = __classPrivateFieldGet(this, _Gameboard_instances, "m", _Gameboard_makeBoard).call(this, side);
    }
    find(start) {
        const cell = this.board.find((value) => {
            if (value.coord[0] === start[0] &&
                value.coord[1] === start[1]) {
                return true;
            }
            return false;
        });
        return cell || null;
    }
}
_Gameboard_knightSteps = new WeakMap(), _Gameboard_instances = new WeakSet(), _Gameboard_makeOneArrRow = function _Gameboard_makeOneArrRow(num, side) {
    const arr = [];
    for (let i = 0; i < side; i += 1) {
        arr.push([num, i]);
    }
    return arr;
}, _Gameboard_makeBoardArr = function _Gameboard_makeBoardArr(side) {
    const arr = [];
    for (let i = 0; i < side; i += 1) {
        arr.push(...__classPrivateFieldGet(this, _Gameboard_instances, "m", _Gameboard_makeOneArrRow).call(this, i, side));
    }
    return arr;
}, _Gameboard_checkNumber = function _Gameboard_checkNumber(num) {
    return num >= 0 && num < 8;
}, _Gameboard_makeBoard = function _Gameboard_makeBoard(side) {
    const arr = __classPrivateFieldGet(this, _Gameboard_instances, "m", _Gameboard_makeBoardArr).call(this, side);
    const boardArr = [];
    for (let i = 0; i < arr.length; i += 1) {
        boardArr[i] = new cell_1.default(arr[i]);
    }
    for (let i = 0; i < boardArr.length; i += 1) {
        for (let j = 0; j < __classPrivateFieldGet(this, _Gameboard_knightSteps, "f").length; j += 1) {
            const move = boardArr.find((value) => {
                const coords = [...boardArr[i].coord];
                coords[0] += __classPrivateFieldGet(this, _Gameboard_knightSteps, "f")[j][0];
                coords[1] += __classPrivateFieldGet(this, _Gameboard_knightSteps, "f")[j][1];
                if (value.coord[0] === coords[0] &&
                    value.coord[1] === coords[1]) {
                    return true;
                }
                return false;
            });
            if (__classPrivateFieldGet(this, _Gameboard_instances, "m", _Gameboard_checkNumber).call(this, j)) {
                boardArr[i][`move${j}`] = move || null;
            }
        }
    }
    return boardArr;
};
exports.default = Gameboard;
//# sourceMappingURL=gameboard.js.map