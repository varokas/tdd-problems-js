

describe("When CheckAmount is instantiated with ", function () {

  describe("only units digit", function () {

      it("should return \"one dollar\" when given value is 1", function () {
          expect(new CheckAmount("1").toString()).toEqual("one dollar");
      })

      it("should return \"two dollars\" when given value is 2", function () {
          expect(new CheckAmount("2").toString()).toEqual("two dollars");
      })

      it("should return \"three dollars\" when given value is 3", function () {
          expect(new CheckAmount("3").toString()).toEqual("three dollars");
      })
  });


});