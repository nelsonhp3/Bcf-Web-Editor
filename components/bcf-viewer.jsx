// bcf-viewer.js
import { useContext,useState } from 'react'
import { BcfContext } from '../context/bcf-context'
import MarkupsList from './markups-list'
import NoSSR from 'react-no-ssr'

import styles from '../styles/bcf-viewer.module.css'
import FooterSettings from './footer-settings'
import CommentsList from './comments-list'

function BcfViewer() {
    const { project,dispatch } = useContext(BcfContext)
    const [loading,setLoading] = useState(false)
    const [selectedMarkup, setSelectedMarkup] = useState(null);

    const handleMarkupSelect = (selectedItem) => {
        setSelectedMarkup(selectedItem)
        console.log('SELECTED MARKUP: ',selectedMarkup)
    };

    return (
        <NoSSR>
            <div className={styles.mainContainer}>
                {!project ? <h1>No Project</h1> :
                    <div className={styles.projectMainContainer}>
                        {/* <button onClick={uploadBCF}>Upload BCF</button>
                        <button onClick={downloadBCF}>Download BCF</button> */}
                        <div className={styles.leftColumn}>
                            <h1>Project name: {project.name}</h1>
                            {loading ? ("Loading") : <MarkupsList markups={project.markups} bcfDispatch={dispatch} onMarkupSelect={handleMarkupSelect}/>}
                            <FooterSettings/>
                        </div>
                        <div className={styles.middleColumn}>
                            {loading ? ("Loading") : <CommentsList markup={selectedMarkup} bcfDispatch={dispatch}/>}
                        </div>
                        <div className={styles.rightColumn}>
                            <h1>{selectedMarkup ? selectedMarkup.topic.title : ''}</h1>
                        </div>
                    </div>
                }
            </div>
        </NoSSR>
    )
}

export default BcfViewer
