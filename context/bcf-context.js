import { createContext,useReducer } from "react"
import { BcfProject } from "@nelsonhp3/bcf-js"

function createDummyProject() {

    const dummyProject = new BcfProject('Random Project')
    const markup1 = dummyProject.newMarkup('clash','active','Pipe clashing with another pipe','Nelson Henrique')
    markup1.topic.description = "Some random description for this markup"
    markup1.topic.labels = ["ARQ","HID"]
    markup1.topic.assigned_to = "Nelson Henrique Paranhos Coelho"
    markup1.topic.due_date = new Date(Date.now()).toLocaleString('en-US',{ day: 'numeric',month: 'long',year: 'numeric' })
    const comment1 = dummyProject.newComment(markup1,'Ok. I will fix it.','Nelson Henrique')

    const markup2 = dummyProject.newMarkup('clash','active','Column in the middle of the room','Nelson Henrique')
    markup2.topic.labels = ["ARQ","EST","ELE","HID"]
    markup2.topic.assigned_to = "Rafael Chaves"
    const comment2 = dummyProject.newComment(markup2,'Moving it to the right.','Nelson Henrique')

    const markup3 = dummyProject.newMarkup('clash','active','Beam below the ceiling','Nelson Henrique')
    const comment3 = dummyProject.newComment(markup3,'Cant be fixed.','Nelson Henrique')
    markup3.topic.labels = ["ARQ","EST","ELE","HID"]
    markup3.topic.due_date = new Date(Date.now()).toLocaleString('en-US',{ day: 'numeric',month: 'long',year: 'numeric' })

    const markup4 = dummyProject.newMarkup('clash','active','Beam below the ceiling','Nelson Henrique')
    const comment4 = dummyProject.newComment(markup4,'Cant be fixed.','Nelson Henrique')
    markup4.topic.assigned_to = "Israel Augusto"

    return dummyProject
}

var INITIAL_STATE = {
    project: createDummyProject(),
}

export async function loadProject(file,dispatcher) {
    console.log('passing loadProject')
    const buffer = await file.arrayBuffer()
    var projectLoad = new BcfProject('')
    await projectLoad.read(buffer)
    console.log('projectLoad :>> ',projectLoad)
    dispatcher({
        type: "LOAD_PROJECT",
        payload: { project: projectLoad },
    })
}

export const BcfContext = createContext(INITIAL_STATE)

export const BcfReducer = (state,action) => {
    const project = state.project

    switch (action.type) {
        case "LOAD_PROJECT":
            if (!action.payload)
                throw new Error('No Payload')
            return { ...state,pendingLoad: action.payload.projectBuffer }

        case "LOAD_PROJECT_SUCCESS":
            console.log('LOAD_PROJECT_SUCCESS payload: ',action.payload)
            return { ...state,project: action.payload.project,pendingLoad: null }

        case "LOAD_PROJECT_FAILURE":
            console.error('Error loading project:',action.error)
            return { ...state,pendingLoad: null }

        case "NEW_COMMENT":
            const newComment = action.payload.comment
            project.newComment(action.payload.markup,newComment.comment,newComment.author,newComment.viewpointId)
            return { ...state }

        case "REMOVE_COMMENT":
            project.removeComment(action.payload.comment.guid)
            return { ...state }

        case "UNLOAD_PROJECT":
            return INITIAL_STATE

        default:
            return state
    }
}

export function BcfContextProvider({ children }) {
    const [state,dispatch] = useReducer(BcfReducer,INITIAL_STATE)

    // useEffect(() => { console.log('state :>> ',state) },[state])

    const value = {
        project: state.project,
        dispatch
    }

    return (
        <BcfContext.Provider value={value}>
            {children}
        </BcfContext.Provider>
    )
}
