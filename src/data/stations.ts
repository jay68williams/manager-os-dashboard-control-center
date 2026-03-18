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
  subdomain: string;
  status: StationStatus;
  uptime: number;
  uptimeDays: number;
  agents: Agent[];
  agentCount: number;
  emailsSent: number;
  qualifyRate: number;
  tokenSpend: number;
  lastActivity: string;
  color: string;
  initials: string;
  apiUrl?: string;
}

// Real stations - 9 clients, 12 stations as per spec
export const stations: Station[] = [
  {
    id: 'kingsbrook-01',
    name: 'Kingsbrook M&A',
    subdomain: 'kingsbrook.manageros.co.uk',
    status: 'healthy',
    uptime: 99.9,
    uptimeDays: 30,
    agents: [
      { id: 'kb1', name: 'Lead Qualifier', type: 'lead', status: 'active', lastRun: '2 min ago' },
      { id: 'kb2', name: 'Email Outreach', type: 'email', status: 'active', lastRun: '5 min ago' },
      { id: 'kb3', name: 'Content Writer', type: 'content', status: 'active', lastRun: '12 min ago' },
      { id: 'kb4', name: 'Analytics', type: 'analytics', status: 'idle', lastRun: '1 hour ago' },
    ],
    agentCount: 4,
    emailsSent: 1247,
    qualifyRate: 89,
    tokenSpend: 2340,
    lastActivity: '2 mins ago',
    color: '#10b981',
    initials: 'KB',
  },
  {
    id: 'fusion-01',
    name: 'Fusion Creative',
    subdomain: 'fusion.manageros.co.uk',
    status: 'healthy',
    uptime: 99.7,
    uptimeDays: 30,
    agents: [
      { id: 'fc1', name: 'Apollo Lead Import', type: 'lead', status: 'active', lastRun: '8 min ago' },
      { id: 'fc2', name: 'AI Qualification', type: 'lead', status: 'active', lastRun: '15 min ago' },
      { id: 'fc3', name: '5-Touch Sequence', type: 'email', status: 'active', lastRun: '30 min ago' },
    ],
    agentCount: 3,
    emailsSent: 892,
    qualifyRate: 76,
    tokenSpend: 1680,
    lastActivity: '8 mins ago',
    color: '#8b5cf6',
    initials: 'FC',
    apiUrl: 'http://fusion-creative-01:3001/metrics',
  },
  {
    id: 'newgreek-01',
    name: 'New Greek',
    subdomain: 'newgreek.manageros.co.uk',
    status: 'warning',
    uptime: 98.2,
    uptimeDays: 30,
    agents: [
      { id: 'ng1', name: 'Lead Qualifier', type: 'lead', status: 'active', lastRun: '1 min ago' },
      { id: 'ng2', name: 'Email Outreach', type: 'email', status: 'error', lastRun: '45 min ago' },
    ],
    agentCount: 2,
    emailsSent: 534,
    qualifyRate: 82,
    tokenSpend: 5820, // Warning trigger
    lastActivity: '1 min ago',
    color: '#f59e0b',
    initials: 'NG',
  },
  {
    id: 'sterling-01',
    name: 'Sterling Wealth',
    subdomain: 'sterling.manageros.co.uk',
    status: 'healthy',
    uptime: 99.8,
    uptimeDays: 30,
    agents: [
      { id: 'sw1', name: 'Lead Qualifier', type: 'lead', status: 'active', lastRun: '3 min ago' },
      { id: 'sw2', name: 'Email Outreach', type: 'email', status: 'active', lastRun: '10 min ago' },
      { id: 'sw3', name: 'Report Generator', type: 'report', status: 'idle', lastRun: '2 hours ago' },
      { id: 'sw4', name: 'CRM Sync', type: 'crm', status: 'active', lastRun: '5 min ago' },
      { id: 'sw5', name: 'Compliance Check', type: 'compliance', status: 'active', lastRun: '20 min ago' },
    ],
    agentCount: 5,
    emailsSent: 2103,
    qualifyRate: 91,
    tokenSpend: 3120,
    lastActivity: '3 mins ago',
    color: '#3b82f6',
    initials: 'SW',
  },
  {
    id: 'apex-01',
    name: 'Apex Recruitment',
    subdomain: 'apex.manageros.co.uk',
    status: 'critical',
    uptime: 94.1,
    uptimeDays: 30,
    agents: [
      { id: 'ar1', name: 'Candidate Screener', type: 'lead', status: 'error', lastRun: '3 hrs ago' },
      { id: 'ar2', name: 'Outreach Bot', type: 'email', status: 'error', lastRun: '3 hrs ago' },
      { id: 'ar3', name: 'Interview Scheduler', type: 'scheduler', status: 'active', lastRun: '25 min ago' },
    ],
    agentCount: 3,
    emailsSent: 54,
    qualifyRate: 31,
    tokenSpend: 9100, // Critical trigger
    lastActivity: '3 hrs ago',
    color: '#ef4444',
    initials: 'AR',
  },
  {
    id: 'meridian-01',
    name: 'Meridian Legal',
    subdomain: 'meridian.manageros.co.uk',
    status: 'warning',
    uptime: 97.8,
    uptimeDays: 30,
    agents: [
      { id: 'ml1', name: 'Document Processor', type: 'document', status: 'active', lastRun: '4 min ago' },
      { id: 'ml2', name: 'Email Outreach', type: 'email', status: 'idle', lastRun: '1 hour ago' },
      { id: 'ml3', name: 'Case Tracker', type: 'crm', status: 'error', lastRun: '30 min ago' },
      { id: 'ml4', name: 'Billing Agent', type: 'billing', status: 'active', lastRun: '15 min ago' },
    ],
    agentCount: 4,
    emailsSent: 743,
    qualifyRate: 71,
    tokenSpend: 4820, // Warning trigger
    lastActivity: '4 mins ago',
    color: '#f59e0b',
    initials: 'ML',
  },
  {
    id: 'brightpath-01',
    name: 'BrightPath Education',
    subdomain: 'brightpath.manageros.co.uk',
    status: 'healthy',
    uptime: 99.6,
    uptimeDays: 30,
    agents: [
      { id: 'bp1', name: 'Student Outreach', type: 'email', status: 'active', lastRun: '7 min ago' },
      { id: 'bp2', name: 'Enrollment Tracker', type: 'crm', status: 'active', lastRun: '14 min ago' },
    ],
    agentCount: 2,
    emailsSent: 421,
    qualifyRate: 87,
    tokenSpend: 980,
    lastActivity: '7 mins ago',
    color: '#06b6d4',
    initials: 'BP',
  },
  {
    id: 'nova-01',
    name: 'Nova Digital',
    subdomain: 'nova.manageros.co.uk',
    status: 'healthy',
    uptime: 99.9,
    uptimeDays: 30,
    agents: [
      { id: 'nd1', name: 'SEO Analyzer', type: 'analytics', status: 'active', lastRun: '1 min ago' },
      { id: 'nd2', name: 'Content Generator', type: 'content', status: 'active', lastRun: '9 min ago' },
      { id: 'nd3', name: 'Social Scheduler', type: 'social', status: 'active', lastRun: '18 min ago' },
      { id: 'nd4', name: 'PPC Optimizer', type: 'analytics', status: 'active', lastRun: '22 min ago' },
      { id: 'nd5', name: 'Report Builder', type: 'report', status: 'idle', lastRun: '3 hours ago' },
      { id: 'nd6', name: 'Email Outreach', type: 'email', status: 'active', lastRun: '5 min ago' },
    ],
    agentCount: 6,
    emailsSent: 3201,
    qualifyRate: 93,
    tokenSpend: 2890,
    lastActivity: '1 min ago',
    color: '#a855f7',
    initials: 'ND',
  },
  {
    id: 'cascade-01',
    name: 'Cascade Properties',
    subdomain: 'cascade.manageros.co.uk',
    status: 'healthy',
    uptime: 99.4,
    uptimeDays: 30,
    agents: [
      { id: 'cp1', name: 'Listing Scanner', type: 'lead', status: 'active', lastRun: '11 min ago' },
      { id: 'cp2', name: 'Email Outreach', type: 'email', status: 'active', lastRun: '20 min ago' },
      { id: 'cp3', name: 'Valuation Bot', type: 'analytics', status: 'active', lastRun: '35 min ago' },
    ],
    agentCount: 3,
    emailsSent: 956,
    qualifyRate: 79,
    tokenSpend: 1540,
    lastActivity: '11 mins ago',
    color: '#14b8a6',
    initials: 'CP',
  },
  {
    id: 'ironclad-01',
    name: 'Ironclad Security',
    subdomain: 'ironclad.manageros.co.uk',
    status: 'healthy',
    uptime: 99.95,
    uptimeDays: 30,
    agents: [
      { id: 'is1', name: 'Threat Monitor', type: 'analytics', status: 'active', lastRun: '30 sec ago' },
      { id: 'is2', name: 'Email Outreach', type: 'email', status: 'active', lastRun: '8 min ago' },
      { id: 'is3', name: 'Compliance Auditor', type: 'compliance', status: 'active', lastRun: '15 min ago' },
      { id: 'is4', name: 'Incident Reporter', type: 'report', status: 'idle', lastRun: '2 hours ago' },
    ],
    agentCount: 4,
    emailsSent: 1890,
    qualifyRate: 88,
    tokenSpend: 2210,
    lastActivity: '30 secs ago',
    color: '#ef4444',
    initials: 'IS',
  },
  {
    id: 'zenith-01',
    name: 'Zenith Consulting',
    subdomain: 'zenith.manageros.co.uk',
    status: 'healthy',
    uptime: 99.3,
    uptimeDays: 30,
    agents: [
      { id: 'zc1', name: 'Lead Qualifier', type: 'lead', status: 'active', lastRun: '9 min ago' },
      { id: 'zc2', name: 'Proposal Writer', type: 'content', status: 'active', lastRun: '25 min ago' },
    ],
    agentCount: 2,
    emailsSent: 612,
    qualifyRate: 85,
    tokenSpend: 1120,
    lastActivity: '9 mins ago',
    color: '#f97316',
    initials: 'ZC',
  },
  {
    id: 'praxis-01',
    name: 'Praxis Health',
    subdomain: 'praxis.manageros.co.uk',
    status: 'healthy',
    uptime: 99.7,
    uptimeDays: 30,
    agents: [
      { id: 'ph1', name: 'Patient Outreach', type: 'email', status: 'active', lastRun: '4 min ago' },
      { id: 'ph2', name: 'Booking Agent', type: 'scheduler', status: 'active', lastRun: '12 min ago' },
      { id: 'ph3', name: 'Follow-up Bot', type: 'email', status: 'active', lastRun: '20 min ago' },
    ],
    agentCount: 3,
    emailsSent: 1034,
    qualifyRate: 90,
    tokenSpend: 1780,
    lastActivity: '4 mins ago',
    color: '#22c55e',
    initials: 'PH',
  },
];

export function getStation(id: string): Station | undefined {
  return stations.find(s => s.id === id);
}

export function getStationStats() {
  const healthy = stations.filter(s => s.status === 'healthy').length;
  const warning = stations.filter(s => s.status === 'warning').length;
  const critical = stations.filter(s => s.status === 'critical').length;
  const offline = stations.filter(s => s.status === 'offline').length;
  const totalAgents = stations.reduce((sum, s) => sum + s.agentCount, 0);
  const totalEmails = stations.reduce((sum, s) => sum + s.emailsSent, 0);
  const totalTokens = stations.reduce((sum, s) => sum + s.tokenSpend, 0);
  const avgUptime = stations.reduce((sum, s) => sum + s.uptime, 0) / stations.length;
  return { healthy, warning, critical, offline, totalAgents, totalEmails, totalTokens, avgUptime, total: stations.length };
}
