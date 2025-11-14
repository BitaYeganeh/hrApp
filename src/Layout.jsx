import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";



const Layout = () => {
    return (
        <div>
            <Header />
            <div style={{width:"100%", height: "85vh"}}>
                <Outlet />{/* This is where page content will appear */}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;