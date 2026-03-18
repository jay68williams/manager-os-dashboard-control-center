export type StationStatus = 'healthy' | 'warning' | 'critical' | 'offline';

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'idle' | 'error';
  lastRun: string;
}

export interface Station {
  id: string;
  name: string;
  domain: string;
  status: StationStatus;
  uptime: number;
  uptimeDays: number;
  agents: Agent[];
  agentCount: number;
  emailsSent: number;
  qualifyRate: number;
  tokenSpend: number;
  latency: number;
  lastActivity: string;
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  color: string;
  initials: string;
  apiUrl: string;
}

// Real Fusion Creative Station on Mac Mini
export const stations: Station[] = [
  {
    id: 'fusion-01',
    name: 'Fusion Creative',
    domain: 'fusion.manageros.co.uk',
    status: 'healthy',
    uptime: 99.9,
    uptimeDays: 1,
    agents: [
      { id: 'b1', name: 'Apollo Lead Import', type: 'lead', status: 'active', lastRun: '8 min ago' },
      { id: 'b2', name: 'AI Qualification', type: 'lead', status: 'active', lastRun: '15 min ago' },
      { id: 'b3', name: '5-Touch Sequence', type: 'email', status: 'active', lastRun: '30 min ago' },
    ],
    agentCount: 3,
    emailsSent: 0,
    qualifyRate: 0,
    tokenSpend: 0,
    latency: 0,
    lastActivity: 'Just now',
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    color: '#8b5cf6',
    initials: 'FC',
    apiUrl: 'http://fusion-creative-01:3001/metrics', // Tailscale internal
  },
];

export function getStation(id: string): Station | undefined {
  return stations.find(s => s.id === id);
}

export function getStationStats() {
  const healthy = stations.filter(s => s.status === 'healthy').length;
  const warning = stations.filter(s => s.status === 'warning').length;
  const critical = stations.filter(s => s.status === 'critical').length;
  const totalAgents = stations.reduce((sum, s) => sum + s.agentCount, 0);
  const totalEmails = stations.reduce((sum, s) => sum + s.emailsSent, 0);
  const totalTokens = stations.reduce((sum, s) => sum + s.tokenSpend, 0);
  const avgUptime = stations.length > 0 ? stations.reduce((sum, s) => sum + s.uptime, 0) / stations.length : 0;
  return { healthy, warning, critical, totalAgents, totalEmails, totalTokens, avgUptime, total: stations.length };
}
