import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { white, purple } from '../utils/colors'
import { addDeck } from '../actions'
import { connect } from 'react-redux'
import { saveDeckTitle, addCardToDeck  } from '../utils/api'
import { NavigationActions } from 'react-navigation'
function SubmitBtn ({onPress}) {
    return (
        <TouchableOpacity
        style={ Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
        onPress= {onPress}>
        <Text style = {styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}

class NewDeck extends Component {
    state={
        text: '',
        errorText:''
    }
    submit =() => {
        //const key = timeToString()
        const deckName = this.state.text
        //console.log('submit key',key)
        console.log('submit',deckName)

        if(deckName !== "" ){
            this.setState( {
                errorText:'',
            })
        //Update Redux
        this.props.dispatch( addDeck(
            {
                [deckName]:{
                    title:deckName,
                    questions:[],
                }
            }
        ))

        //Navigate to Home
        this.toHome()

        //Save to DB
        saveDeckTitle(deckName)}
        else {
            this.setState( {
                errorText:'Please enter a valid name',
            })
        }

    }
    toHome = () => {
        console.log('toHome')
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'NewDeck'
        }))

    }
    render () {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
              <Text style={styles.titleStyle}>What is the title of your new deck?</Text>
              <TextInput
                style={{height: 50,width:150, fontSize: 12, borderColor: 'gray', borderWidth: 1, padding: 10}}
                placeholder="Deck Name"
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                />
                <Text style={{color:'red'}}>{!this.state.text && this.state.errorText}</Text>

                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}
const styles = StyleSheet.create ( {
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'

    },
    titleStyle: {
        fontSize: 36
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    }
})
export default connect()(NewDeck)
