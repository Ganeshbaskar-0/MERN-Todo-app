import "./index.css"
import React, { useState,useEffect } from 'react'


const App = () => {
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [success , setSuccess] = useState("")
  const [error , setError] = useState("")
  const [todo,setTodo]=useState([])
  const [edit,setEdit] = useState(-1)
  const [editTitle,setEditTitle] = useState("")
  const [editDescription,setEditDescription] = useState("")
  const apiurl="http://localhost:3000"



  

  function handleSubmit()
  {
    if(title.trim()!=="" && description.trim()!== "")
    {
      
      fetch(apiurl+"/todos",{
        method:"POST",
        headers:{
          'content-Type':'application/json',
        },
        body:JSON.stringify({title,description})
      }).then((res)=>{
        if(res.ok){
          setTodo([...todo,{title,description}])
          setSuccess("Item Added Successfully")
          setTimeout(()=>{
          setTitle("")
        setDescription("")
            setSuccess("")
        }, 3000)

        }
      }).catch((err)=>{
        setError("Failed to add item")

      })
    }

  }
          useEffect(()=>{
      getItems()
      }
      ,[])

    function getItems()
    {
      fetch(apiurl+"/todos")
      .then((res)=> res.json())
      .then((res)=> setTodo(res))
      .catch((err)=>setError("Failed to fetch items"))
    }

    function handleEdit(item){
      setEditTitle(item.title)
      setEditDescription(item.description)
      setEdit(item._id)

    }

    function handleSave(item){

      if(editTitle.trim() !=="" && editDescription.trim() !== "")
      {
        fetch(apiurl+"/todos/"+edit,{
          method:"PUT",
          headers:{
            'content-Type':'application/json',
        },
        body:JSON.stringify({title:editTitle,description:editDescription})
      }).then((res)=>{
        if(res.ok)
          { 

            const updateTodo =todo.map((item)=>{
             if(edit==item._id)
            {
              item.title=editTitle
              item.description=editDescription

              setSuccess("Item updated successfully")
              setTimeout(()=>{
              setSuccess("")
              ,3000})
              setEdit(-1)
            }})
          }
        }
      ).catch((err)=>{
        setError("cannot update the item")

      })
    }}

    function handleDelete(id){
      if(window.confirm("Are you sure Want to delete?"))
      {
        fetch(apiurl+"/todos/"+id,{
          method:"DELETE"

        }).then((res)=>{
          const updated_todo =todo.filter((item)=>item._id!==id)
          setTodo(updated_todo)

        })
      }


    }


  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      <div className=" flex justify-center items-center ">
        <div className=" w-1/3.5  mt-10   bg-white/0 border border-[#D1478C]/60 rounded-3xl    ">
          <h1 className="text-[#F8FAFC]  font-Poppins font-semibold text-4xl p-4 text-center ">TODO Project in MERN Stack</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center  text-white">
        <h3 className="text-center mt-5 text-2xl ">Add a task</h3>
        {success && <p className="text-green-500 text-center ">{success}</p>}
      </div>
      
      <div className="flex justify-center-safe w-full mt-10 gap-2 flex-wrap flex-row ">
        <div className="bg-white/20 flex backdrop:backdrop-blur-3xl rounded-lg  border-2 border-[#1A312C]/40 ">
      <input  className="p-2 focus:outline-none  text-white placeholder:text-center" type="text" placeholder="✏️  Title" value={(title)} onChange={(e)=>setTitle(e.target.value)}/> 
      </div>
      <div className="bg-white/20 flex backdrop:backdrop-blur-3xl rounded-lg   border-2 border-[#1A312C]/40">
      <input  className="p-2 focus:outline-none  text-white placeholder:text-center " type="text" placeholder="📝 Description" value={(description)}
      onChange={(e)=>setDescription(e.target.value)}/> 
      </div>
      <button className="px-5 rounded-lg cursor-pointer hover:shadow-lg  bg-transparent border border-[#723EC3] text-white shadow-lg hover:scale-105 hover:bg-[#723EC3] hover:text-black 
          transition-transform duration-300 lg:px-7" onClick={handleSubmit}>Add</button>
      </div>
      {error && <p className="text-red-500 text-center flex  justify-center mt-5">{error}</p> }
      <div className="flex justify-center mt-10 ">
        <h1 className="text-white text-3xl font-semibold ]">🎯 Tasks</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 justify-items-center mt-6  rounded-lg">
        {
          todo.map((item)=>(
                    <div  key={item._id}className="bg-white/5 md:w-94 md:h-50 w-75 h-50 rounded-lg flex  backdrop:blur-2xl items-center  text-white flex-col p-2 border border-[#FFFFF]/20 shadow-2xl hover:shadow-lg hover:scale-105 transition duration-300">
                      {edit!==item._id?
                      <>
                        <span className="font-semibold ">🎯 {item.title}</span>
                        <span className="mt-3 flex-1  break-all overflow-y-auto">{item.description}</span>

                      <div className="flex justify-around gap-2 mt-auto w-full mb-2 "> 
                        <button className="px-4 py-2 bg-[#496DDB] text-white rounded-lg hover:bg-[#016FB9]/80 cursor-pointer hover:shadow-lg hover:scale-105 transition duration-300" onClick={()=>handleEdit(item)}>Edit</button>
                        <button className="px-4 py-2 bg-[#D92243]/80 text-white rounded-lg hover:bg-[#FB4D3D]/80hover:shadow-lg hover:scale-105 transition duration-300 cursor-pointer" onClick={()=>handleDelete(item._id)}>Delete</button> 
                      </div>
                      </> :(
                        <>
                       <div className="flex flex-col  justify-center mt-5 gap-3">
                        <input className="placeholder:text-center  px-2 ml-7.5  border w-[80%]  focus:outline-none border-[#4DFFF3] rounded-lg" placeholder="✏️  Title" maxLength={20} type="text " value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                        <input className="placeholder:text-center flex-1 flex p-2 mt-3 border border-[#4DFFF3] focus:outline-none rounded-lg w-[80%] ml-7.5" placeholder="📝  description " type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                        </div>
                        <div className="flex justify-center gap-2 mt-3 w-full">
                          <button className="px-4 py-2 bg-[#496DDB] text-white rounded-lg  hover:bg-[#016FB9]/80 hover:shadow-lg hover:scale-105 transition duration-300" onClick={handleSave}>save</button>
                        </div>
                        </>
                      )}
                    </div>
          ))}



      </div>
      </div>
      
  )
}

export default App;