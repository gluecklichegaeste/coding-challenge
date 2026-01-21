import { useMemo, useState, type PropsWithChildren } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { CurveType, LineChart as GiftedLineChart } from "react-native-gifted-charts";
import moment from 'moment';
import { Colors } from '../styles/Colors';
import ChartButton from './ChartButton';

type Props = PropsWithChildren<{
    selectedDate: Date | null;
}>;

export default function LineChart({ selectedDate = moment().startOf('day').toDate() }: Props) {
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
    const [currentRange, setCurrentRange] = useState();

    const rangeButtons = useMemo(() => [
        {
            label: 'Heute',
            startDate: moment().startOf('day').toDate(),
        },
        {
            label: '3 T',
            startDate: moment().subtract(3, 'days').startOf('day').toDate(),
        },
        {
            label: '1 W',
            startDate: moment().subtract(7, 'days').startOf('day').toDate(),
        },
        {
            label: '1 M',
            startDate: moment().subtract(30, 'days').startOf('day').toDate(),
        },
        {
            label: 'All',
            startDate: null,
        }
    ], []);

    const rangeButtonsComponents = useMemo(() => {
        return rangeButtons.map((button) => {
            const isSelected = moment(currentRange).isSame(button.startDate) || (button.startDate === null && currentRange === null);

            return (
                <ChartButton
                    key={button.label}
                    label={button.label}
                    selected={isSelected}
                    onPress={() => setCurrentRange(button.startDate)}
                />

            );
        });
    }, [rangeButtons, currentRange]);

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

