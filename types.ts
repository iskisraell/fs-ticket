export interface ChecklistItem {
  label: string;
  value: boolean; // true = issue present, false = ok
  key: string;
  photos?: {
    before?: string;
    after?: string;
  };
}

export interface ChecklistGroup {
  title: string;
  items: ChecklistItem[];
}

export interface Photo {
  url: string;
  label: string;
  date?: string;
}

export interface Ticket {
  id: string;
  eltNumber: string;
  type: 'Abrigo' | 'Totem';
  activityType: string;
  status: string;
  sla: string;
  openDate: string;
  technician: string;
  initialPhoto?: string; // Explicit initial photo URL
  location: {
    address: string;
    district: string;
    reference: string;
    cep: string;
    lat?: number;
    lng?: number;
  };
  equipment: {
    id: string;
    model: string;
    stopNumber: string;
  };
  checklist: ChecklistGroup[];
  photos: {
    before: Photo[];
    after: Photo[];
  };
}