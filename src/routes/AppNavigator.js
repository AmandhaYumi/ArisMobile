import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicial from '../screens/Inicial';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Plantacoes from '../screens/Plantacoes';
import Alertas from '../screens/Alertas';
import Cadastro from '../screens/Cadastro';
import { theme } from '../styles/tema';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicial"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          contentStyle: { backgroundColor: theme.colors.background },
        }}
      >
        <Stack.Screen name="Inicial" component={Inicial} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Plantacoes" component={Plantacoes} />
        <Stack.Screen name="Alertas" component={Alertas} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
