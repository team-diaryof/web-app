import Clock from "@/components/clock"
import DatePicker from "@/components/date-picker"

const AppLeftSidebar = () => {
    return (
        <div className="space-y-6">
            <Clock />

            <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                <DatePicker />
            </div>
        </div>
    )
}

export default AppLeftSidebar