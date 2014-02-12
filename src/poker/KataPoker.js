/*jshint bitwise: true, curly: false, eqeqeq: true, forin: true,
immed: true, latedef: true, newcap: true, noarg: true, noempty: true,
nonew: true, regexp: true, undef: true, globalstrict: true, trailing: true*/

/* global PokerHandClassifiers */
'use strict';

function Card(_rank, _suite) {
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
            default : return parseInt(_rank, 10);
        }
    }
}

Card.fromCode = function(code) {
    return new Card(code[0], code[1]);
};

Card.comparator = function(a, b) {
    return a.score() - b.score();
};

Card.cardScore = function(card) {
    return card.score();
};

function PlayerTurn(_name, _hand) {
    this.name       = _name;
    this.hand       = _hand;
    this.handResult = PokerHandClassifiers.getResult(_hand);

    this.rankOnHand = function() {
        return this.handResult.handType.name;
    };

    this.compareTo = function(_otherPlayer) {
        return this.handResult.compareTo(_otherPlayer.handResult);
    };
}

PlayerTurn.create = function(_name, _shortCards) {
    var hand = _shortCards.map(Card.fromCode);
    return new PlayerTurn(_name, hand);
};

function Casino(_player1, _player2) {
    this.judge = function() {
        var winner = _player1.compareTo(_player2) < 0 ? _player1 : _player2;
        return winner.name + " wins. - with " + winner.rankOnHand().toLowerCase();
    };
}



