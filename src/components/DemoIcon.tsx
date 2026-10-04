const paths = {
  calendar: 'M3 5h14v12H3zM3 9h14M7 3v4M13 3v4',
  inbox: 'M3 8l2-5h10l2 5v8H3zM3 9h4l1.5 3h3L13 9h4',
  tasks: 'M3 5l1.5 1.5L7 4M3 11l1.5 1.5L7 10M10 5h7M10 11h7M10 16h7',
  folder: 'M2.5 5.5h5l1.5 2h8.5v9h-15z',
  note: 'M5 2.5h7l3 3v12H5zM12 2.5v4h3M8 10h4M8 13h4',
  chevron: 'M6 8l4 4 4-4',
  back: 'M12 5l-5 5 5 5',
  plus: 'M10 4v12M4 10h12',
  sparkle: 'M10 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2z',
  more: 'M4 10h.01M10 10h.01M16 10h.01',
  check: 'M4 10l4 4 8-8',
  capture: 'M10 3v10M6.5 9.5L10 13l3.5-3.5M3 12v5h14v-5',
  clock: 'M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14M10 6v4l3 2',
  branch: 'M6 3v14M14 3v5c0 4-8 2-8 7M12 3h4',
} as const

export function DemoIcon({ name, size = 16, className = '' }: { name: keyof typeof paths; size?: number; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`shrink-0 ${className}`}><path d={paths[name]} /></svg>
}
