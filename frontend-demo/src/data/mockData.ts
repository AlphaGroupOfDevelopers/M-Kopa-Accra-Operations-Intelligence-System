// Mock Data for M-Kopa AOIS Demo: ODSS Transformation
import { subDays, format } from 'date-fns';
import type { Agent, Shop, Assignment, SalesRecord } from '../types';

// Re-export types for convenience
export type { Agent, Shop, Assignment, SalesRecord };

// Shops Data (Real MTN Accra Locations)
// Adding metadata like baseTraffic to support mathematical weighting in our ODSS engines
export const shops: Shop[] = [
  { id: 'shop1', name: 'MTN Head Office', location: 'West Ridge', region: 'Greater Accra', shopCode: 'ACC-001', status: 'active', baseTraffic: 1.5 },
  { id: 'shop2', name: 'MTN Accra Mall', location: 'Spintex Road', region: 'Greater Accra', shopCode: 'ACC-002', status: 'active', baseTraffic: 1.8 },
  { id: 'shop3', name: 'MTN North Industrial', location: 'Dadeban Road', region: 'Greater Accra', shopCode: 'ACC-003', status: 'active', baseTraffic: 0.9 },
  { id: 'shop4', name: 'MTN Osu Mall', location: 'Oxford Street', region: 'Greater Accra', shopCode: 'ACC-004', status: 'active', baseTraffic: 1.4 },
  { id: 'shop5', name: 'MTN Graphic Road', location: 'South Industrial Area', region: 'Greater Accra', shopCode: 'ACC-005', status: 'active', baseTraffic: 1.1 },
  { id: 'shop6', name: 'MTN Tesano', location: 'Nsawam Road', region: 'Greater Accra', shopCode: 'ACC-006', status: 'active', baseTraffic: 1.2 },
  { id: 'shop7', name: 'MTN Haatso', location: 'Haatso Road', region: 'Greater Accra', shopCode: 'ACC-007', status: 'active', baseTraffic: 0.8 },
];

// Agents Data (9 Agents, @gmail.com emails, with explicit Birthdays)
export const agents: Agent[] = [
  { id: 'agent1', name: 'Kwame Mensah', email: 'kwame.mensah@gmail.com', phone: '+233244123456', dateOfBirth: '1995-03-15', education: 'HND Marketing', employmentDate: '2022-01-10', currentShopId: 'shop1', status: 'active', role: 'main' },
  { id: 'agent2', name: 'Ama Darko', email: 'ama.darko@gmail.com', phone: '+233244234567', dateOfBirth: '1993-07-22', education: 'BSc Business Admin', employmentDate: '2021-06-15', currentShopId: 'shop1', status: 'active', role: 'assistant' },
  { id: 'agent3', name: 'Kofi Asante', email: 'kofi.asante@gmail.com', phone: '+233244345678', dateOfBirth: '1996-11-08', education: 'Diploma Sales', employmentDate: '2022-09-01', currentShopId: 'shop2', status: 'active', role: 'main' },
  { id: 'agent4', name: 'Akua Boateng', email: 'akua.boateng@gmail.com', phone: '+233244456789', dateOfBirth: '1994-05-19', education: 'HND Marketing', employmentDate: '2021-11-20', currentShopId: 'shop2', status: 'active', role: 'assistant' },
  { id: 'agent5', name: 'Yaw Agyeman', email: 'yaw.agyeman@gmail.com', phone: '+233244567890', dateOfBirth: '1997-02-14', education: 'BSc Economics', employmentDate: '2023-01-05', currentShopId: 'shop3', status: 'active', role: 'main' },
  { id: 'agent6', name: 'Abena Osei', email: 'abena.osei@gmail.com', phone: '+233244678901', dateOfBirth: '1995-09-30', education: 'HND Business', employmentDate: '2022-04-12', currentShopId: 'shop4', status: 'active', role: 'main' },
  { id: 'agent7', name: 'Kwesi Owusu', email: 'kwesi.owusu@gmail.com', phone: '+233244789012', dateOfBirth: '1996-06-25', education: 'Diploma Marketing', employmentDate: '2022-08-18', currentShopId: 'shop5', status: 'active', role: 'main' },
  { id: 'agent8', name: 'Efua Addai', email: 'efua.addai@gmail.com', phone: '+233244890123', dateOfBirth: '1994-12-03', education: 'BSc Marketing', employmentDate: '2021-03-22', currentShopId: 'shop6', status: 'active', role: 'main' },
  { id: 'agent9', name: 'Kojo Mensah', email: 'kojo.mensah@gmail.com', phone: '+233244901234', dateOfBirth: '1998-01-17', education: 'HND Sales', employmentDate: '2023-02-15', currentShopId: 'shop7', status: 'active', role: 'main' },
];

// Generate Assignments with Transfer History (Markov Chains simulation requires historical pathways)
export const assignments: Assignment[] = [
  // Current assignments
  { id: 'assign1', agentId: 'agent1', shopId: 'shop1', startDate: '2022-01-10', role: 'main' },
  { id: 'assign2', agentId: 'agent2', shopId: 'shop1', startDate: '2023-08-01', role: 'assistant' },
  { id: 'assign3', agentId: 'agent3', shopId: 'shop2', startDate: '2023-05-15', role: 'main' },
  { id: 'assign4', agentId: 'agent4', shopId: 'shop2', startDate: '2021-11-20', role: 'assistant' },
  { id: 'assign5', agentId: 'agent5', shopId: 'shop3', startDate: '2023-01-05', role: 'main' },
  { id: 'assign6', agentId: 'agent6', shopId: 'shop4', startDate: '2024-01-10', role: 'main' },
  { id: 'assign7', agentId: 'agent7', shopId: 'shop5', startDate: '2023-09-01', role: 'main' },
  { id: 'assign8', agentId: 'agent8', shopId: 'shop6', startDate: '2021-03-22', role: 'main' },
  { id: 'assign9', agentId: 'agent9', shopId: 'shop7', startDate: '2023-02-15', role: 'main' },
  
  // Historical assignments (transfers for Markov analysis)
  { id: 'assign10', agentId: 'agent2', shopId: 'shop3', startDate: '2021-06-15', endDate: '2023-07-31', reason: 'Transfer to higher performing shop', role: 'assistant' },
  { id: 'assign11', agentId: 'agent3', shopId: 'shop4', startDate: '2022-09-01', endDate: '2023-05-14', reason: 'Shop restructuring', role: 'main' },
  { id: 'assign12', agentId: 'agent6', shopId: 'shop5', startDate: '2022-04-12', endDate: '2024-01-09', reason: 'Performance improvement transfer', role: 'main' },
  { id: 'assign13', agentId: 'agent7', shopId: 'shop6', startDate: '2022-08-18', endDate: '2023-08-31', reason: 'Location preference', role: 'main' },
];

// Highly conversational and verbose remarks pool for TF-IDF / NLP clustering
const remarksPool = [
  // Cluster: Affordability / Price
  'Customers are complaining that the device down-payment is slightly too high for them right now.',
  'Many people walked in but walked out when they heard the current pricing models.',
  'Affordability is a major issue today, several customers asked for discounts we couldn\'t provide.',
  
  // Cluster: Stock / Availability
  'We completely ran out of the new smartphone models by noon. Stock shortage is killing sales!',
  'Had to turn away 5 customers because we don\'t have the required devices in stock. Please restock urgently.',
  'Inventory delays meant we had empty shelves for the most popular devices today.',
  
  // Cluster: Network / System / Registration
  'The registration portal was down for 3 hours, causing a massive backlog and angry customers.',
  'Network issues prevented us from completing payments quickly. Customers had to wait too long.',
  'System errors kept occurring during the SIM registration process. Need IT support.',
  
  // Cluster: External / Environment
  'Heavy rain in the morning completely destroyed our foot traffic. The shop was empty until 2 PM.',
  'Power outage in the area for 4 hours. We couldn\'t process anything until the generator was fixed.',
  'There is a massive promotion happening next door at our competitor\'s shop, stealing our traffic.',
  
  // Cluster: Positive / Standard
  'Incredible day! Walk-in traffic was consistently high and customers were very eager to buy.',
  'Smooth operations today, all systems working perfectly and sales targets met easily.',
  'Great energy in the shop today. We successfully up-sold several customers to higher tier devices.',
];

// Generate Sales Records for the last 6 months
export function generateSalesRecords(): SalesRecord[] {
  const records: SalesRecord[] = [];
  const today = new Date();
  let recordId = 1;

  // Performance profiles for agents designed to feed the mathematical engines
  const agentPerformance: Record<string, { base: number; variance: number; trend: 'up' | 'down' | 'stable' | 'sharp_decline' }> = {
    agent1: { base: 8, variance: 3, trend: 'stable' },
    agent2: { base: 6, variance: 2, trend: 'up' },
    agent3: { base: 5, variance: 2, trend: 'stable' },
    agent4: { base: 9, variance: 3, trend: 'up' }, // Star performer
    agent5: { base: 7, variance: 2, trend: 'sharp_decline' }, // Designed to trigger anomaly & risk models
    agent6: { base: 6, variance: 2, trend: 'down' },
    agent7: { base: 5, variance: 1, trend: 'stable' },
    agent8: { base: 8, variance: 2, trend: 'up' },
    agent9: { base: 4, variance: 2, trend: 'stable' },
  };

  // Generate 1800 days of data
  for (let daysAgo = 1800; daysAgo >= 0; daysAgo--) {
    const date = format(subDays(today, daysAgo), 'yyyy-MM-dd');
    
    // Simulate non-reporting (Compliance)
    const skipDay = Math.random() < 0.04;

    agents.forEach(agent => {
      // If the shop skips reporting, skip the agent (except sharp decline agent, they skip more)
      const profile = agentPerformance[agent.id];
      const isDeclining = profile.trend === 'sharp_decline';
      
      let chanceToSkip = skipDay ? 0.3 : 0.01;
      if (isDeclining && daysAgo < 30) chanceToSkip += 0.15; // Decreased compliance for declining shop

      if (Math.random() < chanceToSkip) return;

      let devicesSold = profile.base + (Math.random() * profile.variance * 2) - profile.variance;
      
      // Apply trend formulas
      const trendFactor = (1800 - daysAgo) / 1800; 
      if (profile.trend === 'up') {
        devicesSold += (trendFactor * 4);
      } else if (profile.trend === 'down') {
        devicesSold -= (trendFactor * 3);
      } else if (profile.trend === 'sharp_decline') {
        // Sudden drop in the last 45 days
        if (daysAgo < 45) {
          devicesSold -= ((45 - daysAgo) / 45) * 6; // Drastic drop
        }
      }

      // Add noise
      devicesSold += (Math.random() * 2) - 1;
      devicesSold = Math.max(0, Math.round(devicesSold));

      // Current assignment
      const assignment = assignments
        .filter(a => a.agentId === agent.id)
        .find(a => {
          const start = new Date(a.startDate);
          const end = a.endDate ? new Date(a.endDate) : new Date();
          const checkDate = new Date(date);
          return checkDate >= start && checkDate <= end;
        });

      if (!assignment) return;
      if (assignment.role === 'assistant') return; // Assistants do not generate direct sales records
      
      const shop = shops.find(s => s.id === assignment.shopId);
      const baseTraffic = shop?.baseTraffic || 1;
      
      // Multiply by shop traffic potential for the AEC math
      devicesSold = Math.max(0, Math.round(devicesSold * baseTraffic));

      // Select remarks based on performance and random probability
      let remarks = remarksPool[Math.floor(Math.random() * remarksPool.length)];
      if (devicesSold <= 2) {
        remarks = remarksPool.filter(r => r.includes('shortage') || r.includes('down') || r.includes('affordability'))[Math.floor(Math.random() * 3)];
      } else if (devicesSold >= 12) {
        remarks = remarksPool.filter(r => r.includes('Incredible') || r.includes('Smooth') || r.includes('Great'))[Math.floor(Math.random() * 3)];
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
