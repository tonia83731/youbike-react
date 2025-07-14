import { RxCross2 } from "react-icons/rx";
import { useFilterContext } from "../context/filterContext"
import StopSearch from "./StopSearch"
import { GiHumanTarget } from "react-icons/gi";
import { IoFilter } from "react-icons/io5";
const StopSearchGroup = () => {
    const {districtToggle, userLocation, handleDistrictToggle, handleUserLocation} = useFilterContext()
    
    
    
    return <div className="grid grid-cols-[2fr_40px_40px] w-full gap-4 lg:grid-cols-[2fr_50px]">
        <StopSearch />
        <button 
            onClick={handleUserLocation}
            className={`font-bold text-xl flex justify-center items-center ${userLocation ? "bg-olive text-white" : "bg-gray_input text-dark/60"} h-[40px] lg:h-[50px] rounded-full`}>
            <GiHumanTarget />
        </button>
        <button 
            onClick={handleDistrictToggle}
            className="font-bold text-xl flex justify-center items-center bg-gray_input text-dark/60 h-[40px] rounded-full lg:hidden">
            {
                districtToggle ? <RxCross2 /> : <IoFilter />
            }
        </button>
  </div>
}

export default StopSearchGroup