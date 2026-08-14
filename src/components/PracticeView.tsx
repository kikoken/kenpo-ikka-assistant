import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KenpoTechnique, PracticeSettings } from '../types';
import { BELT_METADATA } from '../data/kenpoData';
import { speakTechnique, playBeep } from '../utils/audio';

interface PracticeViewProps {
  techniques: KenpoTechnique[];
  initialTechniqueId?: number | null;
  settings: PracticeSettings;
  onUpdateSettings: (newSettings: Partial<PracticeSettings>) => void;
  onRecordSession: (belt: string, count: number, minutes: number) => void;
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
  onCompletedTechnique: (id: number) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  techniques,
  initialTechniqueId,
  settings,
  onUpdateSettings,
  onRecordSession,
  favorites,
  onToggleFavorite,
  onCompletedTechnique
}) => {
  // Filter techniques by selected belt
  const currentBeltTechniques = useMemo(() => {
    if (!settings.selectedBelt || settings.selectedBelt === 'todos') {
      return techniques;
    }
    return techniques.filter(
      t => t.cinturon.toLowerCase() === settings.selectedBelt.toLowerCase()
    );
  }, [techniques, settings.selectedBelt]);

  // Current technique index state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPrepPhase, setIsPrepPhase] = useState<boolean>(true);

  // Timers in seconds
  const [prepTimeLeft, setPrepTimeLeft] = useState<number>(settings.preparationSeconds || 3);
  const [executionTimeLeft, setExecutionTimeLeft] = useState<number>(settings.intervalSeconds || 15);

  // Counter of completed items in this active session
  const [sessionCompletedCount, setSessionCompletedCount] = useState<number>(0);
  const sessionStartTimeRef = useRef<number>(Date.now());

  // Set initial technique if provided
  const initialProcessedRef = useRef<number | null>(null);
  useEffect(() => {
    if (initialTechniqueId && initialTechniqueId !== initialProcessedRef.current && currentBeltTechniques.length > 0) {
      const idx = currentBeltTechniques.findIndex(t => t.id === initialTechniqueId);
      if (idx !== -1) {
        initialProcessedRef.current = initialTechniqueId;
        setCurrentIndex(idx);
        setIsPrepPhase(true);
        setPrepTimeLeft(settings.preparationSeconds || 3);
        setExecutionTimeLeft(settings.intervalSeconds || 15);
      }
    }
  }, [initialTechniqueId, currentBeltTechniques, settings.preparationSeconds, settings.intervalSeconds]);

  // Current active technique
  const currentTechnique = currentBeltTechniques[currentIndex] || currentBeltTechniques[0] || techniques[0];

  // Up next technique logic
  const nextTechnique = useMemo(() => {
    if (currentBeltTechniques.length <= 1) return currentBeltTechniques[0];
    if (settings.orderMode === 'azar') {
      // Pick next index different from current
      const nextIdx = (currentIndex + 1) % currentBeltTechniques.length;
      return currentBeltTechniques[nextIdx];
    } else {
      const nextIdx = (currentIndex + 1) % currentBeltTechniques.length;
      return currentBeltTechniques[nextIdx];
    }
  }, [currentBeltTechniques, currentIndex, settings.orderMode]);

  // Handle advancing to next technique
  const goToNextTechnique = useCallback(() => {
    if (currentBeltTechniques.length === 0) return;

    if (currentTechnique) {
      onCompletedTechnique(currentTechnique.id);
      setSessionCompletedCount(prev => prev + 1);
    }

    let nextIdx = 0;
    if (settings.orderMode === 'azar') {
      if (currentBeltTechniques.length > 1) {
        do {
          nextIdx = Math.floor(Math.random() * currentBeltTechniques.length);
        } while (nextIdx === currentIndex);
      }
    } else {
      nextIdx = (currentIndex + 1) % currentBeltTechniques.length;
    }

    setCurrentIndex(nextIdx);
    setIsPrepPhase(true);
    setPrepTimeLeft(settings.preparationSeconds || 3);
    setExecutionTimeLeft(settings.intervalSeconds || 15);

    const nextTech = currentBeltTechniques[nextIdx];
    if (nextTech) {
      speakTechnique(nextTech.nombreEs, settings.speakAudio);
    }
  }, [currentBeltTechniques, currentTechnique, currentIndex, settings.orderMode, settings.preparationSeconds, settings.intervalSeconds, settings.speakAudio, onCompletedTechnique]);

  // Handle going back
  const goToPrevTechnique = () => {
    if (currentBeltTechniques.length === 0) return;
    const prevIdx = (currentIndex - 1 + currentBeltTechniques.length) % currentBeltTechniques.length;
    setCurrentIndex(prevIdx);
    setIsPrepPhase(true);
    setPrepTimeLeft(settings.preparationSeconds || 3);
    setExecutionTimeLeft(settings.intervalSeconds || 15);
  };

  // Keep refs for callback & settings for timer
  const goToNextTechniqueRef = useRef(goToNextTechnique);
  useEffect(() => {
    goToNextTechniqueRef.current = goToNextTechnique;
  }, [goToNextTechnique]);

  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // Timer tick effect
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      if (isPrepPhase) {
        setPrepTimeLeft(prev => {
          if (prev <= 1) {
            playBeep('start', settingsRef.current.beepSound);
            setTimeout(() => setIsPrepPhase(false), 0);
            return 0;
          }
          playBeep('prep', settingsRef.current.beepSound);
          return prev - 1;
        });
      } else {
        setExecutionTimeLeft(prev => {
          if (prev <= 1) {
            playBeep('end', settingsRef.current.beepSound);
            setTimeout(() => {
              goToNextTechniqueRef.current();
            }, 0);
            return settingsRef.current.intervalSeconds || 15;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, isPrepPhase]);

  // Announce technique audio on start/resume or index change
  const handleTogglePlay = () => {
    const newPlayState = !isPlaying;
    setIsPlaying(newPlayState);

    if (newPlayState && currentTechnique) {
      speakTechnique(currentTechnique.nombreEs, settings.speakAudio);
    }
  };

  // Maintain refs for session completion reporting
  const sessionCompletedCountRef = useRef(sessionCompletedCount);
  useEffect(() => {
    sessionCompletedCountRef.current = sessionCompletedCount;
  }, [sessionCompletedCount]);

  const selectedBeltRef = useRef(settings.selectedBelt);
  useEffect(() => {
    selectedBeltRef.current = settings.selectedBelt;
  }, [settings.selectedBelt]);

  const onRecordSessionRef = useRef(onRecordSession);
  useEffect(() => {
    onRecordSessionRef.current = onRecordSession;
  }, [onRecordSession]);

  // Record practice session ONLY when component unmounts
  useEffect(() => {
    return () => {
      if (sessionCompletedCountRef.current > 0) {
        const durationMinutes = Math.max(1, Math.round((Date.now() - sessionStartTimeRef.current) / 60000));
        onRecordSessionRef.current(selectedBeltRef.current, sessionCompletedCountRef.current, durationMinutes);
      }
    };
  }, []);

  // Calculation for SVG circle timer offset
  const maxExecutionTime = settings.intervalSeconds || 15;
  const strokeDasharray = 283; // 2 * PI * r(45) approx
  const progressRatio = isPrepPhase
    ? prepTimeLeft / (settings.preparationSeconds || 3)
    : executionTimeLeft / maxExecutionTime;
  const strokeDashoffset = strokeDasharray - strokeDasharray * progressRatio;

  // Belt styling metadata
  const beltKey = currentTechnique?.cinturon?.toLowerCase() || 'naranjo';
  const beltMeta = BELT_METADATA[beltKey] || BELT_METADATA['naranjo'];
  const isFav = currentTechnique ? favorites.has(currentTechnique.id) : false;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-2 pb-28">
      {/* Top Header Banner / Grade Badge in Bento Style */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-[#1e2229] p-5 rounded-3xl border border-white/10 shadow-xl gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-lg shadow-red-900/40">
            練
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white uppercase">
              ENTRENAMIENTO <span className="text-red-500">ACTIVO</span>
            </h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
              Sesión de Técnicas Kenpo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 self-end sm:self-center">
          <div className="text-right">
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Grado Seleccionado</p>
            <p className="text-sm font-bold text-yellow-500 italic">
              {beltMeta.nameEs}
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl border-2 border-yellow-500 flex items-center justify-center bg-yellow-500/10 font-bold text-yellow-500 text-xs">
            {currentIndex + 1}/{currentBeltTechniques.length}
          </div>
        </div>
      </div>

      {/* Main Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Active Practice Main Bento Card (Spans 8 cols on desktop) */}
        <div className="md:col-span-8 bg-[#1e2229] rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[320px]">
          {/* Watermark Kanji */}
          <div className="absolute top-2 right-4 opacity-10 pointer-events-none select-none">
            <div className="text-[150px] font-black leading-none text-white">武</div>
          </div>

          <div className="relative z-10">
            <div className="flex justify-between items-start gap-2">
              <span className="px-3 py-1 bg-red-600/20 text-red-500 text-xs font-bold rounded-full border border-red-600/30 uppercase tracking-wider inline-block">
                {isPrepPhase ? 'FASE PREPARACIÓN' : 'EJECUCIÓN ACTIVA'}
              </span>

              {/* Favorite Toggle */}
              {currentTechnique && (
                <motion.button
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.88 }}
                  onClick={() => onToggleFavorite(currentTechnique.id)}
                  className={`p-2 rounded-2xl border transition-colors ${
                    isFav
                      ? 'text-yellow-400 border-yellow-500/40 bg-yellow-500/10'
                      : 'text-gray-400 border-white/10 bg-white/5 hover:text-white'
                  }`}
                  title="Favorito"
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: isFav ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </motion.button>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTechnique?.id || 'empty'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-3xl md:text-5xl font-black mt-4 text-white leading-tight uppercase tracking-tight">
                  {currentTechnique?.nombreEs || 'FIVE SWORDS'}
                </h2>
                {currentTechnique?.nombreEn && (
                  <h3 className="text-lg md:text-xl text-gray-400 font-medium italic mt-1">
                    ({currentTechnique.nombreEn})
                  </h3>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-6 items-end justify-between relative z-10">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                Ataque del Agresor
              </span>
              <span className="text-base font-semibold text-white">
                {currentTechnique?.ataque || 'Ataque frontal'}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                Categoría
              </span>
              <span className="text-base font-semibold text-red-400">
                {currentTechnique?.tipo || 'Defensa Personal'}
              </span>
            </div>

            <div className="ml-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  if (currentTechnique) {
                    onCompletedTechnique(currentTechnique.id);
                    goToNextTechnique();
                  }
                }}
                className="bg-white text-black px-5 py-2.5 rounded-xl font-black hover:bg-gray-200 transition-colors uppercase tracking-tight text-xs shadow-lg"
              >
                Dominada / Siguiente
              </motion.button>
            </div>
          </div>
        </div>

        {/* Practice Mode & Timer Bento Card (Spans 4 cols on desktop) */}
        <div className="md:col-span-4 bg-gradient-to-br from-red-950/40 to-[#1e2229] rounded-3xl p-6 border border-red-500/20 flex flex-col justify-between shadow-xl">
          <div>
            <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4">
              Control de Práctica
            </h4>

            {/* Circular Timer Ring */}
            <div className="relative w-40 h-40 mx-auto my-2 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke={isPrepPhase ? '#eab308' : '#ef4444'}
                  strokeWidth="7"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 ease-linear"
                />
              </svg>
              <div className="absolute flex flex-col items-center text-center">
                <span className="text-3xl font-black text-white font-mono tracking-tight">
                  {isPrepPhase
                    ? `00:0${prepTimeLeft}`
                    : `00:${String(executionTimeLeft).padStart(2, '0')}`}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-red-400">
                  {isPrepPhase ? 'PREPARAR' : 'TIEMPO'}
                </span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTogglePlay}
              className={`w-full py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-colors uppercase tracking-tight shadow-lg ${
                isPlaying
                  ? 'bg-red-600 text-white hover:bg-red-500 shadow-red-900/40'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span>{isPlaying ? 'Pausar' : 'Iniciar'}</span>
            </motion.button>

            <div className="flex gap-2">
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={goToPrevTechnique}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 flex items-center justify-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">skip_previous</span>
                <span>Anterior</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={goToNextTechnique}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl border border-white/10 flex items-center justify-center gap-1 transition-colors"
              >
                <span>Siguiente</span>
                <span className="material-symbols-outlined text-[16px]">skip_next</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Order Mode Bento Tile (Spans 4 cols on desktop) */}
        <div className="md:col-span-4 bg-[#1e2229] rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Modo de Selección
          </h4>

          <div className="space-y-2">
            <button
              onClick={() => onUpdateSettings({ orderMode: 'secuencial' })}
              className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
                settings.orderMode === 'secuencial'
                  ? 'bg-red-600/20 border-red-500/50 text-white font-bold'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">format_list_numbered</span>
                Secuencial
              </span>
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  settings.orderMode === 'secuencial'
                    ? 'border-red-500 bg-red-500'
                    : 'border-gray-500'
                }`}
              />
            </button>

            <button
              onClick={() => onUpdateSettings({ orderMode: 'azar' })}
              className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
                settings.orderMode === 'azar'
                  ? 'bg-red-600/20 border-red-500/50 text-white font-bold'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">shuffle</span>
                Azar / Aleatorio
              </span>
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  settings.orderMode === 'azar'
                    ? 'border-red-500 bg-red-500'
                    : 'border-gray-500'
                }`}
              />
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-xs">
            <span className="text-gray-400 font-semibold">Voz de audio:</span>
            <button
              onClick={() => onUpdateSettings({ speakAudio: !settings.speakAudio })}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold uppercase transition-all ${
                settings.speakAudio
                  ? 'bg-red-600 text-white'
                  : 'bg-white/10 text-gray-400'
              }`}
            >
              {settings.speakAudio ? 'Activada' : 'Muda'}
            </button>
          </div>
        </div>

        {/* Up Next Bento Card (Spans 4 cols on desktop) */}
        <div className="md:col-span-4 bg-[#1e2229] rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Siguiente Técnica
            </h4>
            <span className="text-[10px] text-gray-400 font-mono">
              {currentIndex + 2 > currentBeltTechniques.length ? 1 : currentIndex + 2} de {currentBeltTechniques.length}
            </span>
          </div>

          {nextTechnique && (
            <div
              onClick={goToNextTechnique}
              className="bg-black/30 rounded-2xl p-4 flex items-center gap-4 cursor-pointer border border-white/5 hover:border-red-500/30 transition-all group"
            >
              <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-xl font-serif italic text-red-400 group-hover:bg-red-600 group-hover:text-white transition-all">
                {nextTechnique.nombreEs.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-black text-white truncate uppercase tracking-tight group-hover:text-red-400 transition-colors">
                  {nextTechnique.nombreEs}
                </p>
                <p className="text-[11px] text-gray-400 truncate">
                  {nextTechnique.nombreEn || nextTechnique.ataque}
                </p>
              </div>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-xs">
            <span className="text-gray-400 font-semibold">Intervalo actual:</span>
            <div className="flex gap-1">
              {[10, 15, 30, 45].map(sec => (
                <button
                  key={sec}
                  onClick={() => {
                    onUpdateSettings({ intervalSeconds: sec });
                    setExecutionTimeLeft(sec);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    settings.intervalSeconds === sec
                      ? 'bg-red-600 text-white'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Belt Selection Bento Tile (Spans 4 cols on desktop) */}
        <div className="md:col-span-4 bg-[#1e2229] rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Filtrar Grado
          </h4>
          <select
            value={settings.selectedBelt}
            onChange={e => onUpdateSettings({ selectedBelt: e.target.value })}
            className="w-full bg-black/30 border border-white/10 rounded-2xl px-4 py-3 text-xs font-bold text-white uppercase focus:outline-none focus:border-red-500"
          >
            <option value="todos">Todos los Grados ({techniques.length})</option>
            {Object.values(BELT_METADATA).map(b => (
              <option key={b.key} value={b.key}>
                {b.nameEs}
              </option>
            ))}
          </select>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-gray-400">
            Cinturón en práctica: <span className="font-bold text-yellow-500">{beltMeta.nameEs}</span>
          </div>
        </div>

        {/* Summary Inventory Bento Row (Spans 12 cols on desktop) */}
        <div className="md:col-span-12 bg-[#1e2229] rounded-3xl p-6 border border-white/10 shadow-xl">
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">
            Resumen de Inventario de Técnicas
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-black/20 p-3.5 rounded-2xl border border-white/5">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Grado Actual</p>
              <p className="text-sm font-bold text-white mt-0.5">{beltMeta.nameEs}</p>
            </div>
            <div className="bg-black/20 p-3.5 rounded-2xl border border-white/5">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Total Técnicas</p>
              <p className="text-sm font-bold text-white mt-0.5">{currentBeltTechniques.length} Registradas</p>
            </div>
            <div className="bg-black/20 p-3.5 rounded-2xl border border-white/5">
              <p className="text-[10px] text-gray-500 uppercase font-bold">Completadas Sesión</p>
              <p className="text-sm font-bold text-red-500 mt-0.5">{sessionCompletedCount} Dominadas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
