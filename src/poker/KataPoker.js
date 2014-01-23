Card = (function() {

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

    function Card(_rank, _suite) {
        this.rank  = _rank;
        this.suite = _suite;
    }

    Card.prototype.score = function() {
       return _getScoreByRank(this.rank);
    };

    return Card;
})();

var CardFactory = {
    createByCode: function(code) {
        return new Card(code[0], code[1]);
    }
};

Player = function Player(_name, _cards) {
    this.name  = _name;
    this.cards = _cards;
};

Player.prototype.nextHighest = function() {
   return 0;
};

