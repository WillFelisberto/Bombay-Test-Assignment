import { CLEAR_DASHBOARD, REQUEST_DASHBOARD } from '@/store/dashboard/constants';

export function getDashboard() {
  return { type: REQUEST_DASHBOARD };
}

export function clearDashboard() {
  return { type: CLEAR_DASHBOARD };
}

