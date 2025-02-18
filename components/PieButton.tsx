import { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

import { PieProgress } from './PieProgress';
import { PieBreakdown } from './PieBreakdown';
import { Breakdown } from './Breakdown';
import React from 'react';

export function PieButton() {
  const rotationAnimation = useSharedValue(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(withTiming(90, { duration: 150 }), withTiming(0, { duration: 150 })),
      1 // Run the animation 4 times
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${rotationAnimation.value}deg` }
    ],
    backfaceVisibility: 'hidden',
  }));

  const handlePress = () => {
    setIsFlipped(!isFlipped);
    rotationAnimation.value = withRepeat(
      withSequence(withTiming(90, { duration: 500 }), withTiming(0, { duration: 150 })),
      1 // Run the animation 1 times
    );
  }

  const renderPie = (isFlipped: boolean) => {
    if (isFlipped) {
      return <PieBreakdown />;
    }

    return <PieProgress />;
  }




  return (
    <><Animated.View style={animatedStyle}>
      <TouchableOpacity onPress={handlePress}>
        {renderPie(isFlipped)}
      </TouchableOpacity>
    </Animated.View><Breakdown /></>
  );
}