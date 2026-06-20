import React, { useContext } from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'
import { AuthContext } from '../../context/AuthProvider'

const TaskList = ({ data }) => {
    const [userData, setUserData] = useContext(AuthContext)

    const persist = (updated) => {
        setUserData(updated)
        localStorage.setItem('employees', JSON.stringify(updated))
    }

    const handleAccept = (taskIndex) => {
        const updated = userData.map(emp => {
            if (emp.id === data.id) {
                const tasks = emp.tasks.map((t, i) => i === taskIndex ? ({ ...t, active: true, newTask: false, completed: false, failed: false }) : t)
                const taskCounts = { ...emp.taskCounts }
                taskCounts.newTask = Math.max(0, (taskCounts.newTask || 0) - 1)
                taskCounts.active = (taskCounts.active || 0) + 1
                return { ...emp, tasks, taskCounts }
            }
            return emp
        })
        persist(updated)
    }

    const handleComplete = (taskIndex) => {
        const updated = userData.map(emp => {
            if (emp.id === data.id) {
                const tasks = emp.tasks.map((t, i) => i === taskIndex ? ({ ...t, completed: true, active: false, newTask: false, failed: false }) : t)
                const taskCounts = { ...emp.taskCounts }
                taskCounts.active = Math.max(0, (taskCounts.active || 0) - 1)
                taskCounts.completed = (taskCounts.completed || 0) + 1
                return { ...emp, tasks, taskCounts }
            }
            return emp
        })
        persist(updated)
    }

    const handleFail = (taskIndex) => {
        const updated = userData.map(emp => {
            if (emp.id === data.id) {
                const tasks = emp.tasks.map((t, i) => i === taskIndex ? ({ ...t, failed: true, active: false, newTask: false, completed: false }) : t)
                const taskCounts = { ...emp.taskCounts }
                taskCounts.active = Math.max(0, (taskCounts.active || 0) - 1)
                taskCounts.failed = (taskCounts.failed || 0) + 1
                return { ...emp, tasks, taskCounts }
            }
            return emp
        })
        persist(updated)
    }

    return (
        <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16'>
            {data.tasks.map((elem, idx) => {
                if (elem.active) {
                    return <AcceptTask key={idx} data={elem} onComplete={() => handleComplete(idx)} onFail={() => handleFail(idx)} />
                }
                if (elem.newTask) {
                    return <NewTask key={idx} data={elem} onAccept={() => handleAccept(idx)} />
                }
                if (elem.completed) {
                    return <CompleteTask key={idx} data={elem} />
                }
                if (elem.failed) {
                    return <FailedTask key={idx} data={elem} />
                }

            })}
        </div>
    )
}

export default TaskList