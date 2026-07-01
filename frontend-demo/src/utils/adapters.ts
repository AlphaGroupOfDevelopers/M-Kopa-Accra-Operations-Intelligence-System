import type { Agent, Shop, Assignment, SalesRecord } from '../types';

export const adaptAgent = (data: any): Agent => {
  return {
    id: data.id.toString(),
    name: data.full_name,
    email: data.email || '',
    phone: data.account_number,
    dateOfBirth: data.date_of_birth || '',
    education: data.education_level || '',
    employmentDate: data.employment_date || '',
    currentShopId: data.current_assignment?.shop_id?.toString() || '',
    status: data.employment_status === 'active' ? 'active' : 'inactive',
    digitalAddress: data.address || '',
  };
};

export const adaptShop = (data: any): Shop => {
  return {
    id: data.id.toString(),
    name: data.name,
    location: data.location,
    region: data.region,
    shopCode: data.name.toUpperCase().replace(/\s+/g, '_'), // Mock shop code if not present
    status: data.is_active ? 'active' : 'inactive',
  };
};

export const adaptAssignment = (data: any): Assignment => {
  return {
    id: data.id.toString(),
    agentId: data.dsr_id.toString(),
    shopId: data.shop_id.toString(),
    startDate: data.start_date,
    endDate: data.end_date,
    role: data.role === 'main' ? 'main' : 'assistant',
  };
};

export const adaptSalesRecord = (data: any): SalesRecord => {
  return {
    id: data.id.toString(),
    agentId: data.dsr_id.toString(),
    shopId: data.shop_id.toString(),
    date: data.sale_date,
    devicesSold: data.devices_sold,
    remarks: data.remarks || '',
  };
};
