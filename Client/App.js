import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const SERVER_URL= `http://localhost:8080`  
  const symbols = ['aapl', 'nflx', 'goog', 'amzn', 'tsla']
  const [isLoading, setIsLoading] = useState(true)
  const data = []
  
  useEffect(() => {
    const getData= async () => {
      for (let symbol of symbols) {
        const response = fetch(`${SERVER_URL}/?symbol=${symbol}`)
        const d = await (await response).json()
        data.push(d)
      }
    }

    getData()
      .then(() => setIsLoading(false))
      .catch(err => console.log(err))
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
