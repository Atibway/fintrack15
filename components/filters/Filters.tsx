
import { AccountFilter } from "../filters/AccountFilter"
import { DateFilter } from "../filters/DateFilter"


export const Filters = () => {
  return (
    <div className="flex flex-col  -z-50 lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
               
<AccountFilter/>
                     
<DateFilter/>
       
    </div>
  )
}
