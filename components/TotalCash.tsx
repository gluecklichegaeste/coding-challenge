import { View, Text, StyleSheet } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { Colors } from "@/constants/Colors";
import { useSalesStore } from "@/store";

const totalCash = 10000;

export const TotalCash = () => {
    const { getSalesByPeriod, selectedDate, selectedPeriod } = useSalesStore((state) => state);
    const salesForDate = getSalesByPeriod(selectedPeriod, selectedDate);
    const actualCash = salesForDate.reduce((acc, sale) => acc + sale.Preis, 0);

    const pieData = [
        { value: actualCash, color: Colors.light.tint },
        { value: totalCash, color: Colors.light.gray }
    ];
    return (
        <View>
            <PieChart
                donut
                innerRadius={80}
                data={pieData}
                centerLabelComponent={() =>
                    <>
                        <Text style={styles.text}>{actualCash.toFixed(0) + '/'}</Text>
                        <Text style={styles.text}>{totalCash.toFixed(0) + '€'}</Text>
                    </>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        color: Colors.light.text,
        fontWeight: 'bold',
    },
});