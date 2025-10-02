import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
        const {resId} = useParams();

        const resInfo = useRestaurantMenu(resId);

        const[showIndex,setShowIndex] = useState(0);

        if(resInfo === null) return <Shimmer/>;

        const {name,cuisines,costForTwoMessage} = resInfo?.cards[2]?.card?.card?.info;

        const menuData =
         resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card ||
         resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.categories?.[0];

         const itemCards = menuData?.itemCards || [];

        // console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

         const categories = 
          resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
            (c) =>
              c?.card?.card?.["@type"] === 
              "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
          );
         
        //console.log(categories);
           
        return (
           <div className="text-center">
              <h1 className="font-bold py-10 text-2xl">{name}</h1>
              <p className="font-bold text-lg">{cuisines.join(" , ")} - {costForTwoMessage}</p>
              
              {/*categories accordions*/}

              {categories.map((category,index) => (
                 <RestaurantCategory 
                    key={category?.card?.card?.categoryId}
                    data={category?.card?.card}
                    showItems={index === showIndex ? true : false}
                    index={index}
                    showIndex={showIndex}
                    setShowIndex={setShowIndex}
                  />
                    
              ))}
           </div>
         );
   
};

export default RestaurantMenu;