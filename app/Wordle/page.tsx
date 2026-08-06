'use client';
import { useState } from 'react';
import { phonemeKeyboard, phonemeToEnglish, sampleWordList } from '@/data/phonemes';

export default function WordleBuilder() {
  const [selectedWord, setSelectedWord] = useState(sampleWordList[0]);

  const generateHTML = () => {
    const phonemes = selectedWord.phonemes.join('');
    const english = selectedWord.english;
    
    // This string is the standalone game.
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phoneme Wordle: ${english}</title>
  <style>
    body { font-family: sans-serif; text-align: center; background: #f0f0f0; padding: 20px; }
    h1 { color: #333; }
    .grid { display: grid; grid-template-columns: repeat(${selectedWord.phonemes.length}, 1fr); gap: 5px; max-width: 300px; margin: 20px auto; }
    .cell { width: 60px; height: 60px; border: 2px solid #ccc; display: flex; align-items: center; justify-content: center; font-size: 24px; background: white; }
    .cell.correct { background: #6aaa64; color: white; border-color: #6aaa64; }
    .cell.present { background: #c9b458; color: white; border-color: #c9b458; }
    .cell.absent { background: #787c7e; color: white; border-color: #787c7e; }
    .keyboard { max-width: 500px; margin: 20px auto; }
    .keyboard button { margin: 2px; padding: 10px; font-size: 18px; cursor: pointer; border-radius: 4px; border: 1px solid #ccc; background: white; }
    .keyboard button:hover { background: #eee; }
    .hint { font-size: 14px; color: #666; margin-top: 10px; }
    #feedback { margin-top: 20px; font-size: 20px; font-weight: bold; }
  </style>
</head>
<body>
  <h1>Phoneme Wordle</h1>
  <div id="grid" class="grid"></div>
  <div id="keyboard" class="keyboard"></div>
  <div id="feedback"></div>

  <script>
    const target = "${phonemes}".split('');
    const englishWord = "${english}";
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

    // Add Enter button
    let enterBtn = document.createElement('button');
    enterBtn.innerText = 'Enter';
    enterBtn.style.backgroundColor = '#6aaa64';
    enterBtn.style.color = 'white';
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
        document.getElementById('feedback').innerText = 'Not enough phonemes!';
        return;
      }
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
        document.getElementById('feedback').innerHTML = '<span style="color: green;">Correct! English word: ' + englishWord + '</span>';
      } else {
        document.getElementById('feedback').innerHTML = '<span style="color: red;">Try again!</span>';
        // Reset guess after a short delay
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Wordle Builder</h2>
      
      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <h3 className="font-bold mb-2">1. Select Target Word (Difficulty):</h3>
        <select 
          onChange={(e) => setSelectedWord(sampleWordList[parseInt(e.target.value)])}
          className="p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white w-full md:w-1/2"
        >
          {sampleWordList.map((word, idx) => (
            <option key={idx} value={idx}>{word.english} ({word.phonemes.join(' ')}) - {word.phonemes.length} phonemes</option>
          ))}
        </select>
      </div>

      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <h3 className="font-bold mb-2">2. Preview Keyboard & Hints:</h3>
        <div className="flex flex-wrap gap-2 max-w-xl">
          {phonemeKeyboard.flat().map((p, idx) => (
            <button 
              key={idx}
              title={phonemeToEnglish[p] || 'Phoneme'}
              className="p-3 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors text-lg"
            >
              {p}
            </button>
          ))}
        </div>
        <p className="text-sm mt-3 text-gray-500 dark:text-gray-400">Hover over buttons to see English equivalents (e.g., hover /θ/ to see TH).</p>
      </div>

      <button 
        onClick={generateHTML}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-bold"
      >
        3. Generate Playable HTML
      </button>
    </div>
  );
}