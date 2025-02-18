
import ThemedButton from "./ThemedButton";
import { View } from "react-native";
import {  LineChart } from "react-native-gifted-charts";
import React, { useState } from "react";
import { ThemedText } from "./ThemedText";
import useAppStore from "@/app/store/store";


export function Graph() {
    const { lineGraphData, setLineGraphData, timeframes} = useAppStore();
    const [activeTimeframe, setActiveTimeframe] = useState('Heute');

    return (
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        <LineChart data={lineGraphData} isAnimated  animateOnDataChange animationDuration={1000} onDataChangeAnimationDuration={300} curvature={0.2} curved areaChart thickness={10} color="#0F5442"  startFillColor="#0F5442" hideDataPoints yAxisLabelWidth={0} hideAxesAndRules yAxisLabelContainerStyle={{padding: 0, margin: 0}} />
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, alignItems: 'center' }}>
            {timeframes?.map((timeframe, _index: number) => (
                <ThemedButton 
                    key={timeframe.label}
                    type={activeTimeframe === timeframe.label ? 'secondary' : 'default'} 
                    onPress={() => {setActiveTimeframe(timeframe.label), setLineGraphData()}}
                >
                    <ThemedText type={activeTimeframe === timeframe.label ? 'timeframeActive' : 'calendarInactive'}>
                        {timeframe.label}
                    </ThemedText>
                </ThemedButton>
            ))}
        </View>
        </View>
    )


}