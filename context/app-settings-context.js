import { createContext,useReducer } from "react"

// DO HERE A LOGIC FOR DIFFERENT COLORS FOR TAGS, ETC...
// CREATE A RANDOMNESS WITH PROJECT GUID AS SEED

var INITIAL_STATE = {
    settings: {
        tagsColors: ''
    }
}

export const AppContext = createContext(INITIAL_STATE)

export const AppReducer = (state,action) => {

}

export function AppContextProvider({ children }) {
    const [state,dispatch] = useReducer(AppReducer,INITIAL_STATE)

    const value = {
        settings: state.settings,
        appDispatch: dispatch
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}