import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar"
import Feed from "../components/Feed"
import Rightbar from "../components/Rightbar"

function Home() {
  return (
    <>
      <Topbar />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Sidebar className="col-span-1" />
        <Feed className="col-span-2"/>
        <Rightbar className="col-span-1" />
      </div>
    </>
  )
}

export default Home