// import express from "express"
// const app=express();
// const port=3000;
// const langs=await fetch("https://emkc.org/api/v2/piston/runtimes").then(async (res)=>{
//     // console.log(await res.json());
//     const obj=await res.json();
//     console.log("first ",obj);
//     const langret=obj.map((ele,idx)=>{
//         return ele.language;
//     })
//     // console.log("check return ",langret);
    
// });
// const data= {
//     "language": "js",
//     "version": "18.15.0",
//     "files": [
//         {
//           "name": "my_cool_code.js",
//           "content": "console.log(\"hello\")"
//         }
//     ],
//      "codeInput": ""
// }
// const response = await fetch("https://emkc.org/api/v2/piston/execute", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
// app.listen(port,async ()=>{
//     const recd=await response.json();
//     console.log("Lang are ",langs);
//     console.log("server running at port and response is ",recd.run.stdout);
   
// })



