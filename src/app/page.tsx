'use client';

import { useEffect, useState } from 'react';
import { stations as staticStations, getStationStats } from '@/data/stations';

interface StationMetrics {
  stationId: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  connected: boolean;
  timestamp: string;
  uptime: number;
  containers?: Array<{
    name: string;
    cpuPercent: number;
    memoryPercent: number;
  }>;
  aggregate?: {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
  };
  leads?: {
    total: number;
    qualified: number;
    emailsSent: number;
  };
  agents?: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    lastRun: string;
  }>;
  error?: string;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<StationMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const tasks = [
    'Import Fusion Creative workflows into n8n',
    'Configure Apollo API for lead scraping',
    'Test 5-touch email sequence',
  ];

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data.stations || []);
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    // Poll every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  // Merge static station config with live metrics
  const stationsWithMetrics = staticStations.map(station => {
    const liveMetrics = metrics.find(m => m.stationId === station.id);
    return {
      ...station,
      status: liveMetrics?.status || station.status,
      cpu: liveMetrics?.aggregate?.cpu || station.cpu,
      memory: liveMetrics?.aggregate?.memory || station.memory,
      disk: liveMetrics?.aggregate?.disk || station.disk,
      network: liveMetrics?.aggregate?.network || station.network,
      emailsSent: liveMetrics?.leads?.emailsSent || station.emailsSent,
      agentCount: liveMetrics?.agents?.length || station.agentCount,
      agents: liveMetrics?.agents || station.agents,
      connected: liveMetrics?.connected || false,
      lastActivity: liveMetrics?.timestamp ? 
        new Date(liveMetrics.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + 
        ' ago' : station.lastActivity,
    };
  });

  const sortedStations = [...stationsWithMetrics].sort((a, b) => {
    const order: Record<string, number> = { critical: 0, warning: 1, healthy: 2, offline: 3 };
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
    return a.name.localeCompare(b.name);
  });

  const stats = getStationStats();

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    window.location.href = '/login';
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 40 }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '0 40px' }}>

        {/* ZONE 1 — Personal Command Centre */}
        <div style={{
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          padding: '28px 40px',
          display: 'flex',
          gap: 40,
        }}>
          <div style={{ flex: '0 0 60%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{
                  fontSize: 13,
                  color: 'var(--color-text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: 6,
                }}>{dateStr}</p>
                <h1 style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 20,
                }}>Hey Jay 👋</h1>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  fontSize: 13,
                  color: 'var(--color-text-secondary)',
                  background: 'transparent',
                  border: '1px solid var(--color-border)',
                  padding: '8px 16px',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </div>

            <p style={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-text-secondary)',
              marginBottom: 10,
            }}>YOUR TASKS TODAY</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {tasks.map((task, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 8px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'background 0.1s ease',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-bg)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{
                    width: 16, height: 16,
                    borderRadius: '50%',
                    border: '1.5px solid var(--color-text-tertiary)',
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 14, color: 'var(--color-text-primary)' }}>{task}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <button
              style={{
                background: 'var(--color-accent)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(232,85,60,0.30)',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-accent-hover)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(232,85,60,0.40)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--color-accent)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(232,85,60,0.30)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Show my Tasks
            </button>

            <div style={{ marginTop: 16, textAlign: 'right', width: '100%' }}>
              <p style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-text-secondary)',
                marginBottom: 8,
              }}>MANAGER OS PLATFORM</p>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginBottom: 12 }}>
                <span style={{ 
                  width: 8, height: 8, borderRadius: '50%', 
                  background: loading ? 'var(--color-warning)' : 'var(--color-healthy)' 
                }} />
                <span style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>
                  {loading ? 'Connecting...' : 'All systems operational'}
                </span>
              </div>

              <div style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                Last update: {lastUpdate.toLocaleTimeString('en-GB')}
              </div>
            </div>
          </div>
        </div>

        {/* ZONE 2 — Stats Bar */}
        <div style={{
          marginTop: 32,
          background: 'var(--color-surface)',
          borderRadius: 16,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'stretch',
        }}>
          {[
            { value: stats.totalAgents.toString(), label: 'TOTAL AGENTS ACTIVE', dot: null },
            { value: stats.totalEmails.toLocaleString(), label: 'TOTAL EMAILS SENT', dot: null },
            { value: `${stats.avgUptime.toFixed(1)}%`, label: 'OVERALL UPTIME', dot: null },
            { value: stats.healthy.toString(), label: 'HEALTHY', dot: 'var(--color-healthy)' },
            { value: stats.warning.toString(), label: 'WARNING', dot: 'var(--color-warning)' },
            { value: stats.critical.toString(), label: 'CRITICAL', dot: 'var(--color-critical)', isCritical: true },
          ].map((tile, i) => (
            <div key={i} style={{
              flex: 1,
              padding: '0 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              borderRight: i < 5 ? '1px solid var(--color-border)' : 'none',
              cursor: 'default',
              transition: 'background 0.15s ease',
              borderRadius: 8,
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-bg)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {tile.dot && (
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: tile.dot, flexShrink: 0 }} />
                )}
                <span style={{
                  fontSize: 32, fontWeight: 700, lineHeight: 1,
                  color: tile.isCritical && stats.critical > 0 ? 'var(--color-critical)' : 'var(--color-text-primary)',
                }}>{tile.value}</span>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.08em',
                color: 'var(--color-text-secondary)',
              }}>{tile.label}</span>
            </div>
          ))}
        </div>

        {/* ZONE 3 — Client Stations Grid */}
        <div style={{ marginTop: 32, paddingBottom: 60 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <span style={{ fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-primary)' }}>CLIENT STATIONS</span>
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
              {loading ? 'Updating...' : `Last updated: ${lastUpdate.toLocaleTimeString('en-GB')}`}
            </span>
          </div>

          {loading ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '60px', 
              color: 'var(--color-text-secondary)',
              background: 'var(--color-surface)',
              borderRadius: 16,
            }}>
              Connecting to Fusion Creative Station...
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {sortedStations.map((station) => {
                const statusColor = station.status === 'healthy' ? 'var(--color-healthy)' : 
                                   station.status === 'warning' ? 'var(--color-warning)' : 
                                   'var(--color-critical)';
                const statusBg = station.status === 'healthy' ? 'var(--color-healthy-bg)' : 
                                station.status === 'warning' ? 'var(--color-warning-bg)' : 
                                'var(--color-critical-bg)';
                const statusLabel = station.status.charAt(0).toUpperCase() + station.status.slice(1);

                return (
                  <div key={station.id} style={{
                    background: 'var(--color-surface)', borderRadius: 16,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)',
                    border: '1px solid var(--color-border)',
                    overflow: 'hidden', cursor: 'default',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                  }}
                    onMouseEnter={e => { 
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)'; 
                      e.currentTarget.style.transform = 'translateY(-2px)'; 
                    }}
                    onMouseLeave={e => { 
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)'; 
                      e.currentTarget.style.transform = 'translateY(0)'; 
                    }}
                  >
                    <div style={{ height: 4, background: statusColor, borderRadius: '16px 16px 0 0' }} />
                    <div style={{ padding: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>{station.name}</h3>
                          <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{station.domain}</p>
                          {!station.connected && (
                            <p style={{ fontSize: 11, color: 'var(--color-critical)', marginTop: 4 }}>
                              ⚠ Not connected
                            </p>
                          )}
                        </div>
                        <span style={{ 
                          display: 'inline-flex', alignItems: 'center', gap: 5, 
                          fontSize: 11, fontWeight: 600, textTransform: 'uppercase' as const, 
                          padding: '4px 10px', borderRadius: 20, 
                          background: statusBg, color: statusColor, flexShrink: 0 
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor }} />
                          {statusLabel}
                        </span>
                      </div>
                      <div style={{ height: 1, background: 'var(--color-border)', margin: '16px 0' }} />
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 12px' }}>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                            {station.agentCount}
                          </div>
                          <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--color-text-secondary)', marginTop: 3 }}>
                            Agents Active
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                            {station.emailsSent.toLocaleString()}
                          </div>
                          <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--color-text-secondary)', marginTop: 3 }}>
                            Emails Sent
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                            {station.uptime}%
                          </div>
                          <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--color-text-secondary)', marginTop: 3 }}>
                            Uptime
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                            {station.memory}%
                          </div>
                          <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--color-text-secondary)', marginTop: 3 }}>
                            Memory
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 600, color: station.cpu > 80 ? 'var(--color-critical)' : 'var(--color-text-primary)', lineHeight: 1 }}>
                            {station.cpu}%
                          </div>
                          <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--color-text-secondary)', marginTop: 3 }}>
                            CPU
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: 22, fontWeight: 600, color: station.connected ? 'var(--color-healthy)' : 'var(--color-warning)', lineHeight: 1 }}>
                            {station.lastActivity}
                          </div>
                          <div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--color-text-secondary)', marginTop: 3 }}>
                            Last Active
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
