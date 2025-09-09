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
        <div className="res-card">
            <img
              className="res-logo"
              alt="res-logo"
              src={CDN_URL + resData.info.cloudinaryImageId
              }
            />
            <h3>{name}</h3>
            <h4>{cuisines.join(" , ")}</h4>
            <h4>{avgRating}-{sla.deliveryTime} minutes</h4>
            <h4>{costForTwo}</h4>
        </div>
    ); 
};

export default RestaurantCard;