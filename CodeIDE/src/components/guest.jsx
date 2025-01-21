import React, { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import {CompletionContext} from "@codemirror/autocomplete"
import { cpp } from '@codemirror/lang-cpp';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from "react-markdown"
import { use } from 'react';
const genAI = new GoogleGenerativeAI("AIzaSyDBZfbKP4sne84EEzPLROL8cK9fbkACzQk");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

import Markdown from 'react-markdown';
const guest = () => {
  //  const [loading,setloading]=useState(false);
    const [userinput,setuserinput]=useState("");

    const [reply,setreply]=useState("");
    const [chistory,sethistory]=useState([
        {
            role: "user",
            parts: [{ text: "Hello" }],
          },
          {
            role: "model",
            parts: [{ text: "Great to meet you. What would you like to know?" }],
          },
    ])
    const chat = model.startChat({
        history: chistory
      });

    const writingmsg=(e)=>{
        setuserinput(e.target.value);
    }
    const sendmessage=async()=>{
       
        if(userinput=="")
        {
            console.log("NO message passed");
          
            return;
        }
        
        console.log("SENDING MESSAge",userinput);
        const result = await chat.sendMessage(userinput);
        console.log(result.response.text());
        setreply(result.response.text());
        sethistory([...chistory,{role:"user",parts:[{text:userinput}]},{role:"model",parts:[{text:result.response.text()}]}]);
        console.log("CHAt is ",chistory);
      
    }
    const [codelist,setcodelist]=useState([
        {
            id:"js",
            code:`//the hello world program\nconsole.log('Hello World');`
        },
        {
            id:"cpp",
            code:`// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`
        },
        {
            id:"phy",
            code:`# This program prints Hello, world!\nprint('Hello, world!')\n`
        }
    ])
    const [lng,setlng]=useState([cpp()]);
    const [sample,setsample]=useState("");
    const [code, setCode] = useState(""); // Default code snippet
    const dropclick=(e)=>{
        console.log(e.target.value);
    }
    async function findcode(str){
       return  codelist.filter((e)=>{
            return e.id==str;
        })
    }
    useEffect(()=>{
       setCode("changing main code storage ",sample);
    },[sample])
    async function changelng(e){
        console.log("changing language to ",e.target.value);
        const selected=e.target.value;
       const arr=await findcode(selected);
        
        if(selected=="cpp")
        {
            setlng([cpp()]);
            setsample(arr[0].code);
        }
        else if(selected=="js")
        {
            setlng([javascript()]);
            setsample(arr[0].code);
           
        }
        else
        {
            setlng([python()]);
            setsample(arr[0].code);
        }
    }
    const onChange = React.useCallback((value, viewUpdate) => {
       
        setsample(value);
        console.log("Sample changed to ",sample);
      }, []);
      return (
        <div>
            <div className="navbar">
            <div className="dropdown">
            <select onChange={(e)=>{
                dropclick(e);
                changelng(e);
            }}  className="form-select" id="specificSizeSelect">
      <option value="">Select one</option>
      <option value="cpp">cpp</option>
      <option value="js">javascript</option>
      <option value="phy">python</option>
    </select>
</div>
            </div>
          <CodeMirror
            value={sample}
            height="60vh"
            theme="dark"
             extensions={lng}
            onChange={onChange}
          />
          <input type="text" value={userinput} onChange={writingmsg} />
          <button onClick={sendmessage}>Send the message</button>
            {
                (
                    <div className="reply" style={{backgroundColor:'white'}}>
                        <Markdown>{reply}</Markdown>
            </div>
                )
            }
         
        </div>
      );
  }

export default guest
