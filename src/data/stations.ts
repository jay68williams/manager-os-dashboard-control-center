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
}

export const stations: Station[] = [
  {
    id: 'kingsbrook-01',
    name: 'Kingsbrook M&A',
    domain: 'kingsbrook.manageros.co.uk',
    status: 'healthy',
    uptime: 99.9, uptimeDays: 30,
    agents: [
      { id: 'a1', name: 'Lead Qualifier', type: 'lead', status: 'active', lastRun: '2 min ago' },
      { id: 'a2', name: 'Email Outreach', type: 'email', status: 'active', lastRun: '5 min ago' },
      { id: 'a3', name: 'Content Writer', type: 'content', status: 'active', lastRun: '12 min ago' },
      { id: 'a4', name: 'Analytics', type: 'analytics', status: 'idle', lastRun: '1 hour ago' },
    ],
    agentCount: 4, emailsSent: 1247, qualifyRate: 89, tokenSpend: 2340,
    latency: 12, lastActivity: '2 mins ago',
    cpu: 78, memory: 62, disk: 34, network: 45,
    color: '#10b981', initials: 'KB',
  },
  {
    id: 'fusion-01',
    name: 'Fusion Creative',
    domain: 'fusion.manageros.co.uk',
    status: 'healthy',
    uptime: 99.7, uptimeDays: 30,
    agents: [
      { id: 'b1', name: 'Lead Qualifier', type: 'lead', status: 'active', lastRun: '8 min ago' },
      { id: 'b2', name: 'Email Outreach', type: 'email', status: 'active', lastRun: '15 min ago' },
      { id: 'b3', name: 'Social Scheduler', type: 'social', status: 'active', lastRun: '30 min ago' },
    ],
    agentCount: 3, emailsSent: 892, qualifyRate: 76, tokenSpend: 1680,
    latency: 18, lastActivity: '8 mins ago',
    cpu: 45, memory: 51, disk: 28, network: 32,
    color: '#8b5cf6', initials: 'FC',
  },
  {
    id: 'newgreek-01',
    name: 'New Greek',
    domain: 'newgreek.manageros.co.uk',
    status: 'warning',
    uptime: 98.2, uptimeDays: 30,
    agents: [
      { id: 'c1', name: 'Lead Qualifier', type: 'lead', status: 'active', lastRun: '1 min ago' },
      { id: 'c2', name: 'Email Outreach', type: 'email', status: 'error', lastRun: '45 min ago' },
    ],
    agentCount: 2, emailsSent: 534, qualifyRate: 82, tokenSpend: 5820,
    latency: 45, lastActivity: '1 min ago',
    cpu: 85, memory: 78, disk: 67, network: 28,
    color: '#f59e0b', initials: 'NG',
  },
  {
    id: 'sterling-01',
    name: 'Sterling Wealth',
    domain: 'sterling.manageros.co.uk',
    status: 'healthy',
    uptime: 99.8, uptimeDays: 30,
    agents: [
      { id: 'd1', name: 'Lead Qualifier', type: 'lead', status: 'active', lastRun: '3 min ago' },
      { id: 'd2', name: 'Email Outreach', type: 'email', status: 'active', lastRun: '10 min ago' },
      { id: 'd3', name: 'Report Generator', type: 'report', status: 'idle', lastRun: '2 hours ago' },
      { id: 'd4', name: 'CRM Sync', type: 'crm', status: 'active', lastRun: '5 min ago' },
      { id: 'd5', name: 'Compliance Check', type: 'compliance', status: 'active', lastRun: '20 min ago' },
    ],
    agentCount: 5, emailsSent: 2103, qualifyRate: 91, tokenSpend: 3120,
    latency: 8, lastActivity: '3 mins ago',
    cpu: 52, memory: 44, disk: 41, network: 68,
    color: '#3b82f6', initials: 'SW',
  },
  {
    id: 'apex-01',
    name: 'Apex Recruitment',
    domain: 'apex.manageros.co.uk',
    status: 'critical',
    uptime: 94.1, uptimeDays: 30,
    agents: [
      { id: 'e1', name: 'Candidate Screener', type: 'lead', status: 'error', lastRun: '3 hrs ago' },
      { id: 'e2', name: 'Outreach Bot', type: 'email', status: 'error', lastRun: '3 hrs ago' },
      { id: 'e3', name: 'Interview Scheduler', type: 'scheduler', status: 'active', lastRun: '25 min ago' },
    ],
    agentCount: 3, emailsSent: 54, qualifyRate: 31, tokenSpend: 9100,
    latency: 180, lastActivity: '3 hrs ago',
    cpu: 96, memory: 91, disk: 88, network: 12,
    color: '#ef4444', initials: 'AR',
  },
  {
    id: 'meridian-01',
    name: 'Meridian Legal',
    domain: 'meridian.manageros.co.uk',
    status: 'warning',
    uptime: 97.8, uptimeDays: 30,
    agents: [
      { id: 'f1', name: 'Document Processor', type: 'document', status: 'active', lastRun: '4 min ago' },
      { id: 'f2', name: 'Email Outreach', type: 'email', status: 'idle', lastRun: '1 hour ago' },
      { id: 'f3', name: 'Case Tracker', type: 'crm', status: 'error', lastRun: '30 min ago' },
      { id: 'f4', name: 'Billing Agent', type: 'billing', status: 'active', lastRun: '15 min ago' },
    ],
    agentCount: 4, emailsSent: 743, qualifyRate: 71, tokenSpend: 4820,
    latency: 52, lastActivity: '4 mins ago',
    cpu: 88, memory: 82, disk: 71, network: 35,
    color: '#f59e0b', initials: 'ML',
  },
  {
    id: 'brightpath-01',
    name: 'BrightPath Education',
    domain: 'brightpath.manageros.co.uk',
    status: 'healthy',
    uptime: 99.6, uptimeDays: 30,
    agents: [
      { id: 'g1', name: 'Student Outreach', type: 'email', status: 'active', lastRun: '7 min ago' },
      { id: 'g2', name: 'Enrollment Tracker', type: 'crm', status: 'active', lastRun: '14 min ago' },
    ],
    agentCount: 2, emailsSent: 421, qualifyRate: 87, tokenSpend: 980,
    latency: 11, lastActivity: '7 mins ago',
    cpu: 38, memory: 42, disk: 22, network: 29,
    color: '#06b6d4', initials: 'BP',
  },
  {
    id: 'nova-01',
    name: 'Nova Digital',
    domain: 'nova.manageros.co.uk',
    status: 'healthy',
    uptime: 99.9, uptimeDays: 30,
    agents: [
      { id: 'h1', name: 'SEO Analyzer', type: 'analytics', status: 'active', lastRun: '1 min ago' },
      { id: 'h2', name: 'Content Generator', type: 'content', status: 'active', lastRun: '9 min ago' },
      { id: 'h3', name: 'Social Scheduler', type: 'social', status: 'active', lastRun: '18 min ago' },
      { id: 'h4', name: 'PPC Optimizer', type: 'analytics', status: 'active', lastRun: '22 min ago' },
      { id: 'h5', name: 'Report Builder', type: 'report', status: 'idle', lastRun: '3 hours ago' },
      { id: 'h6', name: 'Email Outreach', type: 'email', status: 'active', lastRun: '5 min ago' },
    ],
    agentCount: 6, emailsSent: 3201, qualifyRate: 93, tokenSpend: 2890,
    latency: 9, lastActivity: '1 min ago',
    cpu: 72, memory: 58, disk: 45, network: 78,
    color: '#a855f7', initials: 'ND',
  },
  {
    id: 'cascade-01',
    name: 'Cascade Properties',
    domain: 'cascade.manageros.co.uk',
    status: 'healthy',
    uptime: 99.4, uptimeDays: 30,
    agents: [
      { id: 'i1', name: 'Listing Scanner', type: 'lead', status: 'active', lastRun: '11 min ago' },
      { id: 'i2', name: 'Email Outreach', type: 'email', status: 'active', lastRun: '20 min ago' },
      { id: 'i3', name: 'Valuation Bot', type: 'analytics', status: 'active', lastRun: '35 min ago' },
    ],
    agentCount: 3, emailsSent: 956, qualifyRate: 79, tokenSpend: 1540,
    latency: 14, lastActivity: '11 mins ago',
    cpu: 55, memory: 48, disk: 33, network: 41,
    color: '#14b8a6', initials: 'CP',
  },
  {
    id: 'ironclad-01',
    name: 'Ironclad Security',
    domain: 'ironclad.manageros.co.uk',
    status: 'healthy',
    uptime: 99.95, uptimeDays: 30,
    agents: [
      { id: 'j1', name: 'Threat Monitor', type: 'analytics', status: 'active', lastRun: '30 sec ago' },
      { id: 'j2', name: 'Email Outreach', type: 'email', status: 'active', lastRun: '8 min ago' },
      { id: 'j3', name: 'Compliance Auditor', type: 'compliance', status: 'active', lastRun: '15 min ago' },
      { id: 'j4', name: 'Incident Reporter', type: 'report', status: 'idle', lastRun: '2 hours ago' },
    ],
    agentCount: 4, emailsSent: 1890, qualifyRate: 88, tokenSpend: 2210,
    latency: 7, lastActivity: '30 secs ago',
    cpu: 64, memory: 52, disk: 37, network: 55,
    color: '#ef4444', initials: 'IS',
  },
  {
    id: 'zenith-01',
    name: 'Zenith Consulting',
    domain: 'zenith.manageros.co.uk',
    status: 'healthy',
    uptime: 99.3, uptimeDays: 30,
    agents: [
      { id: 'k1', name: 'Lead Qualifier', type: 'lead', status: 'active', lastRun: '9 min ago' },
      { id: 'k2', name: 'Proposal Writer', type: 'content', status: 'active', lastRun: '25 min ago' },
    ],
    agentCount: 2, emailsSent: 612, qualifyRate: 85, tokenSpend: 1120,
    latency: 16, lastActivity: '9 mins ago',
    cpu: 42, memory: 39, disk: 26, network: 31,
    color: '#f97316', initials: 'ZC',
  },
  {
    id: 'praxis-01',
    name: 'Praxis Health',
    domain: 'praxis.manageros.co.uk',
    status: 'healthy',
    uptime: 99.7, uptimeDays: 30,
    agents: [
      { id: 'l1', name: 'Patient Outreach', type: 'email', status: 'active', lastRun: '4 min ago' },
      { id: 'l2', name: 'Booking Agent', type: 'scheduler', status: 'active', lastRun: '12 min ago' },
      { id: 'l3', name: 'Follow-up Bot', type: 'email', status: 'active', lastRun: '20 min ago' },
    ],
    agentCount: 3, emailsSent: 1034, qualifyRate: 90, tokenSpend: 1780,
    latency: 10, lastActivity: '4 mins ago',
    cpu: 48, memory: 46, disk: 30, network: 38,
    color: '#22c55e', initials: 'PH',
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
  const avgUptime = stations.reduce((sum, s) => sum + s.uptime, 0) / stations.length;
  return { healthy, warning, critical, totalAgents, totalEmails, totalTokens, avgUptime, total: stations.length };
}
