import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function OrderDetails(props) {

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const { id } = useParams();
    const [orders, Setorders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${BASE_URL}/orders/${id}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                Setorders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [BASE_URL, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // console.log(orders, props);

    // return
    return (

        <>

            {/* Page Header Start */}
            <div className="container-fluid bg-secondary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: '100px' }}>
                    <h1 className="font-weight-semi-bold text-uppercase mb-3">Order details</h1>

                    <div className="d-inline-flex">
                        <p className="m-0">
                            <Link to="/">Home</Link>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Order details</p>

                    </div>
                </div>
            </div>
            {/* Page Header End */}


            <div className="container-fluid">
                <div className="row px-xl-5">
                    <div className="col-lg-12 table-responsive mb-5 border-secondary">
                        <h4 className="mb-5">Order #{orders.order_number} was placed on {orders.order_date} and is currently <span style={{ textTransform: "capitalize" }}>{orders.status}</span>.</h4>
                        <div className="container-fluid text-dark card border-secondary">

                            <div className="row px-xl-5">
                                <div className="col-lg-6 col-md-12 mb-5 pr-3 pr-xl-5">

                                    <h5 className="font-weight-bold text-dark mb-4">Billing address</h5>

                                    <p className="mb-2">
                                        <i className="fa fa-map-marker-alt text-primary mr-3"></i>{props.userdata.user.address}
                                    </p>
                                    <p className="mb-2">
                                        <i className="fa fa-envelope text-primary mr-3"></i>{props.userdata.user.email}
                                    </p>
                                    <p className="mb-0">
                                        <i className="fa fa-phone-alt text-primary mr-3"></i>{props.userdata.user.mobile}
                                    </p>
                                </div>

                                <div className="col-lg-6 col-md-12 mb-5 pr-3 pr-xl-5">

                                    <h5 className="font-weight-bold text-dark mb-4">Shipping address</h5>
                                    <p className="mb-2">
                                        <i className="fa fa-map-marker-alt text-primary mr-3"></i>{orders.shipping_address}
                                    </p>
                                    <p className="mb-2">
                                        <i className="fa fa-envelope text-primary mr-3"></i>{props.userdata.user.email}
                                    </p>
                                    <p className="mb-0">
                                        <i className="fa fa-phone-alt text-primary mr-3"></i>{props.userdata.user.mobile}
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="col-lg-12 table-responsive">
                        <table className="table table-bordered text-center mb-0">
                            <thead className="bg-secondary text-dark">
                                <tr>
                                    <th colSpan={2}>Products</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {JSON.parse(orders.order_items).map((res, id) =>
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
                                            <Link to={`/product/${res.name.toLowerCase().replace(/ /g, '-')}/${res.pid}`}>{res.name}</Link>
                                        </td>

                                        <td className="align-middle">
                                            {res.qty}
                                        </td>

                                        <td className="align-middle">
                                            {(res.qty * res.price).toFixed(2)}
                                        </td>

                                    </tr>

                                )}

                            </tbody>
                        </table>
                    </div>
                    <div className="col-lg-12">

                        <div className="card border-secondary">

                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">
                                        Subtotal
                                    </h6>
                                    <h6 className="font-weight-medium">
                                        {orders.subtotal}
                                    </h6>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">
                                        Tax
                                    </h6>
                                    <h6 className="font-weight-medium">
                                        ({Number(orders.tax)}%) {(orders.subtotal / 100 * Number(orders.tax)).toFixed(2)}
                                    </h6>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <h6 className="font-weight-medium">
                                        Shipping
                                    </h6>
                                    <h6 className="font-weight-medium">
                                        {orders.shipping_cost}
                                    </h6>
                                </div>


                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <div className="d-flex justify-content-between mt-2">
                                    <h5 className="font-weight-bold">
                                        Total
                                    </h5>
                                    <h5 className="font-weight-bold">
                                        {(orders.subtotal / 100 * Number(orders.tax) + Number(orders.subtotal) + Number(orders.shipping_cost)).toFixed(2)}
                                    </h5>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}

export default OrderDetails;