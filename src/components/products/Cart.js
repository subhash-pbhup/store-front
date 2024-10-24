import { Link } from "react-router-dom";
import empty_cart_image from "../../img/empty-cart.png";

function Cart(props) {
    const shipping_cost = 10;
    const tax = 18;

    const apply_coupon= ()=> alert("Coupon Not Available");
  
    return (

        <>

            {/* Page Header Start */}
            <div className="container-fluid bg-secondary">
                <div className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: '100px' }}>


                    <h1 className="font-weight-semi-bold text-uppercase mb-3">Cart Detail</h1>
                    <div className="d-inline-flex">
                        <p className="m-0">
                            <Link to="/">Home</Link>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Cart Detail</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}


            <div className="container-fluid pt-5">
                {Object.keys(props.cartdata.addtocart_data).length === 0 ?

                    <div className="row px-xl-5">
                        <div className="col-lg-12" style={{ textAlign: "center" }}>
                            <h4>Hey! No items in your cart</h4>
                            <img src={empty_cart_image} alt={empty_cart_image} />
                        </div>

                    </div>
                    :
                    <div className="row px-xl-5">
                        <div className="col-lg-8 table-responsive mb-5">
                            <table className="table table-bordered text-center mb-0">
                                <thead className="bg-secondary text-dark">
                                    <tr>
                                        <th colSpan={2}>Products</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody className="align-middle">
                                    {props.cartdata.addtocart_data.map((res, id) =>

                                        <tr key={id}>
                                            <td className="align-middle">
                                                <img
                                                    alt=""
                                                    src={res.img}
                                                    style={{
                                                        width: '50px'
                                                    }}
                                                />
                                                {' '}
                                            </td>

                                            <td className="align-middle" style={{ textTransform: 'capitalize' }}>
                                                <Link to={`/product/${res.sku.toLowerCase().replace(/ /g, '-')}/${res.pid}`}>{res.name}</Link>
                                            </td>



                                            <td className="align-middle">
                                                {res.price}
                                            </td>
                                            <td className="align-middle">
                                                <div
                                                    className="input-group quantity mx-auto"
                                                    style={{
                                                        width: '100px'
                                                    }}
                                                >
                                                    <div className="input-group-btn">
                                                        <button className="btn btn-sm btn-primary btn-minus" onClick={() => props.cartdata.decrementCounter(id)}>
                                                            <i className="fa fa-minus" />
                                                        </button>
                                                    </div>
                                                    <input
                                                        className="form-control form-control-sm bg-secondary text-center"
                                                        value={res.qty}
                                                        // defaultValue={res.qty}
                                                        onChange={(e) => e.target.value}
                                                        type="text"
                                                    />


                                                    <div className="input-group-btn">
                                                        <button className="btn btn-sm btn-primary btn-plus" onClick={() => props.cartdata.incrementCounter(id)}>
                                                            <i className="fa fa-plus" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="align-middle">
                                                {(res.qty * res.price).toFixed(2)}
                                            </td>
                                            <td className="align-middle">
                                                <button onClick={() => props.cartdata.removebtn(id)} className="btn btn-sm btn-primary">
                                                    <i className="fa fa-times" />
                                                </button>
                                            </td>
                                        </tr>

                                    )}

                                </tbody>
                            </table>
                        </div>
                        <div className="col-lg-4">
                            {/* <form
                                action=""
                                className="mb-5"
                            > */}
                                <div className="input-group mb-5">
                                    <input
                                        className="form-control p-4"
                                        placeholder="Coupon Code"
                                        type="text"
                                        required
                                    />
                                    <div className="input-group-append">
                                        <button className="btn btn-primary" onClick={apply_coupon}>
                                            Apply Coupon
                                        </button>
                                    </div>
                                </div>
                            {/* </form> */}
                            <div className="card border-secondary mb-5">
                                <div className="card-header bg-secondary border-0">
                                    <h4 className="font-weight-semi-bold m-0">
                                        Cart Summary
                                    </h4>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between mb-3 pt-1">
                                        <h6 className="font-weight-medium">
                                            Subtotal
                                        </h6>
                                        <h6 className="font-weight-medium">
                                            {props.cartdata.subtotal.toFixed(2)}
                                        </h6>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3 pt-1">
                                        <h6 className="font-weight-medium">
                                            Tax
                                        </h6>
                                        <h6 className="font-weight-medium">
                                            ({tax}%) {(props.cartdata.subtotal / 100 * tax).toFixed(2)}
                                        </h6>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <h6 className="font-weight-medium">
                                            Shipping
                                        </h6>
                                        <h6 className="font-weight-medium">
                                            {shipping_cost.toFixed(2)}
                                        </h6>
                                    </div>
                                </div>
                                <div className="card-footer border-secondary bg-transparent">
                                    <div className="d-flex justify-content-between mt-2">
                                        <h5 className="font-weight-bold">
                                            Total
                                        </h5>
                                        <h5 className="font-weight-bold">
                                            {(props.cartdata.subtotal + props.cartdata.subtotal / 100 * tax + shipping_cost).toFixed(2)}
                                        </h5>
                                    </div>
                                    <Link to={"/checkout"} className="btn btn-block btn-primary my-3 py-3">
                                        Proceed To Checkout
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>


        </>

    );
}

export default Cart;