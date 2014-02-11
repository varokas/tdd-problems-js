/*jshint bitwise: true, curly: false, eqeqeq: true, forin: true,
immed: true, latedef: true, newcap: true, noarg: true, noempty: true,
nonew: true, regexp: true, undef: true, globalstrict: true, trailing: true*/
/* global Card */

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

var ClassifyingResult = function(_handType, _rank) {
    this.handType = _handType;
    this.rank = _rank;

    this.compareTo = function(_another) {
        var handTypeOrder = _another.handType.order - this.handType.order;
        if(handTypeOrder === 0) {
            return _another.rank - this.rank;
        } else {
            return handTypeOrder;
        }
    };
};

var PokerHandClassifiers = (function() {

    function HighCardClassifier(others) {
        this.isClassifyAs = function(cards) {
            return others.every(isNotClassified(cards));
        };

        this.getResult = function(cards) {
            return new ClassifyingResult(HandTypes.HIGH_CARD, 0);
        };

        function isNotClassified(cards) {
            return function(classifier) { return classifier.isClassifyAs(cards) === false; };
        }
    }

    function StraightClassifier() {
        this.isClassifyAs = function(cards) {
           return isStraight(cards);
        };

        this.getResult = function(cards) {
            return new ClassifyingResult(HandTypes.STRAIGHT, this.getRank(cards));
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
        this.isClassifyAs = function(cards) {
            return cards.every(haveSameSuite);
        };

        this.getResult = function(cards) {
            return new ClassifyingResult(HandTypes.FLUSH, 0);
        };


        function haveSameSuite(e, index, array) {
            return e.suite === array[0].suite;
        }
    }

    function OfKindClassifier(_number, _handType) {
        this.name = _handType.name;

        this.isClassifyAs = function(cards) {
            return cards.countBy(Card.cardScore).some(haveDuplicatesScore);
        };

        this.getResult = function(cards) {
            return new ClassifyingResult(_handType, 0);
        };


        function haveDuplicatesScore(count) {
            return count === _number;
        }
    }

    function PairClassifier(_numberOfPairs, _handType) {
        this.name = _handType.name;

        this.isClassifyAs = function(cards) {
            var pairs = cards.countBy(Card.cardScore).filter(isPair);
            return pairs.length === _numberOfPairs;
        };

        this.getResult = function(cards) {
            return new ClassifyingResult(_handType, 0);
        };

        function isPair(count) {
            return count === 2;
        }
    }

    function CompositeClassifier(_classifiers, _handType) {
        this.isClassifyAs = function(cards) {
            return _classifiers.every(isClassified(cards));
        };

        this.getResult = function(cards) {
            return new ClassifyingResult(_handType, 0);
        };


        function isClassified(cards) {
            return function (classifier) {
                return classifier.isClassifyAs(cards);
            };
        }
    }

    var pair          = new PairClassifier(1, HandTypes.PAIR),
        twoPairs      = new PairClassifier(2, HandTypes.TWO_PAIRS),
        threeOfKind   = new OfKindClassifier(3, HandTypes.THREE_OF_A_KIND),
        straight      = new StraightClassifier(),
        flush         = new FlushClassifier(),
        fullhouse     = new CompositeClassifier([pair, threeOfKind], HandTypes.FULL_HOUSE),
        fourOfKind    = new OfKindClassifier(4, HandTypes.FOUR_OF_A_KIND),
        straightflush = new CompositeClassifier([straight, flush], HandTypes.STRAIGHT_FLUSH),
        highCard      = new HighCardClassifier([ straightflush, fourOfKind, fullhouse, flush, straight, threeOfKind, twoPairs, pair ]);

    var classifiers   = [ straightflush, fourOfKind, fullhouse, flush, straight, threeOfKind, twoPairs, pair, highCard];

    var matches = function(cards) {
        return classifiers.filter(function(classifier) { return classifier.isClassifyAs(cards); })[0];
    };

    var getResult = function(cards) {
        return matches(cards).getResult(cards);
    };

    return {
        HighCardClassifier : HighCardClassifier,
        StraightClassifier : StraightClassifier,
        FlushClassifier : FlushClassifier,
        OfKindClassifier : OfKindClassifier,
        PairClassifier : PairClassifier,
        CompositeClassifier : CompositeClassifier,
        matches: matches,
        getResult: getResult
    };

}());


