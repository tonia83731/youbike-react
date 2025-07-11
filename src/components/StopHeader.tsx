import Logo from "../assets/logo.svg"

const StopHeader = () => {
    return <div className="flex items-center justify-between pb-[5px] md:pb-[20px]">
    <img src={Logo} alt="Youbike" className="w-[90px] md:w-[120px]" />
    <h5 className="text-olive text-xs">台北市 YOUBIKE2.0</h5>
  </div>
}

export default StopHeader