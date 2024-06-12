document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const moveCount = document.getElementById('moveCount');
    const restartButton = document.getElementById('restartButton');
    const icons = ['🍎', '🍌', '🍒', '🍇', '🍉', '🍓', '🍑', '🍍'];
    let cards = [];
    let flippedCards = [];
    let moves = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createCard(icon) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        card.innerHTML = `<span class="icon">${icon}</span>`;
        card.addEventListener('click', () => {
            flipCard(card);
        });
        return card;
    }

    function initializeGame() {
        gameBoard.innerHTML = '';
        moves = 0;
        moveCount.textContent = moves;
        flippedCards = [];
        cards = shuffle([...icons, ...icons]).map(icon => createCard(icon));
        cards.forEach(card => gameBoard.appendChild(card));
    }

    function flipCard(card) {
        if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    }

    function checkMatch() {
        moves++;
        moveCount.textContent = moves;
        const [card1, card2] = flippedCards;

        if (card1.dataset.icon === card2.dataset.icon) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = [];
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }

        if (document.querySelectorAll('.card.matched').length === cards.length) {
            setTimeout(() => alert('Congratulations! You matched all the cards!'), 500);
        }
    }

    restartButton.addEventListener('click', initializeGame);

    initializeGame();
});
