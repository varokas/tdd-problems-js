/*jshint bitwise: true, curly: false, eqeqeq: true, forin: true,
immed: true, latedef: true, newcap: true, noarg: true, noempty: true,
nonew: true, regexp: true, undef: true, globalstrict: true, trailing: true*/
/*global */

'use strict';

Array.prototype.countBy = function(_fn) {
    _fn = _fn || function() { };
    return this.reduce(function(aggr, card, index, array) {
        var key = _fn(card, index, array);
        var counter = aggr[key] || 0;
        aggr[key] = counter + 1;
        return aggr;
    }, []);
};

var HandTypes = {
    HIGH_CARD: { name: 'High Card', order: 0 },
    PAIR: { name: 'Pair', order: 1 },
    TWO_PAIRS: { name: 'Two Pairs', order: 2 },
    THREE_OF_A_KIND: { name: 'Three of a Kind', order: 3 },
    STRAIGHT: { name: 'Straight', order: 4 },
    FLUSH: { name: 'Flush', order: 5 },
    FULL_HOUSE: { name: 'Full House', order: 6},
    FOUR_OF_A_KIND: { name:  'Four of a Kind', order: 7},
    STRAIGHT_FLUSH: { name: 'Straight Flush', order: 8}
};

var PokerHandClassifiers = (function() {

    var HighCardClassifier = function(others) {
        this.name = HandTypes.HIGH_CARD.name;

        this.isClassifyAs = function(cards) {
            return others.every(isNotClassified(cards));
        };

        function isNotClassified(cards) {
            return function(classifier) { return classifier.isClassifyAs(cards) === false; }
        }
    };

    function StraightClassifier() {
        this.name = HandTypes.STRAIGHT.name;

        this.isClassifyAs = function(cards) {
           return isStraight(cards);
        };

        this.getRank = function(cards) {
            var sortedHands = cards.sort(Card.comparator);
            return sortedHands[sortedHands.length - 1].score();
        };

        function isStraight(cards) {
           var actualScores   = cards.map(Card.cardScore).sort(),
               expectedScores = actualScores.map(function(score, index, array) { return array[0] + index; }),
               isEquals       = actualScores.length === expectedScores.length && actualScores.join() === expectedScores.join();

           return isEquals;
        }
    }

    function FlushClassifier() {
        this.name = HandTypes.FLUSH.name;

        this.isClassifyAs = function(cards) {
            return cards.every(haveSameSuite);
        };

        function haveSameSuite(e, index, array) {
            return e.suite === array[0].suite;
        }
    }

    function OfKindClassifier(_number, _name) {
        this.name = _name;

        this.isClassifyAs = function(cards) {
            return cards.countBy(Card.cardScore).some(haveDuplicatesScore);
        };

        function haveDuplicatesScore(count) {
            return count === _number;
        }
    }

    function PairClassifier(_numberOfPairs, _name) {
        this.name = _name;

        this.isClassifyAs = function(cards) {
            var pairs = cards.countBy(Card.cardScore).filter(isPair);
            return pairs.length === _numberOfPairs;
        };

        function isPair(count) {
            return count === 2;
        };
    }

    function CompositeClassifier(_classifiers, _name) {
        this.name = _name;

        this.isClassifyAs = function(cards) {
            return _classifiers.every(isClassified(cards));
        };

        function isClassified(cards) {
            return function (classifier) { return classifier.isClassifyAs(cards); }
        };
    }


    var pair          = new PairClassifier(1, HandTypes.PAIR.name),
        twoPairs      = new PairClassifier(2, HandTypes.TWO_PAIRS.name),
        threeOfKind   = new OfKindClassifier(3, HandTypes.THREE_OF_A_KIND.name),
        straight      = new StraightClassifier(),
        flush         = new FlushClassifier(),
        fullhouse     = new CompositeClassifier([pair, threeOfKind], HandTypes.FULL_HOUSE.name),
        fourOfKind    = new OfKindClassifier(4, HandTypes.FOUR_OF_A_KIND.name),
        straightflush = new CompositeClassifier([straight, flush], HandTypes.STRAIGHT_FLUSH.name),
        highCard      = new HighCardClassifier([ straightflush, fourOfKind, fullhouse, flush, straight, threeOfKind, twoPairs, pair ]);

    var classifiers   = [ straightflush, fourOfKind, fullhouse, flush, straight, threeOfKind, twoPairs, pair, highCard];

    classifiers.forEach(function(self) {
        self.compareTo = function(_other) {
            return classifiers.indexOf(self) - classifiers.indexOf(_other);
        }
    });

    var matches = function(cards) {
        return classifiers.filter(function(classifier) { return classifier.isClassifyAs(cards) })[0];
    };

    return {
        highCard      : highCard,
        pair          : pair,
        twoPairs      : twoPairs,
        threeOfKind   : threeOfKind,
        straight      : straight,
        flush         : flush,
        fullhouse     : fullhouse,
        fourOfKind    : fourOfKind,
        straightflush : straightflush,
        matches       : matches
    };

}());


