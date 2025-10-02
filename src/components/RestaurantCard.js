import{CDN_URL} from "../utils/constants";

const RestaurantCard = (props) =>{

    const {resData} = props;
    
    const{
        name,
        cuisines,
        avgRating,
        costForTwo,
        sla,
    } = resData?.info || {};

    return(
        <div className="m-2 p-4 w-[200px] h-[400px] bg-white shadow-lg rounded-lg transition-transform  ease-in-out hover:scale-95 ">
            <img
              className="rounded-lg w-[170px] h-[170px] "
              alt="res-logo"
              src={CDN_URL + resData.info.cloudinaryImageId
              }
            />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines.join(" , ")}</h4>
            <h4>⭐{avgRating}-{sla.deliveryTime} minutes</h4>
            <h4>{costForTwo}</h4>
        </div>
    ); 
};

export default RestaurantCard;