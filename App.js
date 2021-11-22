import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import * as Locaton from 'expo-location'

const WEATHER_API_KEY= "47808d8cc6e83bb8e1760907efe6f6bb";
const BASE_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?'

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null)
  const [unitSystem, setUnitSystem] = useState('metric')
  useEffect(()=>{
      load()
  },[])

  async function load() {
      try{
       let {status} = await Locaton.requestForegroundPermissionsAsync()
       if(status != 'granted'){
         setErrorMessage('Access to location is needed to run the app')
         return
       }
       const location = await Locaton.getCurrentPositionAsync();

       const {latitude, longitude} = location.coords

       const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${WEATHER_API_KEY}`

       const response = await fetch(weatherUrl)

       const result = await response.json()

       if(response.ok){
         setCurrentWeather(result)
       }else{
         setErrorMessage(result.message)
       }

      }
      catch(error){
        setErrorMessage(error.message)
      }
  }
   if(currentWeather){
     const { main : {temp} } = currentWeather
  return (
    <View style={styles.container}>
      <Text>{temp} </Text>
      <Text>Hello I am Saymon Shoab </Text>
      {/* <Image
          source={{
            uri: 'https://i.ibb.co/GJnVHcw/aboutsaymon.png',
          }}
          style={{ width: 200, height: 200 }}
        /> */}
      <StatusBar style="auto" />
    </View>
  );
 }else{
     return (
      <View style={styles.container}>
      <Text>{errorMessage} </Text>      
      <StatusBar style="auto" />
    </View>
     )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
