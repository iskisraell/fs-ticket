# Guia de Implementação do Google Maps

Este guia explica como substituir a implementação atual de mapa pelo Google Maps, tanto para a aplicação web quanto para a exportação em PDF.

## Pré-requisitos

1.  **Projeto Google Cloud Platform (GCP)**: Você precisa de um projeto no GCP.
2.  **Faturamento**: Você deve ativar o faturamento para o seu projeto (a Plataforma Google Maps exige isso, embora exista um nível gratuito).
3.  **Chaves de API**: Crie uma Chave de API e ative as seguintes APIs:
    *   **Maps JavaScript API** (para o Webapp)
    *   **Maps Static API** (para o PDF)

> [!IMPORTANT]
> Restrinja suas chaves de API ao seu domínio (para web) e IP do servidor (se aplicável) para evitar uso não autorizado.

---

## 1. Implementação no Webapp

Para a aplicação web, recomendamos usar a biblioteca `@react-google-maps/api` para fácil integração com React.

### Passo 1: Instalar a biblioteca

```bash
npm install @react-google-maps/api
```

### Passo 2: Criar um Componente de Mapa

Crie um novo componente `components/GoogleMap.tsx`:

```tsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

interface Props {
  lat: number;
  lng: number;
}

export const MapComponent: React.FC<Props> = ({ lat, lng }) => {
  const center = {
    lat: lat,
    lng: lng
  };

  return (
    <LoadScript googleMapsApiKey="SUA_CHAVE_DE_API_AQUI">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};
```

### Passo 3: Uso

Importe e use este componente em suas páginas onde você deseja exibir o mapa.

---

## 2. Implementação no PDF

Para o PDF renderizado com `@react-pdf/renderer`, não podemos usar a API JavaScript. Em vez disso, usamos a **Google Static Maps API** para gerar uma URL de imagem que pode ser incorporada no PDF.

### Passo 1: Construir a URL do Mapa Estático

Em `components/PDFDocument.tsx`, substitua a lógica de URL do Yandex pelo Google Maps:

```typescript
// components/PDFDocument.tsx

const GOOGLE_MAPS_KEY = "SUA_CHAVE_DE_API_AQUI";

// ... dentro do componente
const mapUrl = ticket.location.lat && ticket.location.lng
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${ticket.location.lat},${ticket.location.lng}&zoom=17&size=450x300&maptype=roadmap&markers=color:red%7C${ticket.location.lat},${ticket.location.lng}&key=${GOOGLE_MAPS_KEY}`
    : null;
```

### Parâmetros Principais:
- `center`: Latitude e Longitude.
- `zoom`: Nível de zoom (geralmente 15-17).
- `size`: Dimensões da imagem (ex: 450x300).
- `markers`: Adiciona um pino no local.
- `key`: Sua Chave de API do Google Maps.

### Passo 2: Remover o Ocultador de Marca D'água

Uma vez que você mude para o Google Maps, você pode não precisar do hack "Ocultar Marca D'água" que implementamos para o Yandex, ou pode precisar ajustá-lo se o Google adicionar um aviso de direitos autorais que você queira ocultar (embora os termos do Google geralmente exijam que o logotipo esteja visível).

---

## Resumo das Mudanças Necessárias

1.  **Obter Chaves de API** no Console do Google Cloud.
2.  **Instalar** `@react-google-maps/api` para o webapp.
3.  **Atualizar** `PDFDocument.tsx` para usar a URL do Google Static Maps.
