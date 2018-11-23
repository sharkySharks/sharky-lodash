const chunk = require('../chunk');

describe('chunk', () => {
    let array = [1,2,3,4,5,6];

    it('should chunk each element into its own nested array by default if size parameter is not given', () => {
        expect(chunk(array)).to.eql([[1],[2],[3],[4],[5],[6]]);
    });
    it('should return chunked arrays', () => {
        expect(chunk(array, 2)).to.eql([[1,2],[3,4],[5,6]]);
    });
    it('should return the last chunk as remaining elements', () => {
        expect(chunk(array, 4)).to.eql([[1,2,3,4],[5,6]]);
    });
    it('should return a copy of the original array', () => {
        expect(chunk(array, array.length)).to.eql([array]);
        expect(chunk(array, array.length)[0]).to.not.equal(array);
    });
    it('should return an empty array when provided an empty array or the size parameter is larger than the array length', function () {
        expect(chunk([])).to.eql([]);
        expect(chunk(array, array.length + 1)).to.eql([]);
    });

    describe('param validation errors', () => {
        let sizeError = 'The size parameter should be an integer greater than 0 and less than the length of the array.'
        let invalidSizeParams = [
            ['a', 'not a number'],
            [-1, 'less than 1'],
            [3.45, 'not an integer']
        ];

        it('should throw an error if the first parameter is not an array', () => {
            // need to pass a fn to 'expect' for it to execute when testing errors
            // otherwise the result of the fn is passed to 'expect', causing a test error
            expect(() => chunk({1:2,3:4},2)).to.throw(TypeError, 'A valid array needs to be the first argument.');
        });
        invalidSizeParams.forEach((el) => {
            it(`should throw an error if the size parameter is ${el[1]} : ${el[0]}`, () => {
                expect(() => chunk(array, el[0])).to.throw(Error, sizeError);
            });
        });
    });
});
