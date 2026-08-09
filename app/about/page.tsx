export default function About() {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-4">About This Project</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        This project is a frontend builder for Speech Pathology teachers to create phoneme-based classroom activities.
        Assessment 1 focuses entirely on frontend design, usability, and React implementation. Later assessments will introduce a database and dynamic word-list management.
      </p>
      
      <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Developer</h2>
        <p>Name: William Younan</p>
        <p>Student ID: 19382917</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Video Explanation (How to use the website)</h2>
        <div className="relative pb-56 h-0 overflow-hidden rounded-lg shadow-lg">
          <iframe 
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/ON3JdCju1NE" 
            title="How to use the website"
            allowFullScreen>
          </iframe>
        </div>
        {/* New Video Description */}
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          <strong>Video Walkthrough:</strong> This short video demonstrates how to use the Phoneme Builder application. It covers navigating the interface, previewing the phoneme keyboard and hints, adjusting the difficulty settings, and generating the standalone, playable HTML files for both the Wordle and Word Search classroom activities.
        </p>
      </div>

      <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-bold mb-2">References</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
          <li>Meta Platforms. (2023). <em>React Documentation</em>. React.dev.</li>
          <li>Vercel. (2023). <em>Next.js App Router Documentation</em>. Nextjs.org.</li>
          <li>W3C. (2023). <em>Web Content Accessibility Guidelines (WCAG) 2.1</em>.</li>
          <li>Tailwind Labs. (2023). <em>Tailwind CSS Documentation</em>. Tailwindcss.com.</li>
          <li>Harrington, J., &amp; Cassidy, S. (1999). <em>Techniques in Speech Acoustics</em>. Kluwer Academic Publishers.</li>
        </ul>
      </div>
    </div>
  );
}