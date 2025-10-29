import { LineChart } from "react-native-gifted-charts";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import { Colors } from '@/constants/Colors';
import { PERIODS } from "@/constants/Calendar";
import { useSalesStore, PeriodId } from "@/store";
import { useMemo } from "react";

const getDateRange = (periodId: PeriodId, selectedDate: Date): { start: Date; end: Date } => {
    const end = new Date(selectedDate);
    const start = new Date(selectedDate);
    const today = new Date('2024-10-29');

    switch (periodId) {
        case 'today':
            start.setDate(today.getDate());
            end.setDate(today.getDate() + 1);
            break;
        case '1day':
            start.setDate(start.getDate() - 1);
            break;
        case '1week':
            start.setDate(start.getDate() - 6);
            break;
        case '1month':
            start.setDate(start.getDate() - 29);
            break;
        case 'all':
            start.setFullYear(2024, 9, 1);
            end.setFullYear(2024, 10, 15);
            break;
    }

    return { start, end };
};

export const Chart = () => {
    const selectedPeriod = useSalesStore((state) => state.selectedPeriod);
    const setSelectedPeriod = useSalesStore((state) => state.setSelectedPeriod);
    const selectedDate = useSalesStore((state) => state.selectedDate);
    const sales = useSalesStore((state) => state.sales);

    const chartData = useMemo(() => {
        const { start, end } = getDateRange(selectedPeriod, selectedDate);

        const salesByDate: Record<string, number> = {};

        sales.forEach((sale) => {
            const saleDate = new Date(sale.Datum);
            if (saleDate >= start && saleDate <= end) {
                const dateKey = sale.Datum;
                salesByDate[dateKey] = (salesByDate[dateKey] || 0) + sale.Preis;
            }
        });

        const dates: string[] = [];
        const currentDate = new Date(start);
        while (currentDate <= end) {
            dates.push(currentDate.toISOString().split('T')[0]);
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates.map((date, index) => ({
            value: salesByDate[date] || 0,
            hideDataPoint: index !== dates.length - 1,
        }));
    }, [selectedPeriod, selectedDate, sales]);

    return (<View style={styles.container}>
        <View style={styles.chartContainer}>
            <LineChart
                width={Dimensions.get('window').width - 71}
                isAnimated
                thickness={3}
                color={Colors.light.tint}
                animateOnDataChange
                animationDuration={1000}
                onDataChangeAnimationDuration={300}
                areaChart
                curved
                hideYAxisText
                hideRules
                yAxisThickness={0}
                xAxisThickness={0}
                data={chartData}
                hideDataPoints
                startFillColor={Colors.light.tint}
                endFillColor={Colors.light.background}
                startOpacity={1}
                endOpacity={0.1}
                spacing={65}
                backgroundColor={Colors.light.background}
                initialSpacing={0}
            />
        </View>
        <View style={styles.periodsContainer}>
            {PERIODS.map((period) => (
                <TouchableOpacity
                    key={period.id}
                    style={[
                        styles.periodButton,
                        selectedPeriod === period.id && styles.periodButtonActive
                    ]}
                    onPress={() => setSelectedPeriod(period.id)}
                >
                    <Text style={[
                        styles.periodButtonText,
                        selectedPeriod === period.id && styles.periodButtonTextActive
                    ]}>{period.name === 'Heute' ? 'Heute' : period.name.slice(0, 3)}</Text>
                </TouchableOpacity>
            ))}
        </View>
    </View>);
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 25,
    },
    chartContainer: {
        backgroundColor: Colors.light.background,
        marginHorizontal: -10,
    },
    periodsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: 10,
    },
    periodButton: {
        padding: 10,
        borderRadius: 20,
        backgroundColor: Colors.light.gray,
        minWidth: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    periodButtonActive: {
        backgroundColor: Colors.light.tint,
    },
    periodButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    periodButtonTextActive: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.light.background,
    },
    chart: {
        width: '100%',
    },
});