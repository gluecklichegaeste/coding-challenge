import { useMemo, useState, type PropsWithChildren } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CurveType, LineChart as GiftedLineChart } from "react-native-gifted-charts";
import moment from 'moment';
import { Colors } from '../styles/Colors';
import ChartButton from './ChartButton';

type RangeType = 'today' | '3d' | '1w' | '1m' | 'all';

type Props = PropsWithChildren<{
    selectedDate: moment.Moment;
}>;

export default function LineChart({ selectedDate = moment() }: Props) {
    const latestData = [
        {
            value: 100,
        },
        {
            value: 200,
        },
        {
            value: 300,
        },
        {
            value: 400,
        },
        {
            value: 200,
        },
        {
            value: 500,
        },
        {
            value: 400,
        },
    ];

    const [currentData, setCurrentData] = useState(latestData);
    const [selectedRange, setSelectedRange] = useState<RangeType>('today');

    // Calculate startDate based on selectedRange and selectedDate
    const calculateStartDate = (range: RangeType): Date | null => {
        switch (range) {
            case 'today':
                return selectedDate.clone().startOf('day').toDate();
            case '3d':
                return selectedDate.clone().subtract(3, 'days').startOf('day').toDate();
            case '1w':
                return selectedDate.clone().subtract(7, 'days').startOf('day').toDate();
            case '1m':
                return selectedDate.clone().subtract(30, 'days').startOf('day').toDate();
            case 'all':
                return null;
        }
    };

    const currentStartDate = useMemo(() => calculateStartDate(selectedRange), [selectedRange, selectedDate]);

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
                    onPress={() => setSelectedRange(button.range)}
                />
            );
        });
    }, [selectedRange]);

    return (
        <View style={styles.container}>
            <View style={styles.chartContainer}>
                <GiftedLineChart
                    adjustToWidth
                    disableScroll
                    isAnimated
                    color={Colors.darkGreen}
                    maxValue={600}
                    hideYAxisText
                    yAxisLabelWidth={0}
                    noOfSections={1}
                    endSpacing={0}
                    initialSpacing={0}
                    animateOnDataChange
                    animationDuration={1000}
                    onDataChangeAnimationDuration={300}
                    areaChart
                    data={currentData}
                    hideDataPoints
                    startFillColor={Colors.darkGreen}
                    endFillColor={Colors.darkGreen}
                    startOpacity={0.7}
                    endOpacity={0.0}
                    thickness={3}
                    hideRules={true}
                    xAxisThickness={0}
                    yAxisThickness={0}
                    curved
                    curveType={CurveType.QUADRATIC}
                    curvature={1}
                />
            </View>
            <View style={styles.buttonContainer}>
                {
                    rangeButtonsComponents
                }
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
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
});

