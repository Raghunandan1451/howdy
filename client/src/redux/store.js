import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { thunk } from 'redux-thunk'

import rootReducer from './reducers/index'

import { composeWithDevTools } from 'redux-devtools-extension'

/**
 * Configure the store with Redux Toolkit.
 * Redux Toolkit is a set of syntactic sugar for Redux that helps to write less code.
 */
const store = configureStore({
    reducer: rootReducer, // Root reducer for combining all reducers
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Middleware for async operations
    devTools: composeWithDevTools() // Enable Redux DevTools
})

/**
 * Provider component for Redux.
 * It wraps the application with the Redux store.
 * This makes the store available to all the components.
 */
const DataProvider = ({children}) => {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider
