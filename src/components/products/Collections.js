import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';


function Collections() {

  const { id } = useParams();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const BASE_IMG_URL = process.env.REACT_APP_IMG_URL;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect( () => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/collections/?query=${id}`);
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
  }, [BASE_URL, id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // console.log(products, id)


  return (
    <>
      {/* Page Header Start */}
      <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: '100px' }}>


          <h1 className="font-weight-semi-bold text-uppercase mb-3">Collections</h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <Link to="/">Home</Link>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Collections</p>
          </div>
        </div>
      </div>
      {/* Page Header End */}


      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-3 col-md-12" style={{ display: "none" }}>
            <div className="border-bottom mb-4 pb-4">
              <h5 className="font-weight-semi-bold mb-4">
                Filter by price
              </h5>
              <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    defaultChecked
                    id="price-all"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-all"
                  >
                    All Price
                  </label>
                  <span className="badge border font-weight-normal">
                    1000
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    id="price-1"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-1"
                  >
                    $0 - $100
                  </label>
                  <span className="badge border font-weight-normal">
                    150
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    id="price-2"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-2"
                  >
                    $100 - $200
                  </label>
                  <span className="badge border font-weight-normal">
                    295
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    id="price-3"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-3"
                  >
                    $200 - $300
                  </label>
                  <span className="badge border font-weight-normal">
                    246
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    id="price-4"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-4"
                  >
                    $300 - $400
                  </label>
                  <span className="badge border font-weight-normal">
                    145
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                  <input
                    className="custom-control-input"
                    id="price-5"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-5"
                  >
                    $400 - $500
                  </label>
                  <span className="badge border font-weight-normal">
                    168
                  </span>
                </div>
              </form>
            </div>
            <div className="border-bottom mb-4 pb-4">
              <h5 className="font-weight-semi-bold mb-4">
                Filter by color
              </h5>
              <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    defaultChecked
                    id="color-all"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="price-all"
                  >
                    All Color
                  </label>
                  <span className="badge border font-weight-normal">
                    1000
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    id="color-1"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="color-1"
                  >
                    Black
                  </label>
                  <span className="badge border font-weight-normal">
                    150
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    id="color-2"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="color-2"
                  >
                    White
                  </label>
                  <span className="badge border font-weight-normal">
                    295
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    id="color-3"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="color-3"
                  >
                    Red
                  </label>
                  <span className="badge border font-weight-normal">
                    246
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    id="color-4"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="color-4"
                  >
                    Blue
                  </label>
                  <span className="badge border font-weight-normal">
                    145
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                  <input
                    className="custom-control-input"
                    id="color-5"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="color-5"
                  >
                    Green
                  </label>
                  <span className="badge border font-weight-normal">
                    168
                  </span>
                </div>
              </form>
            </div>
            <div className="mb-5">
              <h5 className="font-weight-semi-bold mb-4">
                Filter by size
              </h5>
              <form>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    defaultChecked
                    id="size-all"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="size-all"
                  >
                    All Size
                  </label>
                  <span className="badge border font-weight-normal">
                    1000
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    id="size-1"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="size-1"
                  >
                    XS
                  </label>
                  <span className="badge border font-weight-normal">
                    150
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    id="size-2"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="size-2"
                  >
                    S
                  </label>
                  <span className="badge border font-weight-normal">
                    295
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    id="size-3"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="size-3"
                  >
                    M
                  </label>
                  <span className="badge border font-weight-normal">
                    246
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                  <input
                    className="custom-control-input"
                    id="size-4"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="size-4"
                  >
                    L
                  </label>
                  <span className="badge border font-weight-normal">
                    145
                  </span>
                </div>
                <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                  <input
                    className="custom-control-input"
                    id="size-5"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="size-5"
                  >
                    XL
                  </label>
                  <span className="badge border font-weight-normal">
                    168
                  </span>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <div className="row pb-3">
              <div className="col-12 pb-1"  style={{display:"none"}}>
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <form action="">
                    <div className="input-group">
                      <input
                        className="form-control"
                        placeholder="Search by name"
                        type="text"
                      />
                      <div className="input-group-append">
                        <span className="input-group-text bg-transparent text-primary">
                          <i className="fa fa-search" />
                        </span>
                      </div>
                    </div>
                  </form>
                  <div className="dropdown ml-4">
                    <button
                      aria-expanded="false"
                      aria-haspopup="true"
                      className="btn border dropdown-toggle"
                      data-toggle="dropdown"
                      id="triggerId"
                      type="button"
                    >
                      Sort by
                    </button>
                    <div
                      aria-labelledby="triggerId"
                      className="dropdown-menu dropdown-menu-right"
                    >
                      <Link
                        className="dropdown-item"
                        to="#"
                      >
                        Latest
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                      >
                        Popularity
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                      >
                        Best Rating
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* products */}

              {products.map((res) =>

<div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={res.image}>
    <div className="card product-item border-0 mb-4">
        <Link to={`/product/${res.sku.toLowerCase().replace(/ /g, '-')}/${res.products_id}`} className="btn btn-sm text-dark p-0">

            <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                <img style={{ height: "322px" }} className="img-fluid w-100" src={BASE_IMG_URL + res.image} alt="img" />
            </div>
            <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                <h6 className="text-truncate mb-3" style={{textTransform:"capitalize"}}>{res.products_name}</h6>
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

              {/* products */}

              <div className="col-12 pb-1"  style={{display:"none"}}>
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center mb-3">
                    <li className="page-item disabled">
                      <Link
                        aria-label="Previous"
                        className="page-link"
                        to="#"
                      >
                        <span aria-hidden="true">
                          «
                        </span>
                        <span className="sr-only">
                          Previous
                        </span>
                      </Link>
                    </li>
                    <li className="page-item active">
                      <Link
                        className="page-link"
                        to="#"
                      >
                        1
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link
                        className="page-link"
                        to="#"
                      >
                        2
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link
                        className="page-link"
                        to="#"
                      >
                        3
                      </Link>
                    </li>
                    <li className="page-item">
                      <Link
                        aria-label="Next"
                        className="page-link"
                        to="#"
                      >
                        <span aria-hidden="true">
                          »
                        </span>
                        <span className="sr-only">
                          Next
                        </span>
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );
}

export default Collections;