import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import  Deck  from './Deck'
class DeckList extends Component {

    componentDidMount() {
        console.log('Decks- componentDidMount')
        const { dispatch } = this.props
        getDecks()
            .then((decklist)=> dispatch(receiveDecks(JSON.parse(decklist))))

    }
    render () {
        const { decks } = this.props
        return (
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-start' }}>
              {decks && Object.keys(decks).map((deck)=>{
                  return (<Deck data={decks[deck]} key={deck} navigation={this.props.navigation}/>)
              })}
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        decks:state
    }
}
export default connect(mapStateToProps)(DeckList)
