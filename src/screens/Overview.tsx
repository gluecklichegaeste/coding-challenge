import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SafeAreaEdges from '../constants/SafeAreaEdges';
import LineChart from '../components/LineChart';

const HomeScreen = () => {
    return (
        <SafeAreaView
            edges={SafeAreaEdges.topOnly}
            style={styles.container}
        >
            <View style={styles.daySelector}>
            </View>
            <View style={styles.dountChart}></View>
            <LineChart
                target={10000}
                actual={2000}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    daySelector: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    dountChart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', paddingHorizontal: 24,
    },
    lineChart: {
        flex: 1,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default HomeScreen;
