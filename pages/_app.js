import { BcfContextProvider } from '../context/bcf-context'
import { UserContextProvider } from '../context/user-context'

import '../styles/global.css'

export default function MyApp({ Component,pageProps }) {

    return (
        <UserContextProvider>
            <BcfContextProvider>
                <Component {...pageProps} />
            </BcfContextProvider>
        </UserContextProvider>
    )
}