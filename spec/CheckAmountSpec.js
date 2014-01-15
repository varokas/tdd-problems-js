

describe("When CheckAmount is instantiated with ", function () {

  describe("\"1\"", function () {

      var checkAmount = new CheckAmount("1");

      it("should return \"one dollar\"", function () {
          expect(checkAmount.toString()).toEqual("one dollar");
      })

  });

  describe("\"2\"", function () {

      var checkAmount = new CheckAmount("2");

      it("should return \"two dollars\"", function () {
          expect(checkAmount.toString()).toEqual("two dollars");
      })

  });


});