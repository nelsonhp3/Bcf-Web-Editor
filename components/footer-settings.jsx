import React, { useContext } from 'react'

import styles from '../styles/footer-settings.module.css'
import { BcfContext } from '../context/bcf-context'
import { BcfParser } from '@nelsonhp3/bcf-js'

function FooterSettings() {
    const { project,dispatch } = useContext(BcfContext)

    const uploadBCF = async () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.bcf, .bcfzip'

        input.addEventListener('change',async (event) => {
            const file = event.target.files[0]

            try {
                const buffer = await file.arrayBuffer()
                console.log('buffer :>> ', buffer);
                var projectLoad = new BcfParser()
                await projectLoad.read(buffer)
                console.log('projectLoad :>> ', projectLoad);
                dispatch({
                    type: "LOAD_PROJECT_SUCCESS",
                    payload: { project: projectLoad.project },
                })

                // await loadProject(file,dispatch)
            } catch (error) {
                console.error('Error while uploading BCF:',error)
            }
        })

        input.click()
    }

    const downloadBCF = async () => {
        try {
            const buffer = await project.write()
            const blob = new Blob([buffer],{ type: 'application/octet-stream' })

            const downloadLink = document.createElement('a')
            downloadLink.href = URL.createObjectURL(blob)
            downloadLink.download = 'WriterTestNewProject.bcf'
            document.body.appendChild(downloadLink)
            downloadLink.click()
            document.body.removeChild(downloadLink)
        } catch (error) {
            console.error('Error while downloading BCF:',error)
        }
    }

    const openSettings = async () => {

    }

  return (
    <div className={styles.mainContainer}>
        <button className={styles.mainActionButton} onClick={uploadBCF}>Upload BCF</button>
        <button className={styles.mainActionButton} onClick={downloadBCF}>Download BCF</button>
        <button className={styles.mainActionButton} onClick={openSettings}>🔧</button>
    </div>
  )
}

export default FooterSettings