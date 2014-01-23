var CardFactory = {
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
        this.cards = _cards;

        this.onHandRanks = [];
        for(card in this.cards)
            this.onHandRanks.push(CardFactory.createByCode(this.cards[card]).score());
        this.onHandRanks.reverse();
    };

    Player.prototype.nextHighest = function() {
        highest = this.onHandRanks[0]
        this.onHandRanks.shift()

        return highest;
    };

    return Player;
})();

