
import { Suspense} from "react";
import LoadingPage from "./HomeLoading";

import { DashboardPage } from "./Dashboardpage";


const HomePage = async() => {


  return (
  <Suspense fallback={<LoadingPage/>}>
    <DashboardPage/>
  </Suspense>
  )
}

export default HomePage;

// import { useCurrentUser } from "@/hooks/use-current-user";
// import { useStoreModel } from "@/hooks/use-store-model";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function SetupPage() {

//   const user = useCurrentUser()
// const router = useRouter()

//     const onOpen = useStoreModel((state) => state.onOpen);
//     const isOpen = useStoreModel((state) => state.isOpen);
    
//     useEffect(() => {
//       if (!isOpen) {
//         onOpen();
//       }
//     }, [isOpen, onOpen]);
//     return null;
 
// }
