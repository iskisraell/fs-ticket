# Field Service Viewer - Ticket Mockup

Este projeto é uma aplicação web para visualização de relatórios de vistoria técnica (Field Service) da Eletromidia. Ele permite a visualização detalhada de tickets, incluindo checklist, galeria de fotos (antes e depois) e localização, com funcionalidade de exportação para PDF.

## 📋 Visão Geral

O sistema foi desenhado para ser alimentado por uma estrutura de dados JSON, facilitando a integração com backends, planilhas ou outras fontes de dados. Atualmente, ele opera com dados "mockados" (simulados) para fins de desenvolvimento e demonstração.

## 🔧 Estrutura de Dados (Payload)

Para integrar dados reais, o sistema espera um objeto JSON que siga a interface `Ticket`. Abaixo está a documentação detalhada dos campos.

### Interface `Ticket`

```typescript
interface TicketPayload {
  id: string;             // ID único do ticket (ex: "1020025")
  eltNumber: string;      // Número ELT (ex: "20121137")
  type: 'Abrigo' | 'Totem'; // Tipo do ativo (Define o template de checklist usado)
  activityType: string;   // Tipo de atividade (ex: "Manutenção Corretiva")
  status: string;         // Status do ticket (ex: "Concluído")
  sla: string;            // Tempo de SLA (ex: "00h:48m")
  openDate: string;       // Data de abertura (ex: "26/11/2025 13:33")
  technician: string;     // Nome do técnico
  initialPhoto?: string;  // Foto inicial/capa do relatório (IMPORTANTE)
  location: {
    address: string;      // Endereço completo
    district: string;     // Bairro
    reference: string;    // Ponto de referência
    cep: string;          // CEP
    lat?: number;         // Latitude (opcional, para mapa)
    lng?: number;         // Longitude (opcional, para mapa)
  };
  equipment: {
    id: string;           // ID do equipamento (ex: "A07667")
    model: string;        // Modelo do equipamento
    stopNumber: string;   // Código SPTrans/Parada
  };
  // Checklist é opcional e "esparso". Apenas itens com value: true precisam ser enviados.
  checklist?: {
    title: string;        // Título do grupo (Deve corresponder ao template)
    items: {
      key: string;        // Chave única do item (Deve corresponder ao template)
      value: boolean;     // true = problema identificado
      photos?: {          // Fotos específicas do item
        before?: string;
        after?: string;
      };
    }[];
  }[];
  photos: {
    before: Photo[];      // Fotos do "Antes"
    after: Photo[];       // Fotos do "Depois"
  };
}
```

### Estruturas Auxiliares

**ChecklistGroup**
```typescript
{
  title: string;          // Título do grupo (ex: "Elétrica")
  items: ChecklistItem[]; // Itens do grupo
}
```

**ChecklistItem**
```typescript
{
  key: string;    // Chave única do item (ex: "ELETRICA_FIACAO_EXPOSTA")
  label: string;  // Texto exibido (ex: "Fiação Exposta")
  value: boolean; // true = problema identificado, false = ok
  photos?: {      // Fotos específicas do item (Opcional)
    before?: string; // URL da foto da ocorrência
    after?: string;  // URL da foto da correção
  };
}
```

**Photo**
```typescript
{
  url: string;    // URL da imagem
  label: string;  // Legenda da foto
  date?: string;  // Data da foto (opcional)
}
```

---

## 🔄 Guia de Integração (Excel/CSV)

Para alimentar o sistema a partir de uma planilha Excel ou CSV, recomenda-se o seguinte mapeamento de colunas para a estrutura JSON.

### Mapeamento Sugerido

| Coluna Excel | Campo JSON Correspondente | Exemplo de Valor |
| :--- | :--- | :--- |
| **ID do Ticket** | `id` | 1020025 |
| **Tipo** | `type` | Abrigo |
| **Data Abertura** | `openDate` | 26/11/2025 13:33 |
| **Técnico** | `technician` | Matheus Menezes |
| **Foto Inicial** | `initialPhoto` | https://.../capa.jpg |
| **Endereço** | `location.address` | Estr. do Campo Limpo, 1710 |
| **Latitude** | `location.lat` | -23.6491 |
| **Longitude** | `location.lng` | -46.7642 |
| **Checklist - [Item]** | `checklist[...].items[...].value` | SIM / NÃO (Converter para boolean) |
| **Foto Item [Item]** | `checklist[...].items[...].photos.before` | https://.../item_foto.jpg |
| **Foto Antes 1** | `photos.before[0].url` | https://.../foto1.jpg |

### Exemplo de Payload JSON Completo

```json
{
  "id": "1020025",
  "eltNumber": "20121137",
  "type": "Abrigo",
  "activityType": "Ruas - Manutenção Corretiva - Prefeitura",
  "status": "Concluído",
  "sla": "00h:48m",
  "openDate": "26/11/2025 13:33",
  "technician": "Matheus Menezes",
  "initialPhoto": "https://picsum.photos/400/300?random=1",
  "location": {
    "address": "Estr. do Campo Limpo, 1710",
    "district": "Jardim Piracuama",
    "reference": "Próximo ao mercado Dia",
    "cep": "05787-001",
    "lat": -23.6491,
    "lng": -46.7642
  },
  "equipment": {
    "id": "A07667",
    "model": "MINIMALISTA LEVE",
    "stopNumber": "370010176"
  },
  "checklist": [
    {
      "title": "Elétrica",
      "items": [
        { 
          "key": "ELETRICA_LUMINARIA_DANIFICADA", 
          "value": true,
          "photos": {
            "before": "https://picsum.photos/400/300?random=101",
            "after": "https://picsum.photos/400/300?random=102"
          }
        }
      ]
    }
  ],
  "photos": {
    "before": [
      { "url": "https://picsum.photos/400/300", "label": "Frente - Antes", "date": "26/11/2025" }
    ],
    "after": []
  }
}
```

## 📥 Importando Tickets (JSON)

A aplicação agora suporta a importação de tickets via arquivo JSON diretamente na interface.

1.  Clique no botão **"Importar"** na barra superior.
2.  Selecione um arquivo `.json` formatado conforme o exemplo acima.
3.  O ticket será carregado, mesclado com o template correspondente (Abrigo ou Totem) e salvo no armazenamento local do navegador.


## 🛠️ Como Atualizar os Dados (Desenvolvimento)

Enquanto não há integração com backend, os dados são carregados do arquivo `src/constants.ts`.

1.  Abra o arquivo `src/constants.ts`.
2.  Localize a constante `tickets`.
3.  Adicione ou modifique os objetos `Ticket` dentro do array.
4.  Salve o arquivo. A aplicação recarregará automaticamente com os novos dados.

## 🚀 Rodando o Projeto

1.  Instale as dependências:
    ```bash
    npm install
    ```
2.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
3.  Acesse `http://localhost:5173` (ou a porta indicada no terminal).
