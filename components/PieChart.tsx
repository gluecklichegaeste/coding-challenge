import { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Colors } from "@/constants/Colors";
import { useSalesStore } from "@/store";
import { CATEGORIES_LABELS } from "@/constants/Calendar";

export const PieChartComponent = () => {
  const { setModalVisible, getSalesByPeriod, selectedDate, selectedPeriod, setSelectedCategory } = useSalesStore((state) => state);

  const categoryTotals = useMemo(() => {
    const salesForDate = getSalesByPeriod(selectedPeriod, selectedDate);
    return salesForDate.reduce((acc, sale) => {
      acc[sale.Produktkategorie] = (acc[sale.Produktkategorie] || 0) + sale.Preis;
      return acc;
    }, {} as Record<string, number>);
  }, [selectedPeriod, selectedDate, getSalesByPeriod]);

  const total = Object.values(categoryTotals).reduce((acc, value) => acc + value, 0);

  const getPercentage = (value: number) => {
    return total > 0 ? ((value / total) * 100).toFixed(0) : '0';
  };

  const onPressCategory = (category: typeof CATEGORIES_LABELS[number]) => {
    setSelectedCategory(category);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <PieChart
        strokeColor={Colors.light.background}
        strokeWidth={5}
        donut
        radius={100}
        innerRadius={70}
        edgesRadius={70}
        data={[
          { value: categoryTotals['Nahrungsmittel'] || 1, color: Colors.light.blue },
          { value: categoryTotals['Pflegeprodukte'] || 1, color: Colors.light.green },
          { value: categoryTotals['Tierprodukte'] || 1, color: Colors.light.purple },
        ]}
        innerCircleColor={Colors.light.background}
        innerCircleBorderWidth={0}
        innerCircleBorderColor={Colors.light.background}
        showValuesAsLabels={false}
        showText={false}
      />
      <View style={styles.wrapper}>
        <TouchableOpacity style={[styles.pieChartTextWrapper, styles.nahrungsmitel]} onPress={() => onPressCategory('Nahrungsmittel')}>
          <Text style={styles.pieChartText}>{getPercentage(categoryTotals['Nahrungsmittel'] || 0)}% Nahrungsmittel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.pieChartTextWrapper, styles.pflegeprodukte]} onPress={() => onPressCategory('Pflegeprodukte')}>
          <Text style={styles.pieChartText}>{getPercentage(categoryTotals['Pflegeprodukte'] || 0)}% Pflegeprodukte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.pieChartTextWrapper, styles.tierprodukte]} onPress={() => onPressCategory('Tierprodukte')}>
          <Text style={styles.pieChartText}>{getPercentage(categoryTotals['Tierprodukte'] || 0)}% Tierprodukte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
    paddingTop: 30,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10
  },
  pieChartTextWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  pieChartText: {
    fontSize: 14,
    color: Colors.light.background
  },
  nahrungsmitel: {
    backgroundColor: Colors.light.green
  },
  pflegeprodukte: {
    backgroundColor: Colors.light.purple
  },
  tierprodukte: {
    backgroundColor: Colors.light.blue
  }
});