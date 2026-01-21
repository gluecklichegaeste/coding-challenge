import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SafeAreaEdges from '../constants/SafeAreaEdges';

const HomeScreen = () => {
    return (
        <SafeAreaView
            edges={SafeAreaEdges.topOnly}
            style={styles.container}
        >
            <View style={styles.daySelector}>
            </View>
            <View style={styles.dountChart}></View>
            <View style={styles.lineChart}>

            </View>
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
        backgroundColor: 'red',
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
