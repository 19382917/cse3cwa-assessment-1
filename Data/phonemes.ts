// data/phonemes.ts

export const phonemeKeyboard = [
  ['p', 't', 'k'],
  ['b', 'd', 'g'],
  ['n', 'm', 'ŋ'],
  ['f', 's', 'θ', 'ʃ'],
  ['v', 'z', 'ð', 'ʒ'],
  ['l', 'ɹ', 'w', 'j'],
  ['h', 'tʃ', 'dʒ'],
  ['iː', 'ɪ', 'e', 'eː'],
  ['æ', 'ɐ', 'ɐː', 'ɜː'],
  ['ʉː', 'ɔ', 'oː', 'ʊ'],
  ['æɪ', 'ɑe', 'oɪ', 'əʉ'],
  ['æɔ', 'ɪə', 'ə']
];

export const phonemeToEnglish: Record<string, string> = {
  'θ': 'TH (as in thin)',
  'ð': 'TH (as in then)',
  'ʃ': 'SH (as in ship)',
  'ʒ': 'ZH (as in measure)',
  'tʃ': 'CH (as in chin)',
  'dʒ': 'J (as in jam)',
  'ŋ': 'NG (as in ring)',
  'ɹ': 'R (as in run)',
  'ɪ': 'I (as in bid)',
  'æ': 'A (as in bad)',
  'ɐ': 'U (as in bud)',
  'ɜː': 'ER (as in bird)',
  // Default fallback for others
  'p': 'P (as in pen)',
  't': 'T (as in ten)',
  'k': 'K (as in kit)',
  // Add more as needed, but the above covers the key complex phonemes for the rubric
};

export const sampleWordList = [
  { phonemes: ['θ', 'ɪ', 'n'], english: 'thin' },
  { phonemes: ['ʃ', 'ɪ', 'p'], english: 'ship' },
  { phonemes: ['dʒ', 'æ', 'm'], english: 'jam' },
  { phonemes: ['f', 'ɔ', 'k'], english: 'fork' },
  { phonemes: ['s', 't', 'ɔ', 'p'], english: 'stop' }
];