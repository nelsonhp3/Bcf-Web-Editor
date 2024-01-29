import { createContext,useEffect,useReducer } from "react"
import { BcfProject } from "@nelsonhp3/bcf-js"

const randomLongMessage = 'https://www.googleadservices.com/pagead/aclk?sa=L&ai=DChcSEwjx88yTzJSDAxVtRUgAHXRjAOwYABAEGgJjZQ&ase=2&gclid=Cj0KCQiAsvWrBhC0ARIsAO4E6f_Ya1XcCOhJdliI_DsoQIpsAAdwCaRX2RpvLNyFhkfJqAJrUG9tdLIaAsdmEALw_wcB&ohost=www.google.com&cid=CAESVeD2EjcR3wTUJI90O8YKgUyU4epnFrHW776Lgx-jK8GZdYlRTzTBoLRKBYUgtzQfd5Scyd_CWWvjNOzRXhXMS3BC3VU_EV_jnxA5QWsnHMedaWafL8E&sig=AOD64_33-44okF3IjEfPKiAAJmG61QvTUQ&ctype=5&q=&nis=4&ved=2ahUKEwj4lMaTzJSDAxVirpUCHYkGBMIQ9aACKAB6BAgDEBU&adurl='

const ImageComponent = () => {
    const imageUrl = '/cool-cat.jpg' // Change the path to your image in the public folder

    const fetchData = () => {
        return new Promise(async (resolve,reject) => {
            try {
                const response = await fetch(imageUrl)
                const arrayBuffer = await response.arrayBuffer()
                resolve(arrayBuffer)
            } catch (error) {
                console.error('Error fetching image:',error)
                reject(error)
            }
        })
    }

    // fetchData().then((arrayBuffer) => {
    //     console.log('01 arrayBuffer :>> ',arrayBuffer)
    //     return arrayBuffer
    // }).catch((error) => {
    //     // Handle errors
    // })

    return fetchData()
}

function createDummyProject() {
    const imgCoolCat = 'https://i.imgur.com/wM0AUJQ.jpeg'
    const imgWallpaperCity = 'https://images.unsplash.com/photo-1507090960745-b32f65d3113a'

    const dummyProject = new BcfProject('Random Project')
    const markup1 = dummyProject.newMarkup('clash','active','Pipe clashing with another pipe','Nelson Henrique')
    markup1.topic.description = "Some random description for this markup"
    markup1.topic.labels = ["ARQ","HID"]
    markup1.topic.assigned_to = "Nelson Henrique Paranhos Coelho"
    markup1.topic.due_date = new Date(Date.now()).toLocaleString('en-US',{ day: 'numeric',month: 'long',year: 'numeric' })
    const comment1 = dummyProject.newComment(markup1,'Beleza. Vou ajeitar aqui','Rafael Chaves')
    const comment1_2 = dummyProject.newComment(markup1,randomLongMessage,'Israel Augusto',undefined) //TODO: Fix this viewpoint error in bcf-js
    const comment1_3 = dummyProject.newComment(markup1,'Olha esse gato!!!','Nelson Henrique',undefined) //TODO: Fix this viewpoint error in bcf-js
    // const newSnp = dummyProject.newSnapshot(markup1,'')
    // comment1_2.viewpoint = newSnp.guid || 'asdasdjsakdjaslkdj'
    comment1_3.viewpoint = imgCoolCat
    // const { visualizationInfo } = dummyProject.editViewpointInfo(newSnp.guid)
    comment1_2.modified_author = 'Rafael Chaves'
    comment1_2.modified_date = new Date(Date.now()).toLocaleString('en-US',{ day: 'numeric',month: 'long',year: 'numeric' })
    comment1_2.viewpoint = imgWallpaperCity
    markup1.topic.modified_author = comment1_2.modified_author
    markup1.topic.modified_date = comment1_2.modified_date

    const markup2 = dummyProject.newMarkup('clash','active','Column in the middle of the room','Nelson Henrique')
    markup2.topic.labels = ["ARQUITETURA","ESTRUTURAL","ELETRICO","HIDRAULICO","COMPATIBILIZAÇÃO","IMPLANTAÇÃO"]
    markup2.topic.assigned_to = "Rafael Chaves"
    const comment2 = dummyProject.newComment(markup2,'Moving it to the right.','Nelson Henrique')

    const markup3 = dummyProject.newMarkup('clash','active','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec arcu vel felis ultrices varius. Nullam scelerisque justo in nisl tristique, a aliquet nunc rhoncus. Vivamus et tortor diam. Fusce ac purus vitae tellus consectetur luctus. Morbi vel felis in ante tincidunt ultrices nec eu sem. Aenean vel ligula nec mauris viverra consequat. Nullam auctor justo non odio gravida, nec tincidunt ipsum vestibulum','Nelson Henrique')
    const comment3 = dummyProject.newComment(markup3,'Cant be fixed.','Nelson Henrique')
    markup3.topic.labels = ["ARQ","EST","ELE","HID"]
    markup3.topic.due_date = new Date(Date.now()).toLocaleString('en-US',{ day: 'numeric',month: 'long',year: 'numeric' })

    const markup4 = dummyProject.newMarkup('clash','active','One Word Title','Nelson Henrique')
    const comment4 = dummyProject.newComment(markup4,'Cant be fixed.','Nelson Henrique')
    markup4.topic.assigned_to = "Israel Augusto"

    return dummyProject
}

var INITIAL_STATE = {
    project: createDummyProject(),
}

export async function loadProject(file,dispatcher) {
    const buffer = await file.arrayBuffer()
    var projectLoad = new BcfProject('')
    await projectLoad.read(buffer)
    dispatcher({
        type: "LOAD_PROJECT",
        payload: { project: projectLoad },
    })
}

export const BcfContext = createContext(INITIAL_STATE)

export const BcfReducer = (state,action) => {
    const project = state.project
    const payload = action.payload

    switch (action.type) {
        case "LOAD_PROJECT":
            if (!payload)
                throw new Error('No Payload')
            return { ...state,pendingLoad: payload.projectBuffer }

        case "LOAD_PROJECT_SUCCESS":
            console.log('LOAD_PROJECT_SUCCESS payload: ',payload)
            return { ...state,project: payload.project,pendingLoad: null }

        case "LOAD_PROJECT_FAILURE":
            console.error('Error loading project:',action.error)
            return { ...state,pendingLoad: null }

        case "NEW_MARKUP":
            project.newMarkup('clash','active',payload.title,payload.user_name || '')
            return { ...state }

        case "NEW_COMMENT":
            const newComment = payload.comment
            project.newComment(payload.markup,newComment.comment,newComment.author,newComment.viewpointId)
            return { ...state }

        case "REMOVE_COMMENT":
            project.removeComment(payload.comment.guid)
            return { ...state }

        case "PROJECT_UPDATED":
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
        bcfDispatch: dispatch
    }

    return (
        <BcfContext.Provider value={value}>
            {children}
        </BcfContext.Provider>
    )
}
