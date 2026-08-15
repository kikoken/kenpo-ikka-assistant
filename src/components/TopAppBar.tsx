import React from 'react';

interface TopAppBarProps {
  title?: string;
  onOpenMenu: () => void;
  onOpenSettingsModal: () => void;
  showBack?: boolean;
  onBack?: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  title = 'KENPO IKKA ASSISTANT',
  onOpenMenu,
  onOpenSettingsModal,
  showBack = false,
  onBack
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#1e2229] border-b border-white/10 h-16 px-4 flex items-center justify-between shadow-xl pt-[env(safe-area-inset-top)] box-content">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center justify-center active:scale-95 border border-white/5"
            title="Volver"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>
        ) : (
          <button
            onClick={onOpenMenu}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors flex items-center justify-center active:scale-95 border border-white/5"
            title="Menú"
          >
            <span className="material-symbols-outlined text-[20px]">menu</span>
          </button>
        )}

        {/* Escudo Ikka Badge */}
        <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md shadow-red-900/40 shrink-0 border border-white/10">
          <img src="/escudo.jpg" alt="Escudo IKKA" className="w-full h-full object-cover" />
        </div>

        <div>
          <h1 className="text-base md:text-lg font-black tracking-tight text-white uppercase leading-none">
            KENPO IKKA <span className="text-red-500">ASSISTANT</span>
          </h1>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 hidden sm:block">
            Programa Técnico v2.4
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onOpenSettingsModal}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors flex items-center justify-center active:scale-95 border border-white/5"
          title="Ajustes"
        >
          <span className="material-symbols-outlined text-[20px]">settings</span>
        </button>
      </div>
    </header>
  );
};

