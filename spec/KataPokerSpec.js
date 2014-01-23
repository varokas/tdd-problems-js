describe("PokerGame", function () {

    describe("Cards", function () {

		it("with same rank but different suites should score equally the same", function() {
		    expect(new Card('A', 'C').score()).toEqual(new Card('A', 'D').score());
		    expect(new Card('A', 'D').score()).toEqual(new Card('A', 'H').score());
		    expect(new Card('A', 'H').score()).toEqual(new Card('A', 'S').score());
		});

		describe("should score according to their rank.", function () {
		    [
			{rank : '2',  suite : 'C', score : 2  },
			{rank : '3',  suite : 'C', score : 3  },
			{rank : '4',  suite : 'C', score : 4  },
			{rank : '5',  suite : 'C', score : 5  },
			{rank : '6',  suite : 'C', score : 6  },
			{rank : '7',  suite : 'C', score : 7  },
			{rank : '8',  suite : 'C', score : 8  },
			{rank : '9',  suite : 'C', score : 9  },
			{rank : '10', suite : 'C', score : 10 },
			{rank : 'J',  suite : 'C', score : 11 },
			{rank : 'Q',  suite : 'C', score : 12 },
			{rank : 'K',  suite : 'C', score : 13 },
			{rank : 'A',  suite : 'C', score : 14 },
		    ]
		    .forEach(function(e) {
			it("A card of " + e.rank + e.suite + " should score " + e.score + " points", function() {
			    expect(new Card(e.rank, e.suite).score()).toEqual(e.score);
			});
		    });
		});



    });

});