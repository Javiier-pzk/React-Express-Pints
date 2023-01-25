import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, SectionList, FlatList } from 'react-native';
import { List } from 'react-native-paper';

export default function App() {
  const SERVER_URL= `http://localhost:8080`  
  const symbols = ['aapl', 'nflx', 'goog', 'amzn', 'tsla']
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const dataTemp = []
    const getData = async () => {
      for (let symbol of symbols) {
        const response = fetch(`${SERVER_URL}/?symbol=${symbol}`)
        const d = await (await response).json()
        dataTemp.push(d)
      }
    }

    getData()
      .then(() => {
        console.log('datatemp', dataTemp)
        setData(dataTemp)
        console.log('data', data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  const renderItems = ({item}) => {
    return (
      <List.Item
        style = {styles.item}
        title = {item.symbol}
        description = {item.companyName}
        titleStyle = {styles.title}
        descriptionStyle = {styles.description}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {isLoading ? (
        <View style = {styles.loadingView}>
          <ActivityIndicator size='large' style={styles.loading} />
          <Text>Fetching stock info...</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            sections = {data}
            renderItem = {renderItems}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    alignSelf: "center",
    fontSize: 16,
  },
  item: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.4,
    borderBottomColor: "#999",
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center'
  },
  loading: {
    marginBottom: 10,
    color: '#4682b4'
  }
});
