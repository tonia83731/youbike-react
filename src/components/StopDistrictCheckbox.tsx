const StopCheckbox = ({name="stop_district", id, district, isChecked, onCheckboxChange}: {
    name?: string
    id: string
    district: string
    isChecked: boolean
    onCheckboxChange: (isChecked: boolean, district: string) => void
}) => {
    return  <label htmlFor={id} className="flex items-center gap-2">
        <input 
            type="checkbox" 
            id={id} 
            value={district}
            name={name}
            checked={isChecked} 
            onChange={(e) => onCheckboxChange(e.target.checked, district)}
            className="w-4 h-4 accent-light_green border border-gray_table_border" />
        <div>{district}</div>
    </label>
}

export default StopCheckbox