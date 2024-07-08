// "use client";
// import Image from "next/image";
// import { fetchData } from "@lib/services/table_data";
// import { useQuery } from "react-query";
// import MyTable from "@components/MyTable";
// import { hashPassword } from "./api/user/auth";
// export default function MYHome() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["users"],
//     queryFn: fetchData,
//   });
//   console.log("dataaa", data);
//   if (isLoading) {
//     return <div className="flex justify-center h-screen items-center">
//     <div className="loading loading-spinner text-primary"></div>
//   </div>;
//   }
//   console.log(hashPassword("b"))
//   return (
//     <>
//       <div className="">
//         <MyTable data={data}/>
//       </div>
//     </>
//   );
// }
