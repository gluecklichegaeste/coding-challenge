import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from "react";
import { DAYS_OF_WEEK } from "@/constants/Calendar"
import { Colors } from "@/constants/Colors";
import { useSalesStore } from "@/store";


const getDaysOfWeek = (startDate: Date = new Date()) => {
    const days = [];
    const current = new Date(startDate);

    const dayOfWeek = current.getDay();

    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    current.setDate(current.getDate() + mondayOffset);

    for (let i = 0; i < 7; i++) {
        days.push({
            date: new Date(current),
            dayNumber: current.getDate(),
            dayName: DAYS_OF_WEEK[i],
            isToday: new Date().toDateString() === current.toDateString()
        });
        current.setDate(current.getDate() + 1);
    }

    return days;
};

export const CalendarDays = () => {
    const today = new Date('2024-10-29');
    const { selectedDate, setSelectedDate } = useSalesStore((state) => state);
    const [currentWeek, setCurrentWeek] = useState(selectedDate);

    const days = getDaysOfWeek(currentWeek);

    const handlePrevWeek = () => {
        const newDate = new Date(currentWeek);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentWeek(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentWeek);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentWeek(newDate);
    };

    const handleDayPress = (date: Date) => {
        setSelectedDate(date);
    };
    console.log('today.toDateString() === selectedDate.toDateString()', today.toDateString(), selectedDate.toDateString())
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handlePrevWeek}>
                <Entypo name="chevron-left" size={24} color="black" />
            </TouchableOpacity>
            {days.map((day) => (
                <TouchableOpacity
                    key={day.date.toString()}
                    style={selectedDate.toDateString() === day.date.toDateString() ? styles.wrapperActive : styles.wrapper}
                    onPress={() => handleDayPress(day.date)}
                >
                    <Text style={selectedDate.toDateString() === day.date.toDateString() ? styles.dayButtonTextActive : styles.dayButtonText}>{day.dayName.slice(0, 1)}</Text>
                    <Text style={today.toDateString() === day.date.toDateString() ? styles.todayText : styles.dateText}>{day.dayNumber.toString().length > 1 ? day.dayNumber : '0' + day.dayNumber}</Text>
                </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={handleNextWeek}>
                <Entypo name="chevron-right" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    wrapper: {
        alignItems: 'center',
        backgroundColor: Colors.light.background,
        borderRadius: 14,
        padding: 3,
    },
    wrapperActive: {
        alignItems: 'center',
        backgroundColor: Colors.light.orange,
        borderRadius: 14,
        padding: 3,
    },
    dayButtonText: {
        fontSize: 14,
        color: Colors.light.text,
        paddingBottom: 3,
    },
    dayButtonTextActive: {
        fontSize: 14,
        color: Colors.light.background,
        paddingBottom: 3,
    },
    dateText: {
        fontSize: 14,
        color: Colors.light.text,
        padding: 3,
        backgroundColor: Colors.light.background,
        borderRadius: 14,
    },
    todayText: {
        backgroundColor: Colors.light.orange,
        fontSize: 14,
        color: Colors.light.background,
        borderRadius: 14,
        padding: 3,
    }
});