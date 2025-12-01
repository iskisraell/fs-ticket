import { Ticket } from './types';

// Mock Data based on OCR "Ticket 1020025" (Abrigo) and "Ticket 919735" (Totem)

const TICKET_ABRIGO: Ticket = {
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
      title: 'Cobertura',
      items: [
        { key: 'COBERTURA_DANIFICADA', label: 'Danificada', value: false },
        { key: 'COBERTURA_FERRUGEM', label: 'Ferrugem', value: false },
        { key: 'COBERTURA_INFILTRACAO', label: 'Infiltração', value: false },
        { key: 'COBERTURA_SEM_PLACAS', label: 'Sem Placas', value: false },
        { key: 'COBERTURA_SUJA', label: 'Suja', value: false },
        { key: 'COBERTURA_VIDRO_QUEBRADO', label: 'Vidro Quebrado', value: false }
      ]
    },
    {
      title: 'Elétrica',
      items: [
        { key: 'ELETRICA_ATERRAMENTO', label: 'Caixa Aterramento Sem Tampa', value: false },
        { key: 'ELETRICA_CAIXA_DANIFICADA', label: 'Caixa Energia Danificada', value: false },
        { key: 'ELETRICA_CONEXAO_RAMAL', label: 'Conexão de Ramal', value: false },
        { key: 'ELETRICA_DISJUNTOR', label: 'Disjuntor', value: false },
        { key: 'ELETRICA_FIACAO_EXPOSTA', label: 'Fiação Exposta', value: false },
        { key: 'ELETRICA_FIACAO_POSTE', label: 'Fiação Poste Desconectada', value: false },
        { key: 'ELETRICA_FONTE', label: 'Fonte de Alimentação', value: false },
        { key: 'ELETRICA_FUGA', label: 'Fuga de Energia', value: false },
        { key: 'ELETRICA_ILUMINACAO', label: 'Iluminação', value: false },
        { key: 'ELETRICA_LUMINARIA_DIA', label: 'Luminária Acesa de Dia', value: false },
        { key: 'ELETRICA_LUMINARIA_AUSENTE', label: 'Luminária Ausente', value: false },
        { key: 'ELETRICA_LUMINARIA_DANIFICADA', label: 'Luminária Danificada', value: false },
        { key: 'ELETRICA_MODELO_ANTIGO', label: 'Luminárias Modelo Antigo', value: false },
        { key: 'ELETRICA_POLICARBONATO', label: 'Policarbonato Modelo Antigo', value: false },
        { key: 'ELETRICA_POSTE_AUXILIAR', label: 'Poste Auxiliar', value: false },
        { key: 'ELETRICA_POSTE_SUPRIMIDO', label: 'Poste Auxiliar Suprimido', value: false },
        { key: 'ELETRICA_QUADRO', label: 'Quadro de Entrada', value: false },
        { key: 'ELETRICA_RELE', label: 'Rele Fotoeletrico', value: false }
      ]
    },
    {
      title: 'Estrutura Abrigo',
      items: [
        { key: 'ESTRUTURA_ASSENTO_DESNIVEL', label: 'Assento com Desnível', value: false },
        {
          key: 'ESTRUTURA_BANCO_PICHADO',
          label: 'Banco Pichado',
          value: true,
          photos: {
            before: 'https://picsum.photos/400/300?random=101',
            after: 'https://picsum.photos/400/300?random=102'
          }
        },
        { key: 'ESTRUTURA_BANCO_QUEBRADO', label: 'Banco Quebrado', value: false },
        { key: 'ESTRUTURA_BASE_FERRUGEM', label: 'Base do Assento com Ferrugem', value: false },
        { key: 'ESTRUTURA_COLAGEM', label: 'Colagem', value: true },
        { key: 'ESTRUTURA_DANIFICADA', label: 'Danificada', value: false },
        { key: 'ESTRUTURA_DESNIVEL', label: 'Desnível', value: false },
        { key: 'ESTRUTURA_FERRUGEM', label: 'Ferrugem', value: false },
        { key: 'ESTRUTURA_PICACAO', label: 'Pichação', value: false },
        { key: 'ESTRUTURA_PINTURA', label: 'Pintura Riscada/Danificada', value: false },
        { key: 'ESTRUTURA_SPIDER', label: 'Spider', value: false },
        { key: 'ESTRUTURA_SUJO', label: 'Sujo', value: true },
        { key: 'ESTRUTURA_SUPRIMIDO', label: 'Suprimido/Abalroado', value: false }
      ]
    },
    {
      title: 'Itinerário',
      items: [
        { key: 'ITINERARIO_AUSENTE', label: 'Ausente', value: true },
        { key: 'ITINERARIO_DANIFICADO_PARCIAL', label: 'Danificado Parcialmente', value: false },
        { key: 'ITINERARIO_DIVERGENTE', label: 'Divergente', value: false },
        { key: 'ITINERARIO_PICTOGRAMA', label: 'Pictograma Danificado', value: false }
      ]
    },
    {
      title: 'Painel',
      items: [
        { key: 'PAINEL_CORROSAO', label: 'Corrosão', value: false },
        { key: 'PAINEL_DANIFICADO', label: 'Danificado', value: false },
        { key: 'PAINEL_DIFUSOR', label: 'Difusor', value: false },
        { key: 'PAINEL_FERRUGEM', label: 'Ferrugem', value: false },
        { key: 'PAINEL_ILUMINADO_DIA', label: 'Iluminado de Dia', value: false },
        { key: 'PAINEL_IMA_CLIP', label: 'Imã Clip', value: false },
        { key: 'PAINEL_INEXISTENTE', label: 'Inexistente', value: false },
        { key: 'PAINEL_KIT_ILUMINACAO', label: 'Kit de Iluminação', value: false },
        { key: 'PAINEL_PICHACAO', label: 'Pichação', value: false },
        { key: 'PAINEL_PORTA_ABERTA', label: 'Porta Aberta', value: false },
        { key: 'PAINEL_SUJO', label: 'Sujo', value: false },
        { key: 'PAINEL_VIDRO_QUEBRADO', label: 'Vidro Quebrado', value: false }
      ]
    },
    {
      title: 'Piso',
      items: [
        { key: 'PISO_ENTORNO_INADEQUADO', label: 'Entorno Inadequado', value: true },
        { key: 'PISO_PODOTATIL_AUSENTE', label: 'Podotátil Ausente', value: false },
        { key: 'PISO_PODOTATIL_DANIFICADO', label: 'Podotátil Danificado', value: true },
        { key: 'PISO_SUJO', label: 'Sujo', value: false }
      ]
    },
    {
      title: 'Totem',
      items: [
        { key: 'TOTEM_ABAIXO_PERMITIDO', label: 'Abaixo do Permitido', value: false },
        { key: 'TOTEM_ACIMA_PERMITIDO', label: 'Acima do Permitido', value: false },
        { key: 'TOTEM_COM_COLAGEM', label: 'Com Colagem', value: false },
        { key: 'TOTEM_COM_FERRUGEM', label: 'Com Ferrugem', value: false },
        { key: 'TOTEM_INCLINADO_BASE', label: 'Inclinado/Base Danificada', value: false },
        { key: 'TOTEM_INEXISTENTE_SUPRIMIDO', label: 'Inexistente/Suprimido', value: false },
        { key: 'TOTEM_PICHACAO', label: 'Pichação', value: false },
        { key: 'TOTEM_RISCADO', label: 'Riscado', value: false },
        { key: 'TOTEM_RISCADO_DANIFICADO', label: 'Riscado/Danificado', value: false },
        { key: 'TOTEM_SUBSTITUICAO_ANTIGO', label: 'Substituição Antigo', value: false }
      ]
    },
    {
      title: 'Vidro',
      items: [
        { key: 'VIDRO_ANTEPARO_AUSENTE', label: 'Anteparo Ausente', value: false },
        { key: 'VIDRO_COLAGEM', label: 'Colagem', value: false },
        { key: 'VIDRO_PICHACAO', label: 'Pichação', value: false },
        { key: 'VIDRO_QUEBRADO', label: 'Quebrado', value: false },
        { key: 'VIDRO_RESINA', label: 'Resina', value: false },
        { key: 'VIDRO_RISCADO', label: 'Riscado', value: false }
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

const TICKET_TOTEM: Ticket = {
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
        { key: 'TOTEM_ABAIXO_PERMITIDO', label: 'Abaixo do Permitido', value: false },
        { key: 'TOTEM_ACIMA_PERMITIDO', label: 'Acima do Permitido', value: false },
        { key: 'TOTEM_COM_COLAGEM', label: 'Com Colagem', value: false },
        {
          key: 'TOTEM_COM_FERRUGEM',
          label: 'Com Ferrugem',
          value: true,
          photos: {
            before: 'https://picsum.photos/400/300?random=103'
          }
        },
        { key: 'TOTEM_INCLINADO_BASE', label: 'Inclinado/Base Danificada', value: false },
        { key: 'TOTEM_INEXISTENTE_SUPRIMIDO', label: 'Inexistente/Suprimido', value: false },
        { key: 'TOTEM_PICHACAO', label: 'Pichação', value: false },
        { key: 'TOTEM_RISCADO', label: 'Riscado', value: false },
        { key: 'TOTEM_RISCADO_DANIFICADO', label: 'Riscado/Danificado', value: false },
        { key: 'TOTEM_SUBSTITUICAO_ANTIGO', label: 'Substituição Antigo', value: false }
      ]
    },
    {
      title: 'Itinerário',
      items: [
        { key: 'ITINERARIO_AUSENTE', label: 'Ausente', value: true },
        { key: 'ITINERARIO_DANIFICADO_PARCIAL', label: 'Danificado Parcialmente', value: false },
        { key: 'ITINERARIO_DIVERGENTE', label: 'Divergente', value: false },
        { key: 'ITINERARIO_PICTOGRAMA', label: 'Pictograma Danificado', value: false }
      ]
    },
    {
      title: 'Piso',
      items: [
        { key: 'PISO_ENTORNO_INADEQUADO', label: 'Entorno Inadequado', value: false },
        { key: 'PISO_PODOTATIL_AUSENTE', label: 'Podotátil Ausente', value: false },
        { key: 'PISO_PODOTATIL_DANIFICADO', label: 'Podotátil Danificado', value: false },
        { key: 'PISO_SUJO', label: 'Sujo', value: true }
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

export const tickets = [TICKET_ABRIGO, TICKET_TOTEM];