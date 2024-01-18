import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import "react-multi-carousel/lib/styles.css";
import {
  Navbar,
  Footer,
  Home,
  Contact,
  About,
  Profile,
  Checkout,
  OrderDetails,
  Store,
  ProductDetail,
  ProductsList,
  PrivacyPolicy,
  RefundPolicy,
  Terms,
  PageNotFound,
  PaymentSuccess,
  PaymentFailure,
} from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  
  const { pathname } = useLocation();
  AOS.init();
  useEffect(() => {
    window.scrollTo(0, 0);
    if(pathname === '/about'){
      document.title="About us - Amour";
    }
    else if(pathname === '/contact') document.title = "Contact us - Amour";
    else if(pathname === '/store') document.title = "Store - Amour";
    else document.title = "Amour - Shop traditionals with Amour";
  }, [pathname]);
  const [refresh, setRefresh] = useState(true);
  const updateCartLen = () => {
    setRefresh(!refresh);
  }
  const [cartLen, setCartLen] = useState(0);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartLen(items.length);
  }, [refresh])
  // Side bar logic
  const [SideBarTab, setSideBarTab] = useState(false);
  const handleSideBar = () => setSideBarTab((prevState) => !prevState);
  return (
    <>
      <div className="relative overflow-hidden">
        <ToastContainer />
        <Navbar cartLen={cartLen} SideBarTab={SideBarTab} handleSideBar={handleSideBar} updateCartLen={updateCartLen}/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout updateCartLen={updateCartLen}/>} />
          <Route path="/store" element={<Store updateCartLen={updateCartLen} handleSideBar={handleSideBar}/>} />
          <Route path="/store/:id" element={<Store updateCartLen={updateCartLen} handleSideBar={handleSideBar}/>} />
          {/* <Route path="/productslist" element={<ProductsList />} /> */}
          <Route path="/productslist/:name/:title" element={<ProductsList updateCartLen={updateCartLen} handleSideBar={handleSideBar}/>} />
          <Route path="/order/:id" element={<OrderDetails />} />
          <Route path="/product/:id" element={<ProductDetail updateCartLen={updateCartLen} handleSideBar={handleSideBar}/>} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refund" element={<RefundPolicy />} />
          {/* Dashboard Profile section routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/orders" element={<Profile />} />
          <Route path="/profile/account/edit" element={<Profile />} />
          <Route path="/profile/address/edit" element={<Profile />} />
          <Route path="/profile/wishlist" element={<Profile />} />
          {/* Error Page   */}
          {/* <Route path="/online/payment/failure" element={<PaymentFailure/>} /> */}
          <Route path="/online/payment/failure/:orderId" element={<PaymentFailure/>} />
          <Route path="/online/payment/success/:orderId" element={<PaymentSuccess updateCartLen={updateCartLen}/>} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="*/*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
