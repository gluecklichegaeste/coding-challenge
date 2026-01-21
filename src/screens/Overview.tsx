import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SafeAreaEdges from '../constants/SafeAreaEdges';
import LineChart from '../components/LineChart';
import moment from 'moment';
import { Colors } from '../styles/Colors';
import CalendarStrip from 'react-native-calendar-strip';

const HomeScreen = () => {
    const [selectedDate, setSelectedDate] = useState<moment.Moment>(moment());
    const locale = {
        name: 'de',
        config: {
            weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            weekdaysShort: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
            longDateFormat: {
                LT: 'HH:mm',
                LTS: 'HH:mm:ss',
                L: 'DD/MM/YYYY',
                LL: 'D MMMM YYYY',
                LLL: 'D MMMM YYYY LT',
                LLLL: 'dddd D MMMM YYYY LT'
            },
            week: {
                dow: 1,
            }
        }
    };

    return (
        <SafeAreaView
            edges={SafeAreaEdges.topOnly}
            style={styles.container}
        >
            <View style={styles.daySelector}>
                <CalendarStrip
                    scrollable
                    locale={locale}
                    calendarAnimation={{ type: 'sequence', duration: 30 }}
                    daySelectionAnimation={{ type: 'background', duration: 300, highlightColor: '#9265DC' }}
                    style={{ height: 150 }}
                    iconContainer={{ flex: 0.1 }}
                    dateNameStyle={{ fontSize: 14, fontWeight: 300 }}
                    dateNumberStyle={{ fontSize: 14, fontWeight: 300 }}
                    highlightDateNameStyle={{ fontSize: 14, color: Colors.white }}
                    highlightDateNumberStyle={{ fontSize: 14, color: Colors.white }}
                    useIsoWeekday={false}
                    selectedDate={selectedDate.toDate()}
                    highlightDateContainerStyle={{ borderRadius: 15, backgroundColor: Colors.orange, width: 30, height: 50 }}
                />
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
        paddingHorizontal: 24,
        marginTop: 24,
    },
    dountChart: {

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
