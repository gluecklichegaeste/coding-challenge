import dayjs from "dayjs";
import ThemedButton from "./ThemedButton";
import { ThemedText } from "./ThemedText";
import { AppState, View } from "react-native";
import { ScrollView } from "react-native";
import { IconSymbol } from "./ui/IconSymbol.ios";
import React  from "react";
import useAppStore from "@/app/store/store";


export function Calendar() {
    const { setActiveDay, activeDay, dates, setLineGraphData } = useAppStore();
    const activeIndex = dates.findIndex((date: Date) => dayjs(date).format('YYYY/MM/DD') === dayjs(activeDay).format('YYYY/MM/DD'))

    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
            <IconSymbol name={"chevron.left"} color={"black"} style={{ alignSelf: 'center' }} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {dates?.map((date: Date, index: number) => <ThemedButton type={activeIndex === index ? 'primary' : 'ghost'} onPress={() => {setActiveDay(date), setLineGraphData() }}>
                    <View style={{ flexDirection: 'column', gap:4, alignItems: 'center' }} key={index + dayjs(date).format('DD')}>
                        <ThemedText type={activeIndex === index ? 'calendarActive' : 'calendarInactive'}>{dayjs(date).format('dd').substring(0, 1)}</ThemedText>
                        <ThemedText type={activeIndex === index ? 'calendarActive' : 'calendarInactive'}>{dayjs(date).format('DD')}</ThemedText>
                    </View>
                </ThemedButton>
                )}

            </ScrollView>
            <IconSymbol name={"chevron.right"} color={"black"} style={{ alignSelf: 'center' }} />
        </View>
    )


}