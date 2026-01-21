import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import Animated, {
    useSharedValue,
    useAnimatedProps,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { Colors } from '../styles/Colors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
    currentValue: number;
    goalValue: number;
    size?: number;
    strokeWidth?: number;
};

const RevenueGoalChart = ({
    currentValue,
    goalValue,
    size = 220,
    strokeWidth = 20,
}: Props) => {
    const animationProgress = useSharedValue(0);

    const progress = Math.min(currentValue / goalValue, 1);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const innerRadius = radius - strokeWidth - 10;

    useEffect(() => {
        animationProgress.value = 0;
        animationProgress.value = withTiming(progress, {
            duration: 1200,
            easing: Easing.out(Easing.cubic),
        });
    }, [currentValue, goalValue]);

    const animatedProps = useAnimatedProps(() => {
        const strokeLength = circumference * animationProgress.value;
        const gapLength = circumference - strokeLength;

        return {
            strokeDasharray: [strokeLength, gapLength],
        };
    });

    const formatCurrency = (value: number): string => {
        return Math.round(value).toString();
    };

    return (
        <View style={styles.container}>
            <View style={[styles.chartWrapper, { width: size, height: size }]}>
                <View style={[styles.shadowCircle, {
                    width: size,
                    height: size,
                    borderRadius: size / 2
                }]} />

                <Svg width={size} height={size} style={styles.svg}>
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        stroke="#C8E6DC"
                        strokeWidth={strokeWidth}
                        fill="none"
                    />

                    {/* Progress circle (dark green) */}
                    <G rotation={-90} origin={`${size / 2}, ${size / 2}`}>
                        <AnimatedCircle
                            cx={size / 2}
                            cy={size / 2}
                            r={radius}
                            stroke={Colors.darkGreen}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeLinecap="round"
                            animatedProps={animatedProps}
                        />
                    </G>
                    <Circle
                        cx={size / 2}
                        cy={size / 2}
                        r={innerRadius}
                        fill={Colors.white}
                    />
                </Svg>
                <View style={[styles.centerTextContainer, { width: size, height: size }]}>
                    <Text style={styles.currentValueText}>
                        {formatCurrency(currentValue)}/
                    </Text>
                    <Text style={styles.goalValueText}>
                        {formatCurrency(goalValue)}€
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    chartWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    shadowCircle: {
        position: 'absolute',
        backgroundColor: Colors.white,
        shadowColor: Colors.darkGrey,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 8,
    },
    svg: {
        position: 'absolute',
    },
    centerTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    currentValueText: {
        fontSize: 32,
        fontWeight: '600',
        color: Colors.black,
    },
    goalValueText: {
        fontSize: 32,
        fontWeight: '600',
        color: Colors.black,
    },
});

export default RevenueGoalChart;
