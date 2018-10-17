/* This code and the respective .html and .css files were tested on
Google Chrome Version 69.0.3497.100
*/


$(document).ready(function () {

    /* CARD DECK setup */

    const deck = ["ace", "two", 'three', "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king"];
    var values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]
    const suites = ["c", "d", "h", "s"];

    var cards = [];

    for (let s of suites) {
        for (let d of deck) {
            cards.push(d + '-' + s);
        }
    }

    /* DEALER start - initial hand*/

    var dealerPoints = 0;
    var dealerAceCounter = 0;

    $(".dealerdeck .card").each(function () {

        let cardObj = {type: "", value: 0};

        let num = Math.floor(Math.random() * cards.length);

        Object.assign(cardObj, {type: cards[num], value: values[num]});

        $(this).addClass(cardObj.type);
        /* checking for aces */
        if (cardObj.value === 11) {
            dealerAceCounter += 1;
        }

        dealerPoints = parseInt(dealerPoints) + cardObj.value

        if (dealerAceCounter === 1 && dealerPoints > 21) {
            dealerPoints -= 10;
        }

        if (dealerAceCounter === 2) {
            dealerPoints = 21;
        }


        $("#dealerPoints").html(dealerPoints);

        cards.splice(num, 1);
        values.splice(num, 1);

    });


    /* PLAYER start - initial hand*/

    var playerPoints = 0;
    var playerAceCounter = 0;

    $(".playerdeck .card").each(function () {

        let cardObj2 = {type: "", value: 0};

        let num = Math.floor(Math.random() * cards.length);

        Object.assign(cardObj2, {type: cards[num], value: values[num]});

        $(this).addClass(cardObj2.type);


        /* checking for aces */
        if (cardObj2.value === 11) {
            playerAceCounter += 1;
        }

        playerPoints = parseInt(playerPoints) + cardObj2.value

        if (playerAceCounter > 0 && playerPoints > 21) {
            playerPoints -= 10;
        }

        if (playerAceCounter === 2) {
            playerPoints = 21;
        }


        $("#playerPoints").html(playerPoints);

        cards.splice(num, 1);
        values.splice(num, 1);

    });

    /* HIT button*/

    $("#hit").on('click', () => {

        let cardObj1 = {type: "", value: 0};

        let num = Math.floor(Math.random() * cards.length);

        Object.assign(cardObj1, {type: cards[num], value: values[num]});

        let newCard = "<div class='card " + cardObj1.type + "'></div>";
        $(".playerdeck .new").append(newCard);


        playerPoints = parseInt(playerPoints) + cardObj1.value;

        /* checking for aces */
        if (cardObj1.value === 11) {
            playerAceCounter += 1;
        }


        if (playerAceCounter > 0 && playerPoints > 21) {
            playerPoints -= 10;
            playerAceCounter--;
        }


        $("#playerPoints").html(playerPoints);
        $(".playerdeck").width($(".playerdeck").width() + 81);

        cards.splice(num, 1);
        values.splice(num, 1);


        if (playerPoints > 21) {
            $("#message").html('You Bust!');
            let restartGame = "<div class='btn' id='deal'>Deal</div>";
            $(".buttons").html(restartGame)
        }
        ;

        $("#deal").on('click', () => {
            location.reload();
            $("#message").html("");
        });

    });

    /* STAND button*/

    $("#stand").on('click', () => {

        $("#dealerPoints").css("visibility", "visible");
        $(".slot2").removeClass("reverse");

        /* keep on running the game until dealer's hand value reaches 17 or exceeds 21 points*/
        let addDealerCards = setInterval(() => {

            let dealerPoints = parseInt($("#dealerPoints").html());
            let playerPoints = parseInt($("#playerPoints").html());


            if (dealerPoints > 21) {
                $("#message").html('Dealer Busts!');

                let restartGame = "<div class='btn' id='deal'>Deal</div>";
                $(".buttons").html(restartGame);

                $("#deal").on('click', () => {
                    location.reload();
                    $("#message").html("");
                })
                clearInterval(addDealerCards);
                return;
            }


            if (dealerPoints >= 17) {
                if (playerPoints > dealerPoints) {
                    $("#message").html('You Win!');
                }
                if (playerPoints < dealerPoints) {
                    $("#message").html('You Lose!');
                }
                if (playerPoints === dealerPoints) {
                    $("#message").html('Push!');
                }


                let restartGame = "<div class='btn' id='deal'>Deal</div>";
                $(".buttons").html(restartGame);

                $("#deal").on('click', () => {
                    location.reload();
                    $("#message").html("");
                })
                clearInterval(addDealerCards);
                return;
            }


            let cardObj3 = {type: "", value: 0};

            let num = Math.floor(Math.random() * cards.length);

            Object.assign(cardObj3, {type: cards[num], value: values[num]});

            let newCard = "<div class='card " + cardObj3.type + "'></div>";
            $(".dealerdeck .new-cards").append(newCard);

            dealerPoints = parseInt(dealerPoints) + cardObj3.value;

            /* checking for aces */
            if (cardObj3.value === 11) {
                dealerAceCounter += 1;
            }

            if (dealerAceCounter > 0 && dealerPoints > 21) {
                dealerPoints -= 10;
                dealerAceCounter--;
            }


            $("#dealerPoints").html(dealerPoints);
            $(".dealerdeck").width($(".dealerdeck").width() + 81);

            cards.splice(num, 1);
            values.splice(num, 1);


        }, 400);

    });

});