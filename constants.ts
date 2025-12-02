import { Ticket, TicketPayload } from './types';
import { mergeTicket } from './utils';

// Mock Data Payloads (Sparse)
const PAYLOAD_ABRIGO: TicketPayload = {
  id: '1020025',
  eltNumber: '20121137',
  type: 'Abrigo',
  activityType: 'Ruas - Manutenção Corretiva - Prefeitura',
  status: 'Concluído',
  sla: '00h:48m',
  openDate: '26/11/2025 13:33',
  technician: 'Matheus Menezes',
  initialPhoto: 'https://picsum.photos/400/300?random=1',
  location: {
    address: 'Estr. do Campo Limpo, 1710',
    district: 'Jardim Piracuama',
    reference: 'Próximo ao mercado Dia',
    cep: '05787-001',
    lat: -23.6491,
    lng: -46.7642
  },
  equipment: {
    id: 'A07667',
    model: 'MINIMALISTA LEVE',
    stopNumber: '370010176'
  },
  checklist: [
    {
      title: 'Estrutura Abrigo',
      items: [
        {
          key: 'ESTRUTURA_BANCO_PICHADO',
          value: true,
          photos: {
            before: 'https://picsum.photos/400/300?random=101',
            after: 'https://picsum.photos/400/300?random=102'
          }
        },
        { key: 'ESTRUTURA_COLAGEM', value: true },
        { key: 'ESTRUTURA_SUJO', value: true }
      ]
    },
    {
      title: 'Itinerário',
      items: [
        { key: 'ITINERARIO_AUSENTE', value: true }
      ]
    },
    {
      title: 'Piso',
      items: [
        { key: 'PISO_ENTORNO_INADEQUADO', value: true },
        { key: 'PISO_PODOTATIL_DANIFICADO', value: true }
      ]
    }
  ],
  photos: {
    before: [
      { url: 'https://picsum.photos/400/300?random=1', label: 'Frente - Antes', date: '26/11/2025 13:30' },
      { url: 'https://picsum.photos/400/300?random=2', label: 'Lateral - Antes', date: '26/11/2025 13:31' },
      { url: 'https://picsum.photos/400/300?random=3', label: 'Piso Danificado', date: '26/11/2025 13:31' }
    ],
    after: [
      { url: 'https://picsum.photos/400/300?random=4', label: 'Frente - Depois', date: '26/11/2025 14:15' },
      { url: 'https://picsum.photos/400/300?random=5', label: 'Banco Limpo', date: '26/11/2025 14:16' }
    ]
  }
};

const PAYLOAD_TOTEM: TicketPayload = {
  id: '919735',
  eltNumber: '20129888',
  type: 'Totem',
  activityType: 'Ruas - Manutenção Corretiva - Prefeitura',
  status: 'Concluído',
  sla: '462h:51m',
  openDate: '02/10/2025 09:13',
  technician: 'Felipe Pereira da Silva',
  initialPhoto: 'https://picsum.photos/400/300?random=10',
  location: {
    address: 'Rua Americo Brasiliense, 1966',
    district: 'Santo Amaro',
    reference: 'Em frente ao Shopping',
    cep: '04715-004',
    lat: -23.6305,
    lng: -46.7032
  },
  equipment: {
    id: 'T09888',
    model: 'TOTEM MARROM',
    stopNumber: '720011650'
  },
  checklist: [
    {
      title: 'Estrutura Totem',
      items: [
        {
          key: 'TOTEM_COM_FERRUGEM',
          value: true,
          photos: {
            before: 'https://picsum.photos/400/300?random=103'
          }
        }
      ]
    },
    {
      title: 'Itinerário',
      items: [
        { key: 'ITINERARIO_AUSENTE', value: true }
      ]
    },
    {
      title: 'Piso',
      items: [
        { key: 'PISO_SUJO', value: true }
      ]
    }
  ],
  photos: {
    before: [
      { url: 'https://picsum.photos/400/300?random=10', label: 'Totem Geral', date: '21/10/2025 15:44' },
      { url: 'https://picsum.photos/400/300?random=11', label: 'Base Ferrugem', date: '21/10/2025 15:45' }
    ],
    after: [
      { url: 'https://picsum.photos/400/300?random=12', label: 'Totem Finalizado', date: '21/10/2025 16:04' }
    ]
  }
};

export const tickets: Ticket[] = [
  mergeTicket(PAYLOAD_ABRIGO),
  mergeTicket(PAYLOAD_TOTEM)
];