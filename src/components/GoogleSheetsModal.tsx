import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { KenpoTechnique } from '../types';
import { exportToCSV, downloadCSV, parseCSVToTechniques } from '../utils/googleSheets';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  techniques: KenpoTechnique[];
  onImportTechniques: (newTechs: KenpoTechnique[]) => void;
  onResetDefaultTechniques: () => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  techniques,
  onImportTechniques,
  onResetDefaultTechniques
}) => {
  const [pastedCSV, setPastedCSV] = useState('');
  const [activeTab, setActiveTab] = useState<'export' | 'import' | 'view'>('export');
  const [importStatus, setImportStatus] = useState<string>('');

  const handleDownload = () => {
    const csvData = exportToCSV(techniques);
    downloadCSV(csvData, 'Kenpo_Karate_Programa_Oficial.csv');
  };

  const handleImport = () => {
    if (!pastedCSV.trim()) {
      setImportStatus('Por favor pega el contenido CSV o datos del Google Sheet.');
      return;
    }

    try {
      const parsed = parseCSVToTechniques(pastedCSV);
      if (parsed.length === 0) {
        setImportStatus('No se pudieron leer registros válidos. Revisa el formato.');
        return;
      }

      onImportTechniques(parsed);
      setImportStatus(`¡Éxito! Se importaron ${parsed.length} técnicas correctamente.`);
      setPastedCSV('');
    } catch (err) {
      setImportStatus('Error procesando los datos. Asegúrate de incluir los encabezados.');
    }
  };

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
            className="relative w-full max-w-2xl bg-[#1e2229] border border-white/10 rounded-3xl p-6 z-10 shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-red-600/20 text-red-500 border border-red-600/30">
                  <span className="material-symbols-outlined text-[24px]">table_chart</span>
                </div>
                <div>
                  <h2 className="text-lg font-black text-white uppercase tracking-tight">
                    Google Sheets / CSV
                  </h2>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                    Programa Oficial Kenpo Karate por Grado y Ataque
                  </p>
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

            {/* Modal Tabs */}
            <div className="flex border-b border-white/10 mb-4">
              <button
                onClick={() => setActiveTab('export')}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'export'
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Exportar a Sheet
              </button>

              <button
                onClick={() => setActiveTab('import')}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'import'
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Importar desde Sheet
              </button>

              <button
                onClick={() => setActiveTab('view')}
                className={`px-4 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all ${
                  activeTab === 'view'
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                Ver Tabla ({techniques.length})
              </button>
            </div>

            {/* Tab 1: Export */}
            {activeTab === 'export' && (
              <div className="flex-1 overflow-y-auto pr-1">
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                  Descarga la lista completa del programa Kenpo Karate formateada para abrir o importar directamente en tu <strong className="text-white">Google Sheet</strong>.
                </p>

                <div className="bg-black/30 p-4 rounded-2xl border border-white/5 mb-4 text-xs space-y-2 text-gray-300">
                  <div className="font-black text-red-400 uppercase tracking-wider">Campos incluidos en el Sheet:</div>
                  <ul className="list-disc list-inside space-y-1 text-gray-400">
                    <li><strong className="text-white">ID & NRO:</strong> Número correlativo por grado</li>
                    <li><strong className="text-white">Nombre (Español):</strong> ej. FIVE SWORDS</li>
                    <li><strong className="text-white">Name (English):</strong> Nombre en inglés</li>
                    <li><strong className="text-white">Naturaleza del Ataque:</strong> Tipo de agresión recibida</li>
                    <li><strong className="text-white">Cinturón:</strong> Blanco, Amarillo, Naranjo, Púrpura, Azul, Verde, Café, Negro</li>
                    <li><strong className="text-white">Categoría & Familia:</strong> Clasificación de la técnica</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleDownload}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-tight py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 text-xs"
                  >
                    <span className="material-symbols-outlined text-[20px]">download</span>
                    <span>Descargar Archivo CSV</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onResetDefaultTechniques}
                    className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-bold uppercase tracking-wider border border-white/10"
                  >
                    Restablecer Programa Original
                  </motion.button>
                </div>
              </div>
            )}

            {/* Tab 2: Import */}
            {activeTab === 'import' && (
              <div className="flex-1 overflow-y-auto pr-1">
                <p className="text-xs text-gray-300 mb-2">
                  Pega aquí el contenido en formato CSV o celdas copiadas directamente desde tu Google Sheet para actualizar el programa:
                </p>

                <textarea
                  rows={8}
                  value={pastedCSV}
                  onChange={e => setPastedCSV(e.target.value)}
                  placeholder="ID,NRO,Nombre,Name,Ataque,Tipo,Cinturon,Categoria,Familia&#10;1,1,ESPADA LENTA,DELAYED SWORD,Tomada mano derecha solapa,Defensa Personal,blanco,Tomadas,Defensas"
                  className="w-full p-3 bg-black/40 border border-white/10 rounded-2xl text-xs font-mono text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-500 mb-3"
                />

                {importStatus && (
                  <div className="p-3 rounded-xl bg-red-600/10 border border-red-600/30 text-red-300 text-xs mb-3 font-bold">
                    {importStatus}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleImport}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-tight py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
                >
                  <span className="material-symbols-outlined text-[20px]">upload</span>
                  <span>Cargar Nuevas Técnicas</span>
                </motion.button>
              </div>
            )}

            {/* Tab 3: View Table */}
            {activeTab === 'view' && (
              <div className="flex-1 overflow-auto pr-1">
                <div className="overflow-x-auto border border-white/10 rounded-2xl bg-black/30">
                  <table className="w-full text-left text-xs text-gray-300">
                    <thead className="bg-[#121417] text-red-400 uppercase tracking-wider text-[10px] font-black">
                      <tr>
                        <th className="p-2.5 border-b border-white/10">ID</th>
                        <th className="p-2.5 border-b border-white/10">Nombre</th>
                        <th className="p-2.5 border-b border-white/10">Name (En)</th>
                        <th className="p-2.5 border-b border-white/10">Ataque</th>
                        <th className="p-2.5 border-b border-white/10">Grado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {techniques.slice(0, 50).map(t => (
                        <tr key={t.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-2.5 font-mono text-gray-500">{t.id}</td>
                          <td className="p-2.5 font-black text-white uppercase">{t.nombreEs}</td>
                          <td className="p-2.5 text-gray-400 italic">{t.nombreEn}</td>
                          <td className="p-2.5 text-gray-300">{t.ataque}</td>
                          <td className="p-2.5 capitalize font-bold text-red-400">{t.cinturon}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {techniques.length > 50 && (
                  <p className="text-[10px] text-gray-400 mt-2 text-center uppercase font-bold tracking-wider">
                    Mostrando las primeras 50 técnicas de {techniques.length} totales.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
