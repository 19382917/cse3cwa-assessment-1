'use client';
import { useState } from 'react';
import { phonemeKeyboard, phonemeToEnglish, sampleWordList } from '@/data/phonemes';

export default function WordleBuilder() {
  const [selectedWord, setSelectedWord] = useState(sampleWordList[0]);
  const [difficulty, setDifficulty] = useState('medium'); // New difficulty state

  const generateHTML = () => {
    const phonemes = selectedWord.phonemes.join('');
    const english = selectedWord.english;
    
    // Set max guesses based on difficulty
    const maxGuesses = difficulty === 'easy' ? 6 : difficulty === 'medium' ? 4 : 3;
    
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phoneme Wordle: ${english}</title>
  <style>
    body { font-family: sans-serif; text-align: center; background: #121213; color: white; padding: 20px; margin: 0; min-height: 100vh; }
    h1 { color: white; margin-bottom: 10px; letter-spacing: 2px; }
    .info { color: #818384; margin-bottom: 20px; }
    .game-container { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 50px; margin-top: 20px; }
    .left-panel { display: flex; flex-direction: column; align-items: center; }
    .right-panel { display: flex; flex-direction: column; align-items: center; }
    .grid { display: grid; grid-template-columns: repeat(${selectedWord.phonemes.length}, 1fr); gap: 8px; max-width: 350px; }
    .cell { width: 62px; height: 62px; border: 2px solid #3a3a3c; display: flex; align-items: center; justify-content: center; font-size: 28px; background: transparent; color: white; font-weight: bold; transition: transform 0.2s;}
    .cell.correct { background: #6aaa64; border-color: #6aaa64; transform: rotateX(360deg); }
    .cell.present { background: #c9b458; border-color: #c9b458; transform: rotateX(360deg); }
    .cell.absent { background: #3a3a3c; border-color: #3a3a3c; transform: rotateX(360deg); }
    .keyboard { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; max-width: 400px; }
    .keyboard button { padding: 15px; font-size: 18px; cursor: pointer; border-radius: 6px; border: none; background: #818384; color: white; font-weight: bold; min-width: 40px; transition: background 0.2s; }
    .keyboard button:hover { background: #565758; }
    .keyboard button.enter-btn { background: #6aaa64; flex-grow: 1; width: 100%; margin-top: 10px; }
    #feedback { margin-top: 20px; font-size: 24px; font-weight: bold; height: 30px; }
    .hint-text { color: #818384; margin-top: 15px; font-size: 14px; }
  </style>
</head>
<body>
  <h1>PHONEME'LE</h1>
  <div class="info">Difficulty: ${difficulty.toUpperCase()} | Max Guesses: ${maxGuesses}</div>
  <div class="game-container">
    <div class="left-panel">
      <div id="grid" class="grid"></div>
      <div id="feedback"></div>
    </div>
    <div class="right-panel">
      <div id="keyboard" class="keyboard"></div>
      <p class="hint-text">Hover over phonemes to see English hints</p>
    </div>
  </div>

  <script>
    const target = "${phonemes}".split('');
    const englishWord = "${english}";
    const maxGuesses = ${maxGuesses};
    let guessesUsed = 0;
    let currentGuess = [];
    
    const keys = ${JSON.stringify(phonemeKeyboard.flat())};
    const hints = ${JSON.stringify(phonemeToEnglish)};
    
    const kbDiv = document.getElementById('keyboard');
    keys.forEach(k => {
      let btn = document.createElement('button');
      btn.innerText = k;
      btn.title = hints[k] || 'Phoneme';
      btn.onclick = () => addLetter(k);
      kbDiv.appendChild(btn);
    });

    let enterBtn = document.createElement('button');
    enterBtn.innerText = 'Enter';
    enterBtn.className = 'enter-btn';
    enterBtn.onclick = checkGuess;
    kbDiv.appendChild(enterBtn);

    function addLetter(letter) {
      if (currentGuess.length < target.length) {
        currentGuess.push(letter);
        renderGrid();
      }
    }

    function renderGrid() {
      const grid = document.getElementById('grid');
      grid.innerHTML = '';
      currentGuess.forEach(p => {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerText = p;
        grid.appendChild(cell);
      });
    }

    function checkGuess() {
      if (currentGuess.length !== target.length) {
        document.getElementById('feedback').innerHTML = '<span style="color: red;">Not enough phonemes!</span>';
        return;
      }
      
      guessesUsed++;
      const grid = document.getElementById('grid');
      let cells = grid.children;
      let allCorrect = true;
      
      for(let i=0; i<target.length; i++) {
        if (currentGuess[i] === target[i]) {
          cells[i].classList.add('correct');
        } else if (target.includes(currentGuess[i])) {
          cells[i].classList.add('present');
          allCorrect = false;
        } else {
          cells[i].classList.add('absent');
          allCorrect = false;
        }
      }

      if(allCorrect) {
        document.getElementById('feedback').innerHTML = '<span style="color: #6aaa64;">Correct! English: ' + englishWord + '</span>';
      } else if (guessesUsed >= maxGuesses) {
        document.getElementById('feedback').innerHTML = '<span style="color: red;">Game Over! Word was: ' + englishWord + '</span>';
      } else {
        document.getElementById('feedback').innerHTML = '<span style="color: #c9b458;">Try again! (' + (maxGuesses - guessesUsed) + ' guesses left)</span>';
        setTimeout(() => {
          currentGuess = [];
          renderGrid();
          document.getElementById('feedback').innerText = '';
        }, 1500);
      }
    }
  </script>
</body>
</html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phoneme-wordle.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Wordle Builder</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold mb-3 text-lg">1. Select Target Word</h3>
            <select 
              onChange={(e) => setSelectedWord(sampleWordList[parseInt(e.target.value)])}
              className="p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white w-full mb-4"
            >
              {sampleWordList.map((word, idx) => (
                <option key={idx} value={idx}>{word.english} ({word.phonemes.join(' ')}) - {word.phonemes.length} phonemes</option>
              ))}
            </select>
            
            <h3 className="font-bold mb-3 text-lg">2. Select Difficulty</h3>
            <select 
              onChange={(e) => setDifficulty(e.target.value)}
              className="p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white w-full"
            >
              <option value="easy">Easy (6 guesses)</option>
              <option value="medium">Medium (4 guesses)</option>
              <option value="hard">Hard (3 guesses)</option>
            </select>
          </div>

          <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold mb-3 text-lg">3. Preview Keyboard & Hints</h3>
            <div className="flex flex-wrap gap-2">
              {phonemeKeyboard.flat().map((p, idx) => (
                <button 
                  key={idx}
                  title={phonemeToEnglish[p] || 'Phoneme'}
                  className="p-3 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors text-lg font-bold"
                >
                  {p}
                </button>
              ))}
            </div>
            <p className="text-xs mt-3 text-gray-500 dark:text-gray-400">Hover to see English equivalents</p>
          </div>

          <button 
            onClick={generateHTML}
            className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-bold shadow-lg"
          >
            4. Generate Playable HTML
          </button>
        </div>

        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow flex flex-col items-center justify-start">
          <h3 className="font-bold mb-4 text-lg">Activity Preview</h3>
          <div 
            className="grid gap-2 mb-4" 
            style={{ gridTemplateColumns: `repeat(${selectedWord.phonemes.length}, 1fr)` }}
          >
            {selectedWord.phonemes.map((p, idx) => (
              <div key={idx} className="w-16 h-16 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-2xl font-bold bg-white dark:bg-gray-900">
                {p}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Target: {selectedWord.english}
          </p>
        </div>
      </div>
    </div>
  );
}