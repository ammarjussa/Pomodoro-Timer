import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView} from 'react-native';
import {vibrate} from '../utils'

let defaultWorkTime = {
    minutes: 1,
    seconds: 0
  }

let defaultBreakTime = {
    minutes:1,
    seconds:0
}

const defaultWorkStatus = 'Work Time!'
const defaultBreakStatus = 'Break Time!'

const defaultButtonName='Start'
const doosraButtonName='Pause'

const styles = StyleSheet.create({
    time: {
        paddingTop:5,
        fontSize: 75,
        color: 'blue',
    },

    buttons: {
        paddingTop: 30,
    },

    input: {
        borderWidth: 1,
        borderColor: 'grey',
        width:60,
        height:30,
    },
})

export class DisplayTime extends Component {

    state = {
        WorkTime: defaultWorkTime,
        BreakTime: defaultBreakTime,
        break: false,
        status: defaultWorkStatus,
        start: false,
        buttonName: defaultButtonName,
        Color: 'red'        
    }

    componentDidMount() {
        setInterval(this.decrementTime, 1000)
    }  

    decrementTime = () => {
        let currentTime = {}
        let status = ''
        if (this.state.break) {
            currentTime = this.state.BreakTime
            status='break'
        }
            
        else {
            currentTime = this.state.WorkTime
            status = 'work'
        }    

        if (this.state.start) {
            if(currentTime.minutes === 0 && currentTime.seconds === 0) {
                if(this.state.break) {
                    this.setState({WorkTime: defaultWorkTime,break: false, status: defaultWorkStatus, Color: 'red'})
                    vibrate()
                }
                else {
                    this.setState({BreakTime:defaultBreakTime, break: true, status: defaultBreakStatus,Color:'green'})
                    vibrate()
                }
            }
    
            if(currentTime.seconds === 0) {
                if(status==='work') {
                    this.setState(prevState => ({WorkTime: {
                        minutes: prevState.WorkTime.minutes -1,
                        seconds: 59
                    }}))
                }

                else if(status==='break') {
                    this.setState(prevState => ({BreakTime: {
                        minutes: prevState.BreakTime.minutes -1,
                        seconds: 59
                    }}))
                }
            }
    
            else {
                if(status==='work') {
                     this.setState(prevState => ({WorkTime: {
                        minutes: prevState.WorkTime.minutes + 0 ,
                        seconds: prevState.WorkTime.seconds - 1
                    }}))
                }

                else if(status === 'break') {
                    this.setState(prevState => ({BreakTime: {
                        minutes: prevState.BreakTime.minutes + 0 ,
                        seconds: prevState.BreakTime.seconds - 1
                    }}))
                }
            }
        }
        
    }

    handleStart=()=> {
        this.setState(prevState => ({start: !prevState.start, buttonName: (prevState.start ?  defaultButtonName : doosraButtonName)}))
        console.warn('Reached Here');
    }

    handleReset=()=> {
        this.setState({WorkTime:defaultWorkTime,BreakTime:defaultBreakTime,  start: false, buttonName: defaultButtonName})
    }

    handleMinWorkChange = val => {
        val=Number(val)
        if (!this.state.start)
            this.setState(prevState => ({WorkTime: {minutes: val, seconds: prevState.WorkTime.seconds}}))
            defaultWorkTime.minutes=val;
    }

    handleSecWorkChange = val => {
        val=Number(val)
        if (!this.state.start)
            this.setState(prevState => ({WorkTime: {minutes: prevState.WorkTime.minutes, seconds: val}}))
            defaultWorkTime.seconds=val;

    }
    handleMinBreakChange = val => {
        val=Number(val)
        if (!this.state.start)
            this.setState(prevState => ({BreakTime: {minutes: val, seconds: prevState.BreakTime.seconds}}))
            defaultBreakTime.minutes=val;        
    }
    handleSecBreakChange = val => {
        val=Number(val)
        if (!this.state.start)
            this.setState(prevState => ({BreakTime: {minutes: prevState.BreakTime.minutes, seconds: val}}))
            defaultBreakTime.seconds=val;
    }

    render() {
        let text=''
        let min=0
        let sec=0
        if(this.state.break) {
            min=this.state.BreakTime.minutes
            sec = this.state.BreakTime.seconds
        }

        else {
            min=this.state.WorkTime.minutes
            sec = this.state.WorkTime.seconds
        }

        if(min > 9 && sec > 9) {
            text = `${min}:${sec}`
        }

        else if(min < 9 && sec > 9) {
            text =`0${min}:${sec}`
        }

        else if(min > 9 && sec < 9) {
            text =`${min}:0${sec}`
        }

        else {
            text =`0${min}:0${sec}`
        }


        return (
            <View>
                <Text style={{color: this.state.Color, fontSize: 25, paddingTop:10, paddingLeft: 30}}>
                    {this.state.status}
                </Text>
                <Text style={styles.time}>{text}</Text>
                <KeyboardAvoidingView behavior='padding'>
                    <Text>Worktime Minutes: </Text>
                    <TextInput style={styles.input}
                        keyboardType='numeric'
                        onChangeText = {this.handleMinWorkChange}
                    />
                    <Text>Worktime Seconds: </Text>
                    <TextInput style={styles.input}
                        keyboardType='numeric'
                        onChangeText = {this.handleSecWorkChange}
                    />

                    <Text>BreakTime minutes: </Text>
                    <TextInput style={styles.input}
                        keyboardType='numeric'
                        onChangeText = {this.handleMinBreakChange}
                    />
                    <Text>BreakTime Seconds: </Text>
                    <TextInput style={styles.input}
                        keyboardType='numeric'
                        onChangeText = {this.handleSecBreakChange}
                    />
                    

                    <View style={{paddingTop: 10}}>
                        <Button onPress={this.handleStart} title={this.state.buttonName}/>
                    </View>

                    <View style={styles.buttons}>
                        <Button style={styles.buttons} onPress={this.handleReset} title='Reset'/>
                    </View>
                </KeyboardAvoidingView>    

            </View>
        )

    }
}

export default DisplayTime
