// generate-letters.js
const fs = require('fs');
const path = require('path');

// ==================== DATA ====================
// Use the exact words from your video. 
// For now, I've kept the placeholders – you can edit them later.
const letterData = {
    A: { word: "Apple", emoji: "🍎", wrongOptions: ["Ball ⚽", "Cat 🐱"] },
    B: { word: "Baby", emoji: "👶", wrongOptions: ["Apple 🍎", "Dog 🐶"] },
    C: { word: "Cat", emoji: "🐱", wrongOptions: ["Apple 🍎", "Ball ⚽"] },
    D: { word: "Dog", emoji: "🐶", wrongOptions: ["Cat 🐱", "Apple 🍎"] },
    E: { word: "Egg", emoji: "🥚", wrongOptions: ["Elephant 🐘", "Apple 🍎"] },
    F: { word: "Fish", emoji: "🐟", wrongOptions: ["Frog 🐸", "Ball ⚽"] },
    G: { word: "Girl", emoji: "👧", wrongOptions: ["Boy 👦", "Cat 🐱"] },
    H: { word: "Hat", emoji: "🧢", wrongOptions: ["House 🏠", "Apple 🍎"] },
    I: { word: "Igloo", emoji: "🏔️", wrongOptions: ["Ice 🧊", "Ball ⚽"] },
    J: { word: "Jug", emoji: "🏺", wrongOptions: ["Jam 🍓", "Cat 🐱"] },
    K: { word: "Kite", emoji: "🪁", wrongOptions: ["King 👑", "Apple 🍎"] },
    L: { word: "Lion", emoji: "🦁", wrongOptions: ["Leaf 🍃", "Ball ⚽"] },
    M: { word: "Monkey", emoji: "🐒", wrongOptions: ["Moon 🌙", "Cat 🐱"] },
    N: { word: "Nose", emoji: "👃", wrongOptions: ["Nest 🪹", "Apple 🍎"] },
    O: { word: "Orange", emoji: "🍊", wrongOptions: ["Octopus 🐙", "Ball ⚽"] },
    P: { word: "Pig", emoji: "🐷", wrongOptions: ["Pen 🖊️", "Cat 🐱"] },
    Q: { word: "Queen", emoji: "👑", wrongOptions: ["Question ❓", "Apple 🍎"] },
    R: { word: "Rain", emoji: "☔", wrongOptions: ["Rabbit 🐇", "Ball ⚽"] },
    S: { word: "Sun", emoji: "☀️", wrongOptions: ["Star ⭐", "Cat 🐱"] },
    T: { word: "Train", emoji: "🚂", wrongOptions: ["Tiger 🐯", "Apple 🍎"] },
    U: { word: "Umbrella", emoji: "☂️", wrongOptions: ["Up ⬆️", "Ball ⚽"] },
    V: { word: "Van", emoji: "🚐", wrongOptions: ["Violin 🎻", "Cat 🐱"] },
    W: { word: "Window", emoji: "🪟", wrongOptions: ["Water 💧", "Apple 🍎"] },
    X: { word: "X-ray", emoji: "🩻", wrongOptions: ["Xylophone 🎹", "Ball ⚽"] },
    Y: { word: "Yarn", emoji: "🧶", wrongOptions: ["Yak 🦬", "Cat 🐱"] },
    Z: { word: "Zebra", emoji: "🦓", wrongOptions: ["Zipper 🤐", "Apple 🍎"] }
};

// ==================== TEMPLATE ====================
// This is the base HTML for every letter page.
// It uses the same structure as before, but we'll insert the letter dynamically.
const template = (letter, data) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Letter ${letter} - Sparkminds Academy</title>
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        /* Copy the styles from the previous letter-a.html example */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Quicksand', sans-serif;
            background: linear-gradient(145deg, #f9f7f3 0%, #f0e9da 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .lesson-card {
            max-width: 900px;
            width: 100%;
            background: white;
            border-radius: 60px;
            box-shadow: 0 20px 30px rgba(0,0,0,0.1);
            padding: 30px;
            border: 4px solid white;
            outline: 3px solid #FFD166;
        }
        .header {
            text-align: center;
            margin-bottom: 25px;
        }
        .header h1 {
            font-size: 4rem;
            color: #118AB2;
            text-shadow: 4px 4px 0 #FFD166;
            letter-spacing: 4px;
        }
        .header h2 {
            font-size: 2rem;
            color: #EF476F;
            background: #FFD166;
            display: inline-block;
            padding: 8px 30px;
            border-radius: 40px;
            transform: rotate(-1deg);
        }
        .exercise {
            background: #FFD166;
            border-radius: 40px;
            padding: 30px;
            margin-top: 20px;
            box-shadow: 0 10px 0 #e6b85c;
        }
        .question {
            font-size: 2rem;
            font-weight: 700;
            color: #073b4c;
            margin-bottom: 25px;
            text-align: center;
        }
        .options {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-bottom: 30px;
        }
        .option-btn {
            background: white;
            border: none;
            border-radius: 60px;
            padding: 20px 35px;
            font-size: 2rem;
            font-weight: 600;
            color: #073b4c;
            box-shadow: 0 8px 0 #cccccc;
            cursor: pointer;
            transition: all 0.1s ease;
            flex: 1 1 auto;
            min-width: 200px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        .option-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 0 #aaaaaa;
        }
        .option-btn:active {
            transform: translateY(6px);
            box-shadow: 0 2px 0 #aaaaaa;
        }
        .feedback {
            font-size: 1.8rem;
            text-align: center;
            padding: 15px;
            border-radius: 50px;
            background: white;
            margin-bottom: 20px;
            display: none;
        }
        .feedback.correct {
            background: #06D6A0;
            color: #073b4c;
            display: block;
        }
        .feedback.incorrect {
            background: #EF476F;
            color: white;
            display: block;
        }
        .next-btn {
            background: #118AB2;
            border: none;
            border-radius: 60px;
            padding: 18px 45px;
            font-size: 2rem;
            font-weight: bold;
            color: white;
            box-shadow: 0 8px 0 #0a5e7e;
            cursor: pointer;
            transition: 0.1s ease;
            width: fit-content;
            margin: 20px auto 0;
        }
        .next-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 0 #0a5e7e;
        }
        .next-btn:active {
            transform: translateY(6px);
            box-shadow: 0 2px 0 #0a5e7e;
        }
        .back-link {
            display: inline-block;
            margin-top: 20px;
            font-size: 1.5rem;
            color: #118AB2;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="lesson-card">
        <div class="header">
            <h1>✨Sparkminds✨</h1>
            <h2>Letter ${letter}</h2>
        </div>

        <div class="exercise">
            <div class="question">Which picture starts with the letter ${letter}?</div>
            <div class="options" id="optionsContainer"></div>
            <div id="feedback" class="feedback"></div>
            <button id="nextLetter" class="next-btn" style="display: none;">Next Letter →</button>
        </div>
        <a href="index.html" class="back-link">← Back to alphabet</a>
    </div>

    <!-- Load the data file -->
    <script src="letter-data.js"></script>
    <script>
        const currentLetter = '${letter}';
        const data = letterData[currentLetter];
        
        // Build options (correct + wrong)
        const correctOption = \`\${data.emoji} \${data.word}\`;
        let options = [correctOption, ...data.wrongOptions];
        // Shuffle
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        const container = document.getElementById('optionsContainer');
        container.innerHTML = '';
        options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.dataset.index = idx;
            btn.dataset.isCorrect = (opt === correctOption) ? 'true' : 'false';
            btn.textContent = opt;
            container.appendChild(btn);
        });

        const feedbackDiv = document.getElementById('feedback');
        const nextBtn = document.getElementById('nextLetter');
        const optionBtns = document.querySelectorAll('.option-btn');

        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const isCorrect = e.target.dataset.isCorrect === 'true';
                if (isCorrect) {
                    feedbackDiv.className = 'feedback correct';
                    feedbackDiv.textContent = \`✅ Perfect! \${data.word} starts with \${currentLetter}!\`;
                    nextBtn.style.display = 'block';
                    optionBtns.forEach(b => b.disabled = true);
                } else {
                    feedbackDiv.className = 'feedback incorrect';
                    feedbackDiv.textContent = '❌ Oops! Try again.';
                    e.target.style.transform = 'translateX(5px)';
                    setTimeout(() => e.target.style.transform = '', 200);
                }
            });
        });

        nextBtn.addEventListener('click', () => {
            const nextLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
            if (nextLetter <= 'Z') {
                window.location.href = \`\${nextLetter.toLowerCase()}.html\`;
            } else {
                window.location.href = 'index.html';
            }
        });
    </script>
</body>
</html>
`;

// ==================== GENERATE FILES ====================
const outputDir = __dirname; // same folder as this script

Object.keys(letterData).forEach(letter => {
    const fileName = `${letter.toLowerCase()}.html`;
    const filePath = path.join(outputDir, fileName);
    const content = template(letter, letterData[letter]);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Generated ${fileName}`);
});

console.log('✅ All 26 letter pages created successfully!');