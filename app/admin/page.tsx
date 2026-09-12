'use client';
import { useState, useEffect } from 'react';

type Word = { id: number; englishWord: string; phonemes: string; length: number };
type Setting = { id: number; gameType: string; difficulty: string; maxGuesses: number };

export default function AdminDashboard() {
  const [words, setWords] = useState<Word[]>([]);
  const [settings, setSettings] = useState<Setting[]>([]);
  
  // Word State
  const [englishWord, setEnglishWord] = useState('');
  const [phonemes, setPhonemes] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Setting State
  const [gameType, setGameType] = useState('Wordle');
  const [difficulty, setDifficulty] = useState('Easy');
  const [maxGuesses, setMaxGuesses] = useState('6');

  const fetchData = async () => {
    const wordRes = await fetch('/api/words');
    if (wordRes.ok) setWords(await wordRes.json());
    
    const settingRes = await fetch('/api/settings');
    if (settingRes.ok) setSettings(await settingRes.json());
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, []);

  const handleSubmitWord = async () => {
    if (!englishWord || !phonemes) return alert('Please fill in all fields');
    if (editingId) {
      await fetch(`/api/words?id=${editingId}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ englishWord, phonemes }),
      });
      setEditingId(null);
    } else {
      await fetch('/api/words', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ englishWord, phonemes }),
      });
    }
    setEnglishWord('');
    setPhonemes('');
    fetchData();
  };

  const deleteWord = async (id: number) => {
    await fetch(`/api/words?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleAddSetting = async () => {
    await fetch('/api/settings', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameType, difficulty, maxGuesses }),
    });
    fetchData();
  };

  const deleteSetting = async (id: number) => {
    await fetch(`/api/settings?id=${id}`, { method: 'DELETE' });
    fetchData();
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Words Section */}
        <div className="space-y-6">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold text-xl mb-4">{editingId ? 'Edit Word' : 'Add New Word'}</h3>
            <div className="space-y-4">
              <input type="text" placeholder="English Word" className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white" value={englishWord} onChange={(e) => setEnglishWord(e.target.value)} />
              <input type="text" placeholder="Phonemes (e.g., θ,ɪ,n)" className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white" value={phonemes} onChange={(e) => setPhonemes(e.target.value)} />
              <button onClick={handleSubmitWord} className={`w-full px-4 py-2 text-white rounded font-bold ${editingId ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {editingId ? 'Update Word' : 'Add to Database'}
              </button>
            </div>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold text-xl mb-4">Saved Words ({words.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {words.map((word) => (
                <div key={word.id} className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded shadow-sm">
                  <div><span className="font-bold">{word.englishWord}</span> <span className="ml-2 text-gray-500">({word.phonemes})</span></div>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingId(word.id); setEnglishWord(word.englishWord); setPhonemes(word.phonemes); }} className="px-3 py-1 bg-yellow-600 text-white rounded text-sm">Edit</button>
                    <button onClick={() => deleteWord(word.id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Settings Section */}
        <div className="space-y-6">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold text-xl mb-4">Add Activity Setting</h3>
            <div className="space-y-4">
              <select value={gameType} onChange={(e) => setGameType(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white">
                <option>Wordle</option>
                <option>WordSearch</option>
              </select>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white">
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
              <input type="number" placeholder="Max Guesses" className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white" value={maxGuesses} onChange={(e) => setMaxGuesses(e.target.value)} />
              <button onClick={handleAddSetting} className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">Save Setting</button>
            </div>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold text-xl mb-4">Saved Settings ({settings.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {settings.map((s) => (
                <div key={s.id} className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded shadow-sm">
                  <div><span className="font-bold">{s.gameType}</span> <span className="ml-2 text-gray-500">({s.difficulty} - {s.maxGuesses} guesses)</span></div>
                  <button onClick={() => deleteSetting(s.id)} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}