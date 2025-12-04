/*
import { Redirect, Stack } from 'expo-router'
import { View } from 'react-native';

export default function Index() {
  return (
   <Redirect href="/(auth)/login"/>  
  );
}
  */
import React from 'react';
import { Redirect } from 'expo-router'; 

export default function App() {
  console.log("✅  it is in Index and moves to login tab");
  
  return(
    <Redirect href="/(auth)/login"/>
    );
}