import { create } from 'zustand'
import { breakdown, createGraphPoints, dates, ITimeframes, timeframes } from './data';

interface AppState {
  activeDay: Date,
  setActiveDay: (date: Date) => void,
  dates: Date[],
  lineGraphData: { value: number; }[],
  setLineGraphData: () => void,
  timeframes: ITimeframes[],
  breakdown: string[],
}

const useAppStore = create<AppState>((set) => ({
  activeDay: new Date(),
  setActiveDay: (date: Date) => set((state: AppState) => ({ ...state, activeDay: date })),
  dates: dates(),
  lineGraphData: createGraphPoints(),
  setLineGraphData: () => set((state: AppState) => ({ ...state, lineGraphData: createGraphPoints() })),
  timeframes: timeframes,
  breakdown: breakdown,
}));

export default useAppStore;