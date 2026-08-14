import React, { useState } from 'react';
import { KenpoTechnique } from '../types';
import { BELT_METADATA } from '../data/kenpoData';

interface FavoritesViewProps {
  techniques: KenpoTechnique[];
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
  onSelectTechniqueForPractice: (tech: KenpoTechnique) => void;
  onStartFavoritePractice: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  techniques,
  favorites,
  onToggleFavorite,
  onSelectTechniqueForPractice,
  onStartFavoritePractice
}) => {
  const favoriteTechniques = techniques.filter(t => favorites.has(t.id));
  const [search, setSearch] = useState('');

  const filtered = favoriteTechniques.filter(
    t =>
      t.nombreEs.toLowerCase().includes(search.toLowerCase()) ||
      t.nombreEn.toLowerCase().includes(search.toLowerCase()) ||
      t.ataque.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-2 pb-[calc(7rem+env(safe-area-inset-bottom))]">
      {/* Header Bento Tile */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 bg-[#1e2229] p-6 rounded-3xl border border-white/10 shadow-xl gap-4">
        <div>
          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full border border-yellow-500/30 uppercase tracking-wider inline-block mb-2">
            COLECCIÓN GUARDADA
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
            TÉCNICAS <span className="text-yellow-500">FAVORITAS</span>
          </h1>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
            {favoriteTechniques.length} técnicas guardadas para repaso rápido
          </p>
        </div>

        {favoriteTechniques.length > 0 && (
          <button
            onClick={onStartFavoritePractice}
            className="bg-red-600 hover:bg-red-500 text-white px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-tight flex items-center gap-2 shadow-lg shadow-red-900/30 active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">fitness_center</span>
            <span>Entrenar Favoritos</span>
          </button>
        )}
      </div>

      {/* Search inside favorites */}
      {favoriteTechniques.length > 0 && (
        <div className="mb-4 relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar entre tus favoritos..."
            className="w-full pl-12 pr-4 py-3 bg-[#1e2229] border border-white/10 rounded-2xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500 font-medium"
          />
        </div>
      )}

      {/* Empty State */}
      {favoriteTechniques.length === 0 ? (
        <div className="bg-[#1e2229] p-10 rounded-3xl text-center my-8 border border-white/10 shadow-xl">
          <span className="material-symbols-outlined text-5xl text-yellow-500 mb-3">star_border</span>
          <h2 className="text-lg font-black text-white uppercase tracking-tight mb-1">Aún no tienes favoritos</h2>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
            Toca el ícono de estrella en cualquier técnica de la biblioteca para guardarla aquí y repasarla fácilmente.
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-gray-400 my-8 text-xs uppercase font-bold tracking-wider">
          No hay favoritos que coincidan con la búsqueda.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(tech => {
            const beltKey = tech.cinturon.toLowerCase();
            const beltMeta = BELT_METADATA[beltKey] || { nameEs: `Cinturón ${beltKey}`, colorHex: '#ef4444' };

            return (
              <div
                key={tech.id}
                className="bg-[#1e2229] rounded-2xl p-4 border border-white/10 hover:border-yellow-500/40 transition-all shadow-lg flex flex-col gap-2.5"
              >
                {/* Line 1: numero, tipo, estrella, boton entrenar (más pequeño) */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {/* Numero */}
                    <div
                      className="font-black text-xs h-7 w-7 rounded-lg flex items-center justify-center shrink-0 text-black shadow-md font-mono"
                      style={{ backgroundColor: beltMeta.colorHex }}
                    >
                      {String(tech.nro || 1).padStart(2, '0')}
                    </div>

                    {/* Tipo */}
                    <span className="bg-red-600/20 text-red-400 text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-red-600/30 uppercase tracking-wider truncate">
                      {tech.tipo || 'Defensa Personal'}
                    </span>
                  </div>

                  {/* Actions: Estrella & Boton Entrenar (más pequeño) */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Estrella */}
                    <button
                      onClick={() => onToggleFavorite(tech.id)}
                      className="p-1.5 rounded-lg text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20 transition-all"
                      title="Quitar de favoritos"
                    >
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    </button>

                    {/* Botón Entrenar (más pequeño) */}
                    <button
                      onClick={() => onSelectTechniqueForPractice(tech)}
                      className="bg-red-600 hover:bg-red-500 text-white font-black text-[11px] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 shadow-md shadow-red-900/30 active:scale-95 uppercase tracking-tight"
                      title="Entrenar esta técnica"
                    >
                      <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                      <span>Entrenar</span>
                    </button>
                  </div>
                </div>

                {/* Line 2: nombre de la defensa en español / ingles */}
                <div>
                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight uppercase leading-snug">
                    {tech.nombreEs}
                    {tech.nombreEn ? (
                      <span className="text-gray-400 font-semibold text-xs sm:text-sm normal-case">
                        {' / '}{tech.nombreEn}
                      </span>
                    ) : null}
                  </h3>
                </div>

                {/* Line 3: ataque de la defensa */}
                <div className="text-xs text-gray-300 bg-black/30 px-3 py-1.5 rounded-xl border border-white/5">
                  <span className="text-gray-400 font-bold uppercase tracking-wider">Ataque: </span>
                  <span>{tech.ataque}</span>
                </div>

                {/* Line 4: familia */}
                {tech.familia && (
                  <div className="text-[11px] text-gray-400 font-medium px-1">
                    <span className="font-bold text-gray-500 uppercase tracking-wider">Familia: </span>
                    <span className="text-gray-300 font-semibold">{tech.familia}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
