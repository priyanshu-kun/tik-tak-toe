
let overlayBackground = document.querySelector('.model-overlay');
let WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]
let user1symbol = undefined;
let user2symbol = undefined;
let flag = false;
let user1;
let user2;
let circle = 'circle';
let X = 'X';
let currentClass;
let FirstChance = undefined;
let ChanceFlag = true;
let Player1TotalScore = 0;
let Player2TotalScore = 0;
let WinnerSymbol;

window.addEventListener("load", () => {
    // document.querySelector('.emojy1').innerHTML = 'sdf';
    Addanimation();
    AddPopup();
    document.querySelectorAll("[data-cell]").forEach(cell => cell.addEventListener('click', handleClick, { once: true }))

})


function getWhoWin() {
    return Player1TotalScore === 3? true : false;
}

function addGreetingPopup(player) {
    document.querySelector(".model-overlay-new").classList.add("newactiveModelOverlay");
    document.querySelector(".greeting-model").classList.add("greetingCard");
    document.querySelector(".greet-heading").innerHTML = `${player} Wins!🎉🎉`;
    Player1TotalScore = 0;
    Player2TotalScore = 0;
}

document.querySelector(".continue-btn").addEventListener("click",() => {
    document.querySelector(".model-overlay-new").classList.remove("newactiveModelOverlay");
    document.querySelector(".greeting-model").classList.remove("greetingCard");
    document.querySelector(".outerbox").innerHTML = `<p style="font-size: 3rem; text-align: center; position: relative; top: 70px;">Please press refresh button!</p>`
})


function restartGame() {
    document.querySelectorAll("[data-cell]").forEach(element => {
        element.classList.remove(X)
        element.classList.remove(circle)
        element.removeEventListener('click',handleClick)
        // AddPopup();
        // currentClass = WinnerSymbol;
        if(Player1TotalScore === 3 || Player2TotalScore === 3) {
            if(getWhoWin()){
                addGreetingPopup(user1);
            }
            else {
                addGreetingPopup(user2);
            }
            
        }
        else {
            document.querySelectorAll("[data-cell]").forEach(cell => cell.addEventListener('click', handleClick, { once: true }));
        }
        

    })
}

function Addanimation() {
    let scorecard = document.querySelector(".scoreCard");
    let Description = document.querySelector(".Description");
    scorecard.classList.add("animateSC");
    Description.classList.add("animateDS");
}


function handleClick(e) {
    if (user1symbol !== undefined) {
        if (FirstChance === 'x') {
            currentClass = X;
            WinnerSymbol = FirstChance;
            FirstChance = undefined;

        }
        else if (FirstChance === 'o') {
            currentClass = circle;
            WinnerSymbol = FirstChance;
            FirstChance = undefined;
        }
        AddSymbol(e.target, currentClass);

        if (checkWins(currentClass)) {
            // console.log(currentClass)
            endgame(false)
            restartGame()
        }
        else if (isDraw()) {
            endgame(true)
            restartGame();
        }
        else {
            SwapTurns();
            AddHoverEffect();
        }

    }
}

function AddSymbol(cell, Currentclass) {
    cell.classList.add(Currentclass);
}

function SwapTurns() {
    currentClass === X ? currentClass = circle : currentClass = X;
}


function AddHoverEffect() {
    document.querySelector(".outerbox").classList.remove('axe');
    document.querySelector(".outerbox").classList.remove('Hovercircle');

    currentClass === X ? document.querySelector(".outerbox").classList.add("axe") : document.querySelector(".outerbox").classList.add("Hovercircle");
}

function InitialHover() {
    FirstChance === 'x' ? document.querySelector(".outerbox").classList.add("axe") : document.querySelector(".outerbox").classList.add("Hovercircle");
}


function AddPopup() {
    overlayBackground.classList.add("activeModelOverlay");
    document.querySelector(".model").classList.add("activeModel");
}


function checkWins(currentClass) {
    // console.log(currentClass)
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(element => {
            // console.log(combination)
            return document.querySelectorAll("[data-cell]")[element].classList.contains(currentClass);
        })
    })
}


function isDraw() {
    return Array.from(document.querySelectorAll("[data-cell]")).every(cell => {
        return cell.classList.contains(X) || cell.classList.contains(circle)
    })
}

function endgame(check) {

    if (check) {
        document.querySelector('.emojy1').innerHTML = '😑';
        document.querySelector('.emojy2').innerHTML = '😑';
        document.querySelector('.emojy1').classList.add("emojyDisp");
        document.querySelector('.emojy2').classList.add("emojyDisp");
    }
    else {
        if (currentClass === X) {
            // console.log(currentClass)
            document.querySelector(".scorenum1").innerHTML = ++Player1TotalScore
            document.querySelector('.emojy1').innerHTML = '😎';
            document.querySelector('.emojy2').innerHTML = '😥';
            document.querySelector('.emojy1').classList.add("emojyDisp");
            document.querySelector('.emojy2').classList.add("emojyDisp");
            // document.querySelector('.emojy2').innerHTML = '😥';

        }
        else {
            // console.log(currentClass)
            document.querySelector(".scorenum2").innerHTML = ++Player2TotalScore
            document.querySelector('.emojy2').innerHTML = '😎';
            document.querySelector('.emojy1').innerHTML = '😥';
            document.querySelector('.emojy1').classList.add("emojyDisp");
            document.querySelector('.emojy2').classList.add("emojyDisp");
        }


    }
}



overlayBackground.addEventListener("click", (e) => {
    if (e.target.classList.contains('model-overlay')) {
        alert("Please Fill the form!");
    }
})




function CheckEmpty() {
    if (document.querySelectorAll('.input input')[0].value === "" || document.querySelectorAll('.input input')[1].value === "") {
        document.querySelector(".Next").style.pointerEvents = "none";
        document.querySelector(".Next").style.opacity = "0.6";
    }
    else {
        document.querySelector(".Next").style.pointerEvents = "all";
        document.querySelector(".Next").style.opacity = "1";
    }
}

document.querySelectorAll('.input input').forEach(input => {
    input.addEventListener("focusout", () => {
        CheckEmpty();
    })
})


CheckEmpty();

document.querySelector(".model").addEventListener("click", (e) => {
    // alert("bingo")
    if (e.target.classList.contains('Next')) {
        user1 = document.querySelector(".input").children[0].value;
        user2 = document.querySelector(".input").children[1].value;
        selectSymbols(user1, user2);
        checkSymbols();
        document.querySelector(".div1").classList.add("d-none");
        document.querySelector(".div2").classList.remove("d-none");
    }
    else if (e.target.classList.contains("previous")) {
        document.querySelector(".div1").classList.remove("d-none");
        document.querySelector(".div2").classList.add("d-none");

    }
})


function selectSymbols(u1, u2) {
    document.querySelector(".symbol").addEventListener("click", (e) => {
        if (e.target.classList.contains('times')) {
            // console.log("say x")
            user1symbol = 'x';
            user2symbol = 'o';
            FirstChance = 'x'
            showOwnerSymbolX(u1, u2);
            document.querySelector(".submit").style.opacity = "1";
            document.querySelector(".submit").style.pointerEvents = "all";

        }
        else if (e.target.classList.contains("zero")) {
            // console.log("say zero")
            user1symbol = 'o'
            user2symbol = 'x';
            FirstChance = 'o';
            showOwnerSymbolZero(u1, u2);
            document.querySelector(".submit").style.opacity = "1";
            document.querySelector(".submit").style.pointerEvents = "all";
        }
        flag = true;
    })

    checkSymbols();

    if (flag) {
        showOwnerSymbolX(u1, u2);
        showOwnerSymbolZero(u1, u2);
    }

}

function showOwnerSymbolX(xu1, xu2) {
    document.querySelector('.symbol').innerHTML = `<p style="font-size: 1.3rem; text-align: center;">${xu1} choose: <b style="font-size: 3rem; position: relative; top: 6px;">x</b>
    <br/>${xu2} choose: <b style="font-size: 3rem; position: relative; top: 6px;">o</b></p>`;
}

function showOwnerSymbolZero(zu1, zu2) {
    document.querySelector('.symbol').innerHTML = `<p style="font-size: 1.3rem; text-align: center;">${zu1} choose: <b style="font-size: 3rem; position: relative; top: 6px;">o</b>
    <br/>${zu2} choose: <b style="font-size: 3rem; position: relative; top: 6px;">x</b></p>`
}

document.querySelector(".submit").addEventListener('click', () => {
    overlayBackground.classList.remove("activeModelOverlay");
    document.querySelector(".model").classList.remove("activeModel");
    EditScoreCard(user1, user2);
    InitialHover();
})



function EditScoreCard(username1, username2) {
    document.querySelectorAll(".user-identity")[0].innerHTML = username1;
    document.querySelectorAll(".user-identity")[1].innerHTML = username2;
    document.querySelector(".scorenum1").innerHTML = 0;
    document.querySelector(".scorenum2").innerHTML = 0;
}

function checkSymbols() {
    if (user1symbol === undefined) {
        document.querySelector(".submit").style.opacity = "0.6";
        document.querySelector(".submit").style.pointerEvents = "none";
    }
    else {
        document.querySelector(".submit").style.opacity = "1";
        document.querySelector(".submit").style.pointerEvents = "all";
    }
}

