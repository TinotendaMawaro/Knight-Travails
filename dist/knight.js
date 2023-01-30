"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Knight_instances, _Knight_isKey, _Knight_knightMoves;
Object.defineProperty(exports, "__esModule", { value: true });
const cell_1 = __importDefault(require("./cell"));
const gameboard_1 = __importDefault(require("./gameboard"));
class Knight {
    constructor(side = 8) {
        _Knight_instances.add(this);
        this.board = new gameboard_1.default(side);
    }
    knightMoves(start, end) {
        const path = __classPrivateFieldGet(this, _Knight_instances, "m", _Knight_knightMoves).call(this, start, end);
        if (path) {
            console.log(`=> You made it in ${path.length - 1} moves! Here's your path: \n`);
            path.forEach((value) => {
                console.log(`[${value}] \n`);
            });
        }
        return path;
    }
}
_Knight_instances = new WeakSet(), _Knight_isKey = function _Knight_isKey(key, obj) {
    if (key !== "coord" && key in obj) {
        return true;
    }
    return false;
}, _Knight_knightMoves = function _Knight_knightMoves(start, end) {
    const startCell = this.board.find(start);
    let endCell = null;
    if (startCell) {
        const queue = [[startCell, []]];
        const visited = [];
        for (let i = 0; i < queue.length; i += 1) {
            const value = queue[i];
            if (!endCell) {
                if (!visited.includes(value[0])) {
                    if (value[0].coord[0] === end[0] &&
                        value[0].coord[1] === end[1]) {
                        endCell = [...value[1], value[0].coord];
                    }
                    else {
                        const keys = Object.keys(value[0]);
                        keys.forEach((key) => {
                            if (__classPrivateFieldGet(this, _Knight_instances, "m", _Knight_isKey).call(this, key, value[0])) {
                                const cell = value[0][key];
                                if (cell instanceof cell_1.default) {
                                    queue.push([cell, [...value[1], value[0].coord]]);
                                }
                            }
                        });
                        visited.push(value[0]);
                        queue.shift();
                    }
                }
            }
        }
    }
    else {
        return null;
    }
    return endCell;
};
console.dir(new Knight().knightMoves([0, 0], [7, 7]), { depth: 1 });
//# sourceMappingURL=knight.js.map