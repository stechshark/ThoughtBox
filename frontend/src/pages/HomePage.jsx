import React, { useEffect } from 'react'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import toast from "react-hot-toast"
import api from '../lib/axios'
import NoteCard from '../components/NoteCard'
import NotesNotFound from '../components/NotesNotFound'

const HomePage = (props) => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      const fetchNotes = async () => {
          try {
            const res = await api.get("/notes");
            console.log(res.data)
            setNotes(res.data)
            setIsRateLimited(false)
          } catch (error) {
            console.log("Error fetching notes")
            console.log(error.response)
            if(error.response?.status === 429){
              setIsRateLimited(true)
            } else {
              toast.error("Fail to error notes page")
            }
            
          }  finally {
              setLoading(false)
            }

      };

      fetchNotes();
  },[]);
  return (
    <div className='min-h-screen'>
      <Navbar/>

      {isRateLimited && <RateLimitedUI/>}

      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && <div className='text-center text-primary py-10'>Loading Notes...</div> }

        {notes.length === 0 && !isRateLimited && <NotesNotFound/> }

        {notes.length > 0 && !isRateLimited && (
          <div className="notesArea gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {notes.map(note => (
              <div>
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
