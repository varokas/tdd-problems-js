/* global describe, it, expect */

describe('PokerGame', function () {
    "use strict";

    describe('Cards', function () {
        it('with same rank but different suites should score equally the same', function() {
            expect(new Card('A', 'C').score()).toEqual(new Card('A', 'D').score());
            expect(new Card('A', 'D').score()).toEqual(new Card('A', 'H').score());
            expect(new Card('A', 'H').score()).toEqual(new Card('A', 'S').score());
        });

        describe('should score according to their rank.', function () {
            [
                {rank : '2',  suite : 'C', score : 2  },
                {rank : '3',  suite : 'C', score : 3  },
                {rank : '4',  suite : 'C', score : 4  },
                {rank : '5',  suite : 'C', score : 5  },
                {rank : '6',  suite : 'C', score : 6  },
                {rank : '7',  suite : 'C', score : 7  },
                {rank : '8',  suite : 'C', score : 8  },
                {rank : '9',  suite : 'C', score : 9  },
                {rank : 'T',  suite : 'C', score : 10 },
                {rank : 'J',  suite : 'C', score : 11 },
                {rank : 'Q',  suite : 'C', score : 12 },
                {rank : 'K',  suite : 'C', score : 13 },
                {rank : 'A',  suite : 'C', score : 14 },
            ].forEach(function(e) {
                it('A card of ' + e.rank + e.suite + ' should score ' + e.score + ' points', function() {
                    expect(new Card(e.rank, e.suite).score()).toEqual(e.score);
                });
            });
        });

        it('can create card from shorthand notation', function() {
            var card = Card.fromCode("TD");
            expect(card.rank).toEqual('T');
            expect(card.suite).toEqual('D');
        });
    });

    describe('HandTypes', function() {
        [
            {constName : 'HIGH_CARD',  name:  'High Card'  },
            {constName : 'PAIR',  name:  'Pair'  },
            {constName : 'TWO_PAIRS',  name:  'Two Pairs'  },
            {constName : 'THREE_OF_A_KIND',  name:  'Three of a Kind'  },
            {constName : 'STRAIGHT',  name:  'Straight'  },
            {constName : 'FLUSH',  name:  'Flush'  },
            {constName : 'FULL_HOUSE',  name:  'Full House'  },
            {constName : 'FOUR_OF_A_KIND',  name:  'Four of a Kind'  },
            {constName : 'STRAIGHT_FLUSH',  name:  'Straight Flush'  }
        ].forEach(function(e) {
            it('A const name ' + e.constName + ' should have name ' + e.name, function() {
                expect(HandTypes[e.constName].name).toBe(e.name);
            });
        });

        [
            {constName : 'HIGH_CARD',  order: 0  },
            {constName : 'PAIR',  order: 1  },
            {constName : 'TWO_PAIRS', order: 2  },
            {constName : 'THREE_OF_A_KIND', order: 3 },
            {constName : 'STRAIGHT', order: 4 },
            {constName : 'FLUSH', order: 5 },
            {constName : 'FULL_HOUSE', order: 6 },
            {constName : 'FOUR_OF_A_KIND', order: 7 },
            {constName : 'STRAIGHT_FLUSH', order: 8 }
        ].forEach(function(e) {
            it('A const name ' + e.constName + ' should have an order of ' + e.order, function() {
                expect(HandTypes[e.constName].order).toBe(e.order);
            });
        });
    });

    describe('ClassifyingResult', function() {
        describe('compare()', function() {
            it('should order by handType order', function() {
                var a = new ClassifyingResult(HandTypes.STRAIGHT_FLUSH, 0);
                var b = new ClassifyingResult(HandTypes.TWO_PAIRS, 0);

                expect(a.compareTo(b)).toBeLessThan(0);
            });

            it('should order by rank if handType are equals', function() {
                var a = new ClassifyingResult(HandTypes.STRAIGHT, 6);
                var b = new ClassifyingResult(HandTypes.STRAIGHT, 3);

                expect(a.compareTo(b)).toBeLessThan(0);
            });
        });
    });

    describe('Classifiers', function() {
        describe('HighCardClassifier', function() {
            it("getResult() returns hand type of HIGH_CARD", function() {
                expect((new PokerHandClassifiers.HighCardClassifier()).getResult().handType).toBe(HandTypes.HIGH_CARD);
            });
        });

        describe('StraightClassifier', function() {
            var classifier = (new PokerHandClassifiers.StraightClassifier());
            var player = PlayerTurn.create('White', ['3S', '7D', '5S', '4S', '6H']);
            var hand = player.hand;

            it("getResult() returns hand type of STRAIGHT", function() {
                expect(classifier.getResult(hand).handType).toBe(HandTypes.STRAIGHT);
            });


            it("getResult() returns correct rank", function() {
                expect(classifier.getResult(hand).rank).toBe(7);
            });
        });

        describe('FlushClassifier', function() {
            it("getResult() returns hand type of FLUSH", function() {
                expect((new PokerHandClassifiers.FlushClassifier()).getResult().handType).toBe(HandTypes.FLUSH);
            });
        });

        describe('OfKindClassifier', function() {
            it("getResult() returns the hand type given", function() {
                var givenHandType = HandTypes.THREE_OF_A_KIND;

                expect((new PokerHandClassifiers.OfKindClassifier(3, givenHandType)).getResult().handType).toBe(givenHandType);
            });
        });

        describe('PairClassifier', function() {
            it("getResult() returns the hand type given", function() {
                var givenHandType = HandTypes.PAIR;

                expect((new PokerHandClassifiers.PairClassifier(1, givenHandType)).getResult().handType).toBe(givenHandType);
            });
        });

        describe('CompositeClassifier', function() {
            it("getResult() returns the hand type given", function() {
                var givenHandType = HandTypes.FULL_HOUSE;

                expect((new PokerHandClassifiers.CompositeClassifier([], givenHandType)).getResult().handType).toBe(givenHandType);
            });
        });
    });

    describe('PlayerTurn', function() {
        it('can show "High Card" if hand do not fit any higher category', function() {
            var white = PlayerTurn.create('White', ['3S', '1C', '4D', '9H', '6S']);
            expect('High Card').toEqual(white.rankOnHand());
        });

        it('can show "Pair" if hand contains 2 of 5 cards with same value', function() {
            var white = PlayerTurn.create('White', ['3S', '3C', '4D', '5H', '6H']);
            expect('Pair').toEqual(white.rankOnHand());
        });

        it('can show "Two Pairs" if hand contains 2 different pairs', function() {
            var white = PlayerTurn.create('White', ['3S', '3C', '4D', '4H', '6H']);
            expect('Two Pairs').toEqual(white.rankOnHand());
        });

        it('can show "Three of a Kind" if hand contains 3 same value of the cards', function() {
            var white = PlayerTurn.create('White', ['3S', '3C', '3D', '4H', '5H']);
            expect('Three of a Kind').toEqual(white.rankOnHand());
        });

        it('can show "Straight" if hand contains 5 cards with consecutive values', function() {
            var white = PlayerTurn.create('white', ['3S', '4S', '5S', '6H', '7D']);
            expect('Straight').toEqual(white.rankOnHand());
        });

        it('can show "Flush" if hand contains 5 cards of the same suit', function() {
            var white = PlayerTurn.create('White', ['2S', '8S', 'AS', 'QS', '3S']);
            expect('Flush').toEqual(white.rankOnHand());
        });

        it('can show "Four of a Kind" if hand contains 4 same value of the cards', function() {
            var white = PlayerTurn.create('White', ['3S', '3C', '3D', '4H', '3H']);
            expect('Four of a Kind').toEqual(white.rankOnHand());
        });

        it('can show "Full House" if hand contains 3 cards of the same value, with the remaining 2 cards forming a pair', function() {
            var white = PlayerTurn.create('White', ['3S', '3C', '3D', '5S', '5C']);
            expect('Full House').toEqual(white.rankOnHand());
        });

        it('can show "Straight Flush" if hand contains 5 cards of the same suit with consecutive value', function() {
            var white = PlayerTurn.create('white', ['3S', '4S', '5S', '6S', '7S']);
            expect(white.rankOnHand()).toEqual('Straight Flush');
        });
    });

    describe('Casino', function() {

	    var highCard  = ['5H', '7C', 'QD', 'KC', '9C'],
	    pair          = ['8H', '8C', '6C', 'AH', '5S'],
	    twoPairs      = ['KD', 'KS', '3H', '3C', '4C'],
	    threeOfKind   = ['TH', 'TS', 'TC', '8D', 'KH'],
	    straight      = ['4H', '5C', '6S', '7H', '8S'],
	    flush         = ['7S', '9S', 'AS', 'JS', '3S'],
	    fullHouse     = ['JH', 'QS', 'QC', 'JD', 'JC'],
	    fourOfKind    = ['2S', '2D', '2H', '2C', 'AC'],
	    straightflush = ['3D', '4D', '5D', '6D', '7D'];

	it('should say White win by Straight Flush over Black Four of a kind', function() {
	    var black = PlayerTurn.create('Black', fourOfKind);
	    var white = PlayerTurn.create('White', straightflush);
	    expect(new Casino(black, white).judge()).toEqual('White wins. - with straight flush');
	});

	it('should say White win by Four of Kind over Black Full house', function() {
	    var white = PlayerTurn.create('White', fourOfKind);
	    var black = PlayerTurn.create('Black', fullHouse);
	    expect(new Casino(black, white).judge()).toEqual('White wins. - with four of a kind');
	});

	it('should say Black win by Full house over White Flush', function() {
	    var white = PlayerTurn.create('White', flush);
	    var black = PlayerTurn.create('Black', fullHouse);
	    expect(new Casino(black, white).judge()).toEqual('Black wins. - with full house');
	});

	it('should say Black win by Flush over White Straight', function() {
	    var white = PlayerTurn.create('White', straight);
	    var black = PlayerTurn.create('Black', flush);
	    expect(new Casino(black, white).judge()).toEqual('Black wins. - with flush');
	});

	it('should say White win by Straight over Black Three of a Kind', function() {
	    var black = PlayerTurn.create('Black', threeOfKind);
	    var white = PlayerTurn.create('White', straight);
	    expect(new Casino(black, white).judge()).toEqual('White wins. - with straight');
	});

	it('should say White win by Three of a Kind over Black Two Pairs', function() {
	    var black = PlayerTurn.create('Black', twoPairs);
	    var white = PlayerTurn.create('White', threeOfKind);
	    expect(new Casino(black, white).judge()).toEqual('White wins. - with three of a kind');
	});

	it('should say Black win by Two Pairs over White Pair', function() {
	    var white = PlayerTurn.create('White', pair);
	    var black = PlayerTurn.create('Black', twoPairs);
	    expect(new Casino(black, white).judge()).toEqual('Black wins. - with two pairs');
	});

	it('should say White win by Pair over Black High Card', function() {
	    var black = PlayerTurn.create('Black', highCard);
	    var white = PlayerTurn.create('White', pair);
	    expect(new Casino(black, white).judge()).toEqual('White wins. - with pair');
	});

	describe('Tight game', function() {
	    it('should say Black win by Straight over White Straight but lower card ranks', function() {
		var black = PlayerTurn.create('Black', ['4H', '5C', '6S', '7H', '8S']);
		var white = PlayerTurn.create('White', ['3H', '4C', '5S', '6H', '7S']);
		expect(new Casino(black, white).judge()).toEqual('Black wins. - with straight');
	    });
	});

    });
});
