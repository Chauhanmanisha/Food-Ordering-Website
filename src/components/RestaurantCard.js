import{CDN_URL} from "../utils/constants";

const RestaurantCard = (props) =>{

    const {resData} = props;
    
    const{
        name,
        cuisines,
        avgRating,
        costForTwo,
        sla,
    } = resData?.info;

    return(
        <div className="m-6 p-4 w-[200px] h-[400px] bg-white shadow-lg rounded-lg hover:bg-gray-200">
            <img
              className="rounded-lg "
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