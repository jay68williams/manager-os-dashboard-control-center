'use client';

import { stations, getStationStats } from '@/data/stations';

export default function DashboardPage() {
  const stats = getStationStats();
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  const tasks = [
    'Review Acme onboarding script',
    'Check webhook for TalentFlow',
    'Send monthly report to RetailCo',
  ];

  const automations = [
    { name: 'Email routing agent', status: 'Active' },
    { name: 'Client onboarding flow', status: 'Active' },
    { name: 'Token usage monitor', status: 'Elevated' },
  ];

  const sortedStations = [...stations].sort((a, b) => {
    const order: Record<string, number> = { critical: 0, warning: 1, healthy: 2, offline: 3 };
    if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
    return a.name.localeCompare(b.name);
  });

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
            }}>Hey Jay \ud83d\udc4b</h1>

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
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-healthy)' }} />
                <span style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>All systems operational</span>
              </div>

              <div style={{ background: 'var(--color-bg)', borderRadius: 8, padding: 10 }}>
                {automations.map((auto, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '3px 0',
                    fontSize: 12,
                    marginBottom: i < automations.length - 1 ? 6 : 0,
                  }}>
                    <span style={{ color: 'var(--color-text-primary)' }}>\u2713 {auto.name}</span>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: 5,
                      color: auto.status === 'Active' ? 'var(--color-healthy)' :
                             auto.status === 'Elevated' ? 'var(--color-warning)' : 'var(--color-text-secondary)',
                    }}>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: auto.status === 'Active' ? 'var(--color-healthy)' :
                                    auto.status === 'Elevated' ? 'var(--color-warning)' : 'var(--color-text-tertiary)',
                      }} />
                      {auto.status === 'Elevated' ? '\u26a0 Elevated' : `\u25cf ${auto.status}`}
                    </span>
                  </div>
                ))}
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
            <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>Last updated: 2 mins ago</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {sortedStations.map((station) => {
              const statusColor = station.status === 'healthy' ? 'var(--color-healthy)' : station.status === 'warning' ? 'var(--color-warning)' : 'var(--color-critical)';
              const statusBg = station.status === 'healthy' ? 'var(--color-healthy-bg)' : station.status === 'warning' ? 'var(--color-warning-bg)' : 'var(--color-critical-bg)';
              const statusLabel = station.status.charAt(0).toUpperCase() + station.status.slice(1);
              const tokenColor = station.tokenSpend > 7000 ? 'var(--color-critical)' : station.tokenSpend > 4000 ? 'var(--color-warning)' : 'var(--color-text-primary)';
              const lastActiveColor = station.lastActivity.includes('sec') || station.lastActivity.includes('min') ? 'var(--color-healthy)' : station.lastActivity.includes('hr') ? 'var(--color-warning)' : 'var(--color-text-secondary)';

              return (
                <div key={station.id} style={{
                  background: 'var(--color-surface)', borderRadius: 16,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)',
                  border: '1px solid var(--color-border)',
                  overflow: 'hidden', cursor: 'default',
                  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ height: 4, background: statusColor, borderRadius: '16px 16px 0 0' }} />
                  <div style={{ padding: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 170 }}>{station.name}</h3>
                        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{station.domain}</p>
                      </div>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, textTransform: 'uppercase' as const, padding: '4px 10px', borderRadius: 20, background: statusBg, color: statusColor, flexShrink: 0 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusColor }} />
                        {statusLabel}
                      </span>
                    </div>
                    <div style={{ height: 1, background: 'var(--color-border)', margin: '16px 0' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 12px' }}>
                      <div><div style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1 }}>{station.agentCount}</div><div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--color-text-secondary)', marginTop: 3 }}>Agents Active</div></div>
                      <div><div style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1 }}>{station.emailsSent.toLocaleString()}</div><div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--color-text-secondary)', marginTop: 3 }}>Emails Sent</div></div>
                      <div><div style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1 }}>{station.uptime}%</div><div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--color-text-secondary)', marginTop: 3 }}>Uptime</div></div>
                      <div><div style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', lineHeight: 1 }}>{station.qualifyRate}%</div><div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--color-text-secondary)', marginTop: 3 }}>Qualify</div></div>
                      <div><div style={{ fontSize: 22, fontWeight: 600, color: tokenColor, lineHeight: 1 }}>{station.tokenSpend.toLocaleString()}</div><div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--color-text-secondary)', marginTop: 3 }}>Token Spend</div></div>
                      <div><div style={{ fontSize: 22, fontWeight: 600, color: lastActiveColor, lineHeight: 1 }}>{station.lastActivity}</div><div style={{ fontSize: 10, fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.07em', color: 'var(--color-text-secondary)', marginTop: 3 }}>Last Active</div></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
