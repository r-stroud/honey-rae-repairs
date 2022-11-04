import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

export const TicketEdit = () => {

    const [ticket, updateTickets] = useState({
        userId: 0,
        description: "",
        emergency: false
    })

    const currentPath = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            const fetchTicket = async () => {
                const fetchData = await fetch(`http://localhost:8088/serviceTickets/${currentPath.ticketId}`)
                const fetchJson = await fetchData.json()
                updateTickets(fetchJson)
            }
            fetchTicket()
        },
        []
    )

    const saveChanges = async (event) => {
        const editedObj = {
            userId: ticket.userId,
            description: ticket.description,
            emergency: ticket.emergency
        }

        const fetchData = await fetch(`http://localhost:8088/serviceTickets/${currentPath.ticketId}`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editedObj)
            })

        const fetchJson = await fetchData.json()
    }

    return (<form
        className="ticketForm">
        <h2
            className="ticketForm_title">Edit Service Ticket</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="description">Description: </label>
                <textarea
                    required
                    autoFocus
                    type="text"
                    className="form_control description"
                    value={ticket.description}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.description = evt.target.value
                            updateTickets(copy)
                        }
                    }>
                </textarea>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="emergency">Emergency: </label>
                <input
                    autoFocus
                    type="checkbox"
                    checked={ticket.emergency}
                    value={ticket.emergency}
                    onChange={
                        (evt) => {
                            const copy = { ...ticket }
                            copy.emergency = evt.target.checked
                            updateTickets(copy)
                        }
                    }>
                </input>

            </div>
        </fieldset >
        <button
            className="btn btn-primary"
            onClick={
                (clickEvent) => {
                    saveChanges(clickEvent)
                    navigate("/tickets")
                }
            }>Save Edits</button>

    </form >)
}