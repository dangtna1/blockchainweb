import Header from "./Header";
import SideBar from "./SideBar";

export default function DefaultLayout({ children }) {
    return (
        <div className="flex bg-greyscale-50">
            <SideBar></SideBar>
            <div className="w-full flex flex-col">
                <Header></Header>
                <div className="w-full py-6 px-8">
                    {children}
                </div>
            </div>
        </div>
    )
}