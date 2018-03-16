export default function({ dispatch }) {
    return next => action => {
        //if action does not have payload or the payload does not have .then (does not have promise)
        // so we dont care about it, send it on
        if (!action.payload || !action.payload.then) {
            return next(action);
        }

       //Make sure the action's promise resolved
       action.payload
            .then(response => {
                //Create a new action with the old type,
                //but replace the promise with the response data
                const newAction =  {...action, payload: response}
                //Send action to the very top and run thorugh all middlewares again
                dispatch(newAction);
            })
    
    }
}