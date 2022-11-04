import { Link } from "react-router-dom"

export const Ticket = ({ ticketObject, currentUser, employees, getAllTickets }) => {

    let assignedEmployee = null

    const employeeTicketsLength = ticketObject.employeeTickets

    if (employeeTicketsLength.length > 0) {
        const ticketEmployeeRelationship = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRelationship.employeeId)
    }

    const userEmployeeId = employees.find(employee => employee.userId === currentUser.id)

    const canClose = () => {
        if (userEmployeeId?.id === assignedEmployee?.id && ticketObject.dateCompleted === "" && userEmployeeId?.id !== undefined) {
            return <button className="ticket_finish"
                onClick={
                    () => { closeTicket() }
                }>Finish</button>
        } else {
            return ""
        }

    }
    const deleteButton = () => {
        if (!currentUser.staff) {
            return <button className="ticket_delete"
                onClick={
                    () => {
                        const deleteTicket = async () => {
                            const fetchData = await fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`,
                                {
                                    method: "DELETE"
                                })
                            getAllTickets()
                        }
                        deleteTicket()



                    }
                }>Delete</button>
        } else {
            return ""
        }

    }

    const closeTicket = () => {
        const copy = {
            userId: ticketObject.id,
            description: ticketObject.description,
            emergency: ticketObject.emergency,
            dateCompleted: new Date()
        }

        const postTicket = async () => {
            const fetchData = await fetch(`http://localhost:8088/serviceTickets/${ticketObject.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(copy)
            })
            const fetchJson = await fetchData.json()
            getAllTickets()
        }
        postTicket()

    }

    const buttonOrNoButton = () => {
        if (currentUser.staff) {
            return <>
                <button
                    onClick={
                        () => {
                            const postClaim = async () => {
                                const fetchCall = await fetch(`http://localhost:8088/employeeTickets`,
                                    {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            employeeId: userEmployeeId.id,
                                            serviceTicketId: ticketObject.id
                                        })

                                    })
                                const fetchData = await fetchCall.json()
                                getAllTickets()
                            }
                            postClaim()

                        }}>
                    Claim</button>
            </>
        }
    }

    return <section key={ticketObject.id} className="ticket">
        <header className="ticket_header">
            {
                currentUser.staff ?
                    `Ticket ${ticketObject.id}`
                    :
                    <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
            }

        </header>
        <section>{ticketObject.description}</section>
        <section>Emergency: {ticketObject.emergency ? "❗" : "No"}</section>
        <footer className="ticket_footer">
            {
                ticketObject.employeeTickets.length ?
                    `Currently being worked on 
                    ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                    : buttonOrNoButton()
            }
            {
                canClose()
            }
            {
                deleteButton()
            }

        </footer>
    </section>
}