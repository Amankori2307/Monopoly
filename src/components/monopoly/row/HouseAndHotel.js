import style from '../../../assets/css/hotel-and-house.module.css'
import houseIcon from '../../../assets/images/house-icon.svg'
import hotelIcon from '../../../assets/images/hotel-icon.svg'
const HouseAndHotel = ({built, odd}) => {
    
    return (
         <div className={`${style.houseAndHotelContainer} `}>
             { built!==5?
             <div className={`${style.houseAndHotel} ${style["house"+built]}`}>
                {Array.from(Array(built).keys()).map((index) => <div key={index} className={`${style.house}`}>
                    <img src={houseIcon} alt={"house-icon"} className={odd?style.rotate:""}/>
                </div>)}
             </div>
             :<img src={hotelIcon} className={odd?style.rotate:""} alt="hotel-icon"/>
            }
        </div>
    );
}

export default HouseAndHotel