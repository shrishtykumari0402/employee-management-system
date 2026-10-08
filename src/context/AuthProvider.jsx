import React, { createContext, useEffect, useState } from 'react'
import { getLocalStorage, getTaskCounts, setLocalStorage } from '../utils/localStorage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // localStorage.clear()

    const [userData, setUserData] = useState(null)

    useEffect(() => {
        setLocalStorage()
        const {employees} = getLocalStorage()
        const updatedEmployees = employees.map(employee => ({
            ...employee,
            taskCounts: getTaskCounts(employee.tasks)
        }))
        localStorage.setItem('employees', JSON.stringify(updatedEmployees))
        setUserData(updatedEmployees)
    }, [])
    
    

    return (
        <div>
            <AuthContext.Provider value={[userData,setUserData]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider