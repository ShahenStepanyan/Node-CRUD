import {createStore} from "redux"


const store = createStore(function (state,action){
   if(action.type === "edit-current-user-name"){
       return  {
           ...state,
           currentUser: {
               name: action.payload.name,
               id: action.payload.id,
               
           }
       }
   }
   return state
}, {
    currentUser: {
        name: "",
        id: "6485d535a2be391c129f5fa2",
    }
})

export default store;