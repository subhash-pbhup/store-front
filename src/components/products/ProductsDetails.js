import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';

function Products_details(props) {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const BASE_IMG_URL = process.env.REACT_APP_IMG_URL;

    const { id } = useParams();
    const [products, Setproducts] = useState([]);
    const [counter, setCounter] = useState(1);

    const incrementCounter = () => {
        setCounter(counter + 1);
    };

    const decrementCounter = () => {
        if (counter !== 1) {
            setCounter(counter - 1);

        }
    };

    useEffect(() => {
        setTimeout(() => {
            fetch(`${BASE_URL}/products/${id}/`).then((x) => x.json()).then((res) => Setproducts(res)).catch((err) => console.log(err));
        }, 100)
    }, [BASE_URL, id])

    // console.log(props);
    return (

        <>

            {/* Page Header Start */}
            <div className="container-fluid bg-secondary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: '100px' }}>


                    <h1 className="font-weight-semi-bold text-uppercase mb-3">Shop Detail</h1>
                    <div className="d-inline-flex">
                        <p className="m-0">
                            <Link to="/">Home</Link>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Shop Detail</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            {/* Shop Detail Start */}

            {products.map((res) =>
                <div className="container-fluid py-5" key={res.id}>
                    <div className="row px-xl-5">
                        <div className="col-lg-5 pb-5">
                            <div id="product-carousel" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner border">
                                    <div className="carousel-item active">
                                        <img className="w-100 h-100" src={BASE_IMG_URL + res.image} alt="img" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="w-100 h-100" src={BASE_IMG_URL + res.image} alt="img" />
                                    </div>

                                    <div className="carousel-item">
                                        <img className="w-100 h-100" src={BASE_IMG_URL + res.image} alt="img" />
                                    </div>

                                </div>
                                <Link className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                                    <i className="fa fa-2x fa-angle-left text-dark"></i>
                                </Link>
                                <Link className="carousel-control-next" href="#product-carousel" data-slide="next">
                                    <i className="fa fa-2x fa-angle-right text-dark"></i>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-7 pb-5">
                            <h3 className="font-weight-semi-bold">{res.products_name}</h3>
                            <div className="d-flex mb-3">
                                <div className="text-primary mr-2">
                                    <small className="fas fa-star"></small>
                                    <small className="fas fa-star"></small>
                                    <small className="fas fa-star"></small>
                                    <small className="fas fa-star-half-alt"></small>
                                    <small className="far fa-star"></small>
                                </div>
                                <small className="pt-1">(50 Reviews)</small>
                            </div>
                            <h3 className="font-weight-semi-bold mb-4">{res.price}</h3>
                            <p className="mb-4">
                                {res.products_description}
                            </p>
                            {/* <div className="d-flex mb-3">
                                <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
                                <form>
                                    {['XS', 'S', 'M', 'L', 'XL'].map((size, index) => (
                                        <div className="custom-control custom-radio custom-control-inline" key={index}>
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                id={`size-${index + 1}`}
                                                name="size"
                                            />
                                            <label className="custom-control-label" htmlFor={`size-${index + 1}`}>
                                                {size}
                                            </label>
                                        </div>
                                    ))}
                                </form>
                            </div> */}
                            {/* <div className="d-flex mb-4">
                                <p className="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
                                <form>
                                    {['Black', 'White', 'Red', 'Blue', 'Green'].map((color, index) => (
                                        <div className="custom-control custom-radio custom-control-inline" key={index}>
                                            <input
                                                type="radio"
                                                className="custom-control-input"
                                                id={`color-${index + 1}`}
                                                name="color"
                                            />
                                            <label className="custom-control-label" htmlFor={`color-${index + 1}`}>
                                                {color}
                                            </label>
                                        </div>
                                    ))}
                                </form>
                            </div> */}
                            <div className="d-flex align-items-center mb-4 pt-2">
                                <div className="input-group quantity mr-3" style={{ width: '130px' }}>
                                    <div className="input-group-btn">
                                        <button className="btn btn-primary btn-minus" onClick={decrementCounter}>
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                    <input type="text" value={counter} onChange={(e) => setCounter(e.target.value)} className="form-control bg-secondary text-center" />

                                    <div className="input-group-btn" onClick={incrementCounter}>
                                        <button className="btn btn-primary btn-plus">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <Link to="/cart" onClick={() => props.addtocartbtn.addtocart_pro(counter, res.price, res.sku, res.products_name, BASE_IMG_URL + res.image, res.products_id)} className="btn btn-primary px-3">
                                    <i className="fa fa-shopping-cart mr-1"></i> Add To Cart
                                </Link>
                            </div>
                            <div className="d-flex pt-2">
                                <p className="text-dark font-weight-medium mb-0 mr-2">Share on:</p>
                                <div className="d-inline-flex">
                                    {['facebook-f', 'twitter', 'linkedin-in', 'pinterest'].map((social, index) => (
                                        <Link className="text-dark px-2" href="" key={index}>
                                            <i className={`fab fa-${social}`}></i>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="row px-xl-5">
                        <div className="col">
                            <div className="nav nav-tabs justify-content-center border-secondary mb-4">
                                {['Description', 'Information', 'Reviews (0)'].map((tab, index) => (
                                    <Link
                                        className={`nav-item nav-link ${index === 0 ? 'active' : ''}`}
                                        data-toggle="tab"
                                        href={`#tab-pane-${index + 1}`}
                                        key={index}
                                    >
                                        {tab}
                                    </Link>
                                ))}
                            </div>
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="tab-pane-1">
                                    <h4 className="mb-3">Product Description</h4>
                                    {res.products_description}
                                </div>
                                <div className="tab-pane fade" id="tab-pane-2">
                                    <h4 className="mb-3">Additional Information</h4>
                                    <p>
                                        Eos no lorem eirmod diam diam, eos elitr et gubergren diam sea. Consetetur vero
                                        aliquyam invidunt duo dolores et duo sit. Vero diam ea vero et dolore rebum, dolor
                                        rebum eirmod consetetur invidunt sed sed et, lorem duo et eos elitr.
                                    </p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item px-0">Sit erat duo lorem duo ea consetetur.</li>
                                                <li className="list-group-item px-0">
                                                    Amet kasd gubergren sit sanctus et lorem eos.
                                                </li>
                                                <li className="list-group-item px-0">
                                                    Duo amet accusam eirmod nonumy stet et eirmod.
                                                </li>
                                                <li className="list-group-item px-0">Takimata ea clita labore amet ipsum.</li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item px-0">Sit erat duo lorem duo ea consetetur.</li>
                                                <li className="list-group-item px-0">
                                                    Amet kasd gubergren sit sanctus et lorem eos.
                                                </li>
                                                <li className="list-group-item px-0">
                                                    Duo amet accusam eirmod nonumy stet et eirmod.
                                                </li>
                                                <li className="list-group-item px-0">Takimata ea clita labore amet ipsum.</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="tab-pane-3">
                                    <h4 className="mb-3">Reviews</h4>
                                    <p>No reviews yet.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
            {/* Shop Detail End */}
        </>



    );
}

export default Products_details;