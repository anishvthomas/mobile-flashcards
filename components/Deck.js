import React, { Component } from 'react';
import { StyleSheet, Text, View , Platform, TouchableOpacity} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
class Deck extends Component {

    render () {
        const {title, questions }= this.props.data
            return (
            <View style={{ flex: 1}}>
                <TouchableOpacity style={styles.deckItem}
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
            backgroundColor:'#78909c',
            borderColor: '#CCC',
            borderWidth: 1,
            shadowRadius: 6,
            shadowOpacity: .5,
            shadowColor: 'rgba(0,0,0,24)',
            shadowOffset: {
                width: 1,
                height: 5
            }
        },
        titleStyle: {
            fontSize: 25
        },
        cardNumber: {
            fontSize: 18,
            color: '#BBB'
        }}

)
export default connect(mapStateToProps)(Deck)
