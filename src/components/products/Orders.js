import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from 'date-fns';

function Orders(props) {
    // console.log(props);
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    // const BASE_IMG_URL = process.env.REACT_APP_IMG_URL;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate([]);
    const token = localStorage.getItem('userdata');



    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
    }, [token, navigate])



    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${BASE_URL}/orders`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrders(data.filter((key) => key.user_id === props.userdata.user.id));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [BASE_URL, props.userdata.user.id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // console.log(orders);

    return (

        <>

            {/* Page Header Start */}
            <div className="container-fluid bg-secondary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: '100px' }}>


                    <h1 className="font-weight-semi-bold text-uppercase mb-3">My Orders</h1>
                    <div className="d-inline-flex">
                        <p className="m-0">
                            <Link to="/">Home</Link>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">My Orders</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}


            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="col-lg-12 table-responsive mb-5">
                        <table className="table table-bordered text-center mb-0">
                            <thead className="bg-secondary text-dark">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="align-middle">
                                {
                                    orders.map((res, id) =>



                                        <tr key={id}>
                                            <td className="align-middle">

                                                {res.order_number}
                                            </td>

                                            <td className="align-middle">
                                                {format(new Date(res.order_date), 'yyyy-MM-dd')}
                                            </td>
                                            <td className="align-middle" style={{ textTransform: "capitalize" }}>
                                                {res.status}
                                            </td>

                                            <td className="align-middle">
                                                {(res.subtotal / 100 * res.tax + Number(res.subtotal) + Number(res.shipping_cost)).toFixed(2)} for {JSON.parse(res.order_items).length} {JSON.parse(res.order_items).length === 1 ? "item" : "items"}
                                            </td>

                                            <td><Link to={`/order-details/${res.id}`} className="btn btn-info">View</Link></td>
                                        </tr>



                                    )}

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

        </>

    );
}

export default Orders;