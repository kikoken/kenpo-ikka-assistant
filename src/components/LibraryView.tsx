import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { KenpoTechnique } from '../types';
import { BELT_METADATA, ATTACK_CATEGORIES, filterTechniques } from '../data/kenpoData';

interface LibraryViewProps {
  techniques: KenpoTechnique[];
  initialBelt?: string;
  onSelectTechniqueForPractice: (tech: KenpoTechnique) => void;
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
}

// Helper component for smooth horizontal scrolling with buttons & drag-to-scroll
const HorizontalScrollWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 2);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
    }
  };

  useEffect(() => {
    checkScroll();
    const timer = setTimeout(checkScroll, 100);
    window.addEventListener('resize', checkScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkScroll);
    };
  }, [children]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.6;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Mouse drag support
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isMouseDown.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeftStart.current = containerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isMouseDown.current = false;
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  return (
    <div className="relative group/scroll px-1">
      {/* Left Scroll Button */}
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => handleScroll('left')}
          className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/90 text-white border border-white/20 flex items-center justify-center shadow-lg hover:bg-red-600 transition-all active:scale-90"
          title="Deslizar a la izquierda"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>
      )}

      {/* Right Scroll Button */}
      {canScrollRight && (
        <button
          type="button"
          onClick={() => handleScroll('right')}
          className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/90 text-white border border-white/20 flex items-center justify-center shadow-lg hover:bg-red-600 transition-all active:scale-90"
          title="Deslizar a la derecha"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={containerRef}
        onScroll={checkScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 pt-0.5 px-0.5 scroll-smooth cursor-grab active:cursor-grabbing select-none"
      >
        {children}
      </div>
    </div>
  );
};

export const LibraryView: React.FC<LibraryViewProps> = ({
  techniques,
  initialBelt = 'todos',
  onSelectTechniqueForPractice,
  favorites,
  onToggleFavorite
}) => {
  const [selectedBelt, setSelectedBelt] = useState<string>(initialBelt);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTechniques = useMemo(() => {
    return filterTechniques(techniques, searchQuery, selectedBelt, selectedCategory);
  }, [techniques, searchQuery, selectedBelt, selectedCategory]);

  // Group by belt for clear organized display if 'todos' is selected
  const groupedByBelt = useMemo(() => {
    const map = new Map<string, KenpoTechnique[]>();
    filteredTechniques.forEach(tech => {
      const beltKey = tech.cinturon.toLowerCase();
      if (!map.has(beltKey)) {
        map.set(beltKey, []);
      }
      map.get(beltKey)!.push(tech);
    });
    return map;
  }, [filteredTechniques]);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-2 pb-[calc(7rem+env(safe-area-inset-bottom))]">
      {/* Search Bar Bento Style */}
      <div className="mb-5 relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Buscar técnica por nombre, ataque o familia..."
          className="w-full pl-12 pr-10 py-3.5 bg-[#1e2229] border border-white/10 rounded-2xl text-sm text-white placeholder-gray-500 font-medium focus:outline-none focus:border-red-500 transition-all shadow-lg"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {/* Attack Category Filter Section */}
      <section className="mb-5 bg-[#1e2229] p-4 rounded-3xl border border-white/10 shadow-xl">
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2.5 px-1">
          Filtrar por Ataque
        </h2>
        <HorizontalScrollWrapper>
          {ATTACK_CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 font-bold text-xs px-4 py-2.5 rounded-xl transition-all whitespace-nowrap active:scale-95 uppercase tracking-wider ${
                  isActive
                    ? 'bg-red-600 text-white border border-red-400 shadow-md shadow-red-900/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </HorizontalScrollWrapper>
      </section>

      {/* Belt Filter Horizontal Tabs */}
      <section className="mb-6 bg-[#1e2229] p-4 rounded-3xl border border-white/10 shadow-xl">
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2.5 px-1">
          Grado / Cinturón
        </h2>
        <HorizontalScrollWrapper>
          <button
            onClick={() => setSelectedBelt('todos')}
            className={`flex-shrink-0 text-xs px-4 py-2.5 rounded-xl transition-all whitespace-nowrap uppercase font-bold ${
              selectedBelt === 'todos'
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
            }`}
          >
            Todos ({techniques.length})
          </button>
          {Object.values(BELT_METADATA).map(belt => {
            const isSel = selectedBelt.toLowerCase() === belt.key.toLowerCase();
            return (
              <button
                key={belt.key}
                onClick={() => setSelectedBelt(belt.key)}
                className={`flex-shrink-0 text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap uppercase font-bold border ${
                  isSel
                    ? 'border-red-500 bg-red-600/20 text-white shadow-md shadow-red-900/20'
                    : 'border-white/10 bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0 shadow-sm"
                  style={{ backgroundColor: belt.colorHex }}
                />
                <span>{belt.nameEs}</span>
              </button>
            );
          })}
        </HorizontalScrollWrapper>
      </section>

      {/* Techniques Count Info */}
      <div className="flex justify-between items-center mb-4 text-xs text-gray-400 px-1 font-bold uppercase tracking-wider">
        <span>Mostrando {filteredTechniques.length} técnicas</span>
        {(selectedBelt !== 'todos' || selectedCategory !== 'Todos' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedBelt('todos');
              setSelectedCategory('Todos');
              setSearchQuery('');
            }}
            className="text-red-400 hover:underline flex items-center gap-1 font-bold"
          >
            <span className="material-symbols-outlined text-[14px]">restart_alt</span>
            Limpiar Filtros
          </button>
        )}
      </div>

      {/* Techniques List grouped */}
      {filteredTechniques.length === 0 ? (
        <div className="bg-[#1e2229] p-8 rounded-3xl text-center my-8 border border-white/10 shadow-xl">
          <span className="material-symbols-outlined text-4xl text-gray-500 mb-2">search_off</span>
          <p className="text-white font-bold mb-1 uppercase tracking-tight">No se encontraron técnicas</p>
          <p className="text-xs text-gray-400">Prueba ajustando los filtros de búsqueda o el grado de cinturón.</p>
        </div>
      ) : (
        Array.from(groupedByBelt.entries()).map(([beltKey, techList]) => {
          const beltMeta = BELT_METADATA[beltKey] || {
            nameEs: `Cinturón ${beltKey}`,
            colorHex: '#ef4444'
          };

          return (
            <div key={beltKey} className="mb-8">
              {/* Belt Header Section */}
              <div className="flex items-center gap-2.5 mb-3 px-1">
                <span
                  className="w-3.5 h-3.5 rounded-full shadow-sm"
                  style={{ backgroundColor: beltMeta.colorHex }}
                />
                <h2 className="text-lg font-black text-white uppercase tracking-tight">
                  Técnicas {beltMeta.nameEs}
                </h2>
                <span className="text-xs text-gray-400 font-mono">
                  ({techList.length})
                </span>
              </div>

              {/* List of cards */}
              <div className="flex flex-col gap-3">
                {techList.map((tech, idx) => {
                  const isFav = favorites.has(tech.id);
                  const displayIndex = String(tech.nro || idx + 1).padStart(2, '0');

                  return (
                    <motion.div
                      key={tech.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.3) }}
                      className="bg-[#1e2229] rounded-2xl p-4 border border-white/10 hover:border-red-500/40 transition-colors shadow-lg flex flex-col gap-2.5"
                    >
                      {/* Line 1: numero, tipo, estrella, boton entrenar (más pequeño) */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          {/* Numero */}
                          <div
                            className="font-black text-xs h-7 w-7 rounded-lg flex items-center justify-center shrink-0 text-black shadow-md font-mono"
                            style={{ backgroundColor: beltMeta.colorHex }}
                          >
                            {displayIndex}
                          </div>

                          {/* Tipo */}
                          <span className="bg-red-600/20 text-red-400 text-[10px] font-bold px-2.5 py-0.5 rounded-lg border border-red-600/30 uppercase tracking-wider truncate">
                            {tech.tipo || 'Defensa Personal'}
                          </span>
                        </div>

                        {/* Actions: Estrella & Boton Entrenar (más pequeño) */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Estrella */}
                          <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.85 }}
                            onClick={() => onToggleFavorite(tech.id)}
                            className={`p-1.5 rounded-lg transition-colors border ${
                              isFav
                                ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
                                : 'text-gray-400 hover:text-white bg-white/5 border-white/5'
                            }`}
                            title={isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                          >
                            <span
                              className="material-symbols-outlined text-[18px]"
                              style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                            >
                              star
                            </span>
                          </motion.button>

                          {/* Botón Entrenar (más pequeño) */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => onSelectTechniqueForPractice(tech)}
                            className="bg-red-600 hover:bg-red-500 text-white font-black text-[11px] px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 shadow-md shadow-red-900/30 uppercase tracking-tight"
                            title="Entrenar esta técnica"
                          >
                            <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                            <span>Entrenar</span>
                          </motion.button>
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
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};
