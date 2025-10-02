import RestaurantCard from "./RestaurantCard";
import{useState , useEffect} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () =>{

    // locacl state varibale
    const [listofRestaurants , setListofRestaurants] = useState([]);
    const [filteredRestaurant , setFilteredRestaurant] = useState(listofRestaurants);
    const [searchText , setSearchText] = useState("");

    const [isFiltered ,  setIsFiltered] = useState(false);

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
    
    const filter = ()=>{
        if(!isFiltered){
          setFilteredRestaurant(listofRestaurants.filter((el) => el.info.avgRating>4.4))
            setIsFiltered(true);
        }else{
          setFilteredRestaurant(listofRestaurants)
            setIsFiltered(false);
        }
    }

    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false)
        return(
        <h1>Look's like you are offline!! Please check your internet connection .</h1>
        );

    // conditional Rendering...

    return listofRestaurants.length === 0 ? (< Shimmer />) : (

       <div className="body bg-gray-300">
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
                       className="px-3 py-1 bg-white shadow-lg m-4 rounded-lg"
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

                <div className="search p-4 flex items-center">
                  <button className="filter-btn mx-2 rounded-xl w-20 bg-white shadow-lg px-3 py-1 " onClick={filter} >
                    {!isFiltered ? "Top ⭐" : "see all" }
                  </button>
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