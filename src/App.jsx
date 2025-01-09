import { useState,useEffect } from 'react'
import Nav from './components/nav'
import './App.css'

function App() {
 const [responsearr,setresponsearr]=useState([]);
 const [search,setsearch]=useState("");
 const [searcharray,setsearcharray]=useState([]);

 useEffect(()=>{
  console.log("REspone arr is ",responsearr);
 },[])
const fetchmovie=async()=>{
  const url=`https://www.omdbapi.com/?s=${search}&apikey=ca7cc666`
  const res=await fetch(url);
  const data=await res.json();
  console.log(data.Search);
  setresponsearr(data.Search);
 
}
const handlechange=(e)=>{
  console.log(search);
  setsearch(e.target.value);
}
  return (
    <>
      <Nav/>
      <div className="search" style={{fontSize:'20px'}}>
       <div className="ip1"><input type="text" className='ip2' value={search} onChange={handlechange} placeholder="Search a movie" /></div> 
       <div className="btn" onClick={()=>{fetchmovie()}}><button style={{fontSize:'20px'}} className='btn'>Search</button></div>
      </div>
      <div className="movies flex">
      {
        
        responsearr.map((e)=>{
          return(
           <div className="mov" style={{display:'flex', flexDirection:'column'}}>
            <div className="img">
            <img className='img2' src={e.Poster} alt="" />
            </div>
             <div className="footer" style={{display:'flex', flexDirection:'column'}}>
            <div className="title" style={{textAlign:'center'}}><p className='title2'>{e.Title}</p></div>
            <div className="release flex">{e.Year}</div>
            </div>
           
           </div>
          )
        })
      }
      </div>
      
    </>
  )
}

export default App
