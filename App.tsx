import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';

import { TabNavigator } from './src/navigation';

const App = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar style="light" />
                <TabNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

registerRootComponent(App);

export default App;
