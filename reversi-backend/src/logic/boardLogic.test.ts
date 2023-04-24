import { isOutOfBounds, updateBoardWithNewMove } from "./boardLogic"


describe('game logic', ()=>{
    describe('isOutOfBounds', ()=>{
        it("returns true when coordinates are out of bounds", ()=>{
            expect(isOutOfBounds({row: 1111, col: -4}, 8)).toBe(true)
            expect(isOutOfBounds({row: 1, col: 8}, 8)).toBe(true)
            expect(isOutOfBounds({row: -1, col: 0}, 8)).toBe(true)

        })

        it("returns false when coordinates are in bounds", () => {
            expect(isOutOfBounds({row: 4, col: 4}, 8)).toBe(false)
            expect(isOutOfBounds({row: 7, col: 7}, 8)).toBe(false)
            expect(isOutOfBounds({row: 0, col: 7}, 8)).toBe(false)
        })
    })

    describe('updateBoardWithNewMove', ()=>{
        it('successfully flips vertical tiles', ()=>{
            const board = [
                ['empty', 'empty', 'empty', 'empty'],
                ['empty', 'white', 'black', 'empty'],
                ['empty', 'black', 'white', 'empty'],
                ['empty', 'empty', 'empty', 'empty']
            ] as any;

            const updatedBoard = [
                ['empty', 'black', 'empty', 'empty'],
                ['empty', 'black', 'black', 'empty'],
                ['empty', 'black', 'white', 'empty'],
                ['empty', 'empty', 'empty', 'empty']
            ] as any;

            expect(JSON.stringify(updateBoardWithNewMove(board, {row: 0, col: 1}, 'black'))).toEqual(JSON.stringify(updatedBoard))
        })

        it('successfully flips horizontal tiles', ()=>{
            const board = [
                ['empty', 'empty', 'empty', 'empty'],
                ['empty', 'white', 'black', 'empty'],
                ['empty', 'black', 'white', 'empty'],
                ['empty', 'empty', 'empty', 'empty']
            ] as any;

            const updatedBoard = [
                ['empty', 'empty', 'empty', 'empty'],
                ['black', 'black', 'black', 'empty'],
                ['empty', 'black', 'white', 'empty'],
                ['empty', 'empty', 'empty', 'empty']
            ] as any;

            expect(JSON.stringify(updateBoardWithNewMove(board, {row: 1, col: 0}, 'black'))).toEqual(JSON.stringify(updatedBoard))
        })

        it('successfully flips diagonal tiles', ()=>{
            const board = [
                ['empty', 'empty', 'empty', 'empty'],
                ['black', 'black', 'black', 'empty'],
                ['empty', 'black', 'white', 'empty'],
                ['empty', 'empty', 'empty', 'empty']
            ] as any;

            const updatedBoard = [
                ['white', 'empty', 'empty', 'empty'],
                ['black', 'white', 'black', 'empty'],
                ['empty', 'black', 'white', 'empty'],
                ['empty', 'empty', 'empty', 'empty']
            ] as any;

            expect(JSON.stringify(updateBoardWithNewMove(board, {row: 0, col: 0}, 'white'))).toEqual(JSON.stringify(updatedBoard))
        })
    })
})