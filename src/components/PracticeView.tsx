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
  onCompletedTechnique: (id: number) => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  techniques,
  initialTechniqueId,
  settings,
  onUpdateSettings,
  onRecordSession,
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
      speakTechnique(nextTech.id, nextTech.nro, nextTech.nombreEs, nextTech.ataque, nextTech.nombreEn, settings.speakAudio);
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
      speakTechnique(currentTechnique.id, currentTechnique.nro, currentTechnique.nombreEs, currentTechnique.ataque, currentTechnique.nombreEn, settings.speakAudio);
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

  const displayNro = currentTechnique?.nro ? String(currentTechnique.nro).padStart(2, '0') : null;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pt-2 pb-[calc(7rem+env(safe-area-inset-bottom))]">
      {/* Compact Header: Belt select + progress index */}
      <div className="flex items-center justify-between gap-3 mb-4 bg-[#1e2229] p-3 rounded-2xl border border-white/10 shadow-lg">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center font-black text-base text-white shadow-md shadow-red-900/40 shrink-0">
            練
          </div>
          <select
            value={settings.selectedBelt}
            onChange={e => onUpdateSettings({ selectedBelt: e.target.value })}
            className="bg-transparent text-sm font-black text-yellow-500 uppercase focus:outline-none truncate max-w-[160px] sm:max-w-none"
            title="Filtrar grado"
          >
            <option value="todos" className="bg-[#1e2229] text-white">Todos ({techniques.length})</option>
            {Object.values(BELT_METADATA).map(b => (
              <option key={b.key} value={b.key} className="bg-[#1e2229] text-white">
                {b.nameEs}
              </option>
            ))}
          </select>
        </div>
        <div className="w-10 h-10 rounded-xl border-2 border-yellow-500 flex items-center justify-center bg-yellow-500/10 font-bold text-yellow-500 text-xs shrink-0">
          {currentIndex + 1}/{currentBeltTechniques.length}
        </div>
      </div>

      {/* Main Technique + Timer Card */}
      <div className="bg-[#1e2229] rounded-3xl p-5 sm:p-6 border border-white/10 relative overflow-hidden shadow-2xl mb-4">
        {/* Watermark Kanji */}
        <div className="absolute top-2 right-4 opacity-10 pointer-events-none select-none">
          <div className="text-[120px] font-black leading-none text-white">武</div>
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTechnique?.id || 'empty'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 min-w-0 flex-1"
              >
                {displayNro && (
                  <div
                    className="font-black text-sm h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-black shadow-md font-mono mt-1"
                    style={{ backgroundColor: beltMeta.colorHex }}
                  >
                    {displayNro}
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight uppercase tracking-tight">
                    {currentTechnique?.nombreEs || 'FIVE SWORDS'}
                  </h2>
                  {currentTechnique?.nombreEn && (
                    <h3 className="text-sm sm:text-base text-gray-400 font-medium italic mt-0.5">
                      ({currentTechnique.nombreEn})
                    </h3>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={() => onUpdateSettings({ speakAudio: !settings.speakAudio })}
              className={`h-10 w-10 shrink-0 flex items-center justify-center rounded-xl transition-all ${
                settings.speakAudio ? 'bg-red-600 text-white' : 'bg-white/10 text-gray-400'
              }`}
              title="Voz"
            >
              <span className="material-symbols-outlined text-[20px]">
                {settings.speakAudio ? 'volume_up' : 'volume_off'}
              </span>
            </button>
          </div>

          <div className="mt-4 flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
              Ataque
            </span>
            <span className="text-sm font-semibold text-white">
              {currentTechnique?.ataque || 'Ataque frontal'}
            </span>
          </div>

          {/* Sequence/Random icon toggle (left) + Interval select (right) */}
          <div className="mt-4 flex items-center gap-2">
            <div className="flex items-center gap-1 shrink-0 bg-black/20 rounded-xl p-1 border border-white/5">
              <button
                onClick={() => onUpdateSettings({ orderMode: 'secuencial' })}
                className={`h-9 w-9 flex items-center justify-center rounded-lg transition-all ${
                  settings.orderMode === 'secuencial'
                    ? 'bg-red-600/20 border border-red-500/50 text-white'
                    : 'border border-transparent text-gray-400 hover:text-white'
                }`}
                title="Secuencial"
              >
                <span className="material-symbols-outlined text-[18px]">format_list_numbered</span>
              </button>
              <button
                onClick={() => onUpdateSettings({ orderMode: 'azar' })}
                className={`h-9 w-9 flex items-center justify-center rounded-lg transition-all ${
                  settings.orderMode === 'azar'
                    ? 'bg-red-600/20 border border-red-500/50 text-white'
                    : 'border border-transparent text-gray-400 hover:text-white'
                }`}
                title="Azar"
              >
                <span className="material-symbols-outlined text-[18px]">shuffle</span>
              </button>
            </div>

            <select
              value={settings.intervalSeconds}
              onChange={e => {
                const sec = Number(e.target.value);
                onUpdateSettings({ intervalSeconds: sec });
                setExecutionTimeLeft(sec);
              }}
              className="flex-1 h-9 bg-black/20 border border-white/5 rounded-xl px-3 text-xs font-bold text-white focus:outline-none focus:border-red-500"
            >
              {[10, 15, 30, 45].map(sec => (
                <option key={sec} value={sec} className="bg-[#1e2229] text-white">
                  Intervalo: {sec}s
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timer + Transport Controls */}
        <div className="relative z-10 mt-5 pt-5 border-t border-white/10 flex items-center gap-4">
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={isPrepPhase ? '#eab308' : '#ef4444'}
                strokeWidth="9"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-300 ease-linear"
              />
            </svg>
            <div className="absolute flex flex-col items-center text-center">
              <span className="text-base font-black text-white font-mono tracking-tight">
                {isPrepPhase
                  ? `00:0${prepTimeLeft}`
                  : `00:${String(executionTimeLeft).padStart(2, '0')}`}
              </span>
            </div>
          </div>

          <div className="flex-1 flex items-center gap-2 min-w-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleTogglePlay}
              className={`flex-1 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-colors uppercase tracking-tight shadow-lg ${
                isPlaying
                  ? 'bg-red-600 text-white hover:bg-red-500 shadow-red-900/40'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span className="hidden xs:inline sm:inline">{isPlaying ? 'Pausar' : 'Iniciar'}</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={goToPrevTechnique}
              className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-colors shrink-0"
              title="Anterior"
            >
              <span className="material-symbols-outlined text-[20px]">skip_previous</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={goToNextTechnique}
              className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-colors shrink-0"
              title="Siguiente"
            >
              <span className="material-symbols-outlined text-[20px]">skip_next</span>
            </motion.button>
          </div>
        </div>

        <div className="relative z-10 mt-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (currentTechnique) {
                onCompletedTechnique(currentTechnique.id);
                goToNextTechnique();
              }
            }}
            className="w-full bg-white text-black px-5 py-2.5 rounded-xl font-black hover:bg-gray-200 transition-colors uppercase tracking-tight text-xs shadow-lg"
          >
            Dominada / Siguiente
          </motion.button>
        </div>
      </div>

      {/* Up Next - slim row */}
      {nextTechnique && (
        <div
          onClick={goToNextTechnique}
          className="mb-4 bg-[#1e2229] rounded-2xl p-3 flex items-center gap-3 cursor-pointer border border-white/10 hover:border-red-500/30 transition-all group shadow-md"
        >
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest shrink-0">Siguiente</span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-black text-white truncate uppercase tracking-tight group-hover:text-red-400 transition-colors">
              {nextTechnique.nombreEs}
            </p>
          </div>
          <span className="material-symbols-outlined text-[18px] text-gray-500 group-hover:text-red-400 transition-colors shrink-0">
            chevron_right
          </span>
        </div>
      )}

      {/* Summary - slim row */}
      <div className="bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 text-[11px] text-gray-400 text-center">
        <span className="font-bold text-red-500">{sessionCompletedCount}</span> dominadas esta sesión
      </div>
    </div>
  );
};
