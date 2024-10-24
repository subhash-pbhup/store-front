import './css/Style.css';
import './css/Style.min.css';
import './css/SearchBar.css';
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Topbar from './components/Topbar';
import Footer from './components/Footer';
import Products from './components/products/Products';
import Contact from "./components/pages/Contact";
import NoPage from "./components/pages/Nopage";
import About from './components/pages/About';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductsDetails from './components/products/ProductsDetails';
import Collections from './components/products/Collections';
import Cart from './components/products/Cart';
import Checkout from './components/products/Checkout';
import Login from './components/pages/Login';
import Orders from './components/products/Orders';
import OrderDetails from './components/products/OrderDetails';

function App() {

  const [addtocartcounter, setCounter] = useState(0);
  const [addto_pro, Setaddto_pro] = useState([]);
  const [cartsubtotal, Setcartsubtotal] = useState(0);
  const [reloadkey, Setreloadkey] = useState(0);
  const [procounter, setProcounter] = useState(1);


  const addtocart_pro = (qty, price, sku, name, img, pid) => {
    setCounter(addtocartcounter + 1);

    addto_pro.push({ qty, price, sku, name, img, pid });

    // const existingItem = addto_pro.filter((key) => key.pid === pid);
    // if (existingItem) {
    //   existingItem.qty++;
    // } else {
    //   addto_pro.push({ qty, price, sku, name, img, pid });
    // }
    Setaddto_pro(addto_pro);
    let cartsubtotal = 0;
    addto_pro.map((x) => (
      cartsubtotal += Number(x.price)
    ))
    Setcartsubtotal(cartsubtotal);

    sub_total();
  };

  const decrement_pro = () => {
    if (addtocartcounter !== 0) {
      setCounter(addtocartcounter - 1);
    }
  };

  //sub total

  const sub_total = () => {
    let cart_subtotal = 0;
    addto_pro.map((x) => (
      cart_subtotal += Number(x.qty * x.price)
    ))
    Setcartsubtotal(cart_subtotal);
  }



  //remove cart prodcut

  const removecartpro = (id) => {
    delete addto_pro[id];
    Setreloadkey(Math.random());
    decrement_pro();
    sub_total();
  };


  //cart page products

  const incrementCounter = (id) => {
    setProcounter(addto_pro[id].qty++);
    Setreloadkey(Math.random());
    sub_total();

  };

  const decrementCounter = (id) => {
    if (procounter !== 1) {
      setProcounter(addto_pro[id].qty--);
      Setreloadkey(Math.random());
      sub_total();

    }
  };

 const user = localStorage.getItem('userdata')
  const userdata = JSON.parse(user)

  if (JSON.parse(localStorage.getItem('userdata')) > 0) {
    Setreloadkey(Math.random());
  }

  const cartdata = localStorage.getItem("cartdata");
  if(!cartdata){
    Setreloadkey(Math.random());
  }


  const header_data = { title: "Sanskar computer", cartquty: addtocartcounter };
  const cart = { addtocart_data: addto_pro, subtotal: cartsubtotal, removebtn: removecartpro, incrementCounter: incrementCounter, decrementCounter: decrementCounter, procounter: procounter, addtocart_pro: addtocart_pro };
  localStorage.setItem('cartdata', JSON.stringify(cart));

  // console.log(procounter);

  return (
    <>

      <BrowserRouter>
        <Topbar param={header_data} />
        <Navbar key={reloadkey} userdata={userdata} />
        <Routes>
          <Route>
            <Route path='/' element={<Home />} />
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="products-list" element={<Products addtocartbtn={addtocart_pro} />} />
            <Route path="collections/:categories/:id" element={<Collections />} />
            <Route path="product/:productName/:id" element={<ProductsDetails addtocartbtn={cart} />} />
            <Route path="cart" key={reloadkey} element={<Cart cartdata={cart} />} />
            <Route path="orders" key={reloadkey} element={<Orders userdata={userdata} />} />
            <Route path="order-details/:id" key={reloadkey} element={<OrderDetails userdata={userdata} />} />
            <Route path="checkout" key={reloadkey} element={<Checkout catrdata={cart} />} />
            <Route path="login" key={reloadkey} element={<Login catrdata={cart} />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
        <Footer />

      </BrowserRouter>
    </>

  );
}

export default App;
