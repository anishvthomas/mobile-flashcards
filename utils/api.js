import { AsyncStorage } from 'react-native'
export const MOBFLASHCARD_STORAGE_KEY = 'mobile-flashcards1:deck'

/*
    take in a single title argument and add it to the decks
*/
export function saveDeckTitle(deckName) {
    return AsyncStorage.mergeItem(MOBFLASHCARD_STORAGE_KEY,JSON.stringify({
        [deckName]:{
            title:deckName,
            questions: []
        }
    }))
}

/*
    return all of the decks along with their titles, questions, and answers
*/
export function getDecks() {
    return AsyncStorage.getItem(MOBFLASHCARD_STORAGE_KEY,(results) =>{
        console.log('getDecks',JSON.parse(results))

        return JSON.parse(results)
    })
}

/*
    take in a single id argument and return the deck associated with that id.
*/
export function getDeck(id) {
    return AsyncStorage.getItem(MOBFLASHCARD_STORAGE_KEY,(results) =>{
        return JSON.parse(results)
    })
}

/*
    take in two arguments, title and card,
    and will add the card to the list of questions for the deck with the associated title
*/
export function addCardToDeck( title, card ) {
    return AsyncStorage.getItem(MOBFLASHCARD_STORAGE_KEY)
    .then((results)=> {
        //console.log('addCardToDeck- title',title)
        //console.log('addCardToDeck- card',card)

        //console.log('addCardToDeck1',JSON.parse(results))
        let myDeckData = JSON.parse(results)[title]
        //console.log('addCardToDeck2',myDeckData)
        myDeckData.questions.push(card)
    //    console.log('addCardToDeck3',myDeckData)
        AsyncStorage.mergeItem(MOBFLASHCARD_STORAGE_KEY,JSON.stringify({[title]:myDeckData}))
    })

}

/*
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

*/
