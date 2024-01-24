import React,{ useState } from 'react'
import styles from '../styles/markups-list.module.css'

function labelsList(markup) {
    const labels = markup.topic.labels

    if(labels)
        return (
            <div className={styles.chipsListContainer}>
                <span>Labels</span>
                <div className={styles.labelsList}>
                    {labels.map((label,i) => (<div className={styles.chipItem} key={i}>{label}</div>))}
                </div>
            </div>
            )
}

function MarkupsList({markups, onMarkupSelect}) {

    const [selectedMarkup, setSelectedMarkup] = useState(null)

    const handleItemClick = (markup) => {
        setSelectedMarkup(markup)
        onMarkupSelect(markup)
    }

    return (
        <div className={styles.mainContainer}>
            {markups && markups.map((markup,i) => (
                <div className={`${selectedMarkup === markup ? styles.markupItemSelected : styles.markupItem}`} key={i} onClick={() => handleItemClick(markup)}>
                        <div className={styles.assignedToAndDueDateContainer}>
                        {!markup.topic.assigned_to ? '' :  
                            <div className={styles.chipsListContainer}>
                                <span>Assigned To</span>
                                <div>{markup.topic.assigned_to}</div>
                            </div>  
                        }
                        {!markup.topic.due_date ? '' :  
                            <div className={`${styles.chipsListContainer} ${styles.dueDate}`}>
                                <span>Due Date</span>
                                <div>{markup.topic.due_date}</div>
                            </div>  
                        }
                        </div>
                        <h2>{markup.topic.title}</h2>
                        {labelsList(markup)}
                    </div>
            ))}
        </div>
    )
}

export default MarkupsList