import React,{ useContext, useEffect,useState } from 'react'
import { UserContext } from '../context/user-context'
import styles from '../styles/comments.module.css'
import { FiAlertCircle } from "react-icons/fi";
import { convertDate } from '../helpers/helper'

const Comment = (props) => {
    const { bcfDispatch, bcfProject, contextUser, appDispatch } = props
    const [comment,setComment] = useState(props.comment || [])
    const [isEditing, setIsEditing] = useState(false)

    const isLink = comment.comment.startsWith('http') || comment.comment.startsWith('www')
    const commentId = `comment-text-${comment.guid}`
    
    const handleRemove = () => {
        bcfDispatch({
            type: "REMOVE_COMMENT",
            payload: { comment: comment },
        })
    }

    const handleEdit = () => {
        const commentBox = document.getElementById(commentId)
        const commentBoxValue = document.getElementById(commentId).textContent
        const inputId = 'comment-edit-text-input'

        if(!isEditing) {
            setIsEditing(true)
            // Create a new anchor element
            var anchorElement = document.createElement('input')
            anchorElement.id = inputId
            //   anchorElement.href = '#'; // Set the href attribute as needed
            anchorElement.value = commentBoxValue // Set the anchor text as needed
    
            if (commentBox) 
                commentBox.parentNode.replaceChild(anchorElement, commentBox)
    
        }
        else {
            const inputBox = document.getElementById(inputId)
            const inputBoxValue = document.getElementById(inputId).textContent
            
            comment.comment =  inputBoxValue
            comment.modified_date = new Date(Date.now()).toUTCString()
            comment.modified_author = contextUser.name

            

            bcfDispatch({type: "PROJECT_UPDATED"})

            setIsEditing(false)
        }
        

    }

    const handleNewViewpoint = () => {
        // const newCommentText = document.getElementById(newCommentInputId).value
        // const dispatch = props.bcfDispatch
        // dispatch({
        //     type: "NEW_COMMENT",
        //     payload: { markup: props.markup,newComment: { comment: newCommentText,author: 'Nelson Henrique' } },
        // })
    }

    const ModifiedTooltip = () => {
        return (
            <div className={styles.modifiedTooltip}>
                <span>{comment.modified_author}</span>
                <span>{convertDate(comment.modified_date, true)}</span>
            </div>
        )
    }

    const handleSnapshotClick = () => {
        appDispatch({type:'SNAPSHOT_SELECTED', payload: {viewpointSrc: comment.viewpoint}})
    }
    
    useEffect(() => {
        setComment(props.comment || [])
    },[props.comment])

    return (
        <li className={styles.commentMainContainer}>
            <div className={styles.comment}>
                <div className={styles.content}>
                    <div className={styles.userPicture}>
                        {comment.author.charAt(0)}
                    </div>
                    <h3 className={styles.header}>
                        <span className={styles.userName}>
                            {comment.author}
                        </span>
                        <span className={styles.createdDate}>
                            {comment.date ? convertDate(comment.date, true) : ''}
                        </span>
                    </h3>
                    <div className={styles.commentText}>
                        {isLink ?
                            <a id={commentId} href={comment.comment} target="_blank" rel="noopener noreferrer">
                              {comment.comment}
                            </a> : 
                            <div id={commentId}>{comment.comment}</div>
                        }    
                    </div>
                    {!comment.modified_date ? '' :
                        <div className={styles.modifiedInfoContainer}>
                            <div className={styles.modifiedAlert} onClick={handleRemove}><FiAlertCircle/>edited </div>
                            <ModifiedTooltip/>
                        </div>
                    }
                    <div className={styles.buttonContainer}>
                        <button className={styles.mainActionButton} onClick={handleEdit}>✏️</button>
                        <button className={styles.mainActionButton} onClick={handleRemove} disabled={!isEditing}>🗑️</button>
                    </div>
                </div>
                {
                    !comment.viewpoint ? '' : 
                    <div className={styles.snapshot} onClick={handleSnapshotClick}>
                        <img src={comment.viewpoint}/>
                    </div>
                }
            </div>
        </li>)
}

const CommentsList = (props) => {
    const { markup, bcfDispatch, bcfProject, contextUser, appDispatch } = props;

    const newCommentInputId = `${markup?.topic.guid}-commentInput`

    const [comments, setComments] = useState([])
    const { user } = useContext(UserContext)

    const handleNewComment = () => {
        const newCommentTextInput = document.getElementById(newCommentInputId)
        if (!newCommentTextInput || !newCommentTextInput.value) return

        bcfDispatch({
            type: "NEW_COMMENT",
            payload: { markup, comment: { comment: newCommentTextInput.value, author: user.name } },
        })

        newCommentTextInput.value = ''
    }

    const newAttachment = () => {
        
    }

    const onEnterKeyDown = (e) => {
        if(e.key == 'Enter')
            handleNewComment()
    }

    useEffect(() => {
        if(markup)
            setComments(markup.topic.comments || [])
        else
            setComments([])
    }, [markup, markup.topic.comments])

    if (!markup) {
        return <h1>Select a Markup</h1>
    }

    return (
        <div className={styles.commentsList}>
            {comments.length > 0 &&
                comments.map((comment, i) => (
                    <Comment comment={comment} key={i} bcfDispatch={bcfDispatch} bcfProject={bcfProject} contextUser={contextUser} appDispatch={appDispatch}/>
                ))}
        </div>
    )
}

export default CommentsList