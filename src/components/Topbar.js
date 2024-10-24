import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

function Topbar(props) {

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const BASE_IMG_URL = process.env.REACT_APP_IMG_URL;


    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const fetchResults = async (query) => {
        try {
            setLoading(true);
            const response = await fetch(`${BASE_URL}/products/search/?query=${query}`);
            const data = await response.json();
            setResults(data);
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery.length > 1) {
            const delayDebounceFn = setTimeout(() => {
                fetchResults(searchQuery);
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        } else {
            setResults([]);
        }
    }, [searchQuery]);

    // console.log(results);
    //  {loading && <p>Loading...</p>} 
    //  {error && <p>{error}</p>} 

    return (

        <>

            <div className="container-fluid sticky-search">
                <div className="row bg-secondary py-2 px-xl-5">
                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="d-inline-flex align-items-center">
                            <Link className="text-dark" to="/contact">FAQs</Link>
                            <span className="text-muted px-2">|</span>
                            <Link className="text-dark" to="#">Help</Link>
                            <span className="text-muted px-2">|</span>
                            <Link className="text-dark" to="#">Support</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center text-lg-right">
                        <div className="d-inline-flex align-items-center">
                            <Link className="text-dark px-2" to="#">
                                <i className="fab fa-facebook-f"></i>
                            </Link>
                            <Link className="text-dark px-2" to="#">
                                <i className="fab fa-twitter"></i>
                            </Link>
                            <Link className="text-dark px-2" to="#">
                                <i className="fab fa-linkedin-in"></i>
                            </Link>
                            <Link className="text-dark px-2" to="#">
                                <i className="fab fa-instagram"></i>
                            </Link>
                            <Link className="text-dark pl-2" to="#">
                                <i className="fab fa-youtube"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center py-3 px-xl-5">
                    <div className="col-lg-3 d-none d-lg-block">
                        <Link to="/" className="text-decoration-none">
                            <h1 className="m-0 display-5 font-weight-semi-bold">
                                <span className="text-primary font-weight-bold border px-3 mr-1">S</span>Mart
                            </h1>
                        </Link>
                    </div>
                    <div className="col-lg-6 col-6 text-left">
                        <form action="">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for products" value={searchQuery} onChange={handleSearch} />
                                <div className="input-group-append">
                                    <span className="input-group-text bg-transparent text-primary">
                                        <i className="fa fa-search" aria-hidden="true"></i>

                                    </span>
                                </div>


                            </div>
                        </form>

                        <div className="product-results">
                            {/* {loading && <p>Loading...</p>} 
                            {error && <p>{error}</p>}    */}

                            {results.map((product, index) => (
                                <Link key={index} style={{ textDecoration: 'none' }} to={`/collections/${product.name.toLowerCase().replace(/ /g, '-')}/${product.categories_id}`}><div key={index} className="product-search-item">
                                    <img src={BASE_IMG_URL + product.image} alt={product.name} style={{ width: '50px', height: '50px' }} /><h3>{product.name}</h3>
                                </div></Link>
                            ))}

                        </div>
                    </div>
                    <div className="col-lg-3 col-6 text-right">
                        {/* <Link to="#" className="btn border">
                            <i className="fa fa-heart" aria-hidden="true"></i>

                            <span className="badge">0</span>
                        </Link> */}
                        <Link to="/cart" className="btn border">
                            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                            <span className="badge">{props.param.cartquty}</span>
                        </Link>
                    </div>
                </div>
            </div>


            <Outlet />

        </>

    );
}

export default Topbar;