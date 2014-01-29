/*jshint bitwise: true, curly: false, eqeqeq: true, forin: true,
immed: true, latedef: true, newcap: true, noarg: true, noempty: true,
nonew: true, regexp: true, undef: true, strict: true, trailing: true*/
/*global */

'use strict';

var HighCardClassifier = function(others) {

    this.name = 'High Card';

    this.isClassifyAs = function(cards) {
        return others.every(function(classifier) { return classifier.isClassifyAs(cards) === false })
    }
}

function StraightClassifier() {

    this.name = 'Straight';

    this.isClassifyAs = function(cards) {
       return isStraight(cards);
    };

    function isStraight(cards) {
       var actualScores   = cards.map(function(c) { return c.score() }).sort(),
           expectedScores = actualScores.map(function(score, index, array) { return array[0] + index }),
           isEquals       = actualScores.length === expectedScores.length && actualScores.join() == expectedScores.join();

       return isEquals;
    }
}

function FlushClassifier() {

    this.name = 'Flush';

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
        return countByRank(cards).some(haveDuplicatesRank);
    };

    function haveDuplicatesRank(count) {
        return count === _number;
    }

    function countByRank(cards) {
        return cards.reduce(
            function(aggr, card) {
                var counter = aggr[card.rank] || 0;
                aggr[card.rank] = counter + 1;
                return aggr;
        }, []);
    }
}

var CompositeClassifier = function(_classifiers, _name) {

    this.name = _name;

    this.isClassifyAs = function(cards) {
        return _classifiers.every(function(classifier) { return classifier.isClassifyAs(cards); })
    }
}

var PokerHandClassifiers = (function() {

    var pair          = new OfKindClassifier(2, 'Pair'),
        threeOfKind   = new OfKindClassifier(3, 'Three of a Kind'),
        straight      = new StraightClassifier(),
        flush         = new FlushClassifier(),
        fullhouse     = new CompositeClassifier([pair, threeOfKind], 'Full House'),
        fourOfKind    = new OfKindClassifier(4, 'Four of a Kind'),
        straightflush = new CompositeClassifier([straight, flush], 'Straight Flush');

    var classifiers = [ straightflush, fourOfKind, fullhouse, flush, straight, threeOfKind, pair ];

    var matches = function(cards) {

        var matchedClassifier = classifiers.reduce(function(result, classifier) {
            return result || (classifier.isClassifyAs(cards) ? classifier : undefined);
        }, undefined);

        return matchedClassifier || new HighCardClassifier([classifiers]);
    };

    return { matches: matches };
}());


