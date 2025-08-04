let game = document.getElementById("game");
let mode = document.getElementById("mode");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let p1name = document.getElementById("p1name");
let p2name = document.getElementById("p2name");
let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");

let winmenu = document.getElementById("winmenu");
let winBtn = document.getElementById("winBtn");
let scorep1 = document.getElementById("scorep1");
let scorep2 = document.getElementById("scorep2");

let board = document.getElementById("board")

let cards = []; //! it is used to store cards!

let counter = 0; //! count correct selected cards!

let bestscore = localStorage.bestscore ? localStorage.bestscore : 0;
let bestplayer = localStorage.bestplayer ? localStorage.bestplayer : 'None'
let bestplayerspan = document.getElementById("bestPlayer");
let bestscorespan = document.getElementById("bestPoints");

var name1 = "player1"
var name2 = "player2";

if(localStorage.p1name || localStorage.p2name){
    name1 = localStorage.p1name ? localStorage.p1name : name1;
    name2 = localStorage.p2name ? localStorage.p2name : name2;

    p1name.value = localStorage.p1name ? localStorage.p1name : name1;
    p2name.value = localStorage.p2name ? localStorage.p2name : name2;
}

let s1 = 0;
let s2 = 0;

let turn;
let count;
let selected = [];
let selectedCards = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
}

function setdata(x){
    mode.innerHTML = `${x.innerHTML} mode`
    score1.innerHTML = `${s1} points`;
    score2.innerHTML = `${s2} points`;
    player1.innerHTML = `${name1}`;
    player2.innerHTML = `${name2}`;

    if(x.innerHTML == '2 players'){
        player2.classList.remove("hide");
        score2.classList.remove("hide");
    }
}

function startgame(x){
    turn = 0;
    counter = 0;
    p1.classList.add("turn")
    count = 0;
    let ids = [];
    cards = [];
    board.innerHTML = '';
    gameMenu.classList.add("hide");
    game.classList.remove("hide");

    setdata(x);

    for(let i = 1; i <= 8; i++){
        ids.push(i);
        ids.push(i);
    }

    shuffle(ids);

    for(let i = 0; i < ids.length; i++){
        cards.push(generatecard(ids[i]));
    }

    cards.forEach(card => {
        card.onclick = function () {
            if (selected.length < 2 && selected[0] != card) {
                card.classList.add("flip");
                selected.push(card);
                count++;
            }

            if (count === 2) {
                //! check if cards are matched
                if (selected[0].getAttribute('id') === selected[1].getAttribute('id')) {
                    counter++;
                    selected.forEach(selectedCard => {
                        selectedCard.classList.add('active');
                        selectedCard.classList.remove('flip');
                    });
                    if(mode.innerHTML === "2 players mode"){
                        if (turn === 0) {
                            s1 += 2;
                        } else {
                            s2 += 2;
                        }
                    }else {
                        s1 += 2;
                        turn = 0;
                    }

                    selected = [];
                    count = 0;
                    setdata(x);
                } 
                //! NO MATCH case
                else {
                    setTimeout(() => {
                        selected.forEach(selectedCard => {
                            selectedCard.classList.remove('flip');
                        });

                        if(mode.innerHTML === "2 players mode"){
                            if (turn === 0) {
                                s1--;
                            } else {
                                s2--;
                            }
                            
                            //! Switch turn AFTER scoring
                            turn++;
                            turn %= 2;
                            
                            //! Update turn UI
                            if (turn === 0) {
                                p1.classList.add('turn');
                                p2.classList.remove('turn');
                            } else {
                                p2.classList.add('turn');
                                p1.classList.remove('turn');
                            }
                        }else {
                            s1--;
                            turn = 0;
                        }
                        selected = [];
                        count = 0;
                        setdata(x);
                    }, 1000);
                }
            }

            //! cards all selected case
            if (counter == 8) {
                // Update best score with correct parsing
                localStorage.bestscore = localStorage.bestscore ? localStorage.bestscore : "0";
                winmenu.classList.remove("hide");
                container.classList.add('blur');

                scorep1.innerHTML = `${name1}: ${s1} points`;

                let finalWinner = name1;
                let finalScore = s1;

                if (mode.innerHTML === '2 players mode') {
                    scorep2.innerHTML = `${name2}: ${s2} points`;

                    if (s2 > s1) {
                        finalWinner = name2;
                        finalScore = s2;
                    } else if (s1 === s2) {
                        finalWinner = "There is no winner!";
                    }
                }

                // Update best score only if finalScore is higher
                if (finalWinner !== "There is no winner!" && parseInt(localStorage.bestscore) < finalScore) {
                    localStorage.bestscore = finalScore;
                    localStorage.bestplayer = finalWinner;
                }

                // 🧠 Update best score menu display
                bestplayerspan.innerText = localStorage.bestplayer;
                bestscorespan.innerText = localStorage.bestscore;

                winBtn.onclick = function(){
                    winmenu.classList.add("hide");
                    container.classList.remove('blur');
                    game.classList.add("hide");
                    startgame(x);
                }
            }
        };
    });
}

function cleargame(x){
    s1 = 0;
    s2 = 0;
    score2.classList.add("hide");
    player2.classList.add("hide");
    gameMenu.classList.remove("hide");
    x.parentElement.classList.add("hide");
    container.classList.remove("blur");
}

function savesettings(){
    localStorage.p1name = p1name.value.trim() ? p1name.value : 'player1';
    localStorage.p2name = p2name.value.trim() ? p2name.value : 'player2';
    name1 = p1name.value.trim() ? p1name.value : 'player1';
    name2 = p2name.value.trim() ? p2name.value : 'player2';
}

function startsettings(){
    gameMenu.classList.add('hide');
    settings.classList.remove('hide');
}

function clearvalues(){
    p1name.value = '';
    p2name.value = '';
    savesettings();
}

function generatecard(cardid){
    let card = document.createElement('div');
    let front = document.createElement('div');
    let back = document.createElement('div');
    
    card.appendChild(front);
    card.appendChild(back);
    board.appendChild(card);

    card.classList.add("card");
    front.classList.add("front");
    back.classList.add("back");

    back.style.backgroundImage = `url('../images/img${cardid}.png')`;

    card.setAttribute('id', `card${cardid}`)
    return card;
}

bestplayerspan.innerText = localStorage.bestplayer || "None";
bestscorespan.innerText = localStorage.bestscore || "0";