import { View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import React from "react";
import { ThemedText } from "./ThemedText";
import ThemedButton from "./ThemedButton";

const pieData = [
    { value: 60, color: '#408CFF', },
    { value: 20, color: '#9747FF', },
    { value: 20, color: '#19B70A', },
];

export function PieBreakdown() {
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center' }}><View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <PieChart
                data={pieData}
                innerRadius={80}
                donut
                fontWeight="medium"
                strokeWidth={4}
                strokeColor="#fff"
                innerCircleBorderWidth={10}
                innerCircleBorderColor="#fff" />

        </View>
    </View>
    )


}