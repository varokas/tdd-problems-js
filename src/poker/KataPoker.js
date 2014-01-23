Card = (function() {

    var rank;
    var suite;

    function Card(_rank, _suite) {
	rank  = _rank
	suite = _suite
    }

    Card.prototype.score = function() {
	   return _getScoreByRank(rank);
    }

    function _getScoreByRank(_rank) {
        switch(_rank) {
            case 'A': return 14;
            case 'K': return 13;
            case 'Q': return 12;
            case 'J': return 11;
            case 'T': return 10;
            default: return parseInt(_rank);
        }
    }

    return Card;
})();

var CardFactory = {
    createByCode: function(code) {
        return null;
    }
}

