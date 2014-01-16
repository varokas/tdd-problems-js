

describe("When CheckAmount is instantiated with ", function () {

  describe("only units digit", function () {
      [
        { word: "one dollar", number: "1" },
        { word: "two dollars", number: "2" },
        { word: "three dollars", number: "3" },
      ]
      .forEach( function(e) {
         it("should return \"" + e.word + "\" when given value is " + e.number, function() {
            expect(new CheckAmount(e.number).toString()).toEqual(e.word);
         });
      });
  });


});