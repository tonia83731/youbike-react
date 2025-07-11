import { RxCross2 } from "react-icons/rx"
import { useFilterContext } from "../context/filterContext"

// only available in mobile version
const StopTags = () => {
    const {searchFilter, handleSearchTagClear} = useFilterContext()
    
    return <div className="flex items-center gap-2 flex-wrap lg:hidden">
        {
            searchFilter.map((district) => {
            return <div key={district} className="text-xs flex items-center bg-light_green text-white px-2 py-1 rounded-full w-fit">
            <p>{district}</p>
            <button disabled={searchFilter.length <= 1} onClick={() => handleSearchTagClear(district)}><RxCross2 /></button>
            </div> 
            })
        }
    </div>
}

export default StopTags