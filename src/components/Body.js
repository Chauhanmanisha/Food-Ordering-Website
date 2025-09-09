import RestaurantCard from "./RestaurantCard";
import{useState , useEffect} from "react";
import Shimmer from "./Shimmer";

const Body = () =>{

    // locacl state varibale
    const [listofRestaurants , setListofRestaurants] = useState([]);
    const [filteredRestaurant , setFilteredRestaurant] = useState([]);
    const [searchText , setSearchText] = useState("");

    useEffect(() => {
        fetchData()
    } , []);

    const fetchData = async () => {
        const data = await fetch(
           "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.3224016&lng=78.0295273&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        
        const json = await data.json();         // convert data in json 
        
        setListofRestaurants(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    // conditional Rendering...

    return listofRestaurants.length === 0 ? (< Shimmer />) : (

       <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" value={searchText} onChange={(e) => { setSearchText(e.target.value); }}/>

                    <button onClick={() => {
                        // filter restaurant card and change UI
                        //searchTest

                        console.log(searchText);
                        console.log(listofRestaurants);

                        const filteredRestaurant = listofRestaurants.filter((res) => {
                          return   res.info.name.toLowerCase().includes(searchText.toLowerCase());
                        })

                        setFilteredRestaurant(filteredRestaurant);

                    }}>Search</button>
                    
                </div>

                <button className="filter-btn" 
                onClick={() => {
                    const filteredList = listofRestaurants.filter (
                        (res) => res.info.avgRating > 4.5
                    );
                    setListofRestaurants(filteredList);
                  }}
                >
                    Top Rated Restaurants</button >
            </div>

            <div className="res-container">

                {
                    filteredRestaurant.map((restaurant) => (
                    <RestaurantCard key = {restaurant.info.id} resData = {restaurant}/>
                ))}
                

            </div>
        </div>
    );
};

export default Body;