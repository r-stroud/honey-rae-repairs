import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import "./Employees.css"

export const EmployeeList = () => {

    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            const fetchCall = async () => {
                const fetchData = await fetch("http://localhost:8088/users?isStaff=true")
                const jsonData = await fetchData.json()
                setEmployees(jsonData)
            }
            fetchCall()
        },
        []
    )
    return <article className="employees_customers">
        {
            employees.map(employee => {
                return <Employee key={`employee--${employee.id}`}
                    id={employee.id}
                    fullName={employee.fullName}
                    email={employee.email} />
            })
        }
    </article>

}