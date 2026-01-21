import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screens from '../constants/screens';

import { OverviewScreen, AccountingScreen, LearningScreen } from '../screens';
import { ChartIcon, AccountingIcon, LearningIcon } from '../components/icons';

export type TabParamList = {
    Overview: undefined;
    Accounting: undefined;
    Learning: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                name={Screens.OVERVIEW}
                component={OverviewScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <ChartIcon size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name={Screens.ACCOUNTING}
                component={AccountingScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AccountingIcon size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name={Screens.LEARNING}
                component={LearningScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <LearningIcon size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
