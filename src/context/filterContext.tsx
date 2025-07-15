/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from "react";
import { useState, useEffect } from "react";
import { getTaipeiBikeInfo } from "../api/getYoubikeInfo";
import { taipei_dis } from "../data/taipei_district";
import type { Map } from "leaflet";
import L from "leaflet";
import 'leaflet-routing-machine'

export type StopInfoType = {
    sno: string
    sna: string // YouBike2.0_捷運科技大樓站
    snaen: string // "YouBike2.0_MRT Technology Bldg. Sta."
    sarea: string // "大安區"
    sareaen: string // "Daan Dist."
    mday: string
    ar: string // "復興南路二段235號前"
    aren: string // "No.235， Sec. 2， Fuxing S. Rd."
    act: string
    srcUpdateTime: string
    updateTime: string
    infoTime: string
    infoDate: string
    Quantity: number // 場站總停車格
    available_rent_bikes: number // 場站目前車輛數量
    available_return_bikes: 25 // 空位數量
    latitude: number
    longitude: number
}

export type LocationType = {
    lat: number
    lng: number
}
export type StopShortInfoType = {
    stopName: string 
    stopRent: number
    stopReturn: number
}
export type RouteGuildType = {
    distance: number
    time: string
}

type ProviderProps = {
    children: ReactNode
}

type FilterContextType = {
    map: Map | null;
    taipei_center: LocationType;
    isLoading: boolean
    stopDatas: StopInfoType[]
    filterStopDatas: StopInfoType[]
    searchInput: string
    searchFilter: string[]
    districtGroup: string[][]
    currPage: number
    totalPage: number,
    userLocation: LocationType | null
    stopLocation: LocationType | null
    stopLocationInfo: StopShortInfoType | null
    routeGuide: RouteGuildType | null
    districtToggle: boolean
    mapInitialized: (map: Map) => void
    handleArrowClick: (type: 'first' | 'last' | 'prev' | 'next') => void
    handlePageClick: (page: number) => void
    handleSearchChange: (input: string) => void
    handleSearchClear: () => void
    handleSearchFilterChange: (isChecked: boolean, district: string) => void
    handleStopLocation: (stopName: string, stopRent: number, stopReturn: number, lat: number, lng: number) => void
    handleUserLocation: () => void
    handleDistrictToggle: () => void
    handleSearchTagClear: (district?: string) => void
}

export const FilterContext = createContext<FilterContextType>({} as FilterContextType)

const FilterProvider = ({children}: ProviderProps) => {
    // youbike資料Loading
    const [isLoading, setIsLoading] = useState(false)
    // 所有youbike車站資料 ---> 初始化使用
    const [stopDatas, setStopDatas] = useState<StopInfoType[]>([])
    // youbike車站資料 --> 依據使用者行為改變
    const [filterStopDatas, setFilterStopDatas] = useState<StopInfoType[]>([])

    // 搜尋youbike名稱（ana）或 youbike車站地址（ar）
    const [searchInput, setSearchInput] = useState("")
    // 搜尋oubike站點區域
    const [searchFilter, setSearchFilter] = useState<string[]>([...taipei_dis])
    
    // ----------------------------------------------------
    // 依據螢幕大小調整layout顯示 -- districts
    const [districtGroup, setDistrictGroup] = useState<string[][]>([]);
    const [districtToggle, setDistrictToggle] = useState(false)
    // ----------------------------------------------------
    // 分頁項目調整
    const [currPage, setCurrPage] = useState(1)
    // 每頁幾個項目 --> 根據贏怒大小改變
    const [perPage, setPerPage] = useState(10)
    const [totalPage, setTotalPage] = useState(0)
    // const totalPage = Math.ceil(filterStopDatas.length / perPage)
    
    // ----------------------------------------------------
    const taipei_center = {
        lat: 25.0330,
        lng: 121.5654
    }
    // 追蹤使用者目前位置 Default是taipei city中心
    const [userLocation, setUserLocation] = useState<LocationType | null>(null)
    // 使用者要追蹤的youbile車站地點 Default是null
    const [stopLocationInfo, setStopLocationInfo] = useState<StopShortInfoType | null>(null)
    const [stopLocation, setStopLocation] = useState<LocationType | null>(null)
    // user & stop 之間步行距離時間
     const [routeGuide, setRouteGuide] = useState< RouteGuildType| null>(null)
    // 處理 map 相關 Data
    const [map, setMap] = useState<Map | null>(null)
    
    // ----------------------------------------------------

    // 搜尋function
    const handleSearchChange = (input: string) => {
        setSearchInput(input)
    }
    const handleSearchClear = () => {
        setSearchInput("")
    }

    const handleSearchFilterChange = (isChecked: boolean, district: string) => {
        if (district === "all") {
            setSearchFilter(isChecked ? [...taipei_dis] : [])
        } else {
            const isInclude = searchFilter.includes(district)
            if (isInclude) {
                if (searchFilter.length === 1) return
                const updatedDistrict = searchFilter.filter((d) => d !== district)
                setSearchFilter(updatedDistrict)
            } else {
                setSearchFilter([...searchFilter, district])
            }
        }
    }

    const handleSearchTagClear = (district?: string) => {
        const updatedDistrict = searchFilter.filter((d) => d !== district)
        setSearchFilter(updatedDistrict)
    }

    // 分頁換頁處理
    const handleArrowClick = (type: 'first' | 'last' | 'prev' | 'next' ) => {
        setCurrPage(
          type === 'first' ? 1 : type === 'last' ? totalPage : type === 'prev' ? currPage - 1 : type === 'next' ? currPage + 1 : 1
        )
      }
    const handlePageClick = (page: number) => {
        setCurrPage(page)
    }
    // 取得地圖最新資訊 （initialized）
    const mapInitialized = (map: Map) => {
        setMap(map)
    }
    // 取得使用者目前位置
    const handleUserLocation  = () => {
        if (userLocation !== null) {
            setUserLocation(null)
            return
        }
        
        if (!map) return
        map.locate({ setView: true, enableHighAccuracy: true })
        map.once("locationfound", (e) => {
            const {lat, lng} = e.latlng
            setUserLocation({lat, lng})
        })
        map.once("locationerror", (e) => {
            console.error("Location error: ", e.message)
        })
    }
    // 取得點選車站位置
    const handleStopLocation = (stopName: string, stopRent: number, stopReturn: number, lat: number, lng: number) => {
        setStopLocationInfo({stopName, stopRent, stopReturn})
        setStopLocation({lat, lng})
    }


    // 處理District Toggle --> 只適用於mobile
    const handleDistrictToggle = () => {
        setDistrictToggle(!districtToggle)
    }

    // 依據螢幕大小畫面items顯示調整
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth

            // 調整district每行顯示幾個
            const groupSize = screenWidth <= 769 || screenWidth >= 1024 ? 3 : 4;
            const result: string[][] = [];

            for (let i = 0; i < taipei_dis.length; i += groupSize) {
                result.push(taipei_dis.slice(i, i + groupSize));
            }
            setDistrictGroup(result);
            // 調整youbike stop每頁顯示幾個
            const per_age = screenWidth <= 769 ? 6 : 10
            setPerPage(per_age)

            // 調整 district toggle 型態
            if (screenWidth >= 1024) setDistrictToggle(true)
        }

        handleResize(); // Initial grouping
        window.addEventListener('resize', handleResize); // Respond to changes

        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        // 取得所有youbike車站資訊
        const fetchBikeInfoAsync = async () => {
          try {
            setIsLoading(true)
            const res = await getTaipeiBikeInfo()
            setStopDatas(res)          // Save raw data
            // setFilteredStops(res)     // Trigger filtering/pagination
            // setCurrPage(1)            // Reset to first page
          } catch (error) {
            console.error(error)
          } finally {
            setIsLoading(false)
          }
        }
    
        fetchBikeInfoAsync()
      }, [])
      // 依據使用者輸入的filter, pagination調整數量
      useEffect(() => {
        let datas = stopDatas;
        if (searchInput.trim() !== "") {
            datas = datas.filter((stop) => stop.sna.includes(searchInput) || stop.ar.includes(searchInput))
        }

        if (searchFilter.length > 0 && searchFilter.length < 13) {
            datas = datas.filter((stop) => searchFilter.includes(stop.sarea))
        }
        
        // --------------------------------------
        // 計算總共幾頁
        const total = Math.ceil(datas.length / perPage)
        setTotalPage(total)
        // --------------------------------------
        // 計算當前頁面有幾個datas
        const firstIdx = (currPage - 1) * perPage
        const lastIdx = firstIdx + perPage
        const sliceStops = datas.slice(firstIdx, lastIdx)
        setFilterStopDatas(sliceStops)

      }, [searchInput, searchFilter, currPage, perPage, stopDatas])

      useEffect(() => {
            setCurrPage(1)
        }, [searchInput, searchFilter])
      // map 顯示 站點
      useEffect(() => {
        if (!map) return

        const points : [number, number][] = []
        if (userLocation) points.push([userLocation.lat, userLocation.lng])
        if (stopLocation) points.push([stopLocation.lat, stopLocation.lng])

        if (points.length === 1) {
            map.setView(points[0], 16)
        } else if (points.length === 2) {
            map.fitBounds(points, { padding: [50, 50] })
        }
      }, [map, userLocation, stopLocation])

      useEffect(() => {
            if (!map || !userLocation || !stopLocation) return
                const routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(userLocation.lat, userLocation.lng),
                    L.latLng(stopLocation.lat, stopLocation.lng)
                ],
                router: L.Routing.osrmv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1',
                    profile: "foot",
                }),
                show: false,
                addWaypoints: false,
                routeWhileDragging: false,
                createMarker: () => null
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any).addTo(map)

            routingControl.on('routesfound', (e) => {
                const summary = e.routes[0].summary
                // console.log(e.routes, summary.totalTime)
                const distance = summary.totalDistance / 1000
                const time = (summary.totalTime / 60).toFixed(1);
                setRouteGuide({ distance, time })
            })

            return () => {
                map.removeControl(routingControl)
            }
        }, [userLocation, stopLocation, map])
    
      return <FilterContext.Provider value={{
        map,
        taipei_center,
        isLoading,
        stopDatas,
        filterStopDatas,
        searchInput,
        searchFilter,
        districtGroup,
        currPage,
        totalPage,
        userLocation,
        stopLocation,
        stopLocationInfo,
        routeGuide,
        districtToggle,
        mapInitialized,
        handleArrowClick,
        handlePageClick,
        handleSearchChange,
        handleSearchClear,
        handleSearchFilterChange,
        handleStopLocation,
        handleUserLocation,
        handleDistrictToggle,
        handleSearchTagClear
    }}>
        {children}
    </FilterContext.Provider>
}

export default FilterProvider


export const useFilterContext = (): FilterContextType => {
    const context = useContext(FilterContext)
    if (!context) {
        throw new Error("useFilterContext must be use within a FilterProvider")
    }
    return context
}