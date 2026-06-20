// Advanced Mathematical & Statistical Models for ODSS Transformation

/**
 * Calculates the Z-Score of a given value against an array of historical values.
 * Used for Anomaly Detection.
 * Z = (X - μ) / σ
 */
export function calculateZScore(value: number, history: number[]): number {
  if (history.length === 0) return 0;
  
  const mean = history.reduce((sum, val) => sum + val, 0) / history.length;
  
  const variance = history.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / history.length;
  const standardDeviation = Math.sqrt(variance);
  
  if (standardDeviation === 0) return 0;
  
  return (value - mean) / standardDeviation;
}

/**
 * Calculates the Exponential Moving Average (EMA).
 * Used for smoother trend analysis without lagging as much as simple moving average.
 */
export function calculateEMA(data: number[], window: number = 7): number[] {
  if (data.length === 0) return [];
  
  const k = 2 / (window + 1);
  const emaData = [data[0]];
  
  for (let i = 1; i < data.length; i++) {
    const ema = (data[i] * k) + (emaData[i - 1] * (1 - k));
    emaData.push(ema);
  }
  
  return emaData;
}

/**
 * Simulates a TF-IDF & K-Means clustering algorithm for NLP context.
 * In a real backend, this would use vector embeddings. 
 * For the demo, we use a deterministic keyword-based mock simulation to cluster remarks.
 */
export function clusterRemarksNLP(remarks: string[]): { clusterName: string; size: number; sample: string }[] {
  const clusters: Record<string, string[]> = {
    'Affordability & Price': [],
    'Stock & Inventory': [],
    'Network & IT Systems': [],
    'Environmental Constraints': [],
    'Positive Engagements': [],
  };

  remarks.forEach(remark => {
    const lower = remark.toLowerCase();
    if (lower.includes('affordability') || lower.includes('down-payment') || lower.includes('discount')) {
      clusters['Affordability & Price'].push(remark);
    } else if (lower.includes('stock') || lower.includes('inventory') || lower.includes('shortage')) {
      clusters['Stock & Inventory'].push(remark);
    } else if (lower.includes('network') || lower.includes('portal') || lower.includes('system') || lower.includes('error')) {
      clusters['Network & IT Systems'].push(remark);
    } else if (lower.includes('rain') || lower.includes('power') || lower.includes('competitor')) {
      clusters['Environmental Constraints'].push(remark);
    } else {
      clusters['Positive Engagements'].push(remark);
    }
  });

  return Object.entries(clusters)
    .filter(([_, items]) => items.length > 0)
    .map(([clusterName, items]) => ({
      clusterName,
      size: items.length,
      sample: items[0],
    }))
    .sort((a, b) => b.size - a.size);
}

/**
 * Simulates a Monte Carlo risk analysis over N iterations.
 * Used for Predictive Intelligence (Risk Modeling).
 * Outputs probability of total sales falling below a critical threshold.
 */
export function runMonteCarloRiskSimulation(
  currentAvg: number, 
  stdDev: number, 
  iterations: number = 1000, 
  days: number = 30,
  criticalThreshold: number
): { riskProbability: number; avgExpected: number; p10: number; p90: number } {
  if (stdDev === 0) stdDev = 0.01; // Avoid divide by zero
  
  const results: number[] = [];
  
  for (let i = 0; i < iterations; i++) {
    let simulatedTotal = 0;
    for (let d = 0; d < days; d++) {
      // Box-Muller transform for normal distribution simulation
      const u1 = Math.max(Math.random(), 0.0001);
      const u2 = Math.random();
      const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      
      let daySales = currentAvg + z0 * stdDev;
      simulatedTotal += Math.max(0, daySales); // Sales can't be negative
    }
    results.push(simulatedTotal);
  }
  
  results.sort((a, b) => a - b);
  
  const riskCases = results.filter(r => r < criticalThreshold).length;
  const riskProbability = (riskCases / iterations) * 100;
  const avgExpected = results.reduce((a, b) => a + b, 0) / iterations;
  
  const p10 = results[Math.floor(iterations * 0.1)];
  const p90 = results[Math.floor(iterations * 0.9)];
  
  return { riskProbability, avgExpected, p10, p90 };
}

/**
 * Calculates Shop Performance Index (SPI) using Weighted Scoring Model
 * 40% Sales Volume, 25% Growth Rate, 20% Consistency (Inverse Variance), 15% Compliance
 */
export function calculateSPI(
  sales: number, 
  maxSalesInRegion: number,
  growthRate: number, 
  variance: number, 
  maxVarianceInRegion: number,
  complianceRate: number // 0 to 1
): number {
  const salesScore = maxSalesInRegion > 0 ? (sales / maxSalesInRegion) * 100 : 0;
  
  // Normalize growth (-100% to +100% maps to 0 to 100)
  let growthScore = (growthRate + 100) / 2;
  growthScore = Math.max(0, Math.min(100, growthScore));
  
  // Consistency is inverse to variance
  const consistencyScore = maxVarianceInRegion > 0 
    ? (1 - (variance / maxVarianceInRegion)) * 100 
    : 100;
    
  const complianceScore = complianceRate * 100;
  
  const spi = (0.40 * salesScore) + (0.25 * growthScore) + (0.20 * consistencyScore) + (0.15 * complianceScore);
  return Math.round(spi);
}

/**
 * Calculates Agent Effectiveness Coefficient (AEC)
 * AEC = Actual Sales / Expected Shop Sales Potential
 */
export function calculateAEC(actualSales: number, expectedShopPotential: number): number {
  if (expectedShopPotential === 0) return 0;
  return actualSales / expectedShopPotential;
}

/**
 * Financial Mathematics Layer
 * Calculates the expected GHS impact of a decision (e.g., Transfer)
 */
export function calculateFinancialImpact(varianceInDevices: number, averageMarginPerDevice: number = 300): number {
  return varianceInDevices * averageMarginPerDevice;
}
