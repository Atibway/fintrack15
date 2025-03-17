import PageTransition from "../reports/PageTransition"
import AccountsPageComponet from "./AcountsPageComponet"


const page = () => {
  return (
    <PageTransition>
      <AccountsPageComponet/>
    </PageTransition>
  )
}

export default page