import { GLOBALTYPES } from '../actions/globalTypes'

const friendIdReducer = (state = '', action) => {
    switch (action.type){
        case GLOBALTYPES.FRIEND:
            return action.payload;
        default:
            return state;
    }
}


export default friendIdReducer
