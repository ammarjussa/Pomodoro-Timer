import React , {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {Constants} from 'expo'

import DisplayTime from './Components/DisplayTime'

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    textAlign: 'center',
    paddingTop: 30
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
  },

  thetimer: {
    paddingTop: 40,
  }
})


export default class App extends Component {
  
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Pomodoro Timer</Text>
        <View style={styles.thetimer}><DisplayTime /></View>
      </View>
    )
  }    
}

