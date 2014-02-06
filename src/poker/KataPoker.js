/*jshint bitwise: true, curly: false, eqeqeq: true, forin: true,
immed: true, latedef: true, newcap: true, noarg: true, noempty: true,
nonew: true, regexp: true, undef: true, globalstrict: true, trailing: true*/

/* global PokerHandClassifiers */
"use strict";

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
            default: return parseInt(_rank, 10);
        }
    }
}

Card.fromCode = function(code) {
    return new Card(code[0], code[1]);
};

function PlayerTurn(_name, _hand, _classifier) {
    this.name       = _name;
    this.hand       = _hand;
    this.classifier = _classifier;

    this.rankOnHand = function() {
	return this.classifier.name;
    };

    this.compareTo = function(_otherPlayer) {
	return this.classifier.compareTo(_otherPlayer.classifier);
    }
}

PlayerTurn.create = function(_name, _shortCards) {
    var hand       = _shortCards.map(Card.fromCode);
    var classifier = PokerHandClassifiers.matches(hand);
    return new PlayerTurn(_name, hand, classifier);
};

function Casino(_player1, _player2) {

    this.judge = function() {
	var winner = _player1.compareTo(_player2) < 0 ? _player1 : _player2;
	return winner.name + " wins. - with " + winner.rankOnHand().toLowerCase();
    };
}



