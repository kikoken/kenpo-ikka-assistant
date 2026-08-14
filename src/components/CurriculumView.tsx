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
    <div className="w-full max-w-5xl mx-auto px-4 pt-4 pb-28">
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
          const completedCount = beltTechniques.filter(t => completedIds.has(t.id)).length;
          const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
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

              <div className="pl-3 mb-4">
                {/* Belt Header: Color Name, Kyu/Dan & Technique Count Icon Button */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase">
                      {belt.nameEs}
                    </h2>
                    <span className="text-xs font-bold text-red-400 font-mono tracking-wider uppercase">
                      {kyuDanDegree}
                    </span>
                  </div>

                  {/* Bullet / Button for Techniques count with menu_book icon */}
                  <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => onSelectBeltForLibrary(belt.key)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors shadow-md shrink-0"
                    title="Ver lista de técnicas"
                  >
                    <span className="material-symbols-outlined text-[18px]">menu_book</span>
                    <span className="font-mono text-xs">{totalCount}</span>
                  </motion.button>
                </div>

                <p className="text-xs text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                  {belt.description}
                </p>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between items-center mb-1 text-[11px] font-bold">
                    <span className="text-gray-400 uppercase tracking-widest">Progreso</span>
                    <span className="text-red-400 font-mono">{progressPercent}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.05 + 0.2 }}
                      className="h-full bg-red-600 rounded-full shadow-md shadow-red-900/50"
                    />
                  </div>
                </div>
              </div>

              {/* Action Button: Single "Práctica" button */}
              <div className="pl-3 pt-4 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onStartPracticeBelt(belt.key, 'secuencial')}
                  className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase transition-colors flex items-center justify-center gap-2 shadow-md shadow-red-900/30 tracking-wider"
                >
                  <span className="material-symbols-outlined text-[18px]">fitness_center</span>
                  <span>Práctica</span>
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
