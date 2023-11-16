import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { WalletAccountsContext } from '../../../../context/WalletAccountsContext'
import classes from './Header.module.css'

export default function Header() {
    const { currentAccount, connectWallet } = useContext(WalletAccountsContext)

    return (
        <div className={classes.header}>
            <div className={classes.inner}>
                <div className={classes.title}>
                    <FontAwesomeIcon icon='fa-solid fa-arrow-trend-down' className='mr-8' />
                    Block by Block <FontAwesomeIcon icon='fa-solid fa-shield-halved' className='mx-2'/> Shielding
                    the Future
                    <FontAwesomeIcon icon='fa-solid fa-arrow-trend-up' className='ml-8' />
                </div>
                <div className={classes.profile}>
                    {!currentAccount && (
                        <button
                            type='button'
                            onClick={connectWallet}
                            className='self-end p-2 laptop:px-4 laptop:py-3 rounded-xl hover:opacity-70 w-36 bg-emerald-950'
                        >
                            <p className={classes.text}>Connect Wallet</p>
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
