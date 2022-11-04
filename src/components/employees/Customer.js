import { useState, useEffect } from "react"

export const Customer = ({ prop }) => {

    const [filterdProp, setFilteredProps] = useState(false)

    return <section className="employee_customer" key={`customer--${prop.id}`}>
        <div onClick={
            () => {
                setFilteredProps(!filterdProp)
            }
        }>Name:{prop.user.fullName}</div>

        {filterdProp ? <>
            <div>Address:{prop.address}</div>
            <div>Phone Number:{prop.phoneNumber}</div>
            <div>Email:{prop.user.email}</div>

        </> : <>
            <div>Address:{prop.address}</div>
            <div>Phone Number:{prop.phoneNumber}</div>

        </>

        }
    </section>


}