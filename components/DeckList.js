import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { getDecks } from '../utils/api'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import  Deck  from './Deck'
class DeckList extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        getDecks()
            .then((decklist)=> dispatch(receiveDecks(JSON.parse(decklist))))

    }
    render () {
        const { decks } = this.props
        const colorArray= ['#9b59b6', '#34495e', '#f1c40f', '#e67e22', '#e74c3c', '#bdc3c7', '#2ecc71', '#16a085','#1abc9c', '#3498db']
        return (
            <View style={{ flex: 1, alignItems: 'stretch', justifyContent: 'flex-start' }}>
              {decks && Object.keys(decks).map((deck,index)=>{
                  return (<Deck data={decks[deck]} key={deck} backgroundColor={colorArray[index % 9]} navigation={this.props.navigation}/>)
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
