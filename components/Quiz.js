import React, { Component } from 'react';
import { StyleSheet, Text, View , Platform, TouchableOpacity} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { white, purple, green, red } from '../utils/colors'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

function CorrectBtn ({title, onPress}) {
    return (
        <TouchableOpacity
        style={ Platform.OS === 'ios' ? styles.iosCorrectBtn : styles.androidCorrectBtn }
        onPress= {onPress}>
        <Text style = {styles.submitBtnText}>{title}</Text>
        </TouchableOpacity>
    )
}
function IncorrectBtn ({title, onPress}) {
    return (
        <TouchableOpacity
        style={ Platform.OS === 'ios' ? styles.iosIncorrectBtn : styles.androidIncorrectBtn }
        onPress= {onPress}>
        <Text style = {styles.submitBtnText}>{title}</Text>
        </TouchableOpacity>
    )
}
function Btn ({title, onPress}) {
    return (
        <TouchableOpacity
        style={ Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
        onPress= {onPress}>
        <Text style = {styles.submitBtnText}>{title}</Text>
        </TouchableOpacity>
    )
}

class Quiz extends Component {
    state = {
        currentQuestion: 0,
        showAnswer:false,
        score:0,

    }

    render () {
        const { deck }= this.props.navigation.state.params
        const numberOfQuestions = deck.questions.length


            if( this.state.currentQuestion < numberOfQuestions)
            {
                return (
                <View style={{ flex: 1}}>
                    <View style={styles.deckItem}>
                        <Text style={styles.cardNumber}>{this.state.currentQuestion+1}/{deck.questions && deck.questions.length}</Text>
                        {
                            this.state.showAnswer ?
                            <View style={styles.quizItem}>
                                <Text style={styles.titleStyle}>{deck.questions[this.state.currentQuestion].answer}</Text>
                                <Btn title='Question' onPress={()=>{this.setState({currentQuestion: this.state.currentQuestion+ 1 } )
                                this.setState({showAnswer: false} )}
                                }/>
                            </View>
                        :
                            <View style={styles.quizItem}>
                                <Text style={styles.titleStyle}>{deck.questions[this.state.currentQuestion].question}</Text>
                                <Btn title='Answer' onPress={()=>(this.setState({showAnswer: true} ))}/>
                            </View>
                        }
                            <CorrectBtn title='Correct' onPress={()=>this.setState({score:this.state.score+1})}/>
                            <IncorrectBtn title='Incorrect' onPress={()=>this.setState({score:this.state.score-1})}/>
                    </View>
            </View>
        )
        }
        else {
            clearLocalNotification()
                .then(setLocalNotification())
            return (
            <View style={styles.deckItem}>
                <Text style={styles.titleStyle}>SCORE</Text>
                <Text style={styles.scoreNumber}>{this.state.score}</Text>
                <Btn title='Retake Quiz' onPress={()=>this.setState({currentQuestion:0})}/>
                <Btn title='Back' onPress={()=>this.props.navigation.goBack()}/>
            </View>
        )
        }

    }


}
function mapStateToProps(state,ownprops) {
    return {
        deckDetail: state
    }
}
const styles = StyleSheet.create(
        {
        deckItem: {
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',

            },
        quizItem: {

            alignSelf:'stretch',
            alignItems: 'center',
            borderColor: '#CCC',
            borderWidth: 1,
            borderRadius: Platform.OS === 'ios' ? 16 : 2,
            marginLeft: 6,
            marginRight: 6,
            shadowRadius: 6,
            shadowOpacity: .5,
            padding:20,
            shadowColor: 'rgba(0,0,0,24)',
            shadowOffset: {
                width: 1,
                height: 5
            }

                },

        titleStyle: {
            fontSize: 22
        },
        cardNumber: {
            fontSize: 18,
            color: '#BBB'
        },
        scoreNumber: {
            fontSize: 22,
            color: purple
        },

        iosSubmitBtn: {
            backgroundColor: purple,
            padding: 10,
            borderRadius: 7,
            height: 45,
            marginLeft: 40,
            marginRight: 40,
            marginTop:10,
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
        iosCorrectBtn: {
            backgroundColor: green,
            padding: 10,
            borderRadius: 7,
            height: 45,
            marginLeft: 40,
            marginRight: 40,
            marginTop:10,
        },
        androidCorrectBtn: {
            backgroundColor: green,
            padding: 10,
            paddingLeft: 30,
            paddingRight: 30,
            borderRadius: 2,
            height: 45,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'flex-end',
        },
        iosIncorrectBtn: {
            backgroundColor: red,
            padding: 10,
            borderRadius: 7,
            height: 45,
            marginLeft: 40,
            marginRight: 40,
            marginTop:10,
        },
        androidIncorrectBtn: {
            backgroundColor: red,
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
    }
)
export default connect(mapStateToProps)(Quiz)
