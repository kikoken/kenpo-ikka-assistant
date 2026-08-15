import React from 'react';
import { motion } from 'motion/react';
import { KenpoTechnique } from '../types';
import { BELT_METADATA, BELT_DEGREES } from '../data/kenpoData';

interface CurriculumViewProps {
  techniques: KenpoTechnique[];
  completedIds: Set<number>;
  onSelectBeltForLibrary: (beltKey: string) => void;
  onStartPracticeBelt: (beltKey: string, orderMode: 'secuencial' | 'azar') => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({
  techniques,
  completedIds,
  onSelectBeltForLibrary,
  onStartPracticeBelt
}) => {
  const belts = Object.values(BELT_METADATA);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-4 pb-[calc(7rem+env(safe-area-inset-bottom))]">
      {/* Hero Title in Bento Style */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 bg-[#1e2229] p-6 md:p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-2 right-4 opacity-10 pointer-events-none select-none">
          <div className="text-[140px] font-black leading-none text-white">帯</div>
        </div>
        <div className="relative z-10">
          <span className="px-3 py-1 bg-red-600/20 text-red-500 text-xs font-bold rounded-full border border-red-600/30 uppercase tracking-widest inline-block mb-3">
            SISTEMA DE CINTURONES
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2 tracking-tight uppercase">
            PROGRAMA TÉCNICO <span className="text-red-500">IKKA</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl font-medium">
            Domina las técnicas por grado. Sigue tu progreso y perfecciona la ejecución paso a paso.
          </p>
        </div>
      </motion.div>

      {/* Belt Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {belts.map((belt, index) => {
          const beltTechniques = techniques.filter(
            t => t.cinturon.toLowerCase() === belt.key.toLowerCase()
          );
          const totalCount = beltTechniques.length;
          const kyuDanDegree = BELT_DEGREES[belt.key] || '';

          return (
            <motion.div
              key={belt.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -3 }}
              className="bg-[#1e2229] rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden border border-white/10 hover:border-red-500/40 transition-colors shadow-xl group"
            >
              {/* Belt color bar stripe */}
              <div
                className="absolute left-0 top-0 bottom-0 w-3 transition-all"
                style={{ backgroundColor: belt.colorHex }}
              />

              <div className="pl-3 mb-4 flex items-start justify-between gap-3">
                {/* Belt Header: Color Name & Kyu/Dan (clickable -> Biblioteca del grado) */}
                <button
                  type="button"
                  onClick={() => onSelectBeltForLibrary(belt.key)}
                  className="text-left group/title min-w-0"
                  title="Ver biblioteca de este grado"
                >
                  <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase group-hover/title:text-red-400 transition-colors">
                    {belt.nameEs}
                  </h2>
                  <span className="text-xs font-bold text-red-400 font-mono tracking-wider uppercase">
                    {kyuDanDegree}
                  </span>
                </button>

                {/* Technique count (-> Biblioteca) + Práctica icon button, top-right aligned */}
                <div className="flex items-center gap-2 shrink-0">
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onSelectBeltForLibrary(belt.key)}
                    className="h-9 flex items-center justify-center gap-1.5 px-3 rounded-xl text-xs font-black bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors shadow-md"
                    title="Ver lista de técnicas"
                  >
                    <span className="material-symbols-outlined text-[18px] leading-none">menu_book</span>
                    <span className="font-mono text-xs leading-none">{totalCount}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onStartPracticeBelt(belt.key, 'secuencial')}
                    className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-red-600 hover:bg-red-500 text-white transition-colors shadow-md shadow-red-900/30"
                    title="Práctica"
                  >
                    <span className="material-symbols-outlined text-[18px] leading-none">fitness_center</span>
                  </motion.button>
                </div>
              </div>

              <p className="pl-3 text-xs text-gray-400 leading-relaxed">
                {belt.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
