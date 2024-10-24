import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Navbar(param) {

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    const [categories, Setcategories] = useState([]);

    useEffect(() => {

        const URL = `${BASE_URL}/categories`;
        const fetchCategories = async () => {
            const response = await fetch(URL);
            const data = await response.json();
            Setcategories(data);

        };

        fetchCategories();
    }, [BASE_URL]);


    const Logout = () => {
        localStorage.removeItem('userdata');
        navigate("/");
    };


    // console.log(param);

    return (

        // Navbar Start
        <>
            {/* {console.log(slider,props.param.img)} */}

            <div className="container-fluid mb-5">
                <div className="row border-top px-xl-5" style={{ backgroundColor: "aliceblue" }}>
                    {/* <div className="col-lg-3 d-none d-lg-block" style={{display:"none"}}>
            <Link to="#" className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style={{ height: '65px', marginTop: '-1px', padding: '0 30px' }}>
                <h6 className="m-0">Categories</h6>
                <i className="fa fa-angle-down text-dark"></i>
            </Link>
            <nav className="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
                <div className="navbar-nav w-100 overflow-hidden">
                    <div className="nav-item dropdown">
                        <Link to="#" className="nav-link" data-toggle="dropdown">Dresses <i className="fa fa-angle-down float-right mt-1"></i></Link>
                        <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                            <Link to="#" className="dropdown-item">Men's Dresses</Link>
                        </div>
                    </div>
                    <Link to="#" className="nav-item nav-link">Shirts</Link>
                    <Link to="#" className="nav-item nav-link">Jeans</Link>
                </div>
            </nav>
        </div> */}
                    <div className="col-lg-12">
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <Link to="#" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0 display-5 font-weight-semi-bold">
                                    <span className="text-primary font-weight-bold border px-3 mr-1">S</span>Mart
                                </h1>
                            </Link>
                            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse" style={{ backgroundColor: "aliceblue" }}>
                                <div className="navbar-nav mr-auto py-0">
                                    <Link to="/" className="nav-item nav-link active">Home</Link>
                                    <Link to="/about" className="nav-item nav-link">About</Link>
                                    <Link to="/contact" className="nav-item nav-link">Contact</Link>
                                    <Link to="/products-list" className="nav-item nav-link">Products</Link>

                                    <div className="nav-item dropdown">
                                        <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown">Products Categories</Link>
                                        <div className="dropdown-menu rounded-0 m-0">
                                            {
                                                categories.map((res,index) =>
                                                    <Link key={index} to={`/collections/${res.name.toLowerCase().replace(/ /g, '-')}/${res.id}`} className="dropdown-item">{res.name.charAt(0).toUpperCase() + "" + res.name.slice(1)}</Link>
                                                )
                                            }

                                        </div>
                                    </div>

                                </div>
                                <div className="navbar-nav ml-auto py-0">
                                    {localStorage.getItem('userdata') ? <div className="nav-item dropdown">
                                        <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user-circle" aria-hidden="true"></i> {param.userdata ? param.userdata.user.name.toUpperCase() : ""}</Link>
                                        <div className="dropdown-menu rounded-0 m-0">
                                            <Link to="/profile" className="dropdown-item"><i className="fa fa-user-circle" aria-hidden="true"></i> My Profile</Link>
                                            <Link to="/orders" className="dropdown-item"><i className="fa fa-th-large" aria-hidden="true"></i> Orders</Link>
                                            <Link to="#" onClick={Logout} className="dropdown-item"><i className="fa fa-sign-in" aria-hidden="true"></i>
                                                Logout</Link>
                                        </div>
                                    </div> : <div className="nav-item dropdown">
                                        <Link to="#" className="nav-link dropdown-toggle" data-toggle="dropdown"><i className="fa fa-user-circle" aria-hidden="true"></i> Login</Link>
                                        <div className="dropdown-menu rounded-0 m-0">
                                            <Link to="/login" className="dropdown-item"><i className="fa fa-user-circle" aria-hidden="true"></i> My Profile</Link>
                                            <Link to="/login" className="dropdown-item"><i className="fa fa-th-large" aria-hidden="true"></i> Orders</Link>
                                            <Link to="/login" className="dropdown-item"><i className="fa fa-sign-in" aria-hidden="true"></i>
                                                Login</Link>
                                        </div>
                                    </div>}



                                </div>
                            </div>
                        </nav>

                    </div>
                </div>
            </div>

            <Outlet />

        </>

        //Navbar End



    );
}

export default Navbar;
