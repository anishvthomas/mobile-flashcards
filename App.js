import React from 'react';
import { StyleSheet, Text, View , StatusBar} from 'react-native';
import {createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck'
import thunk from 'redux-thunk';
import { Constants } from 'expo'
import { purple, white } from './utils/colors'
import DeckDetail from './components/DeckDetail'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

function AppStatusBar({ backgroundColor, ...props}) {
    return (
        <View style= {{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
        </View>
    )
}

const Tabs = TabNavigator({
    Deck: {
        screen: DeckList,
        navigationOptions: {
            headerTitle: 'Deck',
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                  name={focused ? 'ios-home' : 'ios-home-outline'}
                  size={26}
                  style={{ color: tintColor }}
                />),
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            headerTitle: 'NewDeck',
            tabBarLabel: 'NewDeck',
            tabBarIcon: ({ tintColor, focused }) => (
                <Ionicons
                  name={focused ? 'ios-create' : 'ios-create-outline'}
                  size={26}
                  style={{ color: tintColor }}
                />),
        }
    },

})

const MainNavigator =  StackNavigator({
    Tabs: {
        screen: Tabs
    },
    DeckDetail: {
        screen: DeckDetail
    },
    AddCard: {
        screen: NewCard,
        navigationOptions: {
            title: 'Add Card',
        }
    },
    QuizView: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
        }
    }
})
export default class App extends React.Component {
    componentDidMount () {
        console.log('App componentDidMount')
        setLocalNotification()
    }

  render() {
    return (
    <Provider store={store}>
        <View style={{flex: 1}}>
            <AppStatusBar backgroundColor={purple} barStyle='light-content' />
            <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
