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
}

var PokerHandClassifiers = (function() {

    function scoreComparator(a, b) { return a.score() - b.score(); }

    function cardScore(card) { return card.score(); }

    var HighCardClassifier = function(others) {
	this.name = 'High Card';

	this.isClassifyAs = function(cards) {
	    return others.every(isNotClassified(cards));
	};

	function isNotClassified(cards) {
	    return function(classifier) { return classifier.isClassifyAs(cards) === false; }
	}
    };

    function StraightClassifier() {
	this.name = 'Straight';

	this.isClassifyAs = function(cards) {
	   return isStraight(cards);
	};

	this.getRank = function(cards) {
	    var sortedHands = cards.sort(scoreComparator);
	    return sortedHands[sortedHands.length - 1].score();
	};

	function isStraight(cards) {
	   var actualScores   = cards.map(cardScore).sort(),
	       expectedScores = actualScores.map(function(score, index, array) { return array[0] + index; }),
	       isEquals       = actualScores.length === expectedScores.length && actualScores.join() === expectedScores.join();

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
	    return cards.countBy(cardScore).some(haveDuplicatesScore);
	};

	function haveDuplicatesScore(count) {
	    return count === _number;
	}
    }

    function PairClassifier(_numberOfPairs, _name) {
	this.name = _name;

	this.isClassifyAs = function(cards) {
	    var rankWithPairs = cards
		.countBy(cardScore)
		.filter(isPair);

	    return rankWithPairs.length === _numberOfPairs;
	};

	function isPair(count, rank) { return count === 2; };
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


    var pair          = new PairClassifier(1, 'Pair'),
	twoPairs      = new PairClassifier(2, 'Two Pairs'),
        threeOfKind   = new OfKindClassifier(3, 'Three of a Kind'),
        straight      = new StraightClassifier(),
        flush         = new FlushClassifier(),
        fullhouse     = new CompositeClassifier([pair, threeOfKind], 'Full House'),
        fourOfKind    = new OfKindClassifier(4, 'Four of a Kind'),
	straightflush = new CompositeClassifier([straight, flush], 'Straight Flush'),
	highCard      = new HighCardClassifier([ straightflush, fourOfKind, fullhouse, flush, straight, threeOfKind, twoPairs, pair ]);

    var classifiers = [ straightflush, fourOfKind, fullhouse, flush, straight, threeOfKind, twoPairs, pair, highCard];

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


