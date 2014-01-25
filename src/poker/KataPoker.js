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

Player = (function() {
    function Player(_name, _cards) {
        this.name  = _name;
        this.cards = _cards.map(function(e) {
            return CardFactory.createByCode(e)
        })
    }

    function isFlush(cards) {
        var suite = cards[0].suite
        return cards.every(function(e) { return e.suite === suite })
    }

    function isThreeOfKind(cards) {
        return countByRank(cards).some(function(e) { return e === 3 })
    }

    function countByRank(cards) {
        return cards.reduce(
            function(aggr, card) {
                var counter = aggr[card.rank] || 0
                aggr[card.rank] = counter + 1
                return aggr
        }, []);
    }

    Player.prototype.rankOnHand = function() {

        if (isFlush(this.cards))
            return 'Flush';

        if (isThreeOfKind(this.cards))
            return 'Three of a Kind'

        return 'High Card'
    };

    return Player;
})();

