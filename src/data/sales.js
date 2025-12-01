// src/data/sales.js
// Mock sales data for admin dashboard
export const salesData = [
  { id: 1, date: '2025-11-25', items: 3, total: 4500 },
  { id: 2, date: '2025-11-26', items: 2, total: 3200 },
  { id: 3, date: '2025-11-27', items: 5, total: 7800 },
  { id: 4, date: '2025-11-28', items: 1, total: 1500 },
  { id: 5, date: '2025-11-29', items: 4, total: 6200 }
];

export function getTotalOrders(data = salesData) {
  return data.length;
}

export function getTotalRevenue(data = salesData) {
  return data.reduce((sum, s) => sum + Number(s.total), 0);
}

export function getAverageOrderValue(data = salesData) {
  if (!data.length) return 0;
  return Math.round(getTotalRevenue(data) / data.length);
}
