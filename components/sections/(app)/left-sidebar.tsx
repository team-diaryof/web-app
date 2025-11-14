import Clock from "./clock"
import DatePicker from "./date"

const LeftSidebar = () => {
    return (
        <div className="w-full md:w-[25%] h-fit md:sticky z-10 md:top-[88px] md:left-0">
            <Clock />
            <DatePicker />
        </div>
    )
}

export default LeftSidebar