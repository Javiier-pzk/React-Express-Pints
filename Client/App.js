import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image } from 'react-native';
import { List, Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons'; 
import * as Device from 'expo-device';


export default function App() {
  const SERVER_URL_IOS= 'http://localhost:8080'
  const SERVER_URL_ANDROID = 'http://10.0.2.2:8080' 
  const symbols = ['aapl', 'nflx', 'goog', 'amzn', 'tsla']
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isServerActive, setIsServerActive] = useState(true)
  
  useEffect(() => {
    setIsLoading(true)
    const dataTemp = []
    const osName = Device.osName
    const serverUrl = osName === 'iOS' ? SERVER_URL_IOS : SERVER_URL_ANDROID
    const getData = async () => {
      for (let symbol of symbols) {
        const response = fetch(`${serverUrl}/?symbol=${symbol}`)
        const d = await (await response).json()
        dataTemp.push(d)
      }
    }

    getData()
      .then(() => {
        setData(dataTemp)
        setIsServerActive(true)
        setIsLoading(false)
      })
      .catch(() => {
        setIsServerActive(false)
        setIsLoading(false)
      })
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
   <Image
      {...props}
      style = {styles.logo}
      source = {{uri: imgUrl}}
      resizeMode= 'contain'
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
          ) : isServerActive ? ( 
            <FlatList
              style = {styles.list}
              data = {data}
              renderItem = {renderList}
            />
          ) : (
            <Text>Oops! Server is inactive.</Text>
          ) 
        }
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
  },
  logo: {
    width: 55,
    height: 55,
    borderRadius: 30,
    borderColor: '#D3D3D3',
    borderWidth: 2

  }
});