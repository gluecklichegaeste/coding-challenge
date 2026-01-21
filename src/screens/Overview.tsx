import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SafeAreaEdges from '../constants/SafeAreaEdges';
import LineChart from '../components/LineChart';
import moment from 'moment';
import { Colors } from '../styles/Colors';

const HomeScreen = () => {
    const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());

    return (
        <SafeAreaView
            edges={SafeAreaEdges.topOnly}
            style={styles.container}
        >
            <View style={styles.daySelector}>
            </View>
            <View style={styles.dountChart}>

            </View>
            <LineChart
                selectedDate={selectedDate}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    daySelector: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    dountChart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    lineChart: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
