import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    useAnimatedStyle,
    withTiming,
    Easing,
    interpolate,
} from 'react-native-reanimated';
import { Colors } from '../styles/Colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type DonutChartData = {
    value: number;
    color: string;
    label?: string;
};

type Props = {
    data: DonutChartData[];
    size?: number;
    strokeWidth?: number;
    gapSize?: number;
};

const DonutChart = ({
    data,
    size = 220,
    strokeWidth = 20,
    gapSize = 3,
}: Props) => {
    const animationProgress = useSharedValue(0);

    const total = data.reduce((sum, item) => sum + item.value, 0);

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const center = size / 2;

    // Account for rounded caps extending the visual segment length
    // Each rounded cap adds strokeWidth/2 on each end
    const roundedCapCompensation = strokeWidth;
    const effectiveGapSize = gapSize + roundedCapCompensation;
    const gapDegrees = (effectiveGapSize / circumference) * 360;
    const totalGapDegrees = gapDegrees * data.length;
    const availableDegrees = 360 - totalGapDegrees;

    useEffect(() => {
        animationProgress.value = 0;
        animationProgress.value = withTiming(1, {
            duration: 1200,
            easing: Easing.out(Easing.cubic),
        });
    }, [data]);

    // Calculate stroke dash arrays for each segment with gaps
    const getSegmentProps = (index: number) => {
        let cumulativeAngle = 0;
        for (let i = 0; i < index; i++) {
            const segmentDegrees = (data[i].value / total) * availableDegrees;
            cumulativeAngle += segmentDegrees + gapDegrees;
        }

        const segmentDegrees = (data[index].value / total) * availableDegrees;
        const segmentLength = (segmentDegrees / 360) * circumference;
        const gapLength = circumference - segmentLength;

        // Offset by half gap to center the gap between segments
        const rotation = -90 + cumulativeAngle + (gapDegrees / 2);

        return {
            segmentLength,
            gapLength,
            rotation,
        };
    };

    const legendAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(animationProgress.value, [0.5, 1], [0, 1]),
            transform: [
                {
                    translateY: interpolate(animationProgress.value, [0.5, 1], [20, 0]),
                },
            ],
        };
    });

    return (
        <View style={styles.container}>
            <View style={[styles.chartWrapper, { width: size, height: size }]}>
                <Svg width={size} height={size}>
                    {/* Animated segments */}
                    {data.map((item, index) => {
                        const { segmentLength, gapLength, rotation } = getSegmentProps(index);

                        return (
                            <AnimatedSegment
                                key={index}
                                cx={center}
                                cy={center}
                                radius={radius}
                                strokeWidth={strokeWidth}
                                color={item.color}
                                segmentLength={segmentLength}
                                gapLength={gapLength}
                                rotation={rotation}
                                animationProgress={animationProgress}
                            />
                        );
                    })}
                </Svg>
            </View>

            <Animated.View style={[styles.legendContainer, legendAnimatedStyle]}>
                {data.map((item, index) => {
                    const percentage = Math.round((item.value / total) * 100);
                    return (
                        <View
                            key={index}
                            style={[styles.legendBadge, { backgroundColor: item.color }]}
                        >
                            <Text style={styles.legendText}>
                                {percentage}% {item.label}
                            </Text>
                        </View>
                    );
                })}
            </Animated.View>
        </View>
    );
};

type AnimatedSegmentProps = {
    cx: number;
    cy: number;
    radius: number;
    strokeWidth: number;
    color: string;
    segmentLength: number;
    gapLength: number;
    rotation: number;
    animationProgress: Animated.SharedValue<number>;
};

const AnimatedSegment = ({
    cx,
    cy,
    radius,
    strokeWidth,
    color,
    segmentLength,
    gapLength,
    rotation,
    animationProgress,
}: AnimatedSegmentProps) => {
    const animatedProps = useAnimatedProps(() => {
        const progress = animationProgress.value;
        const animatedLength = segmentLength * progress;
        const animatedGap = gapLength + (segmentLength - animatedLength);

        return {
            strokeDasharray: [animatedLength, animatedGap],
        };
    });

    return (
        <G rotation={rotation} origin={`${cx}, ${cy}`}>
            <AnimatedCircle
                cx={cx}
                cy={cy}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                animatedProps={animatedProps}
            />
        </G>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    chartWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    legendContainer: {
        marginTop: 32,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        paddingHorizontal: 16,
    },
    legendBadge: {
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
    },
    legendText: {
        color: Colors.white,
        fontSize: 10,
        fontWeight: '600',
    },
});

export default DonutChart;
