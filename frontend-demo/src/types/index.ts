export interface Agent {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  dateOfBirth: string;
  education: string;
  educationInstitution?: string;
  educationYear?: number;
  employmentDate: string;
  currentShopId: string;
  status: 'active' | 'inactive';
  address?: string;
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
  dsrId: string;
  shopId: string;
  startDate: string;
  endDate?: string;
  reason?: string;
  role?: 'main' | 'assistant';
}

export interface SalesRecord {
  id: string;
  dsrId: string;
  shopId: string;
  date: string;
  devicesSold: number;
  remarks: string;
}
