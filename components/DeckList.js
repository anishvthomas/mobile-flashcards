import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import  Deck  from './Deck'
import { colorArray } from '../utils/colors'
class DeckList extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
            .then((decklist)=> dispatch(receiveDecks(JSON.parse(decklist))))

    }
    render () {
        const { decks } = this.props
        return (
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-start' }}>
              {decks && Object.keys(decks).map((deck,index)=>{
                  return (<Deck data={decks[deck]} key={deck} backgroundColor={colorArray[index % 9]} navigation={this.props.navigation}/>)
              })}
            </View>
        )
    }
}
const mapStateToProps = (decks) => ({ decks })

export default connect(mapStateToProps)(DeckList)
