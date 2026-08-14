import React from 'react';
import { motion } from 'motion/react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-[#1e2229] border-t border-white/10 flex items-center justify-around px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-2xl box-content">
      {/* Home / Curriculum */}
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => onChangeTab('curriculum')}
        className={`flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-colors w-24 ${
          activeTab === 'curriculum'
            ? 'bg-red-600 text-white font-black border border-red-400 shadow-lg shadow-red-900/30'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="material-symbols-outlined text-[22px] mb-0.5">home</span>
        <span className="text-[10px] uppercase font-bold tracking-wider">Inicio</span>
      </motion.button>

      {/* Biblioteca */}
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => onChangeTab('library')}
        className={`flex flex-col items-center justify-center py-2 px-3 rounded-2xl transition-colors w-24 ${
          activeTab === 'library'
            ? 'bg-red-600 text-white font-black border border-red-400 shadow-lg shadow-red-900/30'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <span className="material-symbols-outlined text-[22px] mb-0.5">menu_book</span>
        <span className="text-[10px] uppercase font-bold tracking-wider">Biblioteca</span>
      </motion.button>

      {/* Práctica */}
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => onChangeTab('practice')}
        className={`flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-colors w-24 ${
          activeTab === 'practice'
            ? 'bg-red-600 text-white font-black border border-red-400 shadow-lg shadow-red-900/30'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <span
          className="material-symbols-outlined text-[22px] mb-0.5"
          style={{ fontVariationSettings: activeTab === 'practice' ? "'FILL' 1" : "'FILL' 0" }}
        >
          fitness_center
        </span>
        <span className="text-[10px] uppercase font-bold tracking-wider">Práctica</span>
      </motion.button>
    </nav>
  );
};
