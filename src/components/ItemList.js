import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ItemList = ({items}) => {
    
    const dispatch =useDispatch();

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    }
   
    
    return (
        <div>
           {items.map((item) => (

            <div key={item.card.info.id} className="p-2 m-2 border-gray-200 border-b-2 text-left flex gap-2 justify-between">

                <div className="w-9/12">
                    <div className="py-2">
                        <div>
                            <span>{item.card.info.name}</span>
                        </div>
                        <div>
                            <span> ₹ 
                               {item?.card?.info?.price ? item?.card?.info?.price/100 : item?.card?.info?.defaultPrice/100 }
                            </span>
                        </div>
                         
                    </div>
                     
                </div> 

                
                <div  className="w-3/12 p-4">
                    <div>
                         <img src={CDN_URL + item.card.info.imageId}/>
                    </div>
                    <div>
                        <button className="px-6 py-2  ml-6 rounded-sm bg-white text-emerald-500 shadow-lg"
                            onClick={() => handleAddItem(item)}
                        >
                            Add+
                        </button>
                    </div>
                   
                </div>

            </div>
               
           ))}
        </div>
    )
};

export default ItemList;