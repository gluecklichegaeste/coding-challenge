import { useState, type PropsWithChildren } from 'react';
import { StyleSheet, View, LayoutChangeEvent } from 'react-native';
import { CurveType, LineChart as GiftedLineChart } from "react-native-gifted-charts"

type Props = PropsWithChildren<{}>;

export default function LineChart({ }: Props) {
    const latestData = [
        {
            value: 100,
        },
        {
            value: 200,
        },
        {
            value: 300,
        },
        {
            value: 400,
        },
        {
            value: 200,
        },
        {
            value: 500,
        },
        {
            value: 400,
        },
    ];

    const [currentData, setCurrentData] = useState(latestData);

    return (
        <View style={styles.container}>
            <GiftedLineChart
                adjustToWidth
                disableScroll
                isAnimated
                color="#275243"
                maxValue={600}
                hideYAxisText
                yAxisLabelWidth={0}
                noOfSections={1}
                endSpacing={0}
                initialSpacing={0}
                animateOnDataChange
                animationDuration={1000}
                onDataChangeAnimationDuration={300}
                areaChart
                data={currentData}
                hideDataPoints
                startFillColor={'#275243'}
                endFillColor={'#275243'}
                startOpacity={0.7}
                endOpacity={0.0}
                thickness={3}
                hideRules={true}
                xAxisThickness={0}
                yAxisThickness={0}
                curved
                curveType={CurveType.QUADRATIC}
                curvature={1}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
});
