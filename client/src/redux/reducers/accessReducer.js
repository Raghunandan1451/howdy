import { GLOBALTYPES } from "../actions/globalTypes";

const accessReducer = (state = null, action) => {
    switch (action.type){
        case GLOBALTYPES.ACCESS:
            return action.payload;
        default:
            return state;
    }
}

export default accessReducer