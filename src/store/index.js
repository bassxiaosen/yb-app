import {createStore} from 'redux'
const initialState = {
    isSigned: false,
    address: ''
}

const reducer =  (state = initialState, { type, payload }) => {
    switch (type) {
        case 'CHANGESIGNSTATUS':
            return { ...state, ...payload }
        case 'GETADDRESS':
            return { ...state, ...payload }
        default:
            return state
    }
}

export default createStore(reducer)
