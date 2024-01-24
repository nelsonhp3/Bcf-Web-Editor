import React from 'react'
import styles from '../styles/topic.module.css'

function Topic({topic}) {

    return (
        <div className={styles.markupHeader}>
            <h1>{topic.title}</h1>
            <span>{topic.description}</span>
            <div className={styles.assignedToContainer}>
                <span>🙍Assigned To</span>
                <input value={topic.assigned_to}/>
            </div>
            <div className={styles.datesContainer}>
                <div>🕑 Creation Date</div>
                <div>🕑 Modified Date</div>
                <div>🕑 Due Date</div>
                <span>{topic.creation_date ? new Date(topic.creation_date).toLocaleString() : ''}</span>
                <span>{topic.modified_date ? new Date(topic.modified_date).toLocaleString() : ''}</span>
                <span>{topic.due_date ? new Date(topic.due_date).toLocaleString() : ''}</span>
            </div>
            {/* <div className={styles.labelsContainer}>
                <div>Labels</div>
                <input value={topic.assigned_to}/>
            </div> */}
        </div>
    )
}

export default Topic