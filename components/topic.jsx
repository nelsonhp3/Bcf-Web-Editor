import React from 'react'
import styles from '../styles/topic.module.css'
import { convertDate } from '../helpers/helper'

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

function ChipButton({value, handleOnClick}){
    return (<div className={styles.chipItem} onClick={handleOnClick}>{value}</div>)
}

function ChipProperty({property}) {
    let value = property.value
    
    if(property.isMultiValues && value && !Array.isArray(value)) //Transform to array if it's just one value
        value = [value]

    //TODO: Predict if the value is array but must be single?
        
    if(property.valueSeparator)
        value = value.split(property.valueSeparator)

    if(property)
        return (
            <div className={styles.chipsListContainer}>
                <span>{property.name}</span>
                <div className={styles.labelsList}>
                    { !value ? <ChipButton value='+'/> : 
                        property.isMultiValues ? 
                            <>
                                {value.map((label,i) => (<ChipButton key={i} value={label}/>))}
                                <ChipButton value='+'/>
                            </> :
                            <ChipButton value={value}/>
                    }
                </div>
            </div>
        )
}

function Topic({topic}) {

    return (
        <div className={styles.topicContainer}>
            <div className={styles.leftColumn}>
                <div className={styles.titleAndDescription}>
                    <h1>{topic.title}</h1>
                    <span className={styles.description}>{topic.description}</span>
                </div>
                <div className={styles.otherProperties}>
                    <ChipProperty property={{name:'Assigned To', value:topic.assigned_to}}/>
                    <div className={styles.topicProperties}>
                        <ChipProperty property={{name:'Topic Type', value:topic.topic_type}}/>
                        <ChipProperty property={{name:'Topic Status', value:topic.topic_status}}/>
                        <ChipProperty property={{name:'Labels', value:topic.labels, isMultiValues:true}}/>
                    </div>
                </div>
            </div>
            <div className={styles.rightColumn}>
                <div className={styles.dateContainer}>
                    <div>Created by</div>
                    <span>{topic.creation_author}</span>
                    <span>{topic.creation_date ? convertDate(topic.creation_date, true) : ''}</span>
                </div>
                <div className={styles.dateContainer}>
                    <div>Modified by</div>
                    <span>{topic.modified_author}</span>
                    <span>{topic.modified_date ? convertDate(topic.modified_date, true) : ''}</span>
                </div>
                <div className={styles.dateContainer}>
                    <div>Due Date</div>
                    <span>{topic.due_date ? convertDate(topic.due_date, true) : ''}</span>
                </div>
            </div>
        </div>
    )
}

export default Topic