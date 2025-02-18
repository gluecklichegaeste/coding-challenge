import { View } from "react-native";
import {  PieChart } from "react-native-gifted-charts";
import React from "react";
import { ThemedText } from "./ThemedText";

const pieData = [
            {value: 30, color: '#0F5442'},
            {value: 70, color: '#B6EDDE'}
        ];

export function PieProgress() {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <PieChart
                donut
               innerRadius={80}
               data={pieData}
                centerLabelComponent={() => {
                return <ThemedText type="default">2578/     10000$</ThemedText>;
                }}
            />
        </View>
    )


}