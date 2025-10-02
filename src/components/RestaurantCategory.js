import ItemList from "./ItemList";

const RestaurantCategory = ({data,showItems,setShowIndex,index,showIndex}) =>{
    const handleClick= () => {
        if (showIndex === index){
            setShowIndex(null);
        }else{
            setShowIndex(index);
        }
    };
    return (
        <div>
            {/*Header*/}
            <div className="w-6/12 m-auto p-4 shadow-lg ">
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    <span className="font-bold text-lg">
                        {data.title} ({data.itemCards.length})
                    </span>
                    <span>⬇️</span>
                </div>

                {showItems && <ItemList items={data.itemCards}/>}

            </div>

            {/* Body */}
        </div>
    );
};

export default RestaurantCategory;