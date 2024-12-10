import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar"
import Feed from "../components/Feed"
import Rightbar from "../components/Rightbar"

function Home() {
  return (
    <>
      <Topbar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  )
}

export default Home