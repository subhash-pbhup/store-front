import { Outlet } from "react-router-dom";
import Products from "./products/Products";
function Home() {

    return (

        <>
            <Outlet />
            <Products />

        </>

        //Navbar End



    );
}

export default Home;
