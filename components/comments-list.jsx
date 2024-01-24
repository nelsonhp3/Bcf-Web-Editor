import React,{ useContext, useEffect,useState } from 'react'
import { UserContext } from '../context/user-context'
import styles from '../styles/comments.module.css'

const Comment = (props) => {
    const { bcfDispatch, bcfProject } = props
    
    const [comment,setComment] = useState(props.comment || [])

    const handleRemoveComment = () => {
        bcfDispatch({
            type: "REMOVE_COMMENT",
            payload: { comment: comment },
        })
    }

    const handleEdit = () => {
        // const newCommentText = document.getElementById(newCommentInputId).value
        // const dispatch = props.bcfDispatch
        // dispatch({
        //     type: "NEW_COMMENT",
        //     payload: { markup: props.markup,newComment: { comment: newCommentText,author: 'Nelson Henrique' } },
        // })
    }

    const handleNewViewpoint = () => {
        // const newCommentText = document.getElementById(newCommentInputId).value
        // const dispatch = props.bcfDispatch
        // dispatch({
        //     type: "NEW_COMMENT",
        //     payload: { markup: props.markup,newComment: { comment: newCommentText,author: 'Nelson Henrique' } },
        // })
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
                            {comment.date ? new Date(comment.date).toLocaleString('en-US',{ day: 'numeric',month: 'long',year: 'numeric' }) : ''}
                        </span>
                        <span className={styles.modifiedDate}>
                            {comment.modified_date}
                        </span>
                    </h3>
                    <div className={styles.commentText}>{comment.comment}</div>
                    <div className={styles.modificationInfoContainer}>
                        <span>❕</span>
                        <span onClick={handleRemoveComment}>modified</span>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button>✏️</button>
                        <button onClick={handleRemoveComment}>🗑️</button>
                    </div>
                </div>
                {
                    !comment.viewpoint ? '' : 
                    <div className={styles.snapshot}>
                        <img src='https://i.imgur.com/wM0AUJQ.jpeg'/>
                    </div>
                }
            </div>
        </li>)
}

const CommentsList = (props) => {
    const { markup, bcfDispatch, bcfProject } = props;

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
                    <Comment comment={comment} key={i} bcfDispatch={bcfDispatch} bcfProject={bcfProject}/>
                ))}
        </div>
    )

    // return (
    //     <div className={styles.commentsListMainContainer}>
    //         <div className={styles.commentsList}>
    //             {comments.length > 0 &&
    //                 comments.map((comment, i) => (
    //                     <Comment comment={comment} key={i} bcfDispatch={bcfDispatch} bcfProject={bcfProject}/>
    //                 ))}
    //         </div>
    //         {/* <div className={styles.newCommentContainer}>
    //             <button onClick={newAttachment}>➕</button>
    //             <input type="text" id={newCommentInputId} onKeyDown={onEnterKeyDown}/>
    //             <button onClick={handleNewComment}>Add Comment</button>
    //         </div> */}
    //     </div>
    // )
};

export default CommentsList