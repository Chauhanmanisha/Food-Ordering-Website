import { useState } from "react";
import {LOGO_URL}  from "../utils/constants";
import{Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useSelector } from "react-redux";

const Header = () => {

    const [btnNameReact, setBtnNameReact] = useState("login");

    const onlineStatus = useOnlineStatus();

    //subscribe to store using selector
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);

    return (
        <div className="header flex justify-between bg-pink-100 shadow-lg h-">
            <div className="logo-container w-30">
                <img 
                  className = "logo"
                  src={LOGO_URL}
                />
            </div>

            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4"> Online Status: {onlineStatus ? "✅" : "🔴"} </li>
                    <li className="px-4"> <Link to="/">Home</Link> </li>
                    <li className="px-4"> <Link to="/about">About Us</Link> </li>
                    <li className="px-4"> <Link to="/contact">Contact Us</Link> </li>
                    <li className="px-4 font-bold text-xl"><Link to="/Cart">Cart({cartItems.length})</Link></li>

                   <button 
                      className="login" 
                      onClick={() => {
                        btnNameReact === "login" ? setBtnNameReact("Logout") : setBtnNameReact("login");
                      }}
                    >
                    
                    {btnNameReact}

                   </button>
                  
                </ul>
            </div>

        </div>
    );
};

export default Header;