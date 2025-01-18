import { Theme } from './types';

export const themes: Theme[] = [
  {
    id: 'playful',
    name: 'Playful',
    bgColor: 'bg-gradient-to-br from-pink-100 to-purple-100',
    textColor: 'text-purple-900',
    accentColor: 'bg-purple-500',
    secondaryColor: 'bg-pink-200'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    bgColor: 'bg-gradient-to-br from-orange-100 to-rose-100',
    textColor: 'text-orange-900',
    accentColor: 'bg-orange-500',
    secondaryColor: 'bg-rose-200'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    bgColor: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    textColor: 'text-blue-900',
    accentColor: 'bg-blue-500',
    secondaryColor: 'bg-cyan-200'
  },
  {
    id: 'forest',
    name: 'Forest',
    bgColor: 'bg-gradient-to-br from-emerald-100 to-lime-100',
    textColor: 'text-emerald-900',
    accentColor: 'bg-emerald-500',
    secondaryColor: 'bg-lime-200'
  }
];