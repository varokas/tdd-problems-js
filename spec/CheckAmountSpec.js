

describe("When CheckAmount is instantiated with ", function () {

    describe("only units digit", function () {
        [
            { word: "one dollar", number: 1 },
            { word: "two dollars", number: 2 },
            { word: "three dollars", number: 3 },
            { word: "four dollars", number: 4 },
            { word: "five dollars", number: 5 },
            { word: "six dollars", number: 6 },
            { word: "seven dollars", number: 7 },
            { word: "eight dollars", number: 8 },
            { word: "nine dollars", number: 9 },
        ]
        .forEach( function(e) {
            it("should return \"" + e.word + "\" when given value is " + e.number, function() {
                expect(new CheckAmount(e.number).toString()).toEqual(e.word);
            });
        });
    });

    describe("teen numbers", function () {
        [
            { word: "ten dollars", number: 10 },
            { word: "eleven dollars", number: 11 },
            { word: "twelve dollars", number: 12 },
            { word: "thirteen dollars", number: 13 },
            { word: "fourteen dollars", number: 14 },
            { word: "fifteen dollars", number: 15 },
            { word: "sixteen dollars", number: 16 },
            { word: "seventeen dollars", number: 17 },
            { word: "eighteen dollars", number: 18 },
            { word: "nineteen dollars", number: 19 },
        ]
        .forEach(function (e) {
            it("should return \"" + e.word + "\" when given value is " + e.number, function () {
                expect(new CheckAmount(e.number).toString()).toEqual(e.word);
            });
        });
    });

    describe("other ten numbers", function () {
        [
            { word: "twenty dollars", number: 20 },
            { word: "thirty one dollars", number: 31 },
            { word: "fourty two dollars", number: 42 },
            { word: "fifty three dollars", number: 53 },
            { word: "sixty four dollars", number: 64 },
            { word: "seventy five dollars", number: 75 },
            { word: "eighty six dollars", number: 86 },
            { word: "ninety seven dollars", number: 97 },
            { word: "twenty eight dollars", number: 28 },
            { word: "thirty nine dollars", number: 39 },
        ]
        .forEach(function (e) {
            it("should return \"" + e.word + "\" when given value is " + e.number, function () {
                expect(new CheckAmount(e.number).toString()).toEqual(e.word);
            });
        });
    });

    describe("thousands", function() {
        it("should return \"one thousand dollars\" when given value is 1000", function() {
            expect(new CheckAmount(1000).toString()).toEqual("one thousand dollars");
        });
        it("should return \"one thousand one dollars\" when given value is 1001", function() {
            expect(new CheckAmount(1001).toString()).toEqual("one thousand one dollars");
        });
    });

});
