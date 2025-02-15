import React, { useEffect, useRef, useState } from 'react'
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
            id:"phy",
            code:`# This program prints Hello, world!\nprint('Hello, world!')\n`
        }
    ])
    const [sample,setsample]=useState("");      //THis will be input
    const[output,setoutput]=useState("");       //This is output
    const [code, setCode] = useState(""); // Default code snippet
    const [lan,setlanarr]=useState([]);
    const [themearray,setthemearray]=useState([]);
    const [userchat,setuser]=useState([]);
    const [loading,setloading]=useState(false);
    const [userinput,setuserinput]=useState("");
    const [sent,setsent]=useState(false);
    const [reply,setreply]=useState("");
    const [chistory,sethistory]=useState([
    ])
    const [currlng,setcurrlng]=useState("cpp");
    const [currtheme,setcurrtheme]=useState("abcdef");
    const [toggleai,settoggleai]=useState(false);
    const [chistory2,setchistory2]=useState([]);

   async function runcode(c){
    console.log("Sample is: ",sample);
    const data= {
            "language": "c++",
            "version": "10.2.0",
            "files": [
                {
                  "name": "file.cpp",
                  "content":sample
                }
            ],
             "codeInput": ""
        }

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res)=>{
    const op=await res.json()
    console.log("Response received is ",op.run.stdout);
    setoutput(op.run.stdout);
  });
   }

    const setlang=(e)=>{
        console.log(lan);
        setcurrlng(e.target.value);
        console.log("THe language set is: ",e.target.value);
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
    
}
    ).catch((err)=>{
        console.log("error in loading languages");
    })
   
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
      const ref=useRef();
      const handleai=()=>{
        console.log("called");
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
    
    async function changelng(e){
        console.log("changing language to ",e.target.value);
        const selected=e.target.value;
       const arr=await findcode(selected);
       
        if(selected=="c++")
        {
            setlng([cpp()]);
            setsample(arr[0].code);
        }
        else if(selected=="javascript")
        {
            setlng([javascript()]);
            setsample(arr[0].code);
           
        }
        else
        {
            setlng([python()]);
            setsample(codelist[0].code);
        }
    }
    const onChange = React.useCallback((value, viewUpdate) => {
       
        setsample(value);
        console.log("Sample changed to ",sample);
      }, []);
      return (
        <div className='cover'>
          
            <div className="navbar">
               <button className='runbtn' onClick={()=>{runcode(null)}}>Run Code</button>
            <div className="dropdown">
            <select  className="select" value={currlng} onChange={(e)=>{
                setlang(e);
                changelng(e);
               
            }} >
                {
                    lan.map((e)=>{
                        return(<option  value={e.language}>{e.language + " (v"+e.version+" )"}</option>)
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
            extensions={lng}
            onChange={onChange}
          />

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
<div className="bottomfix flex">
    <div className="terminal grey">
    Hello terminial
    </div>
    <div className="output grey">
    <div className="op">
        {output}
    </div>
    </div>
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



