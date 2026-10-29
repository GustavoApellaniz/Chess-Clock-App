import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SetupScreen from './src/screens/SetupScreen';
import ClockScreen from './src/screens/ClockScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Setup">
          <Stack.Screen name="Setup" component={SetupScreen} />
          <Stack.Screen
            name="Clock"
            component={ClockScreen}
            initialParams={{ minutes: 10, increment: 0 }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
