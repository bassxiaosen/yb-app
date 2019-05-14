import {createStore} from 'redux'
const initialState = {
    isSigned: false,
    position: '',
    accToken: '',
    userInfo: {}
}

const reducer =  (state = initialState, { type, payload }) => {
    switch (type) {
        case 'CHANGESIGNSTATUS':
            return { ...state, ...payload }
        case 'GETADDRESS':
            return { ...state, ...payload }
        case 'INITTOKEN': 
            return { ...state, ...payload }
        case 'INITUSERINFO': 
            return { ...state, ...payload }
        case 'SAVE_POSITION':
            return { ...state, ...payload }
        default:
            return state
    }
}

export default createStore(reducer)
