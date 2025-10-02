import {useSelector} from "react-redux";
import ItemList from "./ItemList";
import { clearCart} from "../utils/cartSlice";
import { useDispatch } from "react-redux";

const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    console.log(cartItems);

    const dispatch = useDispatch();

    const handleClearCart = () => {
        dispatch(clearCart());
    };


    return (
        <div className="p-4 m-4 text-center ">
            <h1 className=" text-2xl font-bold ">Cart</h1>
            <div className="w-6/12 m-auto shadow-2xl ">
                <button className="m-2 p-2 rounded-lg bg-black text-white "
                    onClick={handleClearCart}
                >
                    Clear Cart
                </button>
                {cartItems.length === 0 && (<h1>Cart is empty. Add Items to the Cart!</h1>)}
                <ItemList items = {cartItems}/>
            </div>
        </div>
    )
};

export default Cart;
 