import { Marker, Popup, TileLayer, useMap } from "react-leaflet"
import { useFilterContext } from "../context/filterContext"
import { useEffect } from "react"
import userLocationIcon from "../assets/UserLocation.png"
import stopLocationIcon from "../assets/SelectLocation.png"
import basicLocationIcon from "../assets/BasicLocation.png"

import L from "leaflet"
import MarkerClusterGroup from "react-leaflet-markercluster"
import { replace } from "../util/replace"


const StopMap = () => {
    // const [routeGuide, setRouteGuide] = useState< RouteGuildType| null>(null)
    const { stopDatas, userLocation, stopLocation, stopLocationInfo, mapInitialized, handleStopLocation } = useFilterContext()
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

    const basicIcon = L.divIcon({
        html: `<img src="${basicLocationIcon}" alt="user position" style="width:28px; height:35px;" />`,
        iconSize: [28, 35],      // Must match rendered width and height
        iconAnchor: [14, 35],    // Bottom center of image aligns with location
        popupAnchor: [0, -35],   // Opens above the marker
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
        {
            stopDatas.length > 0 && <MarkerClusterGroup>
                {
                stopDatas.map(({sna, sarea, latitude, longitude, available_rent_bikes, available_return_bikes}, idx) => {
                    if (stopLocation && stopLocation.lat === latitude && stopLocation.lng === longitude) return
                    return <Marker key={`makercluster-${idx}`} position={[latitude, longitude]} icon={basicIcon}>
                        <Popup>
                            <div className="flex flex-col gap-2 items-center">
                                <div>{replace(sna)} ({sarea})</div>
                                <button className="bg-light_green text-white px-4 py-0.5 rounded-md" onClick={() => handleStopLocation(sna,available_rent_bikes, available_return_bikes, latitude, longitude)}>
                                    選擇
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                })
                }
            </MarkerClusterGroup>
        }
        
    </>
}

export default StopMap