'use client';

import { useEffect, useState } from 'react';
import { stations as staticStations, getStationStats } from '@/data/stations';

interface StationMetrics {
  stationId: string;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  timestamp: string;
  connected: boolean;
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<StationMetrics[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  const dayNumber = today.getDate();

  // Tasks for Jay
  const tasks = [
    'Review Fusion Creative n8n workflows',
    'Check Apollo API connection status',
    'Follow up with Kingsbrook M&A report',
    'Update New Greek email sequences',
  ];

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Fetch metrics (simulated for now)
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // In production, this would fetch from the actual API
        const simulatedMetrics = staticStations.map(s => ({
          stationId: s.id,
          status: s.status,
          timestamp: new Date().toISOString(),
          connected: s.status !== 'offline',
        }));
        setMetrics(simulatedMetrics);
        setLastUpdate(new Date());
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  // Merge static config with live metrics
  const stationsWithMetrics = staticStations.map(station => {
    const liveMetrics = metrics.find(m => m.stationId === station.id);
    return {
      ...station,
      connected: liveMetrics?.connected ?? true,
      lastActivity: liveMetrics?.timestamp 
        ? new Date(liveMetrics.timestamp).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
        : station.lastActivity,
    };
  });

  // Sort: Critical first, then Warning, then Healthy
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

  // Status colors
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return '#22c55e';
      case 'warning': return '#f59e0b';
      case 'critical': return '#E8553C';
      default: return '#9ca3af';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'healthy': return 'rgba(34, 197, 94, 0.1)';
      case 'warning': return 'rgba(245, 158, 11, 0.1)';
      case 'critical': return 'rgba(232, 85, 60, 0.1)';
      default: return 'rgba(156, 163, 175, 0.1)';
    }
  };

  return (
    <div style={{ 
      background: '#F9F9F9', 
      minHeight: '100vh',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    }}>
      {/* Header */}
      <header style={{
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36,
            height: 36,
            background: '#1A1A1A',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 700,
            fontSize: 16,
          }}>M</div>
          <span style={{ fontWeight: 600, fontSize: 16, color: '#1A1A1A' }}>Manager OS</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 14, color: '#666' }}>
            {currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            onClick={handleLogout}
            style={{
              fontSize: 13,
              color: '#666',
              background: 'transparent',
              border: '1px solid rgba(0,0,0,0.1)',
              padding: '8px 16px',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '32px 40px' }}>

        {/* ZONE 1 — Personal Command Centre */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          padding: '32px',
          marginBottom: 24,
        }}>
          <div style={{ display: 'flex', gap: 40 }}>
            {/* Left side - Date and Greeting */}
            <div style={{ flex: '0 0 300px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}>
                <div style={{
                  fontSize: 72,
                  fontWeight: 700,
                  color: '#1A1A1A',
                  lineHeight: 1,
                  letterSpacing: '-2px',
                }}>{dayNumber}</div>
                <div style={{ paddingTop: 12 }}>
                  <p style={{
                    fontSize: 13,
                    color: '#666',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: 4,
                  }}>{today.toLocaleDateString('en-GB', { weekday: 'long' })}</p>
                  <p style={{
                    fontSize: 13,
                    color: '#999',
                  }}>{today.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              
              <h1 style={{
                fontSize: 32,
                fontWeight: 600,
                color: '#1A1A1A',
                marginTop: 24,
                marginBottom: 8,
              }}>Hey Jay 👋</h1>
              <p style={{ fontSize: 14, color: '#666' }}>Here's what's happening today</p>
            </div>

            {/* Middle - Tasks */}
            <div style={{ flex: 1 }}>
              <p style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#999',
                marginBottom: 16,
              }}>Your Tasks Today</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {tasks.map((task, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 16px',
                    borderRadius: 10,
                    background: '#F9F9F9',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#F0F0F0';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#F9F9F9';
                    }}
                  >
                    <span style={{
                      width: 18, height: 18,
                      borderRadius: '50%',
                      border: '2px solid #ddd',
                      flexShrink: 0,
                    }} />
                    <span style={{ fontSize: 14, color: '#333' }}>{task}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - CTA and System Status */}
            <div style={{ flex: '0 0 280px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <button
                style={{
                  background: '#E8553C',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 600,
                  padding: '14px 28px',
                  borderRadius: 10,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(232,85,60,0.30)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(232,85,60,0.40)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(232,85,60,0.30)';
                }}
              >
                Show my Tasks
              </button>

              <div style={{ marginTop: 24, textAlign: 'right', width: '100%' }}>
                <p style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#999',
                  marginBottom: 12,
                }}>Manager OS Platform</p>

                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'flex-end', 
                  gap: 8, 
                  marginBottom: 8,
                }}>
                  <span style={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    background: loading ? '#f59e0b' : '#22c55e',
                    animation: loading ? 'pulse 1.5s infinite' : 'none',
                  }} />
                  <span style={{ fontSize: 14, color: '#333' }}>
                    {loading ? 'Connecting...' : 'All systems operational'}
                  </span>
                </div>

                <p style={{ fontSize: 12, color: '#999' }}>
                  Last updated: {lastUpdate.toLocaleTimeString('en-GB')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ZONE 2 — Stats Bar */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          padding: '24px 32px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'stretch',
        }}>
          {[
            { value: stats.totalAgents.toString(), label: 'Total Agents Active', dot: null },
            { value: stats.totalEmails.toLocaleString(), label: 'Total Emails Sent', dot: null },
            { value: `${stats.avgUptime.toFixed(1)}%`, label: 'Overall Uptime', dot: null },
            { value: stats.healthy.toString(), label: 'Healthy', dot: '#22c55e' },
            { value: stats.warning.toString(), label: 'Warning', dot: '#f59e0b' },
            { value: stats.critical.toString(), label: 'Critical', dot: '#E8553C', isCritical: true },
          ].map((tile, i) => (
            <div key={i} style={{
              flex: 1,
              padding: '0 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              borderRight: i < 5 ? '1px solid rgba(0,0,0,0.06)' : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                {tile.dot && (
                  <span style={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: '50%', 
                    background: tile.dot, 
                    flexShrink: 0 
                  }} />
                )}
                <span style={{
                  fontSize: 32, 
                  fontWeight: 700, 
                  lineHeight: 1,
                  color: tile.isCritical && stats.critical > 0 ? '#E8553C' : '#1A1A1A',
                }}>{tile.value}</span>
              </div>
              <span style={{
                fontSize: 11, 
                fontWeight: 600,
                textTransform: 'uppercase', 
                letterSpacing: '0.06em',
                color: '#999',
              }}>{tile.label}</span>
            </div>
          ))}
        </div>

        {/* ZONE 3 — Client Stations Grid */}
        <div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            marginBottom: 20,
          }}>
            <h2 style={{ 
              fontSize: 13, 
              fontWeight: 600, 
              textTransform: 'uppercase', 
              letterSpacing: '0.06em', 
              color: '#1A1A1A',
            }}>Client Stations</h2>
            <span style={{ fontSize: 13, color: '#999' }}>
              {loading ? 'Updating...' : `Last updated: ${lastUpdate.toLocaleTimeString('en-GB')}`}
            </span>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: 20,
          }}>
            {sortedStations.map((station) => {
              const statusColor = getStatusColor(station.status);
              const statusBg = getStatusBg(station.status);
              const statusLabel = station.status.charAt(0).toUpperCase() + station.status.slice(1);
              const tokenColor = station.tokenSpend > 7000 ? '#E8553C' : 
                                station.tokenSpend > 4000 ? '#f59e0b' : '#1A1A1A';

              return (
                <div key={station.id} style={{
                  background: '#FFFFFF', 
                  borderRadius: 16,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.10)'; 
                    e.currentTarget.style.transform = 'translateY(-2px)'; 
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; 
                    e.currentTarget.style.transform = 'translateY(0)'; 
                  }}
                >
                  {/* Status bar at top */}
                  <div style={{ 
                    height: 4, 
                    background: statusColor,
                  }} />
                  
                  <div style={{ padding: 20 }}>
                    {/* Header */}
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      marginBottom: 16,
                    }}>
                      <div>
                        <h3 style={{ 
                          fontSize: 16, 
                          fontWeight: 600, 
                          color: '#1A1A1A',
                          marginBottom: 4,
                        }}>{station.name}</h3>
                        <p style={{ 
                          fontSize: 12, 
                          color: '#999',
                        }}>{station.subdomain}</p>
                      </div>
                      <span style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: 5, 
                        fontSize: 11, 
                        fontWeight: 600, 
                        textTransform: 'uppercase' as const, 
                        padding: '4px 10px', 
                        borderRadius: 20, 
                        background: statusBg, 
                        color: statusColor,
                      }}>
                        <span style={{
                          width: 6, 
                          height: 6, 
                          borderRadius: '50%', 
                          background: statusColor,
                        }} />
                        {statusLabel}
                      </span>
                    </div>

                    {/* Divider */}
                    <div style={{ 
                      height: 1, 
                      background: 'rgba(0,0,0,0.06)', 
                      margin: '16px 0',
                    }} />

                    {/* Metrics Grid */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr', 
                      gap: '16px 12px',
                    }}>
                      <div>
                        <div style={{ 
                          fontSize: 24, 
                          fontWeight: 700, 
                          color: '#1A1A1A', 
                          lineHeight: 1,
                          marginBottom: 4,
                        }}>{station.agentCount}</div>
                        <div style={{ 
                          fontSize: 10, 
                          fontWeight: 500, 
                          textTransform: 'uppercase' as const, 
                          letterSpacing: '0.06em', 
                          color: '#999',
                        }}>Agents Active</div>
                      </div>

                      <div>
                        <div style={{ 
                          fontSize: 24, 
                          fontWeight: 700, 
                          color: '#1A1A1A', 
                          lineHeight: 1,
                          marginBottom: 4,
                        }}>{station.emailsSent.toLocaleString()}</div>
                        <div style={{ 
                          fontSize: 10, 
                          fontWeight: 500, 
                          textTransform: 'uppercase' as const, 
                          letterSpacing: '0.06em', 
                          color: '#999',
                        }}>Emails Sent</div>
                      </div>

                      <div>
                        <div style={{ 
                          fontSize: 24, 
                          fontWeight: 700, 
                          color: '#1A1A1A', 
                          lineHeight: 1,
                          marginBottom: 4,
                        }}>{station.uptime}%</div>
                        <div style={{ 
                          fontSize: 10, 
                          fontWeight: 500, 
                          textTransform: 'uppercase' as const, 
                          letterSpacing: '0.06em', 
                          color: '#999',
                        }}>Uptime</div>
                      </div>

                      <div>
                        <div style={{ 
                          fontSize: 24, 
                          fontWeight: 700, 
                          color: '#1A1A1A', 
                          lineHeight: 1,
                          marginBottom: 4,
                        }}>{station.qualifyRate}%</div>
                        <div style={{ 
                          fontSize: 10, 
                          fontWeight: 500, 
                          textTransform: 'uppercase' as const, 
                          letterSpacing: '0.06em', 
                          color: '#999',
                        }}>Qualify Rate</div>
                      </div>

                      <div>
                        <div style={{ 
                          fontSize: 24, 
                          fontWeight: 700, 
                          color: tokenColor, 
                          lineHeight: 1,
                          marginBottom: 4,
                        }}>{station.tokenSpend.toLocaleString()}</div>
                        <div style={{ 
                          fontSize: 10, 
                          fontWeight: 500, 
                          textTransform: 'uppercase' as const, 
                          letterSpacing: '0.06em', 
                          color: '#999',
                        }}>Token Spend</div>
                      </div>

                      <div>
                        <div style={{ 
                          fontSize: 24, 
                          fontWeight: 700, 
                          color: station.status === 'healthy' ? '#22c55e' : 
                                 station.status === 'warning' ? '#f59e0b' : '#E8553C', 
                          lineHeight: 1,
                          marginBottom: 4,
                        }}>{station.lastActivity}</div>
                        <div style={{ 
                          fontSize: 10, 
                          fontWeight: 500, 
                          textTransform: 'uppercase' as const, 
                          letterSpacing: '0.06em', 
                          color: '#999',
                        }}>Last Active</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
