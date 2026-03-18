import { NextRequest, NextResponse } from 'next/server';

// Station API endpoints (via Tailscale)
const STATIONS = {
  'fusion-01': {
    name: 'Fusion Creative',
    apiUrl: 'http://100.64.0.1:3001/metrics', // Will be replaced with actual Tailscale IP
    fallbackUrl: 'http://fusion-creative-01:3001/metrics', // Internal Tailscale DNS
  },
};

async function fetchStationMetrics(stationId: string) {
  const station = STATIONS[stationId as keyof typeof STATIONS];
  if (!station) {
    return { error: 'Station not found' };
  }

  try {
    // Try to fetch from the station's metrics API
    // Note: This requires the Control Station to be on the same Tailscale network
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(station.apiUrl, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    }).catch(async () => {
      // Try fallback URL
      return fetch(station.fallbackUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      ...data,
      stationId,
      name: station.name,
      connected: true,
      lastUpdate: new Date().toISOString(),
    };
  } catch (error) {
    console.error(`Failed to fetch metrics for ${stationId}:`, error);
    return {
      stationId,
      name: station.name,
      connected: false,
      status: 'offline',
      error: error instanceof Error ? error.message : 'Connection failed',
      lastUpdate: new Date().toISOString(),
    };
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const stationId = searchParams.get('station');

  if (stationId) {
    const metrics = await fetchStationMetrics(stationId);
    return NextResponse.json(metrics);
  }

  // Fetch all stations
  const allMetrics = await Promise.all(
    Object.keys(STATIONS).map(id => fetchStationMetrics(id))
  );

  return NextResponse.json({
    stations: allMetrics,
    timestamp: new Date().toISOString(),
  });
}
