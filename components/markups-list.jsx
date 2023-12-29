import React,{ useState } from 'react'
import styles from '../styles/markups-list.module.css'

function MarkupsList({markups, onMarkupSelect}) {

    const [selectedMarkup, setSelectedMarkup] = useState(null)

    const handleItemClick = (markup) => {
        setSelectedMarkup(markup)
        onMarkupSelect(markup)
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.markupsList}>
                {markups &&
                    markups.map((markup,i) => (
                        <div className={`pListItem ${selectedMarkup === markup ? "selected" : ""}`} key={i} onClick={() => handleItemClick(markup)}>
                            <div className="pListTitles">
                                <h2>{markup.topic.title}</h2>
                                {/* <CommentsList comments={markup.topic.comments} markup={markup} bcfDispatch={props.bcfDispatch}/> */}
                            </div>
                        </div>
                ))}
            </div>
        </div>
    )
}

export default MarkupsList