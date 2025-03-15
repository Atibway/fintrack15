
"use client"

import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import React from 'react';
import { useCSVReader } from 'react-papaparse';
type Props = {
  onUpload: (results: any) => void;
}

export  function UploadButton({
onUpload
}:Props) {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader
      onUploadAccepted={onUpload}
    >
      {({
        getRootProps,
      }: any) => (
        <>
            <Button 
            className="w-full bg-red-500 hover:bg-red-300 lg:w-auto" 
            type='button' 
            {...getRootProps()} >
            <Upload className="size-4 mr-2" />
               Import
            </Button>
        </>
      )}
    </CSVReader>
  );
}





// "use client";

// import { Button } from "@/components/ui/button";
// import { Upload } from "lucide-react";
// import { useCSVReader } from "react-papaparse";

// type Props = {
//   onUpload: (results: any) => void;
// }

// export const UploadButton = ({ onUpload }: Props) => {
//   const { CSVReader } = useCSVReader();

//   return (
//     <CSVReader
//       onUploadAccepted={(results: any) => {
//         console.log("Upload accepted", results);
//         onUpload(results);
//       }}
//     >
//       {({ getRootProps }: any) => (
//         <Button
//           size={"sm"}
//           className="w-auto"
//           {...getRootProps()}
//           onClick={() => console.log("Button clicked")}
//         >
//           <Upload className="size-4 mr-2" />
//           Import
//         </Button>
//       )}
//     </CSVReader>
//   );
// };


