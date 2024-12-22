import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar"
import Feed from "../components/Feed"
import RightBar from "../components/RightBar"

function Home() {
  return (
    <>
      <Topbar />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Sidebar className="col-span-1 hidden md:block" />
        <Feed className="col-span-2" />
        <RightBar className="col-span-1 hidden md:block" />
      </div>
    </>
  )
}

export default Home