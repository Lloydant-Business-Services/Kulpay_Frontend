import { lastDayOfISOWeek } from "date-fns";
import {stateKeys, BUG_ADDED, BUG_REMOVED, BUG_RESOLVED} from "./actions";

const initialState = {};
initialState[stateKeys.PAGE_CLASS] = '';
initialState[stateKeys.SITE_NAME] = 'Sample React Site';
initialState[stateKeys.SITE_DOMAIN] = 'example.ng';
initialState[stateKeys.DIALOG_TITLE] = null;
initialState[stateKeys.DIALOG_CONTENT] = null;
initialState[stateKeys.DIALOG_ACTION] = null;
initialState[stateKeys.DIALOG_ACTION_TEXT] = 'Ok, Continue';
initialState[stateKeys.SERVICES] = [];
initialState[stateKeys.USER] = {};
initialState[stateKeys.ADD_TO_CART_MODAL_SERVICE] = {};
initialState[stateKeys.SHOW_ADD_TO_CART_MODAL] = false;
initialState[stateKeys.TOAST] = [];
initialState[stateKeys.PRINT_ORDER] = {};

export function reducer(state = initialState, action) {
    let data = {};
    data[action.type] = action.value;
    return JSON.parse(JSON.stringify(Object.assign({}, state, data)));
}
// let lastId = 0;
// export function reducer(state = [], action){
//     if(action.type === BUG_ADDED){
//         return[
//             ...state,
//             {
//                 id:++lastId,
//                 description: action.payload.description,
//                 resolved:false
//             }
//         ]
//     }
//     else if(action.type === BUG_REMOVED){
//         return state.filter(bug => bug.id !== action.payload.id);
//     }
//     else if(action.type === BUG_RESOLVED){
//         var findBug = state.map(bug => 
//             bug.id !== action.payload.id ? bug : {...bug, resolved:true}
//             );
        
//         return findBug;
//     }
//     else{
//         return state;
//     }
// }
export const selectUser = (state) => state.user;
