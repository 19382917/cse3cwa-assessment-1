'use client';
import { sampleWordList, phonemeKeyboard } from '@/data/phonemes';

export default function WordSearchBuilder() {
  const generateHTML = () => {
    const words = sampleWordList.slice(0, 5); 
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Phoneme Word Search</title>
  <style>
    body { font-family: sans-serif; text-align: center; background: #f0f0f0; padding: 20px; }
    h1 { color: #333; }
    .grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: 2px; max-width: 600px; margin: 20px auto; background: #ccc; padding: 2px; }
    .cell { width: 100%; height: 40px; border: 1px solid #999; display: flex; align-items: center; justify-content: center; cursor: pointer; background: white; font-size: 14px; user-select: none;}
    .cell.highlight { background: blue; color: white; }
    .cell.found { background: green; color: white; cursor: default; }
    .word-list { margin-top: 20px; font-size: 18px; }
    .word-found { text-decoration: line-through; color: gray; }
    #feedback { margin-top: 10px; font-weight: bold; color: green; }
  </style>
</head>
<body>
  <h1>Phoneme Word Search</h1>
  <div id="grid" class="grid"></div>
  <div class="word-list"><strong>Find these phonemes:</strong> <span id="words"></span></div>
  <p id="feedback"></p>
  
  <script>
    const grid = document.getElementById('grid');
    const words = ${JSON.stringify(words.map(w => w.phonemes))};
    const englishWords = ${JSON.stringify(words.map(w => w.english))};
    
    // Display words to find
    const wordsContainer = document.getElementById('words');
    words.forEach((w, i) => {
      let span = document.createElement('span');
      span.id = 'word-' + i;
      span.innerText = englishWords[i] + ' (' + w.join(' ') + ')';
      if (i < words.length - 1) span.innerText += ', ';
      wordsContainer.appendChild(span);
    });

    const allPhonemes = ${JSON.stringify(phonemeKeyboard.flat())};
    let wordLocations = []; // Store [row, col] arrays for each word

    // Initialize 10x10 grid with random phonemes
    let matrix = [];
    for(let r=0; r<10; r++) {
      matrix[r] = [];
      for(let c=0; c<10; c++) {
        matrix[r][c] = allPhonemes[Math.floor(Math.random() * allPhonemes.length)];
      }
    }

    // Place words horizontally
    words.forEach((w, i) => {
      let r = i; // place word i on row i
      let c = 0;
      let loc = [];
      w.forEach(ph => {
        matrix[r][c] = ph;
        loc.push([r, c]);
        c++;
      });
      wordLocations.push(loc);
    });

    // Render grid
    let selectedCells = [];
    for(let r=0; r<10; r++) {
      for(let c=0; c<10; c++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerText = matrix[r][c];
        cell.dataset.row = r;
        cell.dataset.col = c;
        
        cell.onclick = function() {
          if(this.classList.contains('found')) return; // Ignore found cells
          
          if(this.classList.contains('highlight')) {
            this.classList.remove('highlight');
            selectedCells = selectedCells.filter(c => c !== this);
          } else {
            this.classList.add('highlight');
            selectedCells.push(this);
          }
          
          checkSelection();
        };
        
        grid.appendChild(cell);
      }
    }

    function checkSelection() {
      if(selectedCells.length === 0) return;
      
      // Check if current selection matches any word location exactly
      wordLocations.forEach((loc, index) => {
        if(loc.length !== selectedCells.length) return;
        
        let match = true;
        for(let i=0; i<loc.length; i++) {
          let r = loc[i][0];
          let c = loc[i][1];
          let sel = selectedCells[i];
          if(parseInt(sel.dataset.row) !== r || parseInt(sel.dataset.col) !== c) {
            match = false;
            break;
          }
        }
        
        if(match) {
          // Word found!
          selectedCells.forEach(cell => {
            cell.classList.remove('highlight');
            cell.classList.add('found');
          });
          selectedCells = [];
          document.getElementById('word-' + index).classList.add('word-found');
          document.getElementById('feedback').innerText = 'Found: ' + englishWords[index] + '!';
        }
      });
    }
  </script>
</body>
</html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'phoneme-wordsearch.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Word Search Builder</h2>
      
      <div className="mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
        <h3 className="font-bold mb-2">1. Word List Preview:</h3>
        <ul className="list-disc pl-5">
          {sampleWordList.slice(0, 5).map((word, idx) => (
            <li key={idx}>{word.english} ({word.phonemes.join(' ')})</li>
          ))}
        </ul>
      </div>

      <button 
        onClick={generateHTML}
        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-bold"
      >
        Generate Playable HTML
      </button>
    </div>
  );
}