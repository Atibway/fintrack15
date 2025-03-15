import { Suspense } from "react";
import LoadingPage from "../HomeLoading";
import { DashboardPage } from "../Dashboardpage";

const HomePage = () => {
  return (
  <Suspense fallback={<LoadingPage/>}>
    <DashboardPage/>
  </Suspense>
  )
}

export default HomePage;