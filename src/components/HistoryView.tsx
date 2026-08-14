import React from 'react';
import { PracticeHistoryItem } from '../types';
import { BELT_METADATA } from '../data/kenpoData';

interface HistoryViewProps {
  history: PracticeHistoryItem[];
  onClearHistory: () => void;
  onStartPractice: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onClearHistory,
  onStartPractice
}) => {
  const totalTechniques = history.reduce((sum, item) => sum + item.techniquesCompleted, 0);
  const totalMinutes = history.reduce((sum, item) => sum + item.totalTimeMinutes, 0);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-2 pb-[calc(7rem+env(safe-area-inset-bottom))]">
      {/* Header Bento Tile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 bg-[#1e2229] p-6 rounded-3xl border border-white/10 shadow-xl gap-4">
        <div>
          <span className="px-3 py-1 bg-red-600/20 text-red-400 text-xs font-bold rounded-full border border-red-600/30 uppercase tracking-widest inline-block mb-2">
            REGISTRO DE SESIONES
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            HISTORIAL DE <span className="text-red-500">ENTRENAMIENTO</span>
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
            Registro continuo de rendimiento y tiempo en práctica
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-gray-400 hover:text-red-400 text-xs flex items-center gap-1 font-bold uppercase tracking-wider bg-white/5 hover:bg-white/10 px-3.5 py-2.5 rounded-xl border border-white/10"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
            <span>Borrar Historial</span>
          </button>
        )}
      </div>

      {/* Summary Bento Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1e2229] p-5 rounded-3xl border border-white/10 shadow-xl text-center relative overflow-hidden">
          <span className="material-symbols-outlined text-red-500 text-3xl mb-1">fitness_center</span>
          <span className="text-3xl font-black text-white block tracking-tight">{history.length}</span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sesiones</span>
        </div>

        <div className="bg-[#1e2229] p-5 rounded-3xl border border-white/10 shadow-xl text-center relative overflow-hidden">
          <span className="material-symbols-outlined text-red-500 text-3xl mb-1">checklist</span>
          <span className="text-3xl font-black text-white block tracking-tight">{totalTechniques}</span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ejecutadas</span>
        </div>

        <div className="bg-[#1e2229] p-5 rounded-3xl border border-white/10 shadow-xl text-center relative overflow-hidden">
          <span className="material-symbols-outlined text-red-500 text-3xl mb-1">timer</span>
          <span className="text-3xl font-black text-white block tracking-tight">{totalMinutes}m</span>
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tiempo Total</span>
        </div>
      </div>

      {/* History Log */}
      {history.length === 0 ? (
        <div className="bg-[#1e2229] p-10 rounded-3xl text-center my-6 border border-white/10 shadow-xl">
          <span className="material-symbols-outlined text-5xl text-gray-500 mb-3">history</span>
          <h2 className="text-lg font-black text-white uppercase tracking-tight mb-1">Sin sesiones aún</h2>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
            Inicia una sesión en el Modo Práctica para registrar tu progreso y tiempo de práctica.
          </p>
          <button
            onClick={onStartPractice}
            className="bg-red-600 hover:bg-red-500 text-white font-black text-xs px-6 py-3.5 rounded-2xl shadow-lg shadow-red-900/30 uppercase tracking-wider active:scale-95 transition-all"
          >
            Iniciar Práctica Ahora
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map(item => {
            const beltMeta = BELT_METADATA[item.belt?.toLowerCase()] || {
              nameEs: item.belt === 'todos' ? 'Todos los Cinturones' : item.belt,
              colorHex: '#ef4444'
            };

            return (
              <div
                key={item.id}
                className="bg-[#1e2229] rounded-2xl p-4 md:p-5 flex items-center justify-between border border-white/10 shadow-lg hover:border-red-500/30 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-3 h-10 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: beltMeta.colorHex }}
                  />
                  <div>
                    <h3 className="text-base font-black text-white uppercase tracking-tight">
                      {beltMeta.nameEs}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium">{item.timestamp}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-red-400 block uppercase tracking-tight">
                    {item.techniquesCompleted} técnicas
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    ⏱️ {item.totalTimeMinutes} min
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
