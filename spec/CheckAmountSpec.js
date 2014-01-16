

describe("When CheckAmount is instantiated with ", function () {

  describe("only units digit", function () {
      [
        { word: "one dollar", number: "1" },
        { word: "two dollars", number: "2" },
        { word: "three dollars", number: "3" },
        { word: "four dollars", number: "4" },
        { word: "five dollars", number: "5" },
        { word: "six dollars", number: "6" },
        { word: "seven dollars", number: "7" },
        { word: "eight dollars", number: "8" },
        { word: "nine dollars", number: "9" },
      ]
      .forEach( function(e) {
         it("should return \"" + e.word + "\" when given value is " + e.number, function() {
            expect(new CheckAmount(e.number).toString()).toEqual(e.word);
         });
      });
  });


});