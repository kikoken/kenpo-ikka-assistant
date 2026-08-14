import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../types';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  totalTechniquesCount: number;
  favoritesCount: number;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeTab,
  onChangeTab,
  totalTechniquesCount,
  favoritesCount
}) => {
  const handleSelect = (tab: ActiveTab) => {
    onChangeTab(tab);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer content */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative w-80 max-w-[85vw] h-full bg-[#1e2229] border-r border-white/10 flex flex-col py-6 px-4 z-10 overflow-y-auto shadow-2xl pt-[calc(1.5rem+env(safe-area-inset-top))] pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-2 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center p-1.5">
                  <img src="/kanji-fist.png" alt="拳" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-base font-black text-white tracking-tight uppercase leading-none">
                    KENPO IKKA <span className="text-red-500">ASSISTANT</span>
                  </h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">({totalTechniquesCount} Técnicas)</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10"
              >
                <span className="material-symbols-outlined">close</span>
              </motion.button>
            </div>

            {/* Navigation list */}
            <nav className="flex flex-col gap-2 flex-1">
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect('curriculum')}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-colors ${
                  activeTab === 'curriculum'
                    ? 'bg-red-600 text-white font-black shadow-lg shadow-red-900/30 border border-red-400'
                    : 'text-gray-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">home</span>
                <span>Inicio / Programa Técnico</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect('library')}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-colors ${
                  activeTab === 'library'
                    ? 'bg-red-600 text-white font-black shadow-lg shadow-red-900/30 border border-red-400'
                    : 'text-gray-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
                <span>Biblioteca</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect('practice')}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-colors ${
                  activeTab === 'practice'
                    ? 'bg-red-600 text-white font-black shadow-lg shadow-red-900/30 border border-red-400'
                    : 'text-gray-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">fitness_center</span>
                <span>Modo Práctica</span>
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect('favorites')}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-colors ${
                  activeTab === 'favorites'
                    ? 'bg-red-600 text-white font-black shadow-lg shadow-red-900/30 border border-red-400'
                    : 'text-gray-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="material-symbols-outlined text-[20px]">grade</span>
                  <span>Favoritos</span>
                </div>
                {favoritesCount > 0 && (
                  <span className="px-2.5 py-0.5 text-[10px] font-black rounded-full bg-yellow-500 text-black">
                    {favoritesCount}
                  </span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect('history')}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-colors ${
                  activeTab === 'history'
                    ? 'bg-red-600 text-white font-black shadow-lg shadow-red-900/30 border border-red-400'
                    : 'text-gray-300 hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">history</span>
                <span>Historial de Práctica</span>
              </motion.button>
            </nav>

            {/* Footer info */}
            <div className="pt-4 border-t border-white/10 px-2 mt-auto">
              <div className="bg-black/30 p-3.5 rounded-2xl border border-white/5 text-xs text-gray-400 flex flex-col gap-1">
                <span className="font-black text-white uppercase tracking-tight">Kenpo IKKA Assistant v2.4</span>
                <span className="text-[11px]">Programa Técnico IKKA</span>
                <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Martial Arts Engine</span>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
