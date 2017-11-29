import { RECEIVE_DECKS, ADD_DECK, ADD_CARD  }  from '../actions'
function deck( state = {} , action ) {
        switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...action.decks,
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deckEntry,
            }
        case ADD_CARD:
        let deck= {[action.deckEntry.title]: state[action.deckEntry.title]}
        deck[action.deckEntry.title].questions.push(action.deckEntry.cardDetails)
         return {
                ...state,
                ...deck,
                //...state[action.deckEntry.title].questions.push(action.deckEntry.cardDetails),
            }
        default: return state
    }
}

export default deck
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
  }
*/
