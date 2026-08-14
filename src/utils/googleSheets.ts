import { KenpoTechnique } from '../types';

/**
 * Utility to export the Kenpo curriculum as CSV / Sheet format
 */
export function exportToCSV(techniques: KenpoTechnique[]): string {
  const headers = ['ID', 'NRO', 'Nombre (Español)', 'Name (English)', 'Naturaleza del Ataque', 'Tipo', 'Cinturón', 'Categoría', 'Familia'];
  const rows = techniques.map(t => [
    t.id,
    t.nro,
    `"${t.nombreEs.replace(/"/g, '""')}"`,
    `"${t.nombreEn.replace(/"/g, '""')}"`,
    `"${t.ataque.replace(/"/g, '""')}"`,
    `"${t.tipo.replace(/"/g, '""')}"`,
    `"${t.cinturon.replace(/"/g, '""')}"`,
    `"${t.categoria.replace(/"/g, '""')}"`,
    `"${t.familia.replace(/"/g, '""')}"`
  ]);

  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

export function downloadCSV(csvContent: string, filename = 'Kenpo_Karate_Curriculum.csv') {
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Parses raw CSV input from Google Sheets copy-paste or export
 */
export function parseCSVToTechniques(csvText: string): KenpoTechnique[] {
  const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length <= 1) return [];

  const techniques: KenpoTechnique[] = [];
  for (let i = 1; i < lines.length; i++) {
    // Regex matching CSV values handling quotes
    const matches = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    const cols = lines[i].split(',').map(c => c.replace(/^"(.*)"$/, '$1').trim());

    if (cols.length >= 5) {
      techniques.push({
        id: parseInt(cols[0], 10) || i,
        nro: parseInt(cols[1], 10) || i,
        nombreEs: cols[2] || `Técnica ${i}`,
        nombreEn: cols[3] || cols[2] || '',
        ataque: cols[4] || '',
        tipo: cols[5] || 'Defensa Personal',
        cinturon: (cols[6] || 'blanco').toLowerCase(),
        categoria: cols[7] || 'General',
        familia: cols[8] || ''
      });
    }
  }

  return techniques;
}
