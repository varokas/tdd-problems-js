CardFactory = {
    createByCode: function(code) {
        return new Card(code[0], code[1]);
    }
};

Card = (function() {
    function Card(_rank, _suite) {
        this.rank  = _rank;
        this.suite = _suite;
    }

    var _getScoreByRank = function (_rank) {
        switch(_rank) {
            case 'A': return 14;
            case 'K': return 13;
            case 'Q': return 12;
            case 'J': return 11;
            case 'T': return 10;
            default: return parseInt(_rank, 10);
        }
    };

    Card.prototype.score = function() {
        return _getScoreByRank(this.rank);
    };

    return Card;
})();

function FlushClassifier() {
    this.classifyAs = function(cards) {
       if(isFlush(cards)) return 'Flush';   
    }

    function isFlush(cards) {
       var suite = cards[0].suite
       return cards.every(function(e) { return e.suite === suite })  
    }
}

function OfKindClassifier(_number, _desc) {
    this.classifyAs = function(cards) {
       if(isOfKind(cards)) return _desc;   
    }

    function isOfKind(cards) {
        return countByRank(cards).some(function(e) { return e === _number; });
    }
    
    function countByRank(cards) {
        return cards.reduce(
            function(aggr, card) {
                var counter = aggr[card.rank] || 0
                aggr[card.rank] = counter + 1
                return aggr
        }, []);
    }
}

HandClassifier = (function() {
    function HandClassifier() {
        this.classifiers = [
            new FlushClassifier(), 
            new OfKindClassifier(4, 'Four of a Kind'),
            new OfKindClassifier(3, 'Three of a Kind'),
        ];
    }
    
    HandClassifier.prototype.getHand = function(cards) {
        for (i in this.classifiers) {
            var classifyAs = this.classifiers[i].classifyAs(cards);

            if(classifyAs != undefined) {
                return classifyAs;
            }
        }
    }

    return HandClassifier;
})();

Player = (function() {
    function Player(_name, _cards) {
        this.name  = _name;
        this.cards = _cards.map(function(e) {
            return CardFactory.createByCode(e)
        })
        this.handClassifier = new HandClassifier();
    }

    Player.prototype.rankOnHand = function() {
        return this.handClassifier.getHand(this.cards);   
    };

    return Player;
})();

