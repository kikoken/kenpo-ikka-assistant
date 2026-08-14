import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  KenpoTechnique,
  ActiveTab,
  PracticeSettings,
  PracticeHistoryItem
} from './types';
import { RAW_KENPO_TECHNIQUES } from './data/kenpoData';
import { TopAppBar } from './components/TopAppBar';
import { BottomNav } from './components/BottomNav';
import { NavigationDrawer } from './components/NavigationDrawer';
import { CurriculumView } from './components/CurriculumView';
import { LibraryView } from './components/LibraryView';
import { PracticeView } from './components/PracticeView';
import { FavoritesView } from './components/FavoritesView';
import { HistoryView } from './components/HistoryView';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import { SettingsModal } from './components/SettingsModal';

const FAVORITES_STORAGE_KEY = 'kenpo_favorites_v1';
const COMPLETED_STORAGE_KEY = 'kenpo_completed_v1';
const HISTORY_STORAGE_KEY = 'kenpo_history_v1';
const SETTINGS_STORAGE_KEY = 'kenpo_settings_v1';
const TECHNIQUES_STORAGE_KEY = 'kenpo_custom_techniques_v1';

export default function App() {
  // Navigation & Drawer states
  const [activeTab, setActiveTab] = useState<ActiveTab>('practice'); // Default to Practice Mode as in mockups
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Filter & Selected state for Library
  const [libraryBeltFilter, setLibraryBeltFilter] = useState<string>('todos');

  // Selected technique ID to start training immediately
  const [selectedPracticeTechId, setSelectedPracticeTechId] = useState<number | null>(null);

  // Techniques state (loaded from local storage or raw curriculum)
  const [techniques, setTechniques] = useState<KenpoTechnique[]>(() => {
    try {
      const saved = localStorage.getItem(TECHNIQUES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load saved techniques:', e);
    }
    return RAW_KENPO_TECHNIQUES;
  });

  // Favorites state
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      console.warn('Failed to load favorites:', e);
    }
    return new Set<number>([19, 1, 17]); // Default favorites e.g. Five Swords, Delayed Sword, Lone Kimono
  });

  // Completed techniques state
  const [completedIds, setCompletedIds] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem(COMPLETED_STORAGE_KEY);
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      console.warn('Failed to load completed:', e);
    }
    return new Set<number>();
  });

  // Practice History state
  const [history, setHistory] = useState<PracticeHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load history:', e);
    }
    return [];
  });

  // Settings state
  const [settings, setSettings] = useState<PracticeSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load settings:', e);
    }
    return {
      intervalSeconds: 15,
      preparationSeconds: 3,
      orderMode: 'secuencial',
      selectedBelt: 'naranjo', // Cinturón Naranja default as in Screen 1 mockup
      selectedAttackCategory: 'Todos',
      speakAudio: true,
      beepSound: true,
      repeatMode: true
    };
  });

  // Persist state changes
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favorites)));
    } catch (e) {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(Array.from(completedIds)));
    } catch (e) {}
  }, [completedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch (e) {}
  }, [history]);

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  // Favorite toggle handler
  const handleToggleFavorite = useCallback((id: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // Completed technique handler
  const handleCompletedTechnique = useCallback((id: number) => {
    setCompletedIds(prev => new Set(prev).add(id));
  }, []);

  // Update settings handler
  const handleUpdateSettings = useCallback((newSettings: Partial<PracticeSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Start practice from Library item
  const handleSelectTechniqueForPractice = useCallback((tech: KenpoTechnique) => {
    setSelectedPracticeTechId(tech.id);
    setSettings(prev => ({ ...prev, selectedBelt: tech.cinturon.toLowerCase() }));
    setActiveTab('practice');
  }, []);

  // Start belt practice from Curriculum view
  const handleStartPracticeBelt = useCallback((beltKey: string, orderMode: 'secuencial' | 'azar') => {
    setSettings(prev => ({ ...prev, selectedBelt: beltKey, orderMode }));
    setSelectedPracticeTechId(null);
    setActiveTab('practice');
  }, []);

  // Select belt for Library view
  const handleSelectBeltForLibrary = useCallback((beltKey: string) => {
    setLibraryBeltFilter(beltKey);
    setActiveTab('library');
  }, []);

  // Record practice session
  const handleRecordSession = useCallback((belt: string, count: number, minutes: number) => {
    if (count <= 0) return;
    const newItem: PracticeHistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('es-ES', {
        dateStyle: 'short',
        timeStyle: 'short'
      }),
      belt,
      techniquesCompleted: count,
      totalTimeMinutes: minutes
    };
    setHistory(prev => [newItem, ...prev]);
  }, []);

  // Import custom techniques from Google Sheet / CSV
  const handleImportTechniques = (newTechs: KenpoTechnique[]) => {
    setTechniques(newTechs);
    try {
      localStorage.setItem(TECHNIQUES_STORAGE_KEY, JSON.stringify(newTechs));
    } catch (e) {}
  };

  // Reset default techniques
  const handleResetDefaultTechniques = () => {
    setTechniques(RAW_KENPO_TECHNIQUES);
    localStorage.removeItem(TECHNIQUES_STORAGE_KEY);
  };

  return (
    <div className="min-h-screen bg-[#121417] text-white font-sans relative overflow-x-hidden">
      {/* Background Subtle Red Accent Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-red-900/15 blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-red-600/10 blur-[160px]" />
      </div>

      {/* Top Header */}
      <TopAppBar
        title="KENPO IKKA ASSISTANT"
        onOpenMenu={() => setIsDrawerOpen(true)}
        onOpenSettingsModal={() => setIsSettingsModalOpen(true)}
      />

      {/* Main View Container */}
      <main className="pt-20 relative z-10 min-h-[calc(100vh-5rem)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            {activeTab === 'curriculum' && (
              <CurriculumView
                techniques={techniques}
                completedIds={completedIds}
                onSelectBeltForLibrary={handleSelectBeltForLibrary}
                onStartPracticeBelt={handleStartPracticeBelt}
              />
            )}

            {activeTab === 'library' && (
              <LibraryView
                techniques={techniques}
                initialBelt={libraryBeltFilter}
                onSelectTechniqueForPractice={handleSelectTechniqueForPractice}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            )}

            {activeTab === 'practice' && (
              <PracticeView
                techniques={techniques}
                initialTechniqueId={selectedPracticeTechId}
                settings={settings}
                onUpdateSettings={handleUpdateSettings}
                onRecordSession={handleRecordSession}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onCompletedTechnique={handleCompletedTechnique}
              />
            )}

            {activeTab === 'favorites' && (
              <FavoritesView
                techniques={techniques}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectTechniqueForPractice={handleSelectTechniqueForPractice}
                onStartFavoritePractice={() => {
                  handleUpdateSettings({ selectedBelt: 'todos', orderMode: 'azar' });
                  setActiveTab('practice');
                }}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView
                history={history}
                onClearHistory={() => setHistory([])}
                onStartPractice={() => setActiveTab('practice')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Mobile Tab Bar */}
      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Navigation Drawer (Sidebar on Mobile & Desktop trigger) */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        totalTechniquesCount={techniques.length}
        favoritesCount={favorites.size}
      />

      {/* Google Sheets Synchronization Modal */}
      <GoogleSheetsModal
        isOpen={isSheetsModalOpen}
        onClose={() => setIsSheetsModalOpen(false)}
        techniques={techniques}
        onImportTechniques={handleImportTechniques}
        onResetDefaultTechniques={handleResetDefaultTechniques}
      />

      {/* Practice Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
      />
    </div>
  );
}
