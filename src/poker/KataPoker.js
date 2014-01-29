/*jshint bitwise: true, curly: false, eqeqeq: true, forin: true,
immed: true, latedef: true, newcap: true, noarg: true, noempty: true,
nonew: true, regexp: true, undef: true, strict: true, trailing: true*/
/*global */

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
            default: return parseInt(_rank, 10);
        }
    }
}

Card.fromCode = function(code) {
    return new Card(code[0], code[1]);
};

function Hand(_cards, _classifier) {
    this.card = _cards;
    this.classifier = _classifier;

    this.rankOnHand = function() {
        return this.classifier.name;
    }
}

Hand.create = function(_cards) {
    var cards      = _cards.map(Card.fromCode);
    var classifier = PokerHandClassifiers.matches(cards);

    return new Hand(cards, classifier);
}

function PlayerTurn(_name, _hand) {
    this.name  = _name;
    this.hand  = _hand;

    this.rankOnHand = function() {
        return this.hand.rankOnHand();
    };
}

PlayerTurn.create = function(_name, _cards) {
    return new PlayerTurn(_name, Hand.create(_cards))
}




