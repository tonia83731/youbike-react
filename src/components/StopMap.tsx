import { Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { useFilterContext } from "../context/filterContext"
import { useEffect } from "react"
import userLocationIcon from "../assets/userLocation.png"
import stopLocationIcon from "../assets/stopLocation.png"
import L from "leaflet"


const StopMap = () => {
    // const [routeGuide, setRouteGuide] = useState< RouteGuildType| null>(null)
    const { userLocation, stopLocation, stopLocationInfo, mapInitialized } = useFilterContext()
    const map = useMap()

    const userIcon = L.divIcon({
        html: `<img src="${userLocationIcon}" alt="user position" style="width:32px; height:40px;" />`,
        iconSize: [32, 40],      // Must match rendered width and height
        iconAnchor: [16, 40],    // Bottom center of image aligns with location
        popupAnchor: [0, -40],   // Opens above the marker
        className: "custom-icons"
    })

    const stopIcon = L.divIcon({
        html: `<img src="${stopLocationIcon}" alt="user position" style="width:32px; height:40px;" />`,
        iconSize: [32, 40],      // Must match rendered width and height
        iconAnchor: [16, 40],    // Bottom center of image aligns with location
        popupAnchor: [0, -40],   // Opens above the marker
        className: "custom-icons"
    })




    useEffect(() => {
        mapInitialized(map)
    }, [map])
    
    return <>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
       {userLocation && <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
               <div className="text-center">
                 使用者目前所在位置<br />({userLocation.lat}, {userLocation.lng})
               </div>
            </Popup>
        </Marker>}
        {stopLocation && <Marker position={[stopLocation.lat, stopLocation.lng]} icon={stopIcon}>
            <Popup>
                <div className="flex flex-col gap-1">
                    <h5 className="font-bold text-olive">{stopLocationInfo?.stopName}</h5>
                    <ul className="list-disc list-outside pl-4">
                        <li className="">可借車輛: {stopLocationInfo?.stopRent}</li>
                        <li className="">可還空位: {stopLocationInfo?.stopRent}</li>
                    </ul>
                </div>
            </Popup>
        </Marker>}
        {/* {
            <ul className="list-outside list-disc pl-4">
                <li className="">站點距離: {routeGuide?.distance} km</li>
                <li className="">步行時間: {routeGuide?.time} mins</li>
            </ul>
        } */}
    </>
}

export default StopMap