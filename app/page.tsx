import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Phoneme Builder</h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
        A tool for Speech Pathology teachers to create phoneme-based classroom activities.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/wordle" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Build Wordle
        </Link>
        <Link href="/word-search" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Build Word Search
        </Link>
      </div>
    </div>
  );
}