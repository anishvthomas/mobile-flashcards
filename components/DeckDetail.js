import React, { Component } from 'react';
import { StyleSheet, Text, View , Platform, TouchableOpacity} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { white, purple } from '../utils/colors'

function Btn ({title,onPress}) {
    return (
        <TouchableOpacity
        style={ Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn }
        onPress= {onPress}>
        <Text style = {styles.submitBtnText}>{title}</Text>
        </TouchableOpacity>
    )
}
class DeckDetail extends Component {
    static navigationOptions = ({ navigation }) => {
        const { name } = navigation.state.params
        return {
            title: `${name}`
        }
    }
    render () {
        const { name }= this.props.navigation.state.params
        const { deckDetail }= this.props

        return (
            <View style={{ flex: 1}}>
                <View style={styles.deckItem}>
                    <Text style={styles.titleStyle}>{name}</Text>
                    <Text style={styles.cardNumber}>{deckDetail[name] && deckDetail[name].questions.length}</Text>
                    <Btn title='Add Card' onPress={() => this.props.navigation.navigate(
                        'AddCard',
                        {deckName: name}
                    )}/>
                    <Btn title='Start Quiz' onPress={() => this.props.navigation.navigate(
                        'QuizView',
                        {deck: deckDetail[name]}
                    )}/>

                </View>

            </View>
        )
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
            justifyContent: 'center',
            alignItems: 'center',

        },
        titleStyle: {
            fontSize: 25
        },
        cardNumber: {
            fontSize: 18,
            color: '#BBB'
        },
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
export default connect(mapStateToProps)(DeckDetail)
