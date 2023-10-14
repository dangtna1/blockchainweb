import Header from './Header'
import DesktopSideBar from './SideBar'
import Footer from './Footer'
import classes from './DefaultLayout.module.css'

export default function DefaultLayout({ children }) {
    return (
        <>
            <div className={classes.Container}>
                <Header />
                <div className={classes.Main}>
                    <DesktopSideBar />
                    <div className={classes.Content}>
                        <div className={classes.Inner}>{children}</div>
                        <div className='max-h-[130px] w-full'>
                            <Footer />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
