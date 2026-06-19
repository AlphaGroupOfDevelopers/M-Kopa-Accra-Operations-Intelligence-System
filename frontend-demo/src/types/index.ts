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
  photo?: string;
}

export interface Shop {
  id: string;
  name: string;
  location: string;
  region: string;
  shopCode: string;
  status: 'active' | 'inactive';
}

export interface Assignment {
  id: string;
  agentId: string;
  shopId: string;
  startDate: string;
  endDate?: string;
  reason?: string;
}

export interface SalesRecord {
  id: string;
  agentId: string;
  shopId: string;
  date: string;
  devicesSold: number;
  remarks: string;
}
