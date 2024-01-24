import React from 'react'
import styles from '../styles/topic.module.css'

// interface ITopic {
//  ✅ guid: string,
//     server_assigned_id?: string,
//  ✅ topic_type: string,
//  ✅ topic_status: string,
//     reference_links?: string[] | undefined,
//  ✅ title: string,
//     priority?: string,
//     index?: number
//  ✅ labels?: string[] | undefined,
//  ✅ creation_date: Date,
//     creation_author: string,
//  ✅ modified_date?: Date,
//     modified_author?: string,
//  ✅ due_date?: Date
//  ✅ assigned_to?: string,
//     stage?: string,
//  ✅ description?: string,
//     bim_snippets?: IBimSnippet[] | undefined,
//     document_references?: IDocumentReference[] | undefined,
//     related_topics?: string[] | undefined,
//  ✅ comments?: IComment[] | undefined,
//     viewpoints?: IViewPoint[] | undefined ,
// }

function ChipProperty({property}) {
    let value = property.value
    if(property.isMultiValues && !Array.isArray(value))
        value = [value]

    if(property.valueSeparator)
        value = value.split(property.valueSeparator)

    if(property)
        return (
            <div className={styles.chipsListContainer}>
                <span>{property.name}</span>
                <div className={styles.labelsList}>
                    {property.isMultiValues ? 
                        <>
                            {value.map((label,i) => (<div className={styles.chipItem} key={i}>{label}</div>))}
                            <div className={styles.chipItem}>+</div>
                        </> :
                        <div className={styles.chipItem}>{value}</div>
                    }
                </div>
            </div>
        )
}

function Topic({topic}) {

    return (
        <div className={styles.markupHeader}>
            <h1>{topic.title}</h1>
            <span>{topic.description}</span>
            <ChipProperty property={{name:'Assigned To', value:topic.assigned_to}}/>
            <div className={styles.topicProperties}>
                <ChipProperty property={{name:'Topic Type', value:topic.topic_type}}/>
                <ChipProperty property={{name:'Topic Status', value:topic.topic_status}}/>
                <ChipProperty property={{name:'Labels', value:topic.labels, isMultiValues:true}}/>
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