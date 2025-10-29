import { ThemedView } from '@/components/ThemedView';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import { Chart } from '@/components/LineChart';
import { PieChartComponent } from '@/components/PieChart';
import { CalendarDays } from '@/components/CalendarDays';
import { SlideUpModal } from '@/components/Modal';
import { useSalesStore } from '@/store';
import { useState, useRef } from 'react';
import { TotalCash } from '@/components/TotalCash';

export default function ÜbersichtScreen() {
  const { bottom } = useSafeAreaInsets();
  const { modalVisible, setModalVisible, selectedPeriod } = useSalesStore((state) => state);
  const [isRotated, setIsRotated] = useState(false);

  const rotation = useRef(new Animated.Value(0)).current;
  const opacityPieChart = useRef(new Animated.Value(0)).current;
  const opacityTotalCash = useRef(new Animated.Value(1)).current;

  const handleRotate = () => {
    Animated.timing(opacityPieChart, {
      toValue: isRotated ? 0 : 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityTotalCash, {
      toValue: isRotated ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(rotation, {
      toValue: isRotated ? 0 : 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setIsRotated(!isRotated);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={[styles.chartContainer, { paddingBottom: bottom }]}>
        <View>
          <CalendarDays />
          <TouchableOpacity style={styles.wrapper} onPress={() => handleRotate()}>
            <Animated.View style={{ transform: [{ rotateY: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }}>
              <Animated.View style={[styles.totalCashContainer, { opacity: opacityTotalCash, transform: [{ rotateY: rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] }) }] }]}>
                <TotalCash />
              </Animated.View>
              <Animated.View style={[styles.pieContainer, { opacity: opacityPieChart }]}>
                <PieChartComponent />
              </Animated.View>

            </Animated.View>
          </TouchableOpacity>
        </View>
        <Chart />
        <SlideUpModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          height={350}
          backgroundColor={Colors.light.gray}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  wrapper: {
    paddingTop: 20,
  },
  chartContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chart: {
    height: 300,
  },
  pieContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transform: [{ rotateY: '180deg' }],
  },
  totalCashContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
