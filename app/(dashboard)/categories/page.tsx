import PageTransition from "../reports/PageTransition"
import CategoriesPage from "./categoriesPageComponet"

const page = () => {
  return (
    <PageTransition>
      <CategoriesPage/>
    </PageTransition>
  )
}

export default page