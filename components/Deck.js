import React, { Component } from 'react';
import { StyleSheet, Text, View , Platform, TouchableOpacity} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
class Deck extends Component {

    render () {
        const {title, questions }= this.props.data
        const { backgroundColor }= this.props
        return (
            <View style={{ flex: 1}}>
                <TouchableOpacity style={[styles.deckItem, {'backgroundColor':backgroundColor} ]}
                    onPress={() => this.props.navigation.navigate(
                        'DeckDetail',
                        {name: title}
                    )}>
                    <Text style={styles.titleStyle}>{title}</Text>
                    <Text style={styles.cardNumber}>{questions.length} Cards</Text>
                </TouchableOpacity>
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
            fontSize: 25,
            color: white,
        },
        cardNumber: {
            fontSize: 18,
            color: white
        }}

)
export default connect(mapStateToProps)(Deck)
