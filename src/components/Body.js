import RestaurantCard from "./RestaurantCard";
import{useState , useEffect} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () =>{

    // locacl state varibale
    const [listofRestaurants , setListofRestaurants] = useState([]);
    const [filteredRestaurant , setFilteredRestaurant] = useState([]);
    const [searchText , setSearchText] = useState("");

    console.log("body rendered" , listofRestaurants);

    useEffect(() => {
        fetchData()
    } , []);

    const fetchData = async () => {
        const data = await fetch(
           "https://corsproxy.io/https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.3224016&lng=78.0295273&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        
        const json = await data.json();         // convert data in json 

        setListofRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false)
        return(
        <h1>Look's like you are offline!! Please check your internet connection .</h1>
        );

    // conditional Rendering...

    return listofRestaurants.length === 0 ? (< Shimmer />) : (

       <div className="body">
            <div className="filter flex">

                <div className="search m-4 p-4">
                  <input 
                    type="text" 
                    className="border border-solid border-black" 
                    value={searchText} 
                    onChange={(e) => { 
                        setSearchText(e.target.value); 

                    }}
                  />

                    <button 
                       className="px-3 py-1 bg-green-100 m-4 rounded-lg"
                       onClick={() => {
                            // filter restaurant card and change UI
                             //searchTest

                          console.log(searchText);
                          
                          const filteredRestaurant = listofRestaurants.filter((res) => {
                            return   res.info.name.toLowerCase().includes(searchText.toLowerCase());
                          });

                           setFilteredRestaurant(filteredRestaurant);
                        }}
                    >  
                       Search
                    </button>
                    
                </div>

                <div className="search m-4 p-4 flex items-center">
                 <button className="px-3 py-2 bg-gray-100 rounded-lg" 
                   onClick={() => {
                       const filteredList = listofRestaurants.filter (
                          (res) => res.info.avgRating > 4.5
                        );
                       setListofRestaurants(filteredList);
                    }}
                 >
                    Top Rated Restaurants
                 </button >
                </div>

            </div>

            <div className="flex flex-wrap">
                {
                  filteredRestaurant.map((restaurant) => (
                    <Link
                      key = {restaurant.info.id} 
                      to={"/restaurants/" + restaurant.info.id}
                    >
                        <RestaurantCard  resData = {restaurant}/>
                   </Link>
                 ))
                }
            </div>
        </div>
    );
};

export default Body;