import React from 'react'; 
import {View, Text, Button, ImageBackground , StyleSheet} from 'react-native'; 
import { Component } from 'react';
import CountDown from 'react-native-countdown-component';
import DashboardScreen from './DashboardScreen'; 

const image = { uri: "https://s2.best-wallpaper.net/wallpaper/iphone/1609/Calm-lake-fog-rocks-trees-morning_iphone_320x480.jpg" };


class FocusScreen extends React.Component {
  constructor() {
    super();
  }
  render() {
    const { navigation } = this.props;  
    const taskName = navigation.getParam('taskName', 'NO-Task');  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ImageBackground source={image} style={styles.image}>
          <Text style={styles.text}>{taskName}</Text>
          <CountDown
            until={60 * 25 + 0}
            size={30}
            onFinish={() => alert('Finished')}
            digitStyle={{backgroundColor: '#FFF'}}
            digitTxtStyle={{color: '#1CC625'}}
            timeLabelStyle={{color: '#FFF'}}
            timeToShow={['M', 'S']}
            timeLabels={{m: 'MM', s: 'SS'}}
          />
          <Button
            title="Go to Dashboard Screen"
            onPress={() => this.props.navigation.navigate('Dashboard')}
          />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center", 
    alignItems: "center", 
    width: 350
  }, 
  timer: { 
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center", 
    alignItems: "center", 
  }, 
  text: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});

export default FocusScreen; 