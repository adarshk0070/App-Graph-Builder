export const SERVICE_ICONS: Record<string, string> = {
  app: '🚀',
  mongodb: '🍃',
  redis: '🔴',
  postgresql: '🐘',
};

export const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  healthy: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  degraded: { bg: 'bg-amber-500/15', text: 'text-amber-400', dot: 'bg-amber-400' },
  down: { bg: 'bg-red-500/15', text: 'text-red-400', dot: 'bg-red-400' },
};

export const PROVIDER_LABELS: Record<string, string> = {
  AWS: 'AWS',
  GCP: 'GCP',
  Azure: 'Azure',
};
