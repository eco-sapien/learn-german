// Vocabulary data organized by category
const vocabulary = {
    basics: [
        { de: "Hallo", en: "Hello", example: "Hallo, wie geht es dir?" },
        { de: "Tschüss", en: "Goodbye", example: "Tschüss, bis morgen!" },
        { de: "Bitte", en: "Please / You're welcome", example: "Ein Wasser, bitte." },
        { de: "Danke", en: "Thank you", example: "Danke schön!" },
        { de: "Ja", en: "Yes", example: "Ja, das stimmt." },
        { de: "Nein", en: "No", example: "Nein, danke." },
        { de: "Guten Morgen", en: "Good morning", example: "Guten Morgen! Wie geht's?" },
        { de: "Guten Abend", en: "Good evening", example: "Guten Abend, meine Damen und Herren." },
        { de: "Entschuldigung", en: "Excuse me / Sorry", example: "Entschuldigung, wo ist der Bahnhof?" },
        { de: "Ich verstehe nicht", en: "I don't understand", example: "Ich verstehe nicht, können Sie das wiederholen?" },
    ],
    food: [
        { de: "das Brot", en: "bread", example: "Ich möchte ein Brot kaufen." },
        { de: "das Wasser", en: "water", example: "Ein Glas Wasser, bitte." },
        { de: "der Kaffee", en: "coffee", example: "Ich trinke jeden Morgen Kaffee." },
        { de: "die Milch", en: "milk", example: "Die Milch ist im Kühlschrank." },
        { de: "der Apfel", en: "apple", example: "Der Apfel ist rot." },
        { de: "das Ei", en: "egg", example: "Ich möchte zwei Eier zum Frühstück." },
        { de: "das Fleisch", en: "meat", example: "Ich esse kein Fleisch." },
        { de: "der Reis", en: "rice", example: "Reis mit Gemüse, bitte." },
        { de: "die Kartoffel", en: "potato", example: "Kartoffeln sind sehr beliebt in Deutschland." },
        { de: "der Kuchen", en: "cake", example: "Der Kuchen schmeckt sehr gut." },
    ],
    travel: [
        { de: "der Bahnhof", en: "train station", example: "Wo ist der Bahnhof?" },
        { de: "der Flughafen", en: "airport", example: "Wir fahren zum Flughafen." },
        { de: "die Straße", en: "street", example: "Die Straße ist sehr lang." },
        { de: "das Hotel", en: "hotel", example: "Das Hotel ist in der Nähe." },
        { de: "die Fahrkarte", en: "ticket", example: "Eine Fahrkarte nach Berlin, bitte." },
        { de: "der Zug", en: "train", example: "Der Zug kommt um 10 Uhr." },
        { de: "links", en: "left", example: "Gehen Sie nach links." },
        { de: "rechts", en: "right", example: "Das Restaurant ist rechts." },
        { de: "geradeaus", en: "straight ahead", example: "Gehen Sie geradeaus." },
        { de: "die Haltestelle", en: "bus stop", example: "Die Haltestelle ist dort drüben." },
    ],
    numbers: [
        { de: "eins", en: "one (1)", example: "Ich habe eins." },
        { de: "zwei", en: "two (2)", example: "Zwei Kaffee, bitte." },
        { de: "drei", en: "three (3)", example: "Ich habe drei Geschwister." },
        { de: "vier", en: "four (4)", example: "Es ist vier Uhr." },
        { de: "fünf", en: "five (5)", example: "Fünf Minuten noch." },
        { de: "zehn", en: "ten (10)", example: "Das kostet zehn Euro." },
        { de: "zwanzig", en: "twenty (20)", example: "Ich bin zwanzig Jahre alt." },
        { de: "fünfzig", en: "fifty (50)", example: "Es sind fünfzig Kilometer." },
        { de: "hundert", en: "hundred (100)", example: "Hundert Prozent!" },
        { de: "tausend", en: "thousand (1000)", example: "Es kostet tausend Euro." },
    ]
};

// App state
let currentCategory = 'basics';
let currentIndex = 0;
let isRevealed = false;
let cardsCompleted = 0;

// DOM elements
const flashcardWord = document.getElementById('flashcard-word');
const flashcardAnswer = document.getElementById('flashcard-answer');
const flashcardExample = document.getElementById('flashcard-example');
const flashcardHint = document.getElementById('flashcard-hint');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const flashcard = document.getElementById('flashcard');
const revealBtn = document.getElementById('reveal-btn');
const nextBtn = document.getElementById('next-btn');

// Initialize
function init() {
    loadCard();
    updateProgress();
    setupCategoryListeners();
}

// Load current card
function loadCard() {
    const cards = vocabulary[currentCategory];
    const card = cards[currentIndex];

    flashcardWord.textContent = card.de;
    flashcardAnswer.textContent = card.en;
    flashcardExample.textContent = `"${card.example}"`;
    flashcardHint.textContent = 'Click or press Space to reveal';

    flashcardAnswer.classList.remove('visible');
    flashcardExample.classList.remove('visible');
    isRevealed = false;

    revealBtn.style.display = '';
    nextBtn.style.display = 'none';
}

// Reveal answer
function revealAnswer() {
    if (isRevealed) return;

    flashcardAnswer.classList.add('visible');
    flashcardExample.classList.add('visible');
    flashcardHint.textContent = '';
    isRevealed = true;

    revealBtn.style.display = 'none';
    nextBtn.style.display = '';
}

// Next card
function nextCard() {
    const cards = vocabulary[currentCategory];
    cardsCompleted++;
    currentIndex = (currentIndex + 1) % cards.length;
    loadCard();
    updateProgress();
}

// Update progress
function updateProgress() {
    const cards = vocabulary[currentCategory];
    const progress = ((currentIndex) / cards.length) * 100;
    progressFill.style.width = progress + '%';
    progressText.textContent = `${currentIndex} / ${cards.length} cards`;
}

// Category switching
function setupCategoryListeners() {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function () {
            const category = this.dataset.category;
            if (!category || category === currentCategory) return;

            document.querySelectorAll('.feature-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active');

            currentCategory = category;
            currentIndex = 0;
            loadCard();
            updateProgress();

            document.getElementById('practice-area').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Event listeners
flashcard.addEventListener('click', revealAnswer);
revealBtn.addEventListener('click', revealAnswer);
nextBtn.addEventListener('click', nextCard);

// Keyboard support
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space' && !isRevealed) {
        e.preventDefault();
        revealAnswer();
    } else if ((e.code === 'ArrowRight' || e.code === 'Enter') && isRevealed) {
        e.preventDefault();
        nextCard();
    }
});

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Start the app
init();
