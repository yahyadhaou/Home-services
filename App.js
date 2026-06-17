import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AppProvider } from './src/context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </AppProvider>
  );
}
