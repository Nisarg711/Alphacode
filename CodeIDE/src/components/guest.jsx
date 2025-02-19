import React, { useEffect, useRef, useState, version } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { EditorState } from "@codemirror/state";

import { GoogleGenerativeAI } from '@google/generative-ai';
import {Rnd} from 'react-rnd'
import { EditorView } from "@codemirror/view";
import * as themes from '@uiw/codemirror-themes-all';
import './guest.css'
const genAI = new GoogleGenerativeAI("AIzaSyDBZfbKP4sne84EEzPLROL8cK9fbkACzQk");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
import {v4 as uuid} from 'uuid'
import './temp'
import Markdown from 'react-markdown';


const guest = () => {
    const [codelist,setcodelist]=useState([
        {
            id:"javascript",
            code:`//the hello world program\nconsole.log('Hello World');`
        },
        {
            id:"c++",
            code:`// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`
        },
        {
            id:"python",
            code:`# This program prints Hello, world!\nprint('Hello, world!')\n`
        },
        {
            id:"c",
            code:`#include <stdio.h>\nint main() {\n   // printf() displays the string inside quotation\n   printf(\"Hello, World!\");\n   return 0;\n}`
  

        }
    ])
    const inpref=useRef();
    const [fileuploaded,setfileuploaded]=useState(false);
    const [sample,setsample]=useState("");      //THis will be input
    const[output,setoutput]=useState([]);       //This is output
    const [input,setinput]=useState("");
    const [code, setCode] = useState(""); // Default code snippet
    const [lan,setlanarr]=useState([]);
    const [themearray,setthemearray]=useState([]);
    const [userchat,setuser]=useState([]);
    const [loading,setloading]=useState(false);
    const [userinput,setuserinput]=useState("");
    const [sent,setsent]=useState(false);
    const [reply,setreply]=useState("");
    const [chistory,sethistory]=useState([])
    const [bottom,setbottom]=useState(false);
    const [currlng,setcurrlng]=useState("cpp");
    const [currlngversion,setcurrlngversion]=useState("");
    const [currtheme,setcurrtheme]=useState("abcdef");
    const [toggleai,settoggleai]=useState(false);
    const [chistory2,setchistory2]=useState([]);
    const [running,setrunning]=useState(false);
    const selectref=useRef();
    async function delay(t){
      return new Promise((resolve, reject) => {
        setTimeout(resolve, t*1000);
      })
    }
    let mapextmim=new Map([
        ["c++",["text/x-c++src",".cpp"]],
        ["javascript",["application/javascript",".js"]],
        ["python",["text/x-python",".py"]],
        ["c",["text/x-c",".c"]],
    ]);

   async function runcode(c){
    setrunning(true);
    setbottom(true);

    const data= {
            "language": currlng,
            "version": currlngversion,
            "files": [
                {
                  "name": "",
                  "content":sample
                }
            ],
             "stdin": input
        }

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res)=>{
    const op=await res.json()
    console.log("Response received is ",op.run.stdout);
    setoutput(op.run.stdout.split('\n'));
    console.log("OUTPUT is ",op.run.stdout.split('\n'));
  }).catch(
    (err)=>{console.log(err);

  });
    setrunning(false);
    
   }

    async function setlang(e){
        console.log("E is ",e.l);
        console.log(lan);
        setcurrlng(e.l);
        console.log("THe language set is: ",e.l);
        console.log("Version of currently selected lang: ",e.v);
        setcurrlngversion(e.v);
    }
    const settheme=(e)=>{
        console.log("Theme array is: ",themearray);
        setcurrtheme(e.target.value);
        console.log("Theme being set to: ",e.target.value);
    }
 async function lngload()
 {
    const langs=await fetch("https://emkc.org/api/v2/piston/runtimes").then(async (res)=>{
    const obj=await res.json();
    setlanarr(obj.map((ele,idx)=>{
        return ele;
    }));

    setlanarr([{"language":"c++" ,
        "version": "10.2.0"
    },{"language": "javascript" ,
        "version": "1.32.3"
    },{"language": "python",
        "version": "3.10.0"
    },{"language":"c" ,
        "version": "10.2.0"
    },{"language":"bash" ,
        "version": "5.2.0"
    },{"language":"typescript" ,
        "version": "1.32.3"}
    // },{"language": ,
    //     "version": "1.0.0",
    // },{"language": ,
    //     "version": "1.0.0",
    // },{"language": ,
    //     "version": "1.0.0",
    // },{"language": ,
    //     "version": "1.0.0",
    // }
    ])
    
}

    ).catch((err)=>{
        console.log("error in loading languages");
    })
    console.log("Supported languages by Piston: ",lan);
 }


    useEffect(() => {
      const validThemes = {};
    
        Object.keys(themes).forEach((themeName) => {
          try {
            EditorState.create({
              doc: "Test",
              extensions: [themes[themeName]],
            });
            validThemes[themeName] = themes[themeName]; // Store only valid themes
          } catch (error) {
            console.warn(`Skipping unsupported theme: ${themeName}`, error);
          }
        });
    
        setthemearray(Object.keys(validThemes)); 
        lngload();
       
      }, []);
    
   
    
      

  
    const chat = model.startChat({
        history: chistory
      });
      const handleai=()=>{
       settoggleai(!toggleai);
      }
   
    
      useEffect(()=>{
        setchistory2(chistory);
        console.log("Chistory2 is being set");
        
      },[chistory])
    const writingmsg=(e)=>{
        setuserinput(e.target.value);
    }
    const sendmessage=async()=>{
        
        setloading(true);
        if(userinput=="")
        {
            console.log("NO message passed");
            setloading(false);
            return;
        }
        // sethistory([...chistory,{role:"user",parts:[{text:userinput}]}]);    //being set implicitly
        setsent(true);
        console.log("SENDING MESSAge",userinput);
        const result = await chat.sendMessage(userinput);
        setuserinput("");
        setloading(false);
        console.log(result.response.text());
       
        // sethistory([...chistory,{role:"model",parts:[{text:result.response.text()}]}]);   //being set implicitly
      
        setchistory2([...chistory]);
      
    }

    const [lng,setlng]=useState([cpp()]);
   
 
    async function findcode(str){
       return  codelist.filter((e)=>{
           
            return e.id==str;
        })
    }
    useEffect(()=>{
      console.log("RUNNN!!!");
       changelng();
    },[fileuploaded])
    async function changelng(){
       
       let e;
        try{
           e= JSON.parse(selectref.current.value);
          
        }
        catch(err){
          console.log("CATCH");
          return;
        }
       
        console.log("Runn",e);
        console.log("changing language to ",e.l);
        const selected=e.l;
       const arr=await findcode(selected);
       console.log("Array got is ",arr);
       console.log("File tag: ",fileuploaded);
        if(selected=="c++")
        {
            setlng([cpp()]);
            if(!fileuploaded)
            setsample(arr[0].code);
        }
        else if(selected=="javascript")
        {
            setlng([javascript()]);
            if(!fileuploaded)
            setsample(arr[0].code);
           
        }
        else if(selected=="python")
        {
            setlng([python()]);
            if(!fileuploaded)
            setsample(arr[0].code);
        }
        else if(selected=="c")
        {
            setlng([cpp()]);
            if(!fileuploaded)
            setsample(arr[0].code);
        }
    }
    const onChange = React.useCallback((value, viewUpdate) => {
       
        setsample(value);
        console.log("Sample changed to ",sample);
      }, []);

      const handleFileDownload = () => {
        const element = document.createElement("a");
        console.log(mapextmim);
        const mimetype=mapextmim.get(currlng)[0];
        const ext=mapextmim.get(currlng)[1];
        const file = new Blob([sample], {
          type: mimetype
        });
        element.href = URL.createObjectURL(file);
        element.download = "myFile"+ext;
        document.body.appendChild(element);
        element.click();
      };
      //text/x-c++src
      const handlefilechange = (event) => {
        const file = event.target.files[0];
        setfileuploaded(true);
        if (file) {
          const reader = new FileReader();
      
          reader.onload = (e) => {
            const arrayBuffer = e.target.result;
            const fileName = file.name;
            const textDecoder = new TextDecoder("utf-8");
            const fileContent = textDecoder.decode(new Uint8Array(arrayBuffer));
          
          setsample(fileContent);
          setcurrlng("c++");
         
            const base64Data = btoa(
              new Uint8Array(arrayBuffer)
                .reduce((data, byte) => data + String.fromCharCode(byte), "")
            );
      
            let fileType = "text/x-c++src";
      
            localStorage.setItem("uploadedFile", base64Data);
            localStorage.setItem("fileName", fileName);
            localStorage.setItem("fileType", fileType); 
           
           
            alert("File stored in localStorage!");
          };
      
          reader.onerror = () => alert("There was an error reading the file.");
          reader.readAsArrayBuffer(file); // 🔹 Store file as binary data
        }
      };
      
      const openfile = () => {
        const storedFile = localStorage.getItem("uploadedFile");
        const fileType = localStorage.getItem("fileType");
      
        if (storedFile && fileType) {
          // Convert Base64 back to ArrayBuffer
          const byteCharacters = atob(storedFile);
          const byteNumbers = new Uint8Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
      
          const blob = new Blob([byteNumbers], { type: fileType });
          const blobUrl = URL.createObjectURL(blob);
      
          window.open(blobUrl, "_blank");
        } else {
          alert("No file found in localStorage.");
        }
      };
      
      
      return (
        <div className='cover'>
          
            <div className="navbar">
               <button className='runbtn' onClick={()=>{runcode(null)}} style={{cursor:running?"not-allowed":"pointer"}}>
                {running? <dotlottie-player src="https://lottie.host/53a36a5f-d442-4553-85d4-50bc25dcef6f/zG77oxC8SX.lottie" background="transparent" speed="5" style={{width: "40px", height: "40px"}} loop autoplay></dotlottie-player>:<></>}
                Run Code</button>
                <button className="download" onClick={()=>{
                    handleFileDownload();
                }} style={{display:"flex", alignItems:"center"}}><dotlottie-player src="https://lottie.host/1b693c03-cd37-4d22-9cf6-fbdca05aadbb/7484EdHQyQ.lottie" background="transparent" speed="1" style={{width: "45px", height: "45px"}} ></dotlottie-player></button>
               
            <div className="dropdown">
            <input type="file" onChange={handlefilechange} ref={inpref} style={{backgroundColor:"grey", borderRadius:"5px"}} />
            <button onClick={()=>{openfile()}}>Open</button>
            <select ref={selectref}  
            className="select" onChange={(e)=>{
                console.log("I have to change to ", JSON.parse( e.target.value));
                setlang(JSON.parse( e.target.value));
                changelng();
               }
               } ><option >Select Language</option>
                {
                    lan.map((e)=>{
                        return(<option  value={JSON.stringify({l:e.language,v:e.version})}>{e.language + " (v"+e.version+" )"}</option>)
                    })
                }
                
               
     
    </select>
    <select name=""  className='select' onChange={(e)=>{
            settheme(e);
        }} id="" value={currtheme}>
        
        {
            themearray.map((e)=>{
                return(<option key={e} value={e}>{e}</option>)
            })
        }
    </select>
</div>
            </div>
        
       

  <CodeMirror
            value={sample}
            height="60vh"
            width='100%'
            theme={themes[currtheme]}
            extensions={cpp()}
            onChange={onChange}
          />
   <div  style={{width:"35px", height:"35px",top:"10%",position:"absolute",right:"2%",cursor:"pointer"}}
    onClick={async ()=>{console.log("Trying clearing!!! and fileuploaded is ",fileuploaded);
     setfileuploaded(false);
     inpref.current.value="";
      await delay(2);
      console.log("File up after delay: ",fileuploaded);
      
    }}
   >
     <lord-icon
    src="https://cdn.lordicon.com/jxhgzthg.json"
    trigger="hover"
    colors="primary:#ffffff,secondary:#8930e8"
    style={{width:"35px", height:"35px",top:"10%",position:"absolute",right:"2%",cursor:"pointer"}}>
</lord-icon>
</div>

  { (toggleai) &&  (
    
    <Rnd
    default={{
      x: (window.innerWidth-500)/2,
      y:(window.innerHeight-410)/2,
      width: 500,
      height: 410,
    }}
    className="ai"
    bounds="parent"
    style={{zIndex: 9999 }}
  >
      <div className="aihead">
                AI ASSISTANT
                <div className="close"   onClick={handleai}>X
                </div>
            </div>
   
    <div className="response">
    {

chistory2.map((e)=>{
    return(
        e.role=="user"?(<div className="userin"><p key={uuid()}  >User: {e.parts.map((ele)=>{
            return ele.text;
           
        })}</p></div>):(
            
            <div key={uuid()} className="aiin"><Markdown>
            {e.parts.map((ele)=>{
           
           return ele.text;
        }).join('')}
            </Markdown></div>)
        
    )
})
}
    {
                (loading) && (<>
                   <div className='userin'><p>User: {userinput}</p></div>
                   <div className="aiin"><p>AI typing</p></div>
                </>
             
                            
                )
             }
    </div>
    <div className="inp">
             
            <input type="text" className='type' value={userinput} onChange={writingmsg} />
            <div className="chatbtn">
            <button  onClick={sendmessage} style={{width:'100%'}}>Search</button>   
            </div>
         
           
            </div>
  </Rnd>
) 

}
<div className="bottomfix flex" style={{display:!bottom?"none":""}}>
    
    <div className="term cov">
        Input
    <div className="terminal grey">
    <textarea placeholder='Enter your input here!!' type="text" className='grey' value={input} onChange={(e)=>{
        setinput(e.target.value);
        console.log("E IS ",e.target.value);
    }}>
    </textarea>
    </div>
    </div>
   <div className="out cov">
    Output
   <div className="output grey">
    <div className="op">
        {
        output.map((ele)=>{
            return (
               <p>{ele}</p>
            )
        })
        }
    </div>
   </div>
    </div>
    <div className="close2" onClick={()=>{
        setbottom(false)
    }}>x</div>
</div>
<div className="ailogo" onClick={handleai}>
       

       <DotLottieReact
       style={{height:'100px',width:'100px'}}
        src="https://lottie.host/1aa41790-2112-4fe3-b13f-dcce5eb21337/x2e5M9T9D8.lottie"
       />
   
   
    </div>

   
     
        </div>
      );
  }

export default guest



