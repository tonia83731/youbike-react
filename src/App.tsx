import Pagination from "./components/Pagination"
import StopTable from "./components/StopTable"
import StopHeader from "./components/StopHeader"
import StopSearchGroup from "./components/StopSearchGroup"
import StopDistrict from "./components/StopDistrict"
import { useFilterContext } from "./context/filterContext"
import StopTags from "./components/StopTags"

function App() {
  const {districtToggle} = useFilterContext()

  

  return (
    <> 
      <main className="w-[90%] xl:w-full max-w-[1280px] mx-auto pt-[5px] pb-[80px] flex flex-col gap-6 lg:gap-8">
        <StopHeader />
        <h1 className="text-lg font-bold text-light_green md:text-xl">站點資訊</h1>
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex flex-col gap-1">
              {/* search area */}
              <StopSearchGroup />
              {/* filter select */}
              <StopTags />
            </div>
            {/* filter toggle */}
            {districtToggle && <StopDistrict />}
          </div>
          {/* map */}
          <img src="https://images.unsplash.com/photo-1751013781844-fa6a78089e49" alt="map-area" className="w-full h-full object-cover" />
        </div>
        {/* table */}
        <StopTable />
        {/* pagination */}
        <Pagination 
        />
      </main>
    </>
  )
}

export default App
