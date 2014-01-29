/*jshint bitwise: true, curly: false, eqeqeq: true, forin: true,
immed: true, latedef: true, newcap: true, noarg: true, noempty: true,
nonew: true, regexp: true, undef: true, strict: true, trailing: true*/
/*global */

function Card(_rank, _suite) {
    'use strict';
    this.rank  = _rank;
    this.suite = _suite;

    this.score = function() {
        return getScoreByRank(this.rank);
    };

    function getScoreByRank(_rank) {
        switch(_rank) {
            case 'A': return 14;
            case 'K': return 13;
            case 'Q': return 12;
            case 'J': return 11;
            case 'T': return 10;
            default: return parseInt(_rank, 10);
        }
    }
}

var CardFactory = (function(){
    'use strict';
    var createByCode = function(code) {
        return new Card(code[0], code[1]);
    };

    return { createByCode: createByCode };
}());

function FlushClassifier() {
    'use strict';
    this.classifyAs = function(cards) {
       if(isFlush(cards)) return 'Flush';
    };

    function isFlush(cards) {
       var suite = cards[0].suite;
       return cards.every(function(e) { return e.suite === suite; });
    }
}

function OfKindClassifier(_number, _desc) {
    'use strict';
    this.classifyAs = function(cards) {
       if(isOfKind(cards)) return _desc;
    };

    function isOfKind(cards) {
        return countByRank(cards).some(function(e) { return e === _number; });
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

var FullHouseClassifier = function(pairClassifier) {
    'use strict';
    var toSet = function(list) {
        var _set = [];
        list.forEach(function(elem) {
            if (_set.indexOf(elem) === -1) {
                _set.push(elem);
            }
        });
        return _set;
    };
    var isThreeValue = function(cards) {
        var _ranks = cards.map(function(card) {
            return card.rank;
        });
        var _set = toSet(_ranks).sort(function(a, b) { return a > b; });
        var isThree = false;
        _set.forEach(function(rank) {
            var _members = _ranks.filter(function(e) { return e === rank; });
            if (_members.length === 3) {
                isThree = true;
            }
        });
        return isThree;
    };
    var isPair = function(cards) {
        if (pairClassifier.classifyAs(cards) !== undefined) {
            return true;
        }
        return false;
    };
    this.classifyAs = function(cards) {
        if (isThreeValue(cards) && isPair(cards)) {
            return 'Full House';
        }
    }
}

var HandClassifier = (function() {
    'use strict';
    var classifiers = [
        new FlushClassifier(),
        new OfKindClassifier(4, 'Four of a Kind'),
        new OfKindClassifier(3, 'Three of a Kind'),
        new OfKindClassifier(2, 'Pair'),
        new FullHouseClassifier(new OfKindClassifier(2, 'Pair')),
    ];

    var getHand = function(cards) {
        var res;
        classifiers.forEach(function(classifier) {
            var _class = classifier.classifyAs(cards);
            if (_class !== undefined) {
              res =  _class;
            }
        });

        return res;
    };

    return { getHand: getHand };
}());

function Player(_name, _cards) {
    'use strict';
    this.name  = _name;
    this.cards = _cards.map(function(e) {
        return CardFactory.createByCode(e);
    });

    this.rankOnHand = function() {
        return HandClassifier.getHand(this.cards);
    };
}



