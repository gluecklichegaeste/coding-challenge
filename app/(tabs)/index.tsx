import { Calendar } from '@/components/Calendar';
import { Graph } from '@/components/Graph';
import { PieButton } from '@/components/PieButton';
import { StyleSheet, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Übersicht() {
  
  return (
    <SafeAreaView  style={{padding: 10, paddingTop: 40}}>
      <Calendar/>
      <PieButton />
      <Graph />
    </SafeAreaView>
  );
}
