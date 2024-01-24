import { AppContextProvider } from '../context/app-settings-context'
import { BcfContextProvider } from '../context/bcf-context'
import { UserContextProvider } from '../context/user-context'

import '../styles/global.css'

export default function MyApp({ Component,pageProps }) {

    return (
        <AppContextProvider>
            <UserContextProvider>
                <BcfContextProvider>
                    <Component {...pageProps} />
                </BcfContextProvider>
            </UserContextProvider>
        </AppContextProvider>
    )
}