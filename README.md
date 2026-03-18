# Manager OS Dashboard Control Center

Operator-level command centre for monitoring all client Manager OS deployments from a single screen.

## Tech Stack

- **Next.js 15** + **React 19**
- **Tailwind CSS 4**
- **TypeScript**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Dashboard Layout

### Zone 1 — Personal Command Centre
Greeting, date, daily tasks, coral CTA, platform status panel

### Zone 2 — System-Wide Stats Bar
6 KPI tiles: Agents Active, Emails Sent, Uptime, Healthy/Warning/Critical counts

### Zone 3 — Client Stations Grid
Cards sorted critical-first, each showing:
- Client name + subdomain
- Status badge (Healthy/Warning/Critical)
- 6 metrics: Agents, Emails, Uptime, Qualify, Token Spend, Last Active
- Colour-coded token spend and last active values
- 4px status accent bar at top

## Design System

| Token | Value |
|---|---|
| Background | `#F7F7F5` |
| Surface | `#FFFFFF` |
| Accent (coral) | `#E8553C` |
| Healthy | `#27AE60` |
| Warning | `#F2994A` |
| Critical | `#E8553C` |
| Font | Inter |
