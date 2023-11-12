const {checkKeys} = require('../utilities/CheckKeys');

let obj = {
    1:"1",
    2:"2"
};

let allKeys = ["1", "2"];

let partialKeys = ["1", "2", "3"];

const error = new Error("Missing required options: 3");

test('test Check Keys function', () => {

    expect(

        checkKeys(obj, allKeys)

    ).toBe(undefined)

    expect(() => {

        checkKeys(obj, partialKeys)

    }).toThrow(error)

})
