import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md"
import { useFilterContext } from "../context/filterContext"

const slicePageArr = (currPage: number, totalPage: number): number[] => {
  const maxButtons = 5

  let start = Math.max(1, currPage - Math.floor(maxButtons / 2))
  let end = start + maxButtons - 1

  if (end > totalPage) {
    end = totalPage
    start = Math.max(1, end - maxButtons + 1)
  }

  const result: number[] = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}
const arraw_styles = "w-6 h-6 md:w-8 md:h-8 flex justify-center items-center hover:text-light_green text-xl disabled:text-gray_table_border"

const Pagination = () => {
    const {currPage, totalPage, handleArrowClick, handlePageClick} = useFilterContext()
    const showedPage = slicePageArr(currPage, totalPage)
    return <div className="flex flex-col md:flex-row justify-end items-center gap-2">
      <div className="flex items-center gap-1">
        <button 
            className={arraw_styles}
            onClick={() => handleArrowClick('first')}
            title="第一頁"
            disabled={currPage === 1}
        >
            <MdOutlineKeyboardDoubleArrowLeft />
        </button>
        <button 
          className={arraw_styles}
          onClick={() => handleArrowClick('prev')}
          disabled={currPage === 1}
          >
            <MdOutlineKeyboardArrowLeft />
        </button>
          {/* Leading edge */}
        {showedPage[0] > 1 && (
          <>
            <span>...</span>
          </>
        )}

        {/* Sliced page numbers */}
        {showedPage.map((num) => (
          <button
            key={num}
            className={`w-6 h-6 md:w-8 md:h-8 flex justify-center items-center ${num === currPage ? "font-bold border border-light_green rounded-full text-light_green" : "hover:text-olive"}`}
            onClick={() => handlePageClick(num)}
          >
            {num}
          </button>
        ))}

        {/* Trailing edge */}
        {showedPage[showedPage.length - 1] < totalPage && (
          <>
            <span>...</span>
          </>
        )}
        <button 
          className={arraw_styles}
          onClick={() => handleArrowClick('next')}
          disabled={currPage === totalPage}
        >
            <MdOutlineKeyboardArrowRight />
        </button>
        <button 
          className={arraw_styles} 
          title="最末頁"
          onClick={() => handleArrowClick('last')}
          disabled={currPage === totalPage}
        >
            <MdOutlineKeyboardDoubleArrowRight />
        </button>
      </div>

      <div className="">共 {totalPage} 頁</div>
    </div>
}

export default Pagination