import { useMemo, type PropsWithChildren } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CurveType, LineChart as GiftedLineChart } from "react-native-gifted-charts";
import moment from 'moment';
import { Colors } from '../styles/Colors';
import ChartButton from './ChartButton';

export type RangeType = 'today' | '3d' | '1w' | '1m' | 'all';

type ChartDataPoint = {
    value: number;
    label?: string;
    date?: string;
};

type Props = PropsWithChildren<{
    selectedDate: moment.Moment;
    data: ChartDataPoint[];
    selectedRange: RangeType;
    onRangeChange: (range: RangeType) => void;
}>;

export default function LineChart({
    selectedDate = moment(),
    data,
    selectedRange,
    onRangeChange,
}: Props) {

    const rangeButtons: { label: string; range: RangeType }[] = [
        { label: 'Heute', range: 'today' },
        { label: '3 T', range: '3d' },
        { label: '1 W', range: '1w' },
        { label: '1 M', range: '1m' },
        { label: 'All', range: 'all' },
    ];

    const rangeButtonsComponents = useMemo(() => {
        return rangeButtons.map((button) => {
            const isSelected = selectedRange === button.range;

            return (
                <ChartButton
                    key={button.label}
                    label={button.label}
                    selected={isSelected}
                    onPress={() => onRangeChange(button.range)}
                />
            );
        });
    }, [selectedRange, onRangeChange]);

    const maxValue = useMemo(() => {
        if (!data || data.length === 0) return 100;
        const max = Math.max(...data.map(d => d.value));
        return Math.ceil(max / 100) * 100 + 100;
    }, [data]);

    const chartData = useMemo(() => {
        if (!data || data.length === 0) {
            return [{ value: 0 }, { value: 0 }];
        }

        if (data.length === 1) {
            return [data[0], { ...data[0] }];
        }
        return data;
    }, [data]);

    const hasData = data && data.length > 0;

    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                {hasData ? (
                    <GiftedLineChart
                        adjustToWidth
                        disableScroll
                        isAnimated
                        color={Colors.darkGreen}
                        maxValue={maxValue}
                        hideYAxisText
                        yAxisLabelWidth={0}
                        noOfSections={1}
                        endSpacing={0}
                        initialSpacing={0}
                        animateOnDataChange
                        animationDuration={1000}
                        onDataChangeAnimationDuration={300}
                        areaChart
                        data={chartData}
                        hideDataPoints
                        startFillColor={Colors.darkGreen}
                        endFillColor={Colors.darkGreen}
                        startOpacity={0.7}
                        endOpacity={0.0}
                        thickness={3}
                        hideRules={true}
                        xAxisThickness={0}
                        yAxisThickness={0}
                        xAxisLabelsHeight={0}
                        curved
                        curveType={CurveType.QUADRATIC}
                        curvature={1}
                    />
                ) : (
                    <View style={styles.noDataContainer}>
                        <Text style={styles.noDataText}>Keine Verkäufe in diesem Zeitraum</Text>
                    </View>
                )}
            </View>
            <View style={styles.buttonContainer}>
                {rangeButtonsComponents}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    chartContainer: {
        minHeight: 150,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    noDataContainer: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: 14,
        color: '#888',
    },
});
