import React,{ useContext, useEffect,useState } from 'react'
import { UserContext } from '../context/user-context'

const CommentContainer = (props) => {
    
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

    return <div>
        <span>{comment.author}</span>
        <span>{comment.comment}</span>
        <button>Edit Comment</button>
        <button onClick={handleRemoveComment}>Delete Comment</button>
    </div>
}

const CommentsList = (props) => {
    const { markup, bcfDispatch } = props;

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

    const onEnterKeyDown = (e) => {
        if(e.key == 'Enter')
            handleNewComment()
    }

    useEffect(() => {
        if(markup)
            setComments(markup.topic.comments || [])
        else
            setComments([])
    }, [markup])

    if (!markup) {
        return <h1>Select a Markup</h1>
    }

    return (
        <div>
            <div>
                {comments.length > 0 &&
                    comments.map((comment, i) => (
                        <CommentContainer comment={comment} key={i} bcfDispatch={bcfDispatch}/>
                    ))}
            </div>
            <div>
                <input type="text" id={newCommentInputId} onKeyDown={onEnterKeyDown}/>
                <button onClick={handleNewComment}>Add Comment</button>
            </div>
        </div>
    );
};

export default CommentsList