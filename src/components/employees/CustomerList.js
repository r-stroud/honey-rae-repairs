import { useState, useEffect } from "react"
import { Customer } from "./Customer"

export const CustomerList = () => {

    const [customerList, setCustomerList] = useState([])

    useEffect(
        () => {
            const fetchCall = async () => {
                const fetchData = await fetch("http://localhost:8088/customers?_expand=user")
                const fetchJson = await fetchData.json()
                setCustomerList(fetchJson)
            }
            fetchCall()
        },
        []
    )





    return <article className="employees_customers">

        {
            customerList.map((obj) => <Customer prop={obj} />)
        }

    </article>
}