const emojis = ["🍎", "🍌", "🍇", "🍓", "🍍", "🥑", "🍉", "🥕"];
const cards = [...emojis, ...emojis]; // Duplicate for pairs
let flippedCards = [];
let matchedPairs = 0;

// Shuffle cards
cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById("gameBoard");

// Create card elements
cards.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    back.textContent = emoji; // Show emoji only on the back side

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
});

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        flippedCards.push(this);
    }

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 600);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === emojis.length) {
            document.getElementById("status").textContent = "🎉 You Won! 🎉";
        }
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
    }

    flippedCards = [];
}
