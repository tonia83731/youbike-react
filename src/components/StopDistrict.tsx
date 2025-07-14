import { useFilterContext } from "../context/filterContext"
import StopCheckbox from "./StopDistrictCheckbox"

const StopDistrict = () => {
  const { searchFilter, districtGroup, handleSearchFilterChange } = useFilterContext()

  return (
    <div className="bg-white p-4 rounded-md shadow-md flex flex-col justify-center w-full gap-4 lg:bg-transparent lg:p-0 lg:rounded-none lg:shadow-none lg:gap-6">
      <StopCheckbox
        id="all"
        district="全部選取"
        isChecked={searchFilter.length === 13}
        onCheckboxChange={(ischecked) => handleSearchFilterChange(ischecked, 'all')}
      />
      <div className="flex flex-col justify-center w-full items-center gap-4 lg:gap-6">
        {districtGroup.map((group, idx) => (
          <div key={`district-group-${idx}`} className="w-full flex justify-between items-center gap-2">
            {group.map((district) => (
              <StopCheckbox
                key={district}
                id={district}
                district={district}
                isChecked={searchFilter.includes(district)}
                onCheckboxChange={(ischecked) => handleSearchFilterChange(ischecked, district)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StopDistrict
