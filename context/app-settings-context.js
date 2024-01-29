import { createContext,useReducer } from "react"

// DO HERE A LOGIC FOR DIFFERENT COLORS FOR TAGS, ETC...
// CREATE A RANDOMNESS WITH PROJECT GUID AS SEED

var INITIAL_STATE = {
    viewpointSrc: 'https://i.imgur.com/zoVhJ.jpeg',
    uiStates: {
        selectedMarkup: '',
        selectedViewpont: '',
    },
    settings: {
        tagsColors: ''
    }
}

export const AppContext = createContext(INITIAL_STATE)

export const AppReducer = (state,action) => {
    const uiStates = state.uiStates
    const payload = action.payload

    switch (action.type) {
        case "MARKUP_SELECTED":
            if (!payload)
                throw new Error('No Payload')
            return { ...state,pendingLoad: payload.projectBuffer }

        case "SNAPSHOT_SELECTED":
            console.log('payload :>> ',payload)
            return { ...state,viewpointSrc: payload.viewpointSrc }

        case "VIEWPOINT_SELECTED":
            if (!payload)
                throw new Error('No Payload')
            return { ...state,pendingLoad: payload.projectBuffer }

        default:
            return state
    }
}

export function AppContextProvider({ children }) {
    const [state,dispatch] = useReducer(AppReducer,INITIAL_STATE)

    const value = {
        app: state,
        appDispatch: dispatch
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}