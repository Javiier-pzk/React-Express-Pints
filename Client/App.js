import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Avatar, List, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons'; 


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
        setData(dataTemp)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  const renderList = ({ item }) => (
      <List.Item
        key={item.key}
        style = {styles.item}
        title = {item.key}
        titleNumberOfLines = {1}
        descriptionNumberOfLines = {1}
        description = {item.companyName}
        titleStyle = {styles.title}
        descriptionStyle = {styles.description}
        left = {(props) => renderImage(props, item.companyLogo)}
        right = {(props) => renderPreviousPrices(props, item)}
      />
  )

  const renderImage = (props, imgUrl) => (
    <Avatar.Image 
      {...props} 
      size = {55}
      source = {{uri: imgUrl}}
    />
  )

  const renderPreviousPrices = (props, item) => (
    <View {...props} style = {styles.prices}>
      <Text style = {styles.latestPrice}>${item.latestPrice}</Text>
      <View style = {styles.previousPrices}>
        <View style = {styles.priceChange}>
          {item.change >= 0 
            ? (<AntDesign name="arrowup" size = {16} color = 'green'/>)
            : (<AntDesign name="arrowdown" size = {16} color = 'red' />)
          }
          <Text style = {
              item.change >= 0 
                ? styles.increaseChange
                : styles.decreaseChange
            }>{item.change}
          </Text>
        </View>
        <Text style = {
            item.changePercent >= 0 
              ? styles.increaseChange
              : styles.decreaseChange
          }> {item.changePercent}%
        </Text>
      </View>
    </View>
  )

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        {isLoading ? (
          <View style = {styles.loadingView}>
            <ActivityIndicator size='large' style={styles.loading} />
            <Text>Fetching stock info...</Text>
          </View>
        ) : (
          <FlatList
            style = {styles.list}
            data = {data}
            renderItem = {renderList}
          />
        )}
      </SafeAreaView>
    </PaperProvider>
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
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
  item: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#999",
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center'
  },
  loading: {
    marginBottom: 10,
    color: '#4682b4'
  },
  list: {
    flex: 1,
    marginTop: 20,
    width: "100%"
  },
  prices: {
    justifyContent: 'center'
  },
  latestPrice: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center'
  },
  previousPrices: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center'
  },
  priceChange: {
    flexDirection: 'row',
    marginRight: 5
  },
  decreaseChange: {
    fontSize: 14,
    color: 'red'
  },
  increaseChange: {
    fontSize: 14,
    color: 'green'
  }
});