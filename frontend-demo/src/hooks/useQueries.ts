import { useSuspenseQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../services/api';
import { adaptAgent, adaptShop, adaptAssignment, adaptSalesRecord } from '../utils/adapters';
import type { Agent, Shop, Assignment, SalesRecord } from '../types';

export const useShops = () => {
  return useSuspenseQuery<Shop[], Error>({
    queryKey: ['shops'],
    queryFn: async () => {
      const response = await api.get('/shops');
      const items = response.data.items || response.data;
      return items.map(adaptShop);
    },
  });
};

export const useAgents = () => {
  return useSuspenseQuery<Agent[], Error>({
    queryKey: ['agents'],
    queryFn: async () => {
      const response = await api.get('/dsrs');
      const items = response.data.items || response.data;
      return items.map(adaptAgent);
    },
  });
};

export const useAssignments = () => {
  return useSuspenseQuery<Assignment[], Error>({
    queryKey: ['assignments'],
    queryFn: async () => {
      try {
        const response = await api.get('/assignments');
        const items = response.data.items || response.data;
        return items.map(adaptAssignment);
      } catch (e) {
        return [];
      }
    },
  });
};

export const useSalesRecords = () => {
  return useSuspenseQuery<SalesRecord[], Error>({
    queryKey: ['salesRecords'],
    queryFn: async () => {
      const response = await api.get('/sales');
      const items = response.data.items || response.data;
      return items.map(adaptSalesRecord);
    },
  });
};

export const useAddSalesRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newRecord: Partial<SalesRecord>) => {
      const payload = {
        dsr_id: parseInt(newRecord.dsrId || '0'),
        shop_id: parseInt(newRecord.shopId || '0'),
        sale_date: newRecord.date,
        devices_sold: newRecord.devicesSold,
        remarks: newRecord.remarks || '',
        data_source: 'system'
      };
      const response = await api.post('/sales', payload);
      return adaptSalesRecord(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['salesRecords'] });
    },
  });
};
