import { HiMiniMagnifyingGlass } from "react-icons/hi2"
import { RxCross2 } from "react-icons/rx"
import { useFilterContext } from "../context/filterContext"

const StopSearch = () => {
    const {searchInput, handleSearchChange, handleSearchClear} = useFilterContext()
    return <label htmlFor="search" className="bg-gray_input text-dark/60 h-[40px] lg:h-[50px] rounded-full px-4 grid grid-cols-[2fr_20px] items-center">
        <input 
        id="search"
        name="search"
        type="text" 
        placeholder="搜尋Youbike站點名稱或站點地址" 
        value={searchInput} 
        onChange={(e) => handleSearchChange(e.target.value)} 
        className="bg-transparent outline-none placeholder:text-dark/60 placeholder:lg:text-lg text-olive" 
        />
       {
            searchInput.trim() !== "" 
            ? <button onClick={handleSearchClear} className="font-bold text-xl">
                < RxCross2 />
            </button>
            : <div className="font-bold text-xl">
                <HiMiniMagnifyingGlass />
            </div>
        }
    </label>
}


export default StopSearch