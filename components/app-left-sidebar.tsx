import Clock from "@/components/clock"
import DatePicker from "@/components/date-picker"

const AppLeftSidebar = () => {
    return (
        <div className="space-y-6">
            <Clock />

            <div className="p-4">
                <DatePicker />
            </div>
        </div>
    )
}

export default AppLeftSidebar