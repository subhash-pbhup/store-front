import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Products(props) {

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const BASE_IMG_URL = process.env.REACT_APP_IMG_URL;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${BASE_URL}/products`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [BASE_URL]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    // console.log(products);
    return (
        <>
            <div className="container-fluid pt-5">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5"><span className="px-2">Just Arrived</span></h2>
                </div>
                <div className="row px-xl-5 pb-3">

                    {products.map((res) =>

                        <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={res.image}>
                            <div className="card product-item border-0 mb-4">
                                <Link to={`/product/${res.sku.toLowerCase().replace(/ /g, '-')}/${res.products_id}`} className="btn btn-sm text-dark p-0">

                                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                                        <img style={{ height: "322px" }} className="img-fluid w-100" src={BASE_IMG_URL + res.image} alt="img" />
                                    </div>
                                    <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                                        <h6 className="text-truncate mb-3" style={{ textTransform: "capitalize" }}>{res.products_name}</h6>
                                        <div className="d-flex justify-content-center">
                                            <h6>{res.price}</h6>
                                            <h6 className="text-muted ml-2"><del>{res.price - 100}</del></h6>
                                        </div>
                                    </div>
                                </Link>
                                {/* <div className="card-footer d-flex justify-content-between bg-light border">
                                    <Link to={`/product/${res.sku.toLowerCase().replace(/ /g, '-')}/${res.products_id}`} className="btn btn-sm text-dark p-0"><i className="fa fa-eye" aria-hidden="true"></i>
                                        View Detail</Link>
                                    <Link to="#" onClick={() => props.addtocartbtn(1, res.price, res.sku, res.products_name, BASE_IMG_URL + res.image, res.products_id)} className="btn btn-sm text-dark p-0"><i className="fa fa-shopping-cart" aria-hidden="true"></i>
                                        Add To Cart</Link>
                                </div> */}
                            </div>
                        </div>
                    )}





                </div>
            </div>

        </>

    );
}

export default Products;