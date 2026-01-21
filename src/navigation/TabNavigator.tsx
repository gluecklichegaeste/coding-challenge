import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screens from '../constants/screens';

import { OverviewScreen, AccountingScreen, LearningScreen } from '../screens';

export type TabParamList = {
    Overview: undefined;
    Accounting: undefined;
    Learning: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={Screens.OVERVIEW}
                component={OverviewScreen}
            />
            <Tab.Screen
                name={Screens.ACCOUNTING}
                component={AccountingScreen}
            />
            <Tab.Screen
                name={Screens.LEARNING}
                component={LearningScreen}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
