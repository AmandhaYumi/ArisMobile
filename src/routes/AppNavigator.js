import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from '../context/AuthContext';
import Alertas from '../screens/Alertas';
import Cadastro from '../screens/Cadastro';
import Dashboard from '../screens/Dashboard';
import Estufas from '../screens/Estufas';
import Inicial from '../screens/Inicial';
import Login from '../screens/Login';
import Perfil from '../screens/Perfil';
import Plantacoes from '../screens/Plantacoes';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#08161b',
  },
};

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Inicial"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#08161b' },
      }}
    >
      <Stack.Screen name="Inicial" component={Inicial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#102229',
        },
        headerTintColor: '#f4f7f7',
        headerTitleStyle: {
          fontWeight: '800',
        },
        contentStyle: { backgroundColor: '#08161b' },
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Perfil" component={Perfil} />
      <Stack.Screen name="Plantacoes" component={Plantacoes} />
      <Stack.Screen name="Estufas" component={Estufas} />
      <Stack.Screen name="Alertas" component={Alertas} />
    </Stack.Navigator>
  );
}

function Routes() {
  const { token } = useAuth();

  return token ? <AppStack /> : <AuthStack />;
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer theme={theme}>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
