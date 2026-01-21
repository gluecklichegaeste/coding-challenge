import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SafeAreaEdges from '../constants/SafeAreaEdges';
import LineChart from '../components/LineChart';
import DonutChart from '../components/DonutChart';
import RevenueGoalChart from '../components/RevenueGoalChart';
import moment from 'moment';
import { Colors } from '../styles/Colors';
import CalendarStrip from 'react-native-calendar-strip';
import { useSalesData } from '../hooks/useSalesData';
import { RangeType } from '../types';
import { germanLocale } from '../constants/locale';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Easing,
} from 'react-native-reanimated';

const REVENUE_GOAL = 10000;

const OverViewScreen = () => {
    const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment('2024-11-01'));
    const [selectedRange, setSelectedRange] = useState<RangeType>('1w');
    const [showRevenueChart, setShowRevenueChart] = useState(true);
    const { donutChartData, lineChartData, totalSales } = useSalesData(selectedDate, selectedRange);
    const rotation = useSharedValue(0);

    useEffect(() => {
        rotation.value = withTiming(showRevenueChart ? 0 : 180, {
            duration: 600,
            easing: Easing.inOut(Easing.cubic),
        });
    }, [showRevenueChart]);

    const frontAnimatedStyle = useAnimatedStyle(() => {
        const rotateY = interpolate(rotation.value, [0, 180], [0, 180]);
        const opacity = interpolate(rotation.value, [0, 90, 90, 180], [1, 1, 0, 0]);

        return {
            transform: [
                { perspective: 1000 },
                { rotateY: `${rotateY}deg` },
            ],
            opacity,
            backfaceVisibility: 'hidden',
        };
    });

    const backAnimatedStyle = useAnimatedStyle(() => {
        const rotateY = interpolate(rotation.value, [0, 180], [180, 360]);
        const opacity = interpolate(rotation.value, [0, 90, 90, 180], [0, 0, 1, 1]);

        return {
            transform: [
                { perspective: 1000 },
                { rotateY: `${rotateY}deg` },
            ],
            opacity,
            backfaceVisibility: 'hidden',
        };
    });

    const toggleChart = () => {
        setShowRevenueChart(!showRevenueChart);
    };

    const customDatesStylesFunc = (date: moment.Moment) => {
        return {
            dateContainerStyle: { height: 50, width: 30 },
        }
    }

    const onDateSelected = (date: moment.Moment) => {
        setSelectedDate(date.clone().startOf('day'));
    }

    const onRangeChange = (range: RangeType) => {
        setSelectedRange(range);
    };

    return (
        <SafeAreaView
            edges={SafeAreaEdges.topOnly}
            style={styles.container}
        >
            <View style={styles.daySelector}>
                <CalendarStrip
                    scrollable
                    locale={germanLocale}
                    calendarAnimation={{ type: 'sequence', duration: 30 }}
                    daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: '#9265DC' }}
                    style={styles.calendarStrip}
                    dayComponentHeight={50}
                    dateNameStyle={{ fontSize: 14, fontWeight: '300' }}
                    dateNumberStyle={{ fontSize: 14, fontWeight: '300' }}
                    highlightDateNameStyle={{ fontSize: 14, color: Colors.white }}
                    highlightDateNumberStyle={{ fontSize: 14, color: Colors.white }}
                    useIsoWeekday={false}
                    customDatesStyles={customDatesStylesFunc}
                    selectedDate={selectedDate.toDate()}
                    dayContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                    highlightDateContainerStyle={{
                        borderRadius: 15,
                        backgroundColor: Colors.orange,
                        width: 30,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onDateSelected={onDateSelected}
                />
            </View>
            <ScrollView>
                <Pressable style={styles.chartContainer} onPress={toggleChart}>
                    <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                        <RevenueGoalChart
                            currentValue={totalSales}
                            goalValue={REVENUE_GOAL}
                            size={200}
                            strokeWidth={20}
                        />
                    </Animated.View>
                    <Animated.View style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle]}>
                        <DonutChart
                            data={donutChartData}
                            size={180}
                            strokeWidth={20}
                        />
                    </Animated.View>
                </Pressable>
                <LineChart
                    selectedDate={selectedDate}
                    data={lineChartData}
                    selectedRange={selectedRange}
                    onRangeChange={onRangeChange}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    calendarStrip: {
        height: 100,
        marginBottom: 20
    },
    daySelector: {
        paddingHorizontal: 24,
        marginTop: 24,
    },
    chartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        minHeight: 280,
    },
    flipCard: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flipCardBack: {
        position: 'absolute',
    },
    lineChart: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default OverViewScreen;
