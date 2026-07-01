export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  education: string;
  employmentDate: string;
  currentShopId: string;
  status: 'active' | 'inactive';
  digitalAddress?: string;
  photo?: string;
  role?: 'main' | 'assistant';
  secondaryNumber?: string;
  gender?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
}

export interface Shop {
  id: string;
  name: string;
  location: string;
  region: string;
  shopCode: string;
  status: 'active' | 'inactive';
  baseTraffic?: number;
  district?: string;
  description?: string;
}

export interface Assignment {
  id: string;
  agentId: string;
  shopId: string;
  startDate: string;
  endDate?: string;
  reason?: string;
  role?: 'main' | 'assistant';
}

export interface SalesRecord {
  id: string;
  agentId: string;
  shopId: string;
  date: string;
  devicesSold: number;
  remarks: string;
}
