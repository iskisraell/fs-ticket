import React from 'react';
import { ChecklistGroup as IChecklistGroup } from '../types';
import { Camera, ImagePlus } from 'lucide-react';

interface Props {
  group: IChecklistGroup;
  ticketStatus: string;
  onToggleItem: (itemKey: string) => void;
  showCorrection: boolean;
}

export const ChecklistGroup: React.FC<Props> = ({ group, ticketStatus, onToggleItem, showCorrection }) => {
  const isConcluded = ticketStatus === 'Concluído';

  return (
    <div className="p-0 border-b border-gray-100 last:border-b-0 break-inside-avoid print:border-none print:mb-6">
      {/* Header - Design System: Cream background for headers inside white containers */}
      <div className="bg-gray-50 px-8 py-3 border-y border-gray-200 print:bg-brand-cream print:border print:border-orange-100 print:rounded-lg print:mb-2 print:py-2">
        <h3 className="font-bold text-brand-black text-sm uppercase tracking-wider flex items-center justify-between">
          <span>{group.title}</span>
        </h3>
      </div>

      <div className="divide-y divide-gray-100 print:divide-y-0 print:space-y-1">
        {group.items.map((item) => (
          <div
            key={item.key}
            className={`px-8 py-4 transition-colors print:px-2 print:py-1 print:border-none ${item.value ? 'bg-orange-50/50 print:bg-transparent' : 'hover:bg-gray-50'} ${!item.value ? 'print:hidden' : ''}`}
          >
            <div className="flex items-start gap-4 print:gap-2">
              <div className="pt-0.5 print:pt-0">
                <input
                  type="checkbox"
                  id={item.key}
                  checked={item.value}
                  onChange={() => onToggleItem(item.key)}
                  className="w-5 h-5 rounded border-gray-300 text-brand-orange focus:ring-brand-orange cursor-pointer print:w-4 print:h-4"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor={item.key}
                  className={`text-sm font-medium cursor-pointer select-none print:text-xs ${item.value ? 'text-brand-black font-bold' : 'text-gray-600'}`}
                >
                  {item.label}
                </label>

                {/* Conditional Image Placeholders - Expanded View for Screen / Compact for Print */}
                {item.value && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300 print:mt-2 print:gap-4 print:grid-cols-2">

                    {/* Ocorrência Placeholder or Image */}
                    <div className="relative group">
                      <div className="absolute -top-2.5 left-3 px-1.5 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-wider z-10 print:bg-transparent print:text-brand-orange">
                        Ocorrência (Antes)
                      </div>
                      {item.photos?.before ? (
                        <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm print:border-brand-orange print:h-auto print:aspect-[16/9] print:border-1">
                          <img
                            src={item.photos.before}
                            alt={`Ocorrência - ${item.label}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/9] bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-brand-orange hover:bg-orange-50/20 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-brand-orange print:border-brand-orange print:h-auto print:aspect-[16/9] print:border-1">
                          <Camera size={24} strokeWidth={1.5} className="print:w-4 print:h-4" />
                          <span className="text-xs font-medium print:hidden">Adicionar Foto</span>
                        </div>
                      )}
                    </div>

                    {/* Solução Placeholder or Image */}
                    {showCorrection && (
                      <div className="relative group">
                        <div className="absolute -top-2.5 left-3 px-1.5 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-wider z-10 print:bg-transparent print:text-brand-green">
                          Correção (Depois)
                        </div>
                        {item.photos?.after ? (
                          <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden border border-gray-200 shadow-sm print:border-brand-green print:h-auto print:aspect-[16/9] print:border-1">
                            <img
                              src={item.photos.after}
                              alt={`Correção - ${item.label}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ) : (
                          isConcluded ? (
                            <div className="aspect-[16/9] bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-brand-green hover:bg-green-50/20 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-brand-green print:border-brand-green print:h-auto print:aspect-[16/9] print:border-1">
                              <ImagePlus size={24} strokeWidth={1.5} className="print:w-4 print:h-4" />
                              <span className="text-xs font-medium print:hidden">Adicionar Foto</span>
                            </div>
                          ) : (
                            <div className="aspect-[16/9] bg-gray-100 rounded-lg border border-gray-200 flex flex-col items-center justify-center gap-1 text-gray-400 select-none print:h-auto print:aspect-[16/9]">
                              <span className="text-xs font-medium">Aguardando</span>
                            </div>
                          )
                        )}
                      </div>
                    )}

                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};