import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Login(param) {

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();
    // const [login_detail,Setlogin]=useState({email:"test@example.com",pass:"123456"});
    const [formData, Setformdata] = useState({});
    const getformdata = (e) => {
        Setformdata({ ...formData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const token = localStorage.getItem('userdata');
        if (token) {
            navigate("/");
        }
    })

    const submit = (e) => {
        e.preventDefault();
        fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem('userdata', JSON.stringify(data));
                navigate("/");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    // Setlogin()
    // console.log(login_detail);

    return (

        <>
            <div className="container-fluid pt-5">
                <div className="text-center mb-4">
                    <h2 className="section-title px-5">
                        <span className="px-2">
                            Login
                        </span>
                    </h2>
                </div>
                <div className="row px-xl-5">
                    <div className="col-md-6 mx-auto">
                        <div className="contact-form">
                            <div id="success" />
                            <form
                                id="contactForm"
                                name="sentMessage"
                            //Validate
                            >

                                <div className="control-group">
                                    <input
                                        className="form-control"
                                        data-validation-required-message="Please enter your email"
                                        id="email"
                                        placeholder="Your Email"
                                        required
                                        name="email"
                                        type="email"
                                        // value={login_detail.email}
                                        onChange={getformdata}
                                    />
                                    <p className="help-block text-danger" />
                                </div>
                                <div className="control-group">
                                    <input
                                        className="form-control"
                                        data-validation-required-message="Please enter your Password"
                                        id="subject"
                                        placeholder="Password"
                                        required
                                        name="password"
                                        type="password"
                                        // value={login_detail.pass}
                                        onChange={getformdata}
                                    />
                                    <p className="help-block text-danger" />
                                </div>

                                <div>
                                    <button
                                        className="btn btn-primary py-2 px-4"
                                        id="sendMessageButton"
                                        type="submit"
                                        onClick={submit}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}

export default Login;