import React from 'react';
import Link from 'next/link';

const BottomBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-16 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700 flex justify-around items-center">
      <Link href="/" passHref className="flex flex-col items-center text-gray-700 dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
          </svg>
          <span className="text-sm">Accueil</span>
      </Link>
      <Link href="/tasks" passHref className="flex flex-col items-center text-gray-700 dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm">Tâches</span>
      </Link>
      <Link href="/transactions" passHref className="flex flex-col items-center text-gray-700 dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 11-10 10A10 10 0 0112 2z" />
          </svg>
          <span className="text-sm">Agenda</span>
      </Link>
      <Link href="/search" passHref className="flex flex-col items-center text-gray-700 dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m-2.5 1.5a8.5 8.5 0 100-17 8.5 8.5 0 000 17z" />
          </svg>
          <span className="text-sm">Recherche</span>
      </Link>
      <Link href="/profile" passHref className="flex flex-col items-center text-gray-700 dark:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 0110 10c0 6.627-4.18 9-10 9s-10-2.373-10-9A10 10 0 0112 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11a3 3 0 110-6 3 3 0 010 6zm0 2c3 0 6 1.5 6 4v1H6v-1c0-2.5 3-4 6-4z" />
          </svg>
          <span className="text-sm">Profil</span>
      </Link>
    </div>
  );
};

export default BottomBar;