"use client"

import { DataGrid } from "@/components/data-grid";
import { DataCharts } from "@/components/charts/DataCharts";

import { Filters } from "@/components/filters/Filters";


export const  DashboardPage = ()=> {
  
  return (
    <div className="max-w-screen-2xl -z-50 mx-auto w-full pb-10 ">
      <div className="mb-10">
          <Filters />
      </div>
      <DataGrid />
      <DataCharts />
    </div>
  );
}
