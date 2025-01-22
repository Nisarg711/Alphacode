import React, { useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import {CompletionContext} from "@codemirror/autocomplete"
import { cpp } from '@codemirror/lang-cpp';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './guest.css'
import ReactMarkdown from "react-markdown"
import { use } from 'react';
const genAI = new GoogleGenerativeAI("AIzaSyDBZfbKP4sne84EEzPLROL8cK9fbkACzQk");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
import {v4 as uuid} from 'uuid'
import Markdown from 'react-markdown';
const guest = () => {
    const [userchat,setuser]=useState([]);
    const [loading,setloading]=useState(false);
    const [userinput,setuserinput]=useState("");
    const [sent,setsent]=useState(false);
    const [reply,setreply]=useState("");
    const [chistory,sethistory]=useState([
    ])
    const [chistory2,setchistory2]=useState([]);
    const chat = model.startChat({
        history: chistory
      });
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
          <div className="ai">
            <div className="aihead">
                AI ASSISTANT
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
            <button onClick={sendmessage} style={{width:'100%'}}>Search</button>   
            </div>
         
           
            </div>
         
         
          </div>
         
        </div>
      );
  }

export default guest
