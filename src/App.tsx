import Pagination from "./components/Pagination"
import StopTable from "./components/StopTable"
import StopHeader from "./components/StopHeader"
import StopSearchGroup from "./components/StopSearchGroup"
import StopDistrict from "./components/StopDistrict"
import { useFilterContext } from "./context/filterContext"
import StopTags from "./components/StopTags"
import StopMap from "./components/StopMap"
import { MapContainer } from "react-leaflet"

function App() {
  const {districtToggle, taipei_center, routeGuide} = useFilterContext()

  

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
         <div className="flex flex-col gap-1 relative">
           <MapContainer
            center={[taipei_center.lat, taipei_center.lng]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "300px" }}
          >
            <StopMap />
          </MapContainer>
          {
            routeGuide && <ul className="bg-white/80 shadow-sm rounded-md z-[999] absolute top-1 right-1 p-4">
              <li className="">站點距離: {routeGuide?.distance} 公里</li>
              <li className="">步行時間(參考): {routeGuide?.time} 分鐘 </li>
          </ul>
          }
         </div>
          {/* <img src="https://images.unsplash.com/photo-1751013781844-fa6a78089e49" alt="map-area" className="w-full h-full object-cover" /> */}
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
