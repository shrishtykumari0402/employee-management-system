import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = (props) => {

   const [userData,setUserData] =  useContext(AuthContext)
   const [selected, setSelected] = useState(null)

  if (!userData) return <div className='p-5'>Loading...</div>

  return (
  <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
    <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
      <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
      <h3 className='text-lg font-medium w-1/5'>New Task</h3>
      <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
      <h5 className='text-lg font-medium w-1/5'>Completed</h5>
      <h5 className='text-lg font-medium w-1/5'>Failed</h5>
      <h5 className='text-lg font-medium w-1/5'>Actions</h5>
    </div>
    <div className=''>
    {(userData || []).map(function(elem,idx){
      return <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
      <h2 className='text-lg font-medium  w-1/5'>{elem.firstName}</h2>
      <h3 className='text-lg font-medium w-1/5 text-blue-400'>{elem.taskCounts.newTask}</h3>
      <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{elem.taskCounts.active}</h5>
      <h5 className='text-lg font-medium w-1/5 text-white'>{elem.taskCounts.completed}</h5>
      <h5 className='text-lg font-medium w-1/5 text-red-600'>{elem.taskCounts.failed}</h5>
      <div className='w-1/5 flex gap-2'>
        <button type="button" onClick={() => setSelected(elem)} className='bg-blue-600 text-white py-1 px-2 rounded text-sm'>View</button>
      </div>
    </div>
    })}
    </div>

    {selected && (
      <div className='mt-4 p-4 bg-[#111] rounded'>
        <div className='flex justify-between items-center mb-2'>
          <button type="button" onClick={() => setSelected(null)} className='text-sm text-gray-300'>Close</button>
          <button onClick={() => setSelected(null)} className='text-sm text-gray-300'>Close</button>
        </div>
        <div className='grid gap-2'>
          {(selected.tasks || []).map((t,i) => (
            <div key={i} className='p-2 border rounded bg-[#1a1a1a]'>
              <div className='flex justify-between'>
                <strong>{t.taskTitle}</strong>
                <span className='text-sm'>{t.taskDate}</span>
              </div>
              <p className='text-sm mt-1'>{t.taskDescription}</p>
              <div className='text-xs mt-1'>Status: {t.newTask ? 'New' : t.active ? 'Accepted' : t.completed ? 'Completed' : t.failed ? 'Failed' : 'Unknown'}</div>
            </div>
          ))}
          {(!(selected.tasks || []).length) && (
            <div className='p-2 text-sm text-gray-300'>No tasks for this employee.</div>
          )}
        </div>
      </div>
    )}

  </div>
  )
}

export default AllTask