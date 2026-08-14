import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PracticeSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: PracticeSettings;
  onUpdateSettings: (newSettings: Partial<PracticeSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#1e2229] border border-white/10 rounded-3xl p-6 z-10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-red-600/20 text-red-500 border border-red-600/30">
                  <span className="material-symbols-outlined text-[24px]">settings</span>
                </div>
                <div>
                  <h2 className="text-lg font-black text-white uppercase tracking-tight">Configuración</h2>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Ajustes de práctica y temporizador</p>
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

            {/* Settings options */}
            <div className="space-y-5">
              {/* Default Execution Time */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-300 block mb-2">
                  Tiempo por Técnica
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[10, 15, 30, 45].map(sec => (
                    <motion.button
                      key={sec}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => onUpdateSettings({ intervalSeconds: sec })}
                      className={`py-2.5 rounded-xl text-xs font-black transition-colors uppercase tracking-tight ${
                        settings.intervalSeconds === sec
                          ? 'bg-red-600 text-white shadow-md shadow-red-900/30 border border-red-400'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {sec}s
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Preparation Time */}
              <div>
                <label className="text-xs font-black uppercase tracking-wider text-gray-300 block mb-2">
                  Tiempo de Preparación (Buffer)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[2, 3, 5].map(sec => (
                    <motion.button
                      key={sec}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => onUpdateSettings({ preparationSeconds: sec })}
                      className={`py-2.5 rounded-xl text-xs font-black transition-colors uppercase tracking-tight ${
                        settings.preparationSeconds === sec
                          ? 'bg-white text-black shadow-md'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {sec} seg
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Audio voice toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5">
                <div>
                  <span className="text-xs font-black text-white uppercase tracking-tight block">
                    Anunciar Voz (TTS)
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    Lee nombre en español e inglés
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onUpdateSettings({ speakAudio: !settings.speakAudio })}
                  className={`w-12 h-7 rounded-full p-1 transition-colors ${
                    settings.speakAudio ? 'bg-red-600' : 'bg-gray-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      settings.speakAudio ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </motion.button>
              </div>

              {/* Audio Beep Sound toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5">
                <div>
                  <span className="text-xs font-black text-white uppercase tracking-tight block">
                    Sonidos Beep
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    Tono al iniciar y cambiar
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onUpdateSettings({ beepSound: !settings.beepSound })}
                  className={`w-12 h-7 rounded-full p-1 transition-colors ${
                    settings.beepSound ? 'bg-red-600' : 'bg-gray-800'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      settings.beepSound ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </motion.button>
              </div>
            </div>

            {/* Done button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={onClose}
              className="w-full mt-6 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-wider py-3.5 rounded-2xl transition-colors shadow-lg shadow-red-900/30 text-xs"
            >
              Guardar y Cerrar
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
