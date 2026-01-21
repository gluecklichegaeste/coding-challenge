import { useMemo } from 'react';
import moment from 'moment';
import salesData from '../../sales.json';
import { RangeType } from '../types';

type SaleItem = {
    Datum: string;
    Preis: number;
    Produktname: string;
    Produktkategorie: string;
};

type CategoryTotal = {
    category: string;
    total: number;
    color: string;
};

type DailySales = {
    date: string;
    total: number;
};

const CATEGORY_COLORS: Record<string, string> = {
    'Pflegeprodukte': '#9B59B6',
    'Nahrungsmittel': '#27AE60',
    'Tierprodukte': '#4A90D9',
};

export const useSalesData = (selectedDate: moment.Moment, rangeType: RangeType = 'today') => {
    const data = salesData as SaleItem[];

    // Calculate date range based on rangeType
    const dateRange = useMemo(() => {
        const endDate = selectedDate.clone().endOf('day');
        let startDate: moment.Moment;

        switch (rangeType) {
            case 'today':
                startDate = selectedDate.clone().startOf('day');
                break;
            case '3d':
                startDate = selectedDate.clone().subtract(2, 'days').startOf('day');
                break;
            case '1w':
                startDate = selectedDate.clone().subtract(6, 'days').startOf('day');
                break;
            case '1m':
                startDate = selectedDate.clone().subtract(29, 'days').startOf('day');
                break;
            case 'all':
            default:
                startDate = moment('2024-10-01');
                break;
        }

        return { startDate, endDate };
    }, [selectedDate, rangeType]);

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const itemDate = moment(item.Datum);
            return itemDate.isSameOrAfter(dateRange.startDate, 'day') &&
                itemDate.isSameOrBefore(dateRange.endDate, 'day');
        });
    }, [data, dateRange]);

    const categoryTotals = useMemo((): CategoryTotal[] => {
        const totals: Record<string, number> = {};

        filteredData.forEach(item => {
            if (!totals[item.Produktkategorie]) {
                totals[item.Produktkategorie] = 0;
            }
            totals[item.Produktkategorie] += item.Preis;
        });

        return Object.entries(totals).map(([category, total]) => ({
            category,
            total: Math.round(total * 100) / 100,
            color: CATEGORY_COLORS[category] || '#888888',
        }));
    }, [filteredData]);

    const dailySales = useMemo((): DailySales[] => {
        const salesByDay: Record<string, number> = {};

        filteredData.forEach(item => {
            if (!salesByDay[item.Datum]) {
                salesByDay[item.Datum] = 0;
            }
            salesByDay[item.Datum] += item.Preis;
        });

        return Object.entries(salesByDay)
            .map(([date, total]) => ({
                date,
                total: Math.round(total * 100) / 100,
            }))
            .sort((a, b) => a.date.localeCompare(b.date));
    }, [filteredData]);

    const donutChartData = useMemo(() => {
        return categoryTotals.map(item => ({
            value: item.total,
            color: item.color,
            label: item.category,
        }));
    }, [categoryTotals]);

    const lineChartData = useMemo(() => {
        // For "today", show cumulative sales progression
        if (rangeType === 'today') {
            let cumulativeTotal = 0;
            return filteredData.map((item, index) => {
                cumulativeTotal += item.Preis;
                return {
                    value: Math.round(cumulativeTotal * 100) / 100,
                    label: `${index + 1}`,
                    date: item.Datum,
                };
            });
        }

        // For other ranges, show daily totals
        return dailySales.map(item => ({
            value: item.total,
            label: moment(item.date).format('DD.MM'),
            date: item.date,
        }));
    }, [dailySales, filteredData, rangeType]);

    const totalSales = useMemo(() => {
        return filteredData.reduce((sum, item) => sum + item.Preis, 0);
    }, [filteredData]);

    return {
        donutChartData,
        lineChartData,
        categoryTotals,
        dailySales,
        totalSales: Math.round(totalSales * 100) / 100,
        dateRange,
    };
};
