import { createContext,useReducer } from "react"

var INITIAL_STATE = {
    user: {
        name: 'NHP3',
        email: 'engnelsonhenrique@gmail.com'
    }
}

export const UserContext = createContext(INITIAL_STATE)

export const UserReducer = (state,action) => {

}

export function UserContextProvider({ children }) {
    const [state,dispatch] = useReducer(UserReducer,INITIAL_STATE)

    const value = {
        user: state.user,
        userDispatch: dispatch
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}