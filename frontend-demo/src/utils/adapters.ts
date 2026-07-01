import type { Agent, Shop, Assignment, SalesRecord } from '../types';

export const adaptAgent = (data: any): Agent => {
  return {
    id: data.id.toString(),
    name: data.full_name,
    email: data.email || '',
    accountNumber: (data.account_number && !data.account_number.startsWith('0') && !data.account_number.startsWith('+')) 
      ? '0' + data.account_number 
      : (data.account_number || ''),
    dateOfBirth: data.date_of_birth || '',
    education: data.education_level || '',
    educationInstitution: data.education_institution || '',
    educationYear: data.education_year,
    employmentDate: data.employment_date || '',
    currentShopId: data.current_assignment?.shop_id?.toString() || '',
    status: data.employment_status === 'active' ? 'active' : 'inactive',
    address: data.address || '',
    gender: data.gender || '',
    secondaryNumber: (data.secondary_number && !data.secondary_number.startsWith('0') && !data.secondary_number.startsWith('+')) 
      ? '0' + data.secondary_number 
      : (data.secondary_number || ''),
    emergencyContactName: data.emergency_contact_name || '',
    emergencyContactPhone: (data.emergency_contact_phone && !data.emergency_contact_phone.startsWith('0') && !data.emergency_contact_phone.startsWith('+')) 
      ? '0' + data.emergency_contact_phone 
      : (data.emergency_contact_phone || ''),
    notes: data.notes || '',
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
    district: data.district || '',
    description: data.description || '',
  };
};

export const adaptAssignment = (data: any): Assignment => {
  return {
    id: data.id.toString(),
    dsrId: data.dsr_id.toString(),
    shopId: data.shop_id.toString(),
    startDate: data.start_date,
    endDate: data.end_date,
    role: data.role === 'main' ? 'main' : 'assistant',
  };
};

export const adaptSalesRecord = (data: any): SalesRecord => {
  return {
    id: data.id.toString(),
    dsrId: data.dsr_id.toString(),
    shopId: data.shop_id.toString(),
    date: data.sale_date,
    devicesSold: data.devices_sold,
    remarks: data.remarks || '',
  };
};
