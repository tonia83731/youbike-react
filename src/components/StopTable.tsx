
import { FaMapLocationDot } from "react-icons/fa6"
import { useFilterContext } from "../context/filterContext"
import { replace } from "../util/replace"
const theadData = ['縣市', '區域', '站點名稱', '可借車輛', '可還空位']


const StopTable = () => {
  const {filterStopDatas, handleStopLocation} = useFilterContext()

  return <table className="border-collapse border-spacing-0 w-full rounded-lg md:rounded-[28px] overflow-hidden border-[0.5] border-gray_table_border md:text-lg">
    <thead className="bg-light_green text-light font-medium text-sm md:text-base">
      <tr className="h-[66px]">
        {
          theadData.map((item, idx) => {
            return <th className={`${idx === 0 ? "hidden md:table-cell" : ""}`} key={item}>{item}</th>
          })
        }
      </tr>
    </thead>
    <tbody className="text-sm md:text-base">
      {
        filterStopDatas.map(({sno, sarea, sna, latitude, longitude, available_rent_bikes, available_return_bikes}, idx) => {
          return <tr key={sno} className={`h-[72px] ${idx % 2 === 1 ? 'bg-gray' : ''}`}>
            <td className="text-center hidden md:table-cell">臺北市</td>
            <td className="text-center">{sarea}</td>
            <td className="flex h-[72px] justify-start items-center gap-1">
              <div>{replace(sna)}</div>
              <button onClick={() => handleStopLocation(latitude, longitude)} className="">
                <FaMapLocationDot />
              </button>
            </td>
            <td className={`${available_rent_bikes <= 3 ? "text-red-500" : "text-olive"} text-lg md:text-xl font-bold text-center`}>{available_rent_bikes}</td>
            <td className={`${available_return_bikes <= 3 ? "text-red-500" : "text-olive"} text-lg md:text-xl font-bold text-center`}>{available_return_bikes}</td>
          </tr>
        })
      }
    </tbody>
  </table>
}

export default StopTable