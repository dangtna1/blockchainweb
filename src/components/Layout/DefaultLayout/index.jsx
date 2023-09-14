import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer"
import classes from './DefaultLayout.module.css'

export default function DefaultLayout({ children }) {
    return (
        <>  
            <div className={classes.Container}>
                <Header/>
                <div className={classes.Main}>
                    <SideBar/>
                    <div className={classes.Content}>
                        <div className={classes.Inner}>
                            {children}
                        </div>
                        <div className="min-h-[130px] w-full">
                            <Footer/>
                        </div>   
                    </div>
                </div>
            </div>


        </>

    )
}