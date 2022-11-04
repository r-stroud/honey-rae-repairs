export const Employee = ({ id, fullName, email }) => {
    return <section className="employee_customer" >
        <div>Name: {fullName}</div>
        <div>Email: {email}</div>
    </section>
}