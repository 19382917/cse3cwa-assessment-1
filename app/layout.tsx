import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Phoneme Game Builder',
  description: 'CSE3CWA Assessment 1 - Speech Pathology Tool',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Navbar />
        {/* Assessment Title Header */}
        <header className="p-6 bg-blue-600 text-white text-center shadow-md">
          <h1 className="text-2xl font-bold tracking-wide">CSE3CWA Assessment 1: Frontend Design & Usability</h1>
        </header>
        
        <main className="flex-grow container mx-auto p-6">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}