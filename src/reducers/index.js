import {combineReducers} from 'redux';

import boardReducer from './board';
import cardReducer from './card';
import listReducer from './list';
import userReducer from './user';
import commentReducer from './comment';
import modalReducer from './modal';

export const rootReducer = combineReducers({
    boards: boardReducer,
    lists: listReducer,
    cards: cardReducer,
    comments: commentReducer,
    user: userReducer,
    modal: modalReducer
});
