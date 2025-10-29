import { create } from 'zustand';
import salesData from '../sales.json';
import { CATEGORIES_LABELS } from '@/constants/Calendar';

export interface SaleItem {
  Datum: string;
  Preis: number;
  Produktname: string;
  Produktkategorie: string;
}

export type PeriodId = 'today' | '1day' | '1week' | '1month' | 'all';

export interface StoreState {
  modalVisible: boolean;

  sales: SaleItem[];

  selectedDate: Date;
  selectedPeriod: PeriodId;
  dateRange: {
    start: Date;
    end: Date;
  };

  selectedCategory: typeof CATEGORIES_LABELS[number] | null;
  categories: string[];

  setModalVisible: (visible: boolean) => void;

  setSelectedDate: (date: Date) => void;
  setSelectedPeriod: (period: PeriodId) => void;
  setDateRange: (start: Date, end: Date) => void;
  setSelectedCategory: (category: string | null) => void;

  getFilteredSales: () => SaleItem[];
  getSalesByDate: (date: Date) => SaleItem[];
  getSalesByCategory: (category: string) => SaleItem[];
  getSalesByPeriod: (period: PeriodId, baseDate: Date) => SaleItem[];
  getTotalSalesByCategory: () => Record<string, number>;
  getTotalSalesForDate: (date: Date) => number;
  getTotalSalesForDateRange: () => number;
  getSalesForDateRange: () => SaleItem[];
}

export const useSalesStore = create<StoreState>((set, get) => {
  const uniqueCategories = Array.from(
    new Set(salesData.map((sale) => sale.Produktkategorie))
  );

  const dates = salesData.map((sale) => new Date(sale.Datum));
  const minDate = new Date(Math.min(...dates.map((d) => d.getTime())));
  const maxDate = new Date(Math.max(...dates.map((d) => d.getTime())));

  return {
    sales: salesData as SaleItem[],
    selectedDate: new Date('2024-10-30'),
    selectedPeriod: '1week',
    dateRange: {
      start: minDate,
      end: maxDate,
    },
    selectedCategory: null,
    categories: uniqueCategories,

    modalVisible: false,
    setModalVisible: (visible: boolean) => set({ modalVisible: visible }),

    setSelectedDate: (date: Date) => set({ selectedDate: date }),

    setSelectedPeriod: (period: PeriodId) => set({ selectedPeriod: period }),

    setDateRange: (start: Date, end: Date) =>
      set({ dateRange: { start, end } }),

    setSelectedCategory: (category: string | null) =>
      set({ selectedCategory: category }),

    // Computed getters
    getFilteredSales: () => {
      const state = get();
      let filtered = state.sales;

      if (state.selectedCategory) {
        filtered = filtered.filter(
          (sale) => sale.Produktkategorie === state.selectedCategory
        );
      }

      filtered = filtered.filter((sale) => {
        const saleDate = new Date(sale.Datum);
        return (
          saleDate >= state.dateRange.start &&
          saleDate <= state.dateRange.end
        );
      });

      return filtered;
    },

    getSalesByDate: (date: Date) => {
      const state = get();
      const dateString = date.toISOString().split('T')[0];
      return state.sales.filter((sale) => sale.Datum === dateString);
    },

    getSalesByCategory: (category: string) => {
      const state = get();
      return state.sales.filter(
        (sale) => sale.Produktkategorie === category
      );
    },

    getSalesByPeriod: (period: PeriodId, baseDate: Date) => {
      const state = get();
      const today = new Date('2024-10-29');
      let start: Date;
      let end: Date;

      switch (period) {
        case 'today':
          start = new Date(today);
          start.setHours(0, 0, 0, 0);
          end = new Date(today);
          end.setDate(end.getDate() + 1);
          end.setHours(0, 0, 0, 0);
          break;
        case '1day':
          end = new Date(baseDate);
          end.setHours(0, 0, 0, 0);
          start = new Date(end);
          start.setDate(start.getDate() - 1);
          break;
        case '1week':
          end = new Date(baseDate);
          end.setHours(0, 0, 0, 0);
          start = new Date(end);
          start.setDate(start.getDate() - 6);
          break;
        case '1month':
          end = new Date(baseDate);
          end.setHours(0, 0, 0, 0);
          start = new Date(end);
          start.setDate(start.getDate() - 29);
          break;
        case 'all':
          start = new Date(2024, 9, 1); // October 1, 2024
          end = new Date(2024, 10, 15); // November 15, 2024
          break;
        default:
          start = new Date(baseDate);
          end = new Date(baseDate);
      }

      const startStr = start.toISOString().split('T')[0];
      const endStr = end.toISOString().split('T')[0];

      return state.sales.filter((sale) => {
        return sale.Datum >= startStr && sale.Datum <= endStr;
      });
    },

    getTotalSalesByCategory: () => {
      const state = get();
      const filtered = state.getFilteredSales();

      return filtered.reduce((acc, sale) => {
        const category = sale.Produktkategorie;
        acc[category] = (acc[category] || 0) + sale.Preis;
        return acc;
      }, {} as Record<string, number>);
    },

    getTotalSalesForDate: (date: Date) => {
      const state = get();
      const salesForDate = state.getSalesByDate(date);
      return salesForDate.reduce((sum, sale) => sum + sale.Preis, 0);
    },

    getTotalSalesForDateRange: () => {
      const state = get();
      const filtered = state.getFilteredSales();
      return filtered.reduce((sum, sale) => sum + sale.Preis, 0);
    },

    getSalesForDateRange: () => {
      const state = get();
      return state.getFilteredSales();
    },
  };
});
