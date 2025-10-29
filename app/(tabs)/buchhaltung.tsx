
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';

export default function BuchhaltungScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.wrapper}>
        <Text style={styles.title}>Buchhaltung</Text>
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
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 