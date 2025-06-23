import React, { useEffect, useRef, useState, version } from 'react'
import Editor, { DiffEditor, useMonaco, loader } from '@monaco-editor/react';
import MonacoEditor from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import CodeMirror from '@uiw/react-codemirror';
import { autocompletion, CompletionContext } from "@codemirror/autocomplete"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { EditorState } from "@codemirror/state";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Rnd } from 'react-rnd'
import { EditorView } from "@codemirror/view";
import Button from 'react-bootstrap/Button';
import active4d from "monaco-themes/themes/Active4D.json";
import allHallowsEve from "monaco-themes/themes/All Hallows Eve.json";
import birdsOfParadise from "monaco-themes/themes/Birds of Paradise.json";
import * as themes from '@uiw/codemirror-themes-all';
import './guest.css'
const genAI = new GoogleGenerativeAI("AIzaSyDBZfbKP4sne84EEzPLROL8cK9fbkACzQk");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
import { v4 as uuid } from 'uuid'
import './temp'
import Markdown from 'react-markdown';


import dracula from 'monaco-themes/themes/Dracula.json';
import monokai from 'monaco-themes/themes/Monokai.json';
import github from 'monaco-themes/themes/GitHub.json';
import cobalt from "monaco-themes/themes/Cobalt.json";
import clouds from "monaco-themes/themes/Clouds.json";
import dawn from "monaco-themes/themes/Dawn.json";
import cobalt2 from "monaco-themes/themes/Cobalt2.json";
import brillianceblack from "monaco-themes/themes/Brilliance Black.json";
import merbivore from "monaco-themes/themes/Merbivore.json"
import dream from "monaco-themes/themes/Dreamweaver.json"
import gitd from "monaco-themes/themes/GitHub Dark.json"
import Nt from "monaco-themes/themes/Night Owl.json"
import kr from "monaco-themes/themes/krTheme.json"
import nr from "monaco-themes/themes/Nord.json"


const monacoThemes = {
  Dracula: dracula,
  Monokai: monokai,
  Cobalt: cobalt,
  Clouds: clouds,
  Dawn: dawn,
  Cobalt2: cobalt2,
  Brillianceblack: brillianceblack,
  Merbivore: merbivore,
  Dream: dream,
  GithubDark: gitd,
  NightOwl: Nt,
  KrTheme: kr,
  Nord: nr
};


// Default Monaco themes don't need JSON files
const defaultThemes = ["vs-dark", "vs-light"];
import ReactDOM from 'react-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
const guest = () => {
  const [fontsize, setfontsize] = useState(14);
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const editorOptions = {
    wordWrap: 'on',  // Enable word wrap
    wrappingIndent: 'same',  // Optional: Controls the indentation of wrapped lines
    wordWrapColumn: 80,  // Optional: Column width before wrapping occurs
    fontSize: fontsize,  // Set font size here (example: 14px)
    glyphMargin: false, // Removes the left vertical strip
    minimap: { enabled: false }, // Removes the minimap
  
  };


  const [codelist, setcodelist] = useState([
    {
      id: "javascript",
      code: `//the hello world program\nconsole.log('Hello World');`
    },
    {
      id: "cpp",
      code: `// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}`
    },
    {
      id: "python",
      code: `# This program prints Hello, world!\nprint('Hello, world!')\n`
    },
    {
      id: "c",
      code: `#include <stdio.h>\nint main() {\n   // printf() displays the string inside quotation\n   printf(\"Hello, World!\");\n   return 0;\n}`
    },
    {
      id: "bash",
      code: `#!/usr/bin/env bash \n echo "Hello World!"`
    },
    {
      id:"java",
      code:`public class Main {\n  public static void main(String[] args) {\n System.out.println("Hello World");\n  }\n}`
    },
    {
      id:"crystal",
      code:`puts "Hello, World!"`
    },
    {
      id:"kotlin",
      code:`fun main() {\n  println(\"Hello World!\")\n  println(\"I am learning Kotlin.\")\n  println(\"It is awesome!\")\n}`
    }
  ])
  const inpref = useRef();
  const [fileuploaded, setfileuploaded] = useState(false);
  const [sample, setsample] = useState("");      //THis will be input
  const [output, setoutput] = useState([]);       //This is output
  const [input, setinput] = useState("");
  const [code, setCode] = useState(""); // Default code snippet
  const [lan, setlanarr] = useState([]);
  const [themearray, setthemearray] = useState([]);
  const [userchat, setuser] = useState([]);
  const [loading, setloading] = useState(false);
  const [userinput, setuserinput] = useState("");
  const [sent, setsent] = useState(false);
  const [reply, setreply] = useState("");
  const [chistory, sethistory] = useState([])
  const [bottom, setbottom] = useState(false);
  const [currlng, setcurrlng] = useState("cpp");
  const [currlngversion, setcurrlngversion] = useState("");
  const [currtheme, setcurrtheme] = useState("vs-dark");
  const [toggleai, settoggleai] = useState(false);
  const [chistory2, setchistory2] = useState([]);
  const [running, setrunning] = useState(false);
  const selectref = useRef();
  async function delay(t) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, t * 1000);
    })
  }
  let mapextmim = new Map([
    ["cpp", ["text/x-c++src", ".cpp"]],
    ["javascript", ["application/javascript", ".js"]],
    ["python", ["text/x-python", ".py"]],
    ["c", ["text/x-c", ".c"]],
    ["bash", ["text/x-bash", ".sh"]],
    ["java",["text/x-java",".java"]],
    ["crystal", ["text/x-crystal", ".cr"]],
    ["kotlin", ["text/x-kotlin", ".kt"]]

  ]);
  const myCompletions = (context) => {
    let word = context.matchBefore(/\w*/);  // Matches the word before the cursor
    if (!word) return null;

    return {
      from: word.from, // Replace the matched word
      options: [
        { label: "hello", type: "text" },
        { label: "world", type: "text" },
        { label: "example", type: "keyword" },
        { label: "function", type: "keyword" }

      ]
    };
  };
  async function runcode(c) {
    setrunning(true);
    setbottom(true);

    const data = {
      "language": currlng,
      "version": currlngversion,
      "files": [
        {
          "name": "",
          "content": sample
        }
      ],
      "stdin": input
    }

    const response = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(async (res) => {
      const op = await res.json()
      console.log("Response received is ", op.run.stdout);
      setoutput(op.run.stdout.split('\n'));
      console.log("OUTPUT is ", op.run.stdout.split('\n'));
    }).catch(
      (err) => {
        console.log(err);

      });
    setrunning(false);

  }

  async function setlang(e) {

    console.log("check2");
    setcurrlng(e.l);
    console.log("THe language set is: ", e.l);
    console.log("Version of currently selected lang: ", e.v);
    setcurrlngversion(e.v);
  }
  const settheme = (e) => {
    console.log("Theme array is: ", themearray);
    setcurrtheme(e.target.value);
    monaco.editor.setTheme(e.target.value);
    console.log("Theme being set to: ", e.target.value);
  }
  // This link shows supported lngs and their versions: https://emkc.org/api/v2/piston/runtimes
  async function lngload() {
    const langs = await fetch("https://emkc.org/api/v2/piston/runtimes").then(async (res) => {
      const obj = await res.json();
      setlanarr(obj.map((ele, idx) => {
        return ele;
      }));

      setlanarr([{
        "language": "cpp",
        "version": "10.2.0"
      }, {
        "language": "javascript",
        "version": "1.32.3"
      },
      {
        "language": "java",
        "version": "15.0.2"
      },
      {
        "language": "python",
        "version": "3.10.0"
      }, {
        "language": "c",
        "version": "10.2.0"
      }, {
        "language": "bash",
        "version": "5.2.0"
      }, {
        "language": "typescript",
        "version": "1.32.3"
      },
      {
        "language": "crystal",
        "version": "0.36.1"
      },
      {
        "language": "kotlin",
        "version": "1.8.20"
      }
    

      ])

    }

    ).catch((err) => {
      console.log("error in loading languages");
    })
    console.log("Supported languages by Piston: ", lan);
    console.log("I GOT: ", themes);
  }





  const themesList = {

    "Dracula": dracula,
    "GitHub": github,
  };

  useEffect(() => {
    if (!monaco?.editor?.defineTheme) {
      console.error("Monaco Editor Theme Registration function not found!");
      return;
    }

    console.log("Monaco Editor Found! Registering Themes...");

    if (!monacoThemes || typeof monacoThemes !== "object") {
      console.error("Invalid Monaco Themes format:", monacoThemes);
      return;
    }

    const validThemes = {};
    Object.entries(monacoThemes).forEach(([themeName, themeConfig]) => {
      let base = themeConfig.base || "vs-dark";
      if (!["vs", "vs-dark", "hc-black"].includes(base)) {
        console.warn(`Skipping theme '${themeName}' due to invalid base: ${base}`);
        return;
      }
      monaco.editor.defineTheme(themeName, { ...themeConfig, base });
      validThemes[themeName] = { ...themeConfig, base };
    });

    console.log("Successfully Registered Themes:", Object.keys(validThemes));

    setthemearray(Object.keys(validThemes));
    lngload();
  }, []);


  useEffect(() => {

    if (!monaco?.editor) {
      console.error("Monaco Editor not initialized yet.");
      return;
    }

    if (!themearray.includes(currtheme)) {
      console.error(`🚨 Theme ${currtheme} not found in loaded themes!`);
      return;
    }

    console.log(`🎨 Applying theme: ${currtheme}`);
    monaco.editor.setTheme(currtheme);
  }, [currtheme]);




  const chat = model.startChat({
    history: chistory
  });
  const handleai = () => {
    settoggleai(!toggleai);
  }


  useEffect(() => {
    setchistory2(chistory);
    console.log("Chistory2 is being set");

  }, [chistory])
  const writingmsg = (e) => {
    setuserinput(e.target.value);
  }
  const sendmessage = async () => {

    setloading(true);
    if (userinput == "") {
      console.log("NO message passed");
      setloading(false);
      return;
    }
    // sethistory([...chistory,{role:"user",parts:[{text:userinput}]}]);    //being set implicitly
    setsent(true);
    console.log("SENDING MESSAge", userinput);
    const result = await chat.sendMessage(userinput);
    setuserinput("");
    setloading(false);
    console.log(result.response.text());

    // sethistory([...chistory,{role:"model",parts:[{text:result.response.text()}]}]);   //being set implicitly

    setchistory2([...chistory]);

  }

  const [lng, setlng] = useState("");


  async function findcode(str) {
    return codelist.filter((e) => {

      return e.id == str;
    })
  }
  useEffect(() => {
    console.log("RUNNN!!!");
    changelng();
  }, [fileuploaded])




  async function changelng() {

    let e;
    try {
      e = JSON.parse(selectref.current.value);

    }
    catch (err) {
      console.log("CATCH");
      return;
    }

    console.log("Runn", e);
    console.log("changing language to ", e.l);
    const selected = e.l;
    const arr = await findcode(selected);
    console.log("Array got is ", arr);
    console.log("File tag: ", fileuploaded);
    console.log("CODE IS :", arr[0]);
    setlng(selected);
    if (selected == "cpp") {
      if (!fileuploaded) {
        setsample(arr[0].code);
        console.log("Sample will be set!!");
      }

    }
    else if (selected == "javascript") {
      // setlng([javascript()]);
      if (!fileuploaded)
        setsample(arr[0].code);

    }
    else if (selected == "python") {
      // setlng([python()]);
      if (!fileuploaded)
        setsample(arr[0].code);
    }
    else if (selected == "c") {
      // setlng([cpp()]);
      if (!fileuploaded)
        setsample(arr[0].code);
    }
    else if (selected == "bash") {
      // setlng([bash()]);
      if (!fileuploaded) {
        setsample(arr[0].code);
      }
    }
    else if(selected=="java")
    {
      if(!fileuploaded)
      {
        setsample(arr[0].code);
      }
    }
    else if(selected=="crystal")
    {
      if(!fileuploaded)
      {
        setsample(arr[0].code);
      }
    }
    else if(selected=="kotlin")
      {
        if(!fileuploaded)
        {
          setsample(arr[0].code);
        }
      }


  }
  const onChange = React.useCallback((value, viewUpdate) => {

    setsample(value);
    console.log("Sample changed to ", sample);
  }, []);

  const handleFileDownload = () => {
    const element = document.createElement("a");
    console.log(mapextmim);
    const mimetype = mapextmim.get(currlng)[0];
    const ext = mapextmim.get(currlng)[1];
    const file = new Blob([sample], {
      type: mimetype
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile" + ext;
    document.body.appendChild(element);
    element.click();
  };
  //text/x-c++src
  const handlefilechange = (event) => {
    const file = event.target.files[0];
    setfileuploaded(true);
    if (file) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const fileName = file.name;
        const textDecoder = new TextDecoder("utf-8");
        const fileContent = textDecoder.decode(new Uint8Array(arrayBuffer));
        console.log("File uplaoded has name: ", fileName);
        const ext = "." + fileName.split(".")[1];
        console.log("Got the extension ", ext);
        setsample(fileContent);
        let fileType = "";
        const currext = mapextmim.forEach((v, k) => {
          if (v[1] == ext) {
            console.log("ehh ", v[1], v[0]);
            fileType = v[0];
            return k;
          }
        })

        await delay(2);
        console.log("what i got:", currext);
        setcurrlng(currext);
        const base64Data = btoa(
          new Uint8Array(arrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), "")
        );


        console.log("priting something !!: ", fileType, " ", currlng);
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

    <div className='cover2'>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="nav flex" style={{height:"45px",alignItems:"center"}}>
        <div className="head"><h1 style={{ display: 'flex', gap: '8px' }}><div className='t'>AlphaCode</div><div style={{ color: 'white' }}>IDE</div></h1></div>
        {/* <div className="btns" style={{top:"20px"}}>
            <button className='bt' onClick={() => { window.open("/login", "_blank") }}><lord-icon
            src="https://cdn.lordicon.com/rzsnbiaw.json"
            trigger="hover"
            stroke="bold"
            className='icon'>
          </lord-icon>Login</button>
         
        </div> */}
      </div>

      <div className="navbar">

        <button className='runbtn' onClick={() => { runcode(null) }} style={{ cursor: running ? "not-allowed" : "pointer" }}>
          {running ? <dotlottie-player src="https://lottie.host/53a36a5f-d442-4553-85d4-50bc25dcef6f/zG77oxC8SX.lottie" background="transparent" speed="5" style={{ width: "40px", height: "40px" }} loop autoplay></dotlottie-player> : <></>}
          <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16">
            <path d="M10.804 8 5 4.633v6.734zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696z" />
          </svg>
          {running?"Compiling":"Run Code"}</button>
        <div className="down">
          <dotlottie-player onClick={() => {
            handleFileDownload();
          }} className="download" src="https://lottie.host/1b693c03-cd37-4d22-9cf6-fbdca05aadbb/7484EdHQyQ.lottie" background="transparent" speed="1" style={{ width: "45px", height: "50px" }} ></dotlottie-player>

        </div>

        <div className='reload'  style={{ width: "35px", height: "35px" ,cursor:'pointer'}}
          onClick={async () => {
            console.log("Trying clearing!!! and fileuploaded is ", fileuploaded);
            setfileuploaded(false);
            inpref.current.value = "";
            await delay(2);
            console.log("File up after delay: ", fileuploaded);

          }}
        >
          <lord-icon
            src="https://cdn.lordicon.com/jxhgzthg.json"
            trigger="hover"
            colors="primary:#ffffff,secondary:#8930e8"
            style={{ width: "35px", height: "35px", right: "15px" }}

          >
          </lord-icon>
        </div>
        <div className="dropdown">

          <select ref={selectref}
            className="select" onChange={(e) => {
              console.log("I have to change to ", JSON.parse(e.target.value));
              setlang(JSON.parse(e.target.value));
              changelng();
            }
            } ><option >Select Language</option>
            {
              lan.map((e) => {
                return (<option value={JSON.stringify({ l: e.language, v: e.version })}>{e.language + " (v" + e.version + " )"}</option>)
              })
            }



          </select>

          <select name="" className='select' onChange={(e) => {
            settheme(e);
          }} id="" value={currtheme}>
            <option >🎨 Select theme</option>

            {
              themearray.map((e) => {
                return (<option key={e} value={e}>{e}</option>)
              })
            }
          </select>
          <select name="" className='select' onChange={(e) => {

            setfontsize(e.target.value);
            console.log("CHanging too: ", fontsize);
          }} id="" value={fontsize}>
            <option>𝓣 Font Size</option>
            <option value={14}>14</option>
            <option value={18}>18</option>
            <option value={20}>20</option>
            <option value={22}>22</option>
            <option value={24}>24</option>
            <option value={26}>26</option>
          </select>
        </div>
      </div>



      <MonacoEditor
        
        key={lng}
        defaultValue={sample}
        height="50vh"
        width='100%'
        theme={currtheme}
        defaultLanguage={lng}
        onChange={onChange}
        options={editorOptions}  // Pass word wrap settings here

        onMount={(editor, monaco) => {
          console.log("Monaco Editor Mounted!");
          Object.entries(monacoThemes).forEach(([themeName, themeConfig]) => {
            if (!monaco.editor._knownThemes?.has(themeName)) {  // Prevent duplicates
              monaco.editor.defineTheme(themeName, { ...themeConfig, base: themeConfig.base || "vs-dark" });
              console.log(`Re-registered theme: ${themeName}`);
            }
          });

          console.log("Available Themes After Mount:", Object.keys(monaco.editor._knownThemes || {}));

          // 🔹 Ensure theme is set after registering
          setTimeout(() => {
            console.log(`Applying Theme: ${currtheme}`);
            monaco.editor.setTheme(currtheme);
          }, 100);
        }}


      />


      {(toggleai) && (

        <Rnd
          default={{
            x: (window.innerWidth - 500) / 2,
            y: (window.innerHeight - 410) / 2,
            width: 500,
            height: 410,
          }}
          className="ai"
          bounds="parent"
          style={{ zIndex: 9999 }}
        >
          <div className="aihead">
            AI ASSISTANT
            <div className="close" onClick={handleai}>X
            </div>
          </div>

          <div className="response">
            {

              chistory2.map((e) => {
                return (
                  e.role == "user" ? (<div className="userin"><p key={uuid()}  >User: {e.parts.map((ele) => {
                    return ele.text;

                  })}</p></div>) : (

                    <div key={uuid()} className="aiin"><Markdown>
                      {e.parts.map((ele) => {

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
              <button onClick={sendmessage} style={{ width: '100%' }}>Search</button>
            </div>


          </div>
        </Rnd>
      )

      }
      <Rnd    default={{
            x: 0,
            y: (window.innerHeight - 410) / 2,
            width: "100%",
            height: 410,
          }}
          minHeight={200}
          maxHeight={500}
          enableResizing={{
            top:true,
            bottom:false,
            left:false,
            right:false
          }}
          disableDragging={true}
           className="bottomfix flex" style={{ display: !bottom ? "none" : "" }}>

        <div className="term cov">
          <div className="headinginput" style={{ display: "flex", gap: "54%" }}>
            Input
            <input type="file" onChange={handlefilechange} ref={inpref} style={{ backgroundColor: "grey", borderRadius: "5px" }} />
            {/* <button onClick={()=>{openfile()}}>Open</button> */}
          </div>

          <div className="terminal grey">
            <textarea placeholder='Enter your input here!!' type="text" className='grey' value={input} onChange={(e) => {
              setinput(e.target.value);
              console.log("E IS ", e.target.value);
            }}>
            </textarea>
          </div>
        </div>
        <div className="out cov">
          Output
          <div className="output grey">
            <svg style={{ cursor: "pointer" }} onClick={() => {
              navigator.clipboard.writeText("hello")
              toast('Copied to clipboard!!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",

              });

            }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi copy" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z" />
            </svg>
            <div className="op">
              {
                output.map((ele) => {
                  return (
                    <p>{ele}</p>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="close2" onClick={() => {
          setbottom(false)
        }}>x</div>
      </Rnd>
      <div className="ailogo" onClick={handleai}>
   {/* <div className="ailogo" onClick={handleShow}> */}

        <DotLottieReact
          style={{ height: '100px', width: '100px' }}
          src="https://lottie.host/1aa41790-2112-4fe3-b13f-dcce5eb21337/x2e5M9T9D8.lottie"
        />


      </div>



    </div>
  );
}

export default guest



