// bcf-viewer.js
import { useContext,useState } from 'react'
import { BcfContext } from '../context/bcf-context'
import MarkupsList from './markups-list'
import NoSSR from 'react-no-ssr'

import styles from '../styles/bcf-viewer.module.css'
import FooterSettings from './footer-settings'
import CommentsList from './comments-list'
import { UserContext } from '../context/user-context'
import Topic from './topic'

function BcfViewer() {
    const { project,bcfDispatch } = useContext(BcfContext)
    const {user} = useContext(UserContext)
    const [loading,setLoading] = useState(false)
    const [selectedMarkup, setSelectedMarkup] = useState(null)

    const handleMarkupSelect = (selectedItem) => {
        setSelectedMarkup(selectedItem)
    }

    const createMarkup = () => {
        const test = bcfDispatch({
            type: "NEW_MARKUP",
            payload: { title: 'New Markup', user_name:user.name },
        })

        console.log('test :>> ', test);


    }

    const newAttachment = () => {
        
    }

    const handleNewComment = () => {
        const newCommentTextInput = 'new-comment-text-input'
        if (!newCommentTextInput || !newCommentTextInput.value) return

        bcfDispatch({
            type: "NEW_COMMENT",
            payload: { markup, comment: { comment: newCommentTextInput.value, author: user.name } },
        })

        newCommentTextInput.value = ''
    }

    const onEnterKeyDown = (e) => {
        // if(e.key == 'Enter')
        //     handleNewComment()
    }

    return (
        <NoSSR>
            <div className={styles.mainContainer}>
                {!project ? <h1>No Project</h1> :
                    <div className={styles.projectMainContainer}>
                        <div className={styles.leftColumn}>
                            <div className={styles.projectHeader}>
                                <img src='./bcf-icon.svg'></img>
                                {!project.name ? <h1>BCF Editor</h1> : <h1>{project.name}</h1>}
                            </div>
                            <button className={styles.mainActionButton} onClick={createMarkup}>➕ New Markup</button>
                            <div className={styles.linearShadow}/>
                            <div className={styles.listMarkups}>
                                {loading ? ("Loading") : <MarkupsList project={project} bcfDispatch={bcfDispatch} onMarkupSelect={handleMarkupSelect}/>}
                            </div>
                            <div className={styles.linearShadow}/>
                            <FooterSettings/>
                        </div>
                        <div className={styles.middleColumn}>
                                {!selectedMarkup ? 
                                    <div className={styles.withoutMarkup}><h1>Select a Markup</h1></div> : 
                                    <div className={styles.withMarkup}>
                                        <Topic topic={selectedMarkup.topic}/>
                                        <div className={styles.commentsList}>
                                            <CommentsList markup={selectedMarkup} bcfDispatch={bcfDispatch} bcfProject={project}/>
                                        </div>
                                        <div className={styles.newCommentContainer}>
                                            <button className={styles.mainActionButton} onClick={newAttachment}>➕</button>
                                            <input type="text" id='new-comment-text-input' onKeyDown={onEnterKeyDown}/>
                                            <button className={styles.mainActionButton} onClick={handleNewComment}>Add Comment</button>
                                        </div>
                                    </div>
                                }
                        </div>
                        <div className={styles.rightColumn}>
                            <img src='./bcf-icon.svg'/>
                        </div>
                    </div>
                }
            </div>
        </NoSSR>
    )
}

export default BcfViewer
