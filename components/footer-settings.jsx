import React, { useContext } from 'react'

import styles from '../styles/footer-settings.module.css'
import { BcfContext } from '../context/bcf-context'

function FooterSettings() {
    const { project,dispatch } = useContext(BcfContext)

    const uploadBCF = async () => {
        const input = document.createElement('input')
        input.type = 'file'

        input.addEventListener('change',async (event) => {
            const file = event.target.files[0]

            try {
                const buffer = await file.arrayBuffer()
                var projectLoad = new BcfProject('')
                await projectLoad.read(buffer)
                projectLoad.newMarkup('clash','open','Pipe clashing a column','Nelson Henrique')
                dispatch({
                    type: "LOAD_PROJECT_SUCCESS",
                    payload: { project: projectLoad },
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

  return (
    <div className={styles.mainContainer}>
        <button onClick={uploadBCF}>Upload BCF</button>
        <button onClick={downloadBCF}>Download BCF</button>
    </div>
  )
}

export default FooterSettings