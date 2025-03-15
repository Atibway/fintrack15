"use client"
import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { format, subDays } from "date-fns";
import { DateRange } from "react-day-picker";
import { ChevronDown } from "lucide-react";

import { formatDateRange } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";


export const DateFilter = () => {
    const router = useRouter();
const pathname = usePathname();

const params = useSearchParams();
const accountId = params.get("accountId")
const from = params.get("from") || "";
const to = params.get("to") || "";

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 30);

const paramState = {
  from: from ? new Date(from) : defaultFrom,
  to: to ? new Date(to) : defaultTo,
};

const [date, setDate] = useState<DateRange | undefined>(paramState);

const pushToUrl = (dateRange: DateRange | undefined) => {
  const query = {
    from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
    to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
    accountId,
  };

  const url = qs.stringifyUrl({
    url: pathname,
    query,
}, { skipEmptyString: true, skipNull: true, });

router.push(url);

};

const onReset =()=> {
    setDate(undefined)
    pushToUrl(undefined)
}

  return (
    <Popover>
    <PopoverTrigger asChild>
      <Button
        disabled={false}
        size="sm"
        variant="outline"
        className="lg:w-auto w-full h-9 rounded-md px-3 font-normal  hover:bg-primary/50  border-none focus:ring-offset-0 focus:ring-transparent outline-none bg-primary/10 text-primary focus:bg-white/30 transition"
      >
        <span>{formatDateRange(paramState)}</span>
        <ChevronDown className="lg:w-auto w-full p-0"/>
      </Button>
    </PopoverTrigger>
    <PopoverContent
  className="lg:w-auto w-full p-0"
  align="start"
>
  <Calendar
    disabled={false}
    initialFocus
    mode="range"
    defaultMonth={date?.from}
    selected={date}
    onSelect={setDate}
    numberOfMonths={2}
  />
  <div className="p-4 w-full flex items-center gap-x-2">
  <PopoverClose asChild>
  <Button
    onClick={onReset}
    disabled={!date?.from || !date?.to}
    className="w-full"
    variant="outline"
  >
    Reset
  </Button>
</PopoverClose>
  <PopoverClose asChild>
  <Button
    onClick={()=> pushToUrl(date)}
    disabled={!date?.from || !date?.to}
    className="w-full"
  >
    Apply
  </Button>
</PopoverClose>

  </div>
</PopoverContent>

  </Popover>
  
  )
}

