import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { white, purple } from '../utils/colors'
import { addDeck , addCard } from '../actions'
import { connect } from 'react-redux'
import { addCardToDeck  } from '../utils/api'
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

class NewCard extends Component {
    state={
        question: '',
        answer:'',
        questionErrorText:'',
        answerErrorText:''
    }
    submit =() => {
        const { deckName }= this.props.navigation.state.params
        const { question , answer }= this.state
        const cardDetails = {'question': question,
        'answer':answer}


            //Update Redux
            if(question !== "" && answer !== "") {
                this.setState( {
                    questionErrorText:'',
                    answerErrorText:'',
                })
                this.props.dispatch( addCard(
                {   title:deckName,
                    cardDetails,
                }
            ))
            console.log('NewCard submit---------Updated Redux',deckName)

            //Navigate to Home
            this.toHome()

            //Save to DB
            addCardToDeck(deckName, cardDetails)
            console.log('NewCard submit---------Save to DB',deckName)
        } else {
            if( question ==="" ) {
                this.setState( {
                questionErrorText:'Please enter a valid question',
            })}
            if( answer ==="" ) {
                this.setState( {
                answerErrorText:'Please enter a valid answer',
            })}
        }

    }
    toHome = () => {
        this.props.navigation.goBack()

    }
    render () {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text>Question</Text>
              <TextInput
                style={{height: 40,width:100, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(question) => this.setState({question})}
                value={this.state.question}
                />
                <Text style={{color:'red'}}>{!this.state.question && this.state.questionErrorText}</Text>

                <Text>Answer</Text>

                <TextInput
                  style={{height: 40,width:100, borderColor: 'gray', borderWidth: 1}}
                  onChangeText={(answer) => this.setState({answer})}
                  value={this.state.answer}
                  />
                  <Text style={{color:'red'}}>{!this.state.answer && this.state.answerErrorText}</Text>

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
export default connect()(NewCard)
