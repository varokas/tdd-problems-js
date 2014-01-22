Card = (function() {

    var rank;
    var suite;

    function Card(_rank, _suite) {
	rank  = _rank
	suite = _suite
    }

    Card.prototype.score = function() {
	return 2
    }

    return Card;
})();
