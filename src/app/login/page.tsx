'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg, #F7F7F5)',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        background: 'var(--color-surface, #FFFFFF)',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '400px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: '#E8553C',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
          }}>M</div>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--color-text-primary, #111)',
            marginBottom: '8px',
          }}>Manager OS</h1>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary, #666)',
          }}>Control Station</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--color-text-secondary, #666)',
              marginBottom: '8px',
            }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                border: '1px solid var(--color-border, #E5E5E5)',
                borderRadius: '8px',
                background: 'var(--color-bg, #F7F7F5)',
                outline: 'none',
              }}
              autoFocus
            />
          </div>

          {error && (
            <div style={{
              padding: '12px',
              background: '#FEE2E2',
              border: '1px solid #FECACA',
              borderRadius: '8px',
              color: '#DC2626',
              fontSize: '14px',
              marginBottom: '20px',
            }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: '#E8553C',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s ease',
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <p style={{
          marginTop: '24px',
          fontSize: '12px',
          color: 'var(--color-text-tertiary, #999)',
          textAlign: 'center',
        }}>
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}
