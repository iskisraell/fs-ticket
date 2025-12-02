import React, { useState, useEffect } from 'react';
import {
  Printer,
  MapPin,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  Layout,
  Info,
  Building2,
  FileText,
  Hash,
  Upload
} from 'lucide-react';
import { tickets as defaultTickets } from './constants';
import { Ticket, TicketPayload } from './types';
import { mergeTicket } from './utils';
import { ChecklistGroup } from './components/ChecklistGroup';
import { PhotoGallery } from './components/PhotoGallery';
import logo from './assets/Eletromidia Horizontal (3).png';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDFDocument } from './components/PDFDocument';
import { ErrorBoundary } from './components/ErrorBoundary';
import QRCode from 'qrcode';

export default function App() {
  const [allTickets, setAllTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem('tickets');
    return saved ? JSON.parse(saved) : defaultTickets;
  });

  const [currentTicketId, setCurrentTicketId] = useState<string>(allTickets[0].id);
  const [activeTicket, setActiveTicket] = useState<Ticket>(allTickets[0]);
  const [showCorrection, setShowCorrection] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const [debouncedTicket, setDebouncedTicket] = useState<Ticket>(allTickets[0]);

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(allTickets));
  }, [allTickets]);

  useEffect(() => {
    const found = allTickets.find(t => t.id === currentTicketId);
    if (found) {
      const newTicket = JSON.parse(JSON.stringify(found));
      setActiveTicket(newTicket);
      setDebouncedTicket(newTicket);
    }
  }, [currentTicketId]);

  // Generate QR Code when location changes
  useEffect(() => {
    const generateQR = async () => {
      if (activeTicket.location.lat && activeTicket.location.lng) {
        try {
          const url = `https://www.google.com/maps/search/?api=1&query=${activeTicket.location.lat},${activeTicket.location.lng}`;
          const qrDataUrl = await QRCode.toDataURL(url, {
            width: 100,
            margin: 0,
            color: {
              dark: '#000000',
              light: '#FFFFFF'
            }
          });
          setQrCodeUrl(qrDataUrl);
        } catch (err) {
          console.error('Error generating QR code:', err);
        }
      }
    };

    generateQR();
  }, [activeTicket.location]);

  // Debounce PDF updates to prevent crashes during rapid checkbox toggling
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTicket(activeTicket);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, [activeTicket]);

  const handleToggleChecklistItem = (groupTitle: string, itemKey: string) => {
    const updatedTicket = {
      ...activeTicket,
      checklist: activeTicket.checklist.map(group =>
        group.title === groupTitle
          ? {
            ...group,
            items: group.items.map(item =>
              item.key === itemKey
                ? { ...item, value: !item.value }
                : item
            )
          }
          : group
      )
    };

    setActiveTicket(updatedTicket);

    // Update in allTickets list to persist changes
    setAllTickets(prev => prev.map(t => t.id === updatedTicket.id ? updatedTicket : t));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = e.target?.result as string;
        const payload = JSON.parse(json) as TicketPayload;

        // Basic validation
        if (!payload.id || !payload.type) {
          alert('Invalid JSON: Missing id or type');
          return;
        }

        const newTicket = mergeTicket(payload);

        setAllTickets(prev => {
          // Check if ticket already exists and update it, or add new
          const exists = prev.find(t => t.id === newTicket.id);
          if (exists) {
            return prev.map(t => t.id === newTicket.id ? newTicket : t);
          }
          return [...prev, newTicket];
        });

        setCurrentTicketId(newTicket.id);
      } catch (err) {
        console.error('Error parsing JSON:', err);
        alert('Error parsing JSON file');
      }
    };
    reader.readAsText(file);

    // Reset input
    event.target.value = '';
  };



  const totalOccurrences = activeTicket.checklist.flatMap(g => g.items).filter(i => i.value).length;

  return (
    <div className="min-h-screen pb-12 bg-gray-50 print:bg-white print:pb-0">
      {/* Top Navigation Bar - Screen Only */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 px-4 py-3 shadow-brand no-print">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Eletromidia" className="h-8 w-auto" />
            <span className="hidden sm:inline-block text-gray-300 mx-2">|</span>
            <span className="hidden sm:inline-block text-gray-500 font-medium text-sm">Field Service Viewer</span>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={currentTicketId}
              onChange={(e) => setCurrentTicketId(e.target.value)}
              className="bg-gray-100 border-none rounded-btn text-sm font-medium px-3 py-2 cursor-pointer hover:bg-gray-200 transition-colors focus:ring-2 focus:ring-brand-orange outline-none"
            >
              {allTickets.map(t => (
                <option key={t.id} value={t.id}>{t.type} - #{t.id}</option>
              ))}
            </select>

            <label className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-btn hover:bg-gray-200 transition-colors cursor-pointer text-sm font-medium">
              <Upload size={18} />
              <span className="hidden sm:inline">Importar</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <ErrorBoundary>
              <PDFDownloadLink
                document={<PDFDocument ticket={debouncedTicket} showCorrection={showCorrection} logo={logo} qrCodeUrl={qrCodeUrl} />}
                fileName={`Relatorio_Vistoria_${debouncedTicket.id}.pdf`}
                className="flex items-center gap-2 px-4 py-2 bg-brand-black text-white rounded-btn hover:bg-gray-800 transition-colors shadow-brand text-decoration-none"
              >
                {({ loading }) => (
                  <>
                    <Printer size={18} />
                    <span className="hidden sm:inline">{loading ? 'Gerando...' : 'Exportar PDF'}</span>
                  </>
                )}
              </PDFDownloadLink>
            </ErrorBoundary>
          </div>
        </div>
      </nav >

      <main className="max-w-5xl mx-auto p-4 sm:p-8 space-y-6 print:p-0 print:space-y-4 print:max-w-none print:w-full">

        {/* A4 Print Header - Only visible when printing */}
        <div className="hidden print:flex items-start justify-between mb-8 border-b-2 border-brand-orange pb-6">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Eletromidia" className="h-16 w-auto" />
            <div>
              <h1 className="text-3xl font-bold text-brand-black tracking-tight leading-none">Relatório de Vistoria</h1>
              <p className="text-brand-orange font-medium mt-1">Eletromidia Field Service</p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-block bg-brand-cream text-brand-black px-4 py-2 rounded-btn font-bold text-lg border border-orange-100">
              #{activeTicket.id}
            </div>
            <p className="text-gray-500 text-sm mt-2">Emitido em {new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Top Split Section: Reference Photo & Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-72 print:h-64 print:gap-4 print:break-inside-avoid">
          {/* Reference Photo */}
          <div className="relative rounded-brand overflow-hidden shadow-brand border border-gray-200 group bg-gray-900">
            <img
              src={activeTicket.initialPhoto || activeTicket.photos.before[0]?.url || 'https://placehold.co/600x400?text=Sem+Foto'}
              alt="Referência do Ativo"
              className="w-full h-full object-cover opacity-90 print:opacity-100"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6 pt-20 print:p-4 print:bg-black/60">

              {/* Explicit Header Info */}
              <div className="flex flex-col gap-2">
                <p className="text-white font-bold text-2xl drop-shadow-md flex items-center gap-2 mb-1">
                  <Layout size={24} className="text-brand-yellow" />
                  {activeTicket.equipment.model}
                </p>
              </div>

            </div>
            <div className="absolute top-4 left-4 bg-brand-orange text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wide">
              Foto Inicial
            </div>
          </div>

          {/* Map Rendering */}
          <div className="relative rounded-brand overflow-hidden shadow-brand border border-gray-200 bg-gray-100">
            {activeTicket.location.lat && activeTicket.location.lng ? (
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                /* Adjusted bbox for much closer zoom (approx 0.001 delta instead of 0.005) */
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${activeTicket.location.lng! - 0.001}%2C${activeTicket.location.lat! - 0.001}%2C${activeTicket.location.lng! + 0.001}%2C${activeTicket.location.lat! + 0.001}&layer=mapnik&marker=${activeTicket.location.lat}%2C${activeTicket.location.lng}`}
                className="w-full h-full grayscale-[20%] contrast-[1.1]"
              ></iframe >
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 bg-gray-200">
                <span className="flex items-center gap-2"><MapPin /> Mapa não disponível</span>
              </div>
            )
            }
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur px-4 py-3 rounded-xl shadow-brand border border-gray-100 flex items-center justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="bg-brand-orange/10 p-2 rounded-lg text-brand-orange shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Localização</p>
                  <p className="text-sm font-bold text-gray-900 truncate">{activeTicket.location.address}</p>
                  <p className="text-xs text-gray-500 truncate">{activeTicket.location.district} • {activeTicket.location.cep}</p>
                </div>
              </div>
              {qrCodeUrl && (
                <div className="shrink-0 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
                  <img src={qrCodeUrl} alt="QR Code Localização" className="w-12 h-12" />
                </div>
              )}
            </div>
          </div >
        </div >

        {/* Ticket Details Bar - Design System: Cream Background */}
        < div className="bg-brand-cream rounded-brand shadow-none border border-orange-100 p-6 print:p-4 print:rounded-xl" >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 print:gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider">
                <Hash size={14} /> Nº ELT
              </div>
              <p className="font-bold text-gray-900 text-sm">{activeTicket.eltNumber}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider">
                <Hash size={14} /> Cód. Eletro
              </div>
              <p className="font-bold text-gray-900 text-sm">{activeTicket.equipment.id}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider">
                <Hash size={14} /> Cód. SPTrans
              </div>
              <p className="font-bold text-gray-900 text-sm">{activeTicket.equipment.stopNumber}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider">
                <Calendar size={14} /> Data Abertura
              </div>
              <p className="font-bold text-gray-900 text-sm">{activeTicket.openDate}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider">
                <Info size={14} /> Status
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-green text-white">
                {activeTicket.status}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-orange-200/50 flex items-start gap-3">
            <div className="bg-white p-2 rounded-lg text-brand-purple shrink-0">
              <FileText size={18} />
            </div>
            <div>
              <p className="text-xs font-bold text-brand-purple uppercase tracking-wider mb-0.5">Tipo de Atividade</p>
              <p className="font-medium text-gray-800 text-sm">{activeTicket.activityType}</p>
            </div>
          </div>
        </div >

        {/* Checklist Section */}
        < div className="bg-white rounded-brand shadow-brand border border-gray-100 overflow-hidden print:shadow-none print:border-2 print:border-gray-200" >
          <div className="bg-brand-black text-white px-8 py-5 flex items-center justify-between print:bg-brand-black print:text-white print:border-b print:border-gray-300">
            <h2 className="font-bold text-xl flex items-center gap-3">
              <CheckCircle2 className="text-brand-orange" size={24} />
              Checklist
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCorrection(!showCorrection)}
                className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors print:hidden"
              >
                {showCorrection ? 'Ocultar Correção' : 'Incluir Correção'}
              </button>
              <div className="flex items-center gap-2 text-sm bg-white/10 px-4 py-1.5 rounded-full border border-white/20 print:bg-white print:text-brand-black print:border-none print:font-bold">
                <Info size={16} />
                <span>{totalOccurrences} Ocorrências</span>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100 print:divide-y-0 print:flex print:flex-col print:gap-0 print:p-6">
            {activeTicket.checklist.map((group, idx) => (
              <ChecklistGroup
                key={group.title}
                group={group}
                ticketStatus={activeTicket.status}
                onToggleItem={(key) => handleToggleChecklistItem(group.title, key)}
                showCorrection={showCorrection}
              />
            ))}
          </div>
        </div >

        {/* Photos Section */}
        < div className="space-y-8 print:break-before-page" >
          <div className="flex items-center gap-3 border-b-2 border-brand-orange pb-3">
            <div className="bg-brand-orange text-white p-1.5 rounded-lg">
              <Building2 size={24} />
            </div>
            <h2 className="font-bold text-2xl text-brand-black">Galeria de Evidências</h2>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="bg-white rounded-brand shadow-brand border border-gray-200 p-8 print:shadow-none print:border-2 print:rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-brand-orange"></div>
                <h3 className="font-bold text-brand-black text-lg uppercase tracking-tight">Situação Anterior (Antes)</h3>
              </div>
              <PhotoGallery photos={activeTicket.photos.before} />
            </div>

            {showCorrection && (
              <div className="bg-white rounded-brand shadow-brand border border-gray-200 p-8 print:shadow-none print:border-2 print:rounded-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 rounded-full bg-brand-green"></div>
                  <h3 className="font-bold text-brand-black text-lg uppercase tracking-tight">Situação Final (Depois)</h3>
                </div>
                <PhotoGallery photos={activeTicket.photos.after} />
              </div>
            )}
          </div>
        </div >

        {/* Footer Signature */}
        < div className="mt-16 pt-8 border-t border-gray-200 text-center space-y-4 print:mt-12 print:break-inside-avoid" >

          <div className="pt-8 text-xs text-gray-400 font-mono">
            Eletromidia Field Service System • v1.0.0
          </div>
        </div >

      </main >
    </div >
  );
}