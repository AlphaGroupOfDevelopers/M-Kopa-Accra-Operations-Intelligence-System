// Mock Data for M-Kopa AOIS Demo
import { subDays, format } from 'date-fns';
import type { Agent, Shop, Assignment, SalesRecord } from '../types';

// Re-export types for convenience
export type { Agent, Shop, Assignment, SalesRecord };

// Shops Data
export const shops: Shop[] = [
  { id: 'shop1', name: 'Accra Mall MTN Office', location: 'Accra Mall, Tetteh Quarshie', region: 'Greater Accra', shopCode: 'ACC-001', status: 'active' },
  { id: 'shop2', name: 'Kaneshie MTN Office', location: 'Kaneshie Market Area', region: 'Greater Accra', shopCode: 'KAN-002', status: 'active' },
  { id: 'shop3', name: 'Tema MTN Office', location: 'Tema Community 1', region: 'Greater Accra', shopCode: 'TEM-003', status: 'active' },
  { id: 'shop4', name: 'Madina MTN Office', location: 'Madina Market', region: 'Greater Accra', shopCode: 'MAD-004', status: 'active' },
  { id: 'shop5', name: 'Dome MTN Office', location: 'Dome Kwabenya', region: 'Greater Accra', shopCode: 'DOM-005', status: 'active' },
  { id: 'shop6', name: 'Spintex MTN Office', location: 'Spintex Road', region: 'Greater Accra', shopCode: 'SPI-006', status: 'active' },
  { id: 'shop7', name: 'Lapaz MTN Office', location: 'Lapaz Market', region: 'Greater Accra', shopCode: 'LAP-007', status: 'active' },
];

// Agents Data
export const agents: Agent[] = [
  { id: 'agent1', name: 'Kwame Mensah', email: 'kwame.mensah@mkopa.com', phone: '+233244123456', dateOfBirth: '1995-03-15', education: 'HND Marketing', employmentDate: '2022-01-10', currentShopId: 'shop1', status: 'active' },
  { id: 'agent2', name: 'Ama Darko', email: 'ama.darko@mkopa.com', phone: '+233244234567', dateOfBirth: '1993-07-22', education: 'BSc Business Admin', employmentDate: '2021-06-15', currentShopId: 'shop1', status: 'active' },
  { id: 'agent3', name: 'Kofi Asante', email: 'kofi.asante@mkopa.com', phone: '+233244345678', dateOfBirth: '1996-11-08', education: 'Diploma Sales', employmentDate: '2022-09-01', currentShopId: 'shop2', status: 'active' },
  { id: 'agent4', name: 'Akua Boateng', email: 'akua.boateng@mkopa.com', phone: '+233244456789', dateOfBirth: '1994-05-19', education: 'HND Marketing', employmentDate: '2021-11-20', currentShopId: 'shop2', status: 'active' },
  { id: 'agent5', name: 'Yaw Agyeman', email: 'yaw.agyeman@mkopa.com', phone: '+233244567890', dateOfBirth: '1997-02-14', education: 'BSc Economics', employmentDate: '2023-01-05', currentShopId: 'shop3', status: 'active' },
  { id: 'agent6', name: 'Abena Osei', email: 'abena.osei@mkopa.com', phone: '+233244678901', dateOfBirth: '1995-09-30', education: 'HND Business', employmentDate: '2022-04-12', currentShopId: 'shop3', status: 'active' },
  { id: 'agent7', name: 'Kwesi Owusu', email: 'kwesi.owusu@mkopa.com', phone: '+233244789012', dateOfBirth: '1996-06-25', education: 'Diploma Marketing', employmentDate: '2022-08-18', currentShopId: 'shop4', status: 'active' },
  { id: 'agent8', name: 'Efua Addai', email: 'efua.addai@mkopa.com', phone: '+233244890123', dateOfBirth: '1994-12-03', education: 'BSc Marketing', employmentDate: '2021-03-22', currentShopId: 'shop4', status: 'active' },
  { id: 'agent9', name: 'Kojo Mensah', email: 'kojo.mensah@mkopa.com', phone: '+233244901234', dateOfBirth: '1998-01-17', education: 'HND Sales', employmentDate: '2023-02-15', currentShopId: 'shop5', status: 'active' },
  { id: 'agent10', name: 'Adwoa Frimpong', email: 'adwoa.frimpong@mkopa.com', phone: '+233245012345', dateOfBirth: '1995-04-28', education: 'BSc Business', employmentDate: '2022-05-10', currentShopId: 'shop5', status: 'active' },
  { id: 'agent11', name: 'Kwabena Antwi', email: 'kwabena.antwi@mkopa.com', phone: '+233245123456', dateOfBirth: '1997-08-12', education: 'Diploma Business', employmentDate: '2022-10-25', currentShopId: 'shop6', status: 'active' },
  { id: 'agent12', name: 'Esi Appiah', email: 'esi.appiah@mkopa.com', phone: '+233245234567', dateOfBirth: '1993-10-05', education: 'HND Marketing', employmentDate: '2021-07-30', currentShopId: 'shop6', status: 'active' },
  { id: 'agent13', name: 'Fiifi Dadzie', email: 'fiifi.dadzie@mkopa.com', phone: '+233245345678', dateOfBirth: '1996-03-20', education: 'BSc Marketing', employmentDate: '2022-11-08', currentShopId: 'shop7', status: 'active' },
  { id: 'agent14', name: 'Afia Serwaa', email: 'afia.serwaa@mkopa.com', phone: '+233245456789', dateOfBirth: '1994-07-14', education: 'HND Business Admin', employmentDate: '2021-09-12', currentShopId: 'shop7', status: 'active' },
  { id: 'agent15', name: 'Nana Amoah', email: 'nana.amoah@mkopa.com', phone: '+233245567890', dateOfBirth: '1995-11-22', education: 'BSc Commerce', employmentDate: '2022-02-28', currentShopId: 'shop1', status: 'active' },
];

// Generate Assignments with Transfer History
export const assignments: Assignment[] = [
  // Current assignments
  { id: 'assign1', agentId: 'agent1', shopId: 'shop1', startDate: '2022-01-10' },
  { id: 'assign2', agentId: 'agent2', shopId: 'shop1', startDate: '2023-08-01' },
  { id: 'assign3', agentId: 'agent3', shopId: 'shop2', startDate: '2023-05-15' },
  { id: 'assign4', agentId: 'agent4', shopId: 'shop2', startDate: '2021-11-20' },
  { id: 'assign5', agentId: 'agent5', shopId: 'shop3', startDate: '2023-01-05' },
  { id: 'assign6', agentId: 'agent6', shopId: 'shop3', startDate: '2024-01-10' },
  { id: 'assign7', agentId: 'agent7', shopId: 'shop4', startDate: '2023-09-01' },
  { id: 'assign8', agentId: 'agent8', shopId: 'shop4', startDate: '2021-03-22' },
  { id: 'assign9', agentId: 'agent9', shopId: 'shop5', startDate: '2023-02-15' },
  { id: 'assign10', agentId: 'agent10', shopId: 'shop5', startDate: '2022-05-10' },
  { id: 'assign11', agentId: 'agent11', shopId: 'shop6', startDate: '2022-10-25' },
  { id: 'assign12', agentId: 'agent12', shopId: 'shop6', startDate: '2023-11-01' },
  { id: 'assign13', agentId: 'agent13', shopId: 'shop7', startDate: '2022-11-08' },
  { id: 'assign14', agentId: 'agent14', shopId: 'shop7', startDate: '2021-09-12' },
  { id: 'assign15', agentId: 'agent15', shopId: 'shop1', startDate: '2023-06-20' },
  
  // Historical assignments (transfers)
  { id: 'assign16', agentId: 'agent2', shopId: 'shop3', startDate: '2021-06-15', endDate: '2023-07-31', reason: 'Transfer to higher performing shop' },
  { id: 'assign17', agentId: 'agent3', shopId: 'shop4', startDate: '2022-09-01', endDate: '2023-05-14', reason: 'Shop restructuring' },
  { id: 'assign18', agentId: 'agent6', shopId: 'shop5', startDate: '2022-04-12', endDate: '2024-01-09', reason: 'Performance improvement transfer' },
  { id: 'assign19', agentId: 'agent7', shopId: 'shop6', startDate: '2022-08-18', endDate: '2023-08-31', reason: 'Location preference' },
  { id: 'assign20', agentId: 'agent12', shopId: 'shop2', startDate: '2021-07-30', endDate: '2023-10-31', reason: 'Transfer to growing shop' },
  { id: 'assign21', agentId: 'agent15', shopId: 'shop4', startDate: '2022-02-28', endDate: '2023-06-19', reason: 'Shop consolidation' },
];

// Remarks pool for generating realistic operational challenges
const remarksPool = [
  'Good day, all customers were satisfied',
  'Stock shortage - ran out of devices by noon',
  'Transport delays affected morning sales',
  'Heavy competition from nearby shop',
  'Network issues with payment system',
  'Customer complaints about pricing',
  'Excellent foot traffic today',
  'Need more promotional materials',
  'Training on new devices needed',
  'Power outage affected afternoon sales',
  'Great customer referrals today',
  'Competitor offering better deals',
  'Device defects reported by customers',
  'Late stock delivery',
  'Security concerns in the area',
  'Strong sales from repeat customers',
  'Market day - high customer volume',
  'Staff shortage - colleague on leave',
  'Successful promotional campaign',
  'Weather affected customer turnout',
];

// Generate Sales Records for the last 6 months
export function generateSalesRecords(): SalesRecord[] {
  const records: SalesRecord[] = [];
  const today = new Date();
  let recordId = 1;

  // Performance profiles for agents (to create realistic patterns)
  const agentPerformance: Record<string, { base: number; variance: number; trend: 'up' | 'down' | 'stable' }> = {
    agent1: { base: 8, variance: 3, trend: 'stable' },
    agent2: { base: 6, variance: 2, trend: 'up' },
    agent3: { base: 5, variance: 2, trend: 'stable' },
    agent4: { base: 7, variance: 2, trend: 'stable' },
    agent5: { base: 4, variance: 2, trend: 'up' },
    agent6: { base: 9, variance: 2, trend: 'down' },
    agent7: { base: 6, variance: 3, trend: 'stable' },
    agent8: { base: 10, variance: 2, trend: 'stable' },
    agent9: { base: 3, variance: 2, trend: 'up' },
    agent10: { base: 7, variance: 2, trend: 'stable' },
    agent11: { base: 5, variance: 2, trend: 'down' },
    agent12: { base: 8, variance: 2, trend: 'up' },
    agent13: { base: 6, variance: 2, trend: 'stable' },
    agent14: { base: 7, variance: 2, trend: 'stable' },
    agent15: { base: 5, variance: 2, trend: 'up' },
  };

  // Generate 180 days of data (6 months)
  for (let daysAgo = 180; daysAgo >= 0; daysAgo--) {
    const date = format(subDays(today, daysAgo), 'yyyy-MM-dd');
    
    // Skip some days randomly to create "silent shop" scenarios
    const skipDay = Math.random() < 0.05; // 5% chance to skip a day

    agents.forEach(agent => {
      if (skipDay && Math.random() < 0.3) return; // 30% of agents skip on skip days

      const profile = agentPerformance[agent.id];
      let devicesSold = profile.base + Math.floor(Math.random() * profile.variance * 2) - profile.variance;
      
      // Apply trend
      const trendFactor = (180 - daysAgo) / 180; // 0 to 1 over time
      if (profile.trend === 'up') {
        devicesSold += Math.floor(trendFactor * 3);
      } else if (profile.trend === 'down') {
        devicesSold -= Math.floor(trendFactor * 2);
      }

      devicesSold = Math.max(0, devicesSold); // No negative sales

      // Get current shop assignment for this agent on this date
      const assignment = assignments
        .filter(a => a.agentId === agent.id)
        .find(a => {
          const start = new Date(a.startDate);
          const end = a.endDate ? new Date(a.endDate) : new Date();
          const checkDate = new Date(date);
          return checkDate >= start && checkDate <= end;
        });

      if (!assignment) return;

      // Select remarks based on performance
      let remarks = remarksPool[Math.floor(Math.random() * remarksPool.length)];
      if (devicesSold === 0) {
        remarks = remarksPool.filter(r => r.includes('Stock shortage') || r.includes('Power outage') || r.includes('Network issues'))[Math.floor(Math.random() * 3)];
      } else if (devicesSold > profile.base + 2) {
        remarks = remarksPool.filter(r => r.includes('Excellent') || r.includes('Great') || r.includes('Successful'))[Math.floor(Math.random() * 3)];
      }

      records.push({
        id: `record${recordId++}`,
        agentId: agent.id,
        shopId: assignment.shopId,
        date,
        devicesSold,
        remarks,
      });
    });
  }

  return records;
}

export const salesRecords = generateSalesRecords();
