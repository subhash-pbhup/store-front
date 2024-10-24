import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Checkout(props) {


    const navigate = useNavigate([]);

    useEffect(() => {
        const token = localStorage.getItem('userdata');
        if (!token) {
            navigate("/login");
        } else {
            Sethideform("none");
        }
    }, [navigate])



    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const cartdata = JSON.parse(localStorage.getItem('cartdata'));
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    const [hideform, Sethideform] = useState("block");

    const [formData, Setformdata] = useState({});
    const getformdata = (e) => {
        Setformdata({ ...formData, [e.target.name]: e.target.value });
    }

    // const payment_method=formData.payment;
    const shipping_cost = 10;
    const tax = 18;

    const orderData = {
        user_id: userdata.user.id,
        subtotal: Number(cartdata.subtotal),
        tax: Number(tax),
        shipping_cost: Number(shipping_cost),
        total_price: Number(cartdata.subtotal),
        shipping_address: userdata.user.address,
        order_items: cartdata.addtocart_data,
        payment_method: formData.payment,
    };


    const save = (e) => {
        e.preventDefault();
        fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.removeItem('cartdata');
                alert("Order created successfully");
                console.log('Order created successfully:', data);
                setTimeout(() => {
                    navigate("/orders");
                }, 1000)
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }

    // console.log(orderData);


    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid bg-secondary mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: '100px' }}>


                    <h1 className="font-weight-semi-bold text-uppercase mb-3">Checkout</h1>
                    <div className="d-inline-flex">
                        <p className="m-0">
                            <Link to="/">Home</Link>
                        </p>
                        <p className="m-0 px-2">-</p>
                        <p className="m-0">Checkout</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            <div className="container-fluid pt-5">
                <div className="row px-xl-5">
                    <div className="col-lg-8">
                        <h1>Delivery Address : {userdata.user.address}</h1>
                    </div>
                    <div className="col-lg-8" style={{ display: hideform }}>
                        <div className="mb-4">
                            <h4 className="font-weight-semi-bold mb-4">
                                Billing Address
                            </h4>
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label>
                                        First Name
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="John"
                                        type="text"
                                        name="name"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        Last Name
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="Doe"
                                        type="text"
                                        name="lname"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        E-mail
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="example@email.com"
                                        type="text"
                                        name="email"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        Mobile No
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="+123 456 789"
                                        type="text"
                                        name="mobile"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        Address
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="123 Street"
                                        type="text"
                                        name="address"
                                    />
                                </div>
                                {/* <div className="col-md-6 form-group">
                                    <label>
                                        Password
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="12345123"
                                        password="text"
                                        name="password"
                                    />
                                </div> */}
                                {/* <div className="col-md-6 form-group">
                                    <label>
                                        Address Line 2
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="123 Street"
                                        type="text"
                                    />
                                </div> */}
                                {/* <div className="col-md-6 form-group">
                                    <label>
                                        Country
                                    </label>
                                    <select className="custom-select" value={selectedFruit} onChange={handleChange}>
                                        <option selected>
                                            United States
                                        </option>
                                        <option>
                                            Afghanistan
                                        </option>
                                        <option>
                                            Albania
                                        </option>
                                        <option>
                                            Algeria
                                        </option>
                                    </select>
                                </div> */}
                                <div className="col-md-6 form-group">
                                    <label>
                                        City
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="City"
                                        type="text"
                                        name="city"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        State
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="Up"
                                        type="text"
                                        name="state"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        ZIP Code
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="123456"
                                        type="text"
                                        name="pincode"
                                    />
                                </div>
                                <div className="col-md-12 form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input onChange={getformdata}
                                            className="custom-control-input"
                                            id="newaccount"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="newaccount"
                                        >
                                            Create an account
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-12 form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input onChange={getformdata}
                                            className="custom-control-input"
                                            id="shipto"
                                            type="checkbox"
                                        />
                                        <label
                                            className="custom-control-label"
                                            data-target="#shipping-address"
                                            data-toggle="collapse"
                                            htmlFor="shipto"
                                        >
                                            Ship to different address
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="collapse mb-4"
                            id="shipping-address"
                        >
                            <h4 className="font-weight-semi-bold mb-4">
                                Shipping Address
                            </h4>
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label>
                                        First Name
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="John"
                                        type="text"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        Last Name
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="Doe"
                                        type="text"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        E-mail
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="example@email.com"
                                        type="text"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        Mobile No
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="+123 456 789"
                                        type="text"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        Address Line 1
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="123 Street"
                                        type="text"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        Address Line 2
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="123 Street"
                                        type="text"
                                    />
                                </div>
                                {/* <div className="col-md-6 form-group">
                                    <label>
                                        Country
                                    </label>
                                    <select value={selectedFruit} onChange={handleChange} className="custom-select">
                                        <option selected>
                                            United States
                                        </option>
                                        <option>
                                            Afghanistan
                                        </option>
                                        <option>
                                            Albania
                                        </option>
                                        <option>
                                            Algeria
                                        </option>
                                    </select>
                                </div> */}
                                <div className="col-md-6 form-group">
                                    <label>
                                        City
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="New York"
                                        type="text"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        State
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="New York"
                                        type="text"
                                    />
                                </div>
                                <div className="col-md-6 form-group">
                                    <label>
                                        ZIP Code
                                    </label>
                                    <input onChange={getformdata}
                                        className="form-control"
                                        placeholder="123"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">
                                    Order Total
                                </h4>
                            </div>
                            <div className="card-body">
                                <h5 className="font-weight-medium mb-3">
                                    Products
                                </h5>
                                {props.catrdata.addtocart_data.map((res, index) =>

                                    <div key={index} className="d-flex justify-content-between">
                                        <p style={{ textTransform: 'capitalize' }}>
                                            {res.name}
                                        </p>
                                        <p>
                                            {(res.qty * res.price).toFixed(2)}
                                        </p>
                                    </div>

                                )}

                                <hr className="mt-0" />
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">
                                        Subtotal
                                    </h6>
                                    <h6 className="font-weight-medium">
                                        {props.catrdata.subtotal.toFixed(2)}
                                    </h6>
                                </div>
                                <div className="d-flex justify-content-between mb-3 pt-1">
                                    <h6 className="font-weight-medium">
                                        Subtotal
                                    </h6>
                                    <h6 className="font-weight-medium">
                                        ({tax}%) {(props.catrdata.subtotal / 100 * tax).toFixed(2)}
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
                                        {(props.catrdata.subtotal + props.catrdata.subtotal / 100 * tax + shipping_cost).toFixed(2)}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <div className="card border-secondary mb-5">
                            <div className="card-header bg-secondary border-0">
                                <h4 className="font-weight-semi-bold m-0">
                                    Payment
                                </h4>
                            </div>
                            <div className="card-body">
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input onChange={getformdata}
                                            className="custom-control-input"
                                            // checked
                                            id="paypal"
                                            name="payment"
                                            value="Paypal"

                                            type="radio"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="paypal"
                                        >
                                            Paypal
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input onChange={getformdata}
                                            className="custom-control-input"
                                            id="directcheck"
                                            name="payment"
                                            value="Direct check"
                                            type="radio"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="directcheck"
                                        >
                                            Direct Check
                                        </label>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="custom-control custom-radio">
                                        <input onChange={getformdata}
                                            className="custom-control-input"
                                            id="banktransfer"
                                            name="payment"
                                            value="Bank transfer"
                                            type="radio"
                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="banktransfer"
                                        >
                                            Bank Transfer
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer border-secondary bg-transparent">
                                <button onClick={save} className="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3">
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;