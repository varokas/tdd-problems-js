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

    describe('Classifiers', function() {
        describe('StraightFlushClassifier', function() {
            it("has name of 'Straight Flush'", function() {
                expect(new StraightClassifier().name).toBe("Straight");
            });

            it("getRank() returns highest card", function() {
                var cards = Hand.create(['3S', '7D', '5S', '4S', '6H']);
                expect(new StraightClassifier().getRank(cards)).toBe(7);
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
        it('should say White win by Straight Flush', function() {
            var black = PlayerTurn.create('Black', ['2S', '8S', 'AS', 'QS', '3S']);
            var white = PlayerTurn.create('White', ['3S', '4S', '5S', '6S', '7S']);
            expect(new Casino(black, white).judge()).toEqual('White wins. - with straight flush');
        });
        it('should say White win by Flush', function() {
            var black = PlayerTurn.create('Black', ['2H', '3S', '4C', '2D', '4H']);
            var white = PlayerTurn.create('White', ['2S', '8S', 'AS', 'QS', '3S']);
            expect(new Casino(black, white).judge()).toEqual('White wins. - with flush');
        });
        it('should say White win by Full house when Black has Flush and White has Full house', function() {
            var black = PlayerTurn.create('Black', ['2S', '8S', 'AS', 'QS', '3S']);
            var white = PlayerTurn.create('White', ['2H', '4S', '4C', '2D', '4H']);
            expect(new Casino(black, white).judge()).toEqual('White wins. - with full house');
        });
    });
});
