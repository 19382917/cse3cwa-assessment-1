'use client';
import { sampleWordList, phonemeKeyboard, phonemeToEnglish } from '@/data/phonemes';

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
    .grid { display: grid; grid-template-columns: repeat(10, 1fr); gap: 2px; max-width: 600px; margin: 20px auto; }
    .cell { width: 40px; height: 40px; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center; cursor: pointer; background: white; font-size: 14px;}
    .highlight { background: yellow; }
    .word-list { margin-top: 20px; font-size: 18px; }
  </style>
</head>
<body>
  <h1>Phoneme Word Search</h1>
  <div id="grid" class="grid"></div>
  <div class="word-list"><strong>Find these phonemes:</strong> <span id="words"></span></div>
  
  <script>
    const grid = document.getElementById('grid');
    const phonemes = ${JSON.stringify(words.map(w => w.phonemes))};
    const englishWords = ${JSON.stringify(words.map(w => w.english))};
    
    document.getElementById('words').innerText = englishWords.join(', ');
    
    // Generate 100 random cells for visual placeholder
    const allPhonemes = ${JSON.stringify(phonemeKeyboard.flat())};
    for(let i=0; i<100; i++) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.innerText = allPhonemes[Math.floor(Math.random() * allPhonemes.length)];
      cell.onclick = () => cell.classList.toggle('highlight');
      grid.appendChild(cell);
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