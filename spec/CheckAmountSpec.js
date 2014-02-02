

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

    describe("hundreds numbers", function () {
        [
            { word: "one hundred twenty dollars", number: 120 },
            { word: "two hundred thirty one dollars", number: 231 },
            { word: "three hundred fourty two dollars", number: 342 },
            { word: "four hundred fifty three dollars", number: 453 },
            { word: "five hundred sixty four dollars", number: 564 },
            { word: "six hundred seventy five dollars", number: 675 },
            { word: "seven hundred eighty six dollars", number: 786 },
            { word: "eight hundred ninety seven dollars", number: 897 },
            { word: "nine hundred twenty eight dollars", number: 928 },
        ]
        .forEach(function (e) {
            it("should return \"" + e.word + "\" when given value is " + e.number, function () {
                expect(new CheckAmount(e.number).toString()).toEqual(e.word);
            });
        });
    });

    describe("thousands numbers", function() {
        [
            { word: "one thousand dollars", number: 1000 },
            { word: "one thousand one dollars", number: 1001 },
            { word: "one thousand nine dollars", number: 1009 },
            { word: "one thousand ten dollars", number: 1010 },
            { word: "one thousand one hundred dollars", number: 1100 },
            { word: "three thousand dollars", number: 3000 },
            { word: "seven thousand dollars", number: 7000 },
            { word: "twelve thousand dollars", number: 12000 },
        ].forEach(function (e) {
            it("should return \"" + e.word + "\" when given value is " + e.number, function () {
                expect(new CheckAmount(e.number).toString()).toEqual(e.word);
            });
        });
    });

    describe("million numbers", function () {
        [
            { word: "one million dollars", number: 1000000 },
        ].forEach(function (e) {
            it("should return \"" + e.word + "\" when given value is " + e.number, function () {
                expect(new CheckAmount(e.number).toString()).toEqual(e.word);
            });
        });
    });

    describe("mixed numbers", function() {
        [
            { word: "thirty three thousand three hundred dollars", number: 33300 },
            { word: "nine hundred two thousand three hundred fifty one dollars", number: 902351 },
            { word: "fifty three thousand dollars", number: 53000 },
            { word: "four hundred fifty three thousand three hundred fifty one dollars", number: 453351 },
            { word: "four hundred fifty three thousand three hundred fifty one dollars", number: 1000000 },
        ].forEach(function (e) {
            it("should return \"" + e.word + "\" when given value is " + e.number, function () {
                debugger
                expect(new CheckAmount(e.number).toString()).toEqual(e.word);
            });
        });
    });

});
