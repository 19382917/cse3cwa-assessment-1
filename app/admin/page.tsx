'use client';
import { useState, useEffect } from 'react';

type Word = {
  id: number;
  englishWord: string;
  phonemes: string;
  length: number;
};

export default function AdminDashboard() {
  const [words, setWords] = useState<Word[]>([]);
  const [englishWord, setEnglishWord] = useState('');
  const [phonemes, setPhonemes] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchWords = async () => {
    const res = await fetch('/api/words');
    if (res.ok) {
      const data = await res.json();
      setWords(data);
    }
  };

    useEffect(() => {
    const initFetch = async () => {
      const res = await fetch('/api/words');
      if (res.ok) {
        const data = await res.json();
        setWords(data);
      }
    };
    initFetch();
  }, []);

  const handleSubmit = async () => {
    if (!englishWord || !phonemes) return alert('Please fill in all fields');
    
    // If editingId is set, we UPDATE the word. Otherwise, we CREATE a new one.
    if (editingId) {
      const res = await fetch(`/api/words?id=${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ englishWord, phonemes }),
      });
      if (res.ok) {
        setEditingId(null);
        setEnglishWord('');
        setPhonemes('');
        fetchWords(); 
      }
    } else {
      const res = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ englishWord, phonemes }),
      });
      if (res.ok) {
        setEnglishWord('');
        setPhonemes('');
        fetchWords(); 
      }
    }
  };

  const editWord = (word: Word) => {
    setEditingId(word.id);
    setEnglishWord(word.englishWord);
    setPhonemes(word.phonemes);
  };

  const deleteWord = async (id: number) => {
    const res = await fetch(`/api/words?id=${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      fetchWords(); 
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <h3 className="font-bold text-xl mb-4">{editingId ? 'Edit Word' : 'Add New Word'}</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="English Word (e.g., thin)"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              value={englishWord}
              onChange={(e) => setEnglishWord(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phonemes (comma separated, e.g., θ,ɪ,n)"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              value={phonemes}
              onChange={(e) => setPhonemes(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              className={`w-full px-4 py-2 text-white rounded font-bold ${editingId ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {editingId ? 'Update Word' : 'Add to Database'}
            </button>
            {editingId && (
              <button
                onClick={() => { setEditingId(null); setEnglishWord(''); setPhonemes(''); }}
                className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 font-bold"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
          <h3 className="font-bold text-xl mb-4">Saved Words ({words.length})</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {words.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No words in the database yet. Add one!</p>
            ) : (
              words.map((word) => (
                <div key={word.id} className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded shadow-sm">
                  <div>
                    <span className="font-bold">{word.englishWord}</span>
                    <span className="ml-2 text-gray-500 dark:text-gray-400">({word.phonemes})</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editWord(word)}
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteWord(word.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}