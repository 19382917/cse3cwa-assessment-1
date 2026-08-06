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

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Video Explanation</h2>
        {/* In your final video, you will explain the website here. You can leave this placeholder. */}
        <div className="bg-gray-200 dark:bg-gray-700 h-48 flex items-center justify-center rounded-lg text-gray-500">
          [Video Link or Embed Here]
        </div>
      </div>
    </div>
  );
}