import { useEffect, useState } from "react"

export const EmployeeForm = () => {

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const [profile, updateProfile] = useState({
        specialty: "",
        rate: 0,
        userId: 0
    })


    useEffect(
        () => {
            const fetchCall = async () => {
                const fetchData = await fetch(`http://localhost:8088/employees?userId=${honeyUserObject.id}`)
                const fetchJson = await fetchData.json()
                updateProfile(fetchJson[0])
            }
            fetchCall()

        }, [])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const fetchCall = async () => {
            const fetchData = await fetch(`http://localhost:8088/employees/${profile.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(profile)
                })
            // const fetchJson = await fetchData.json()
        }

        fetchCall()
        setFeedback("Employee profile successfully saved")


    }

    return (<>
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form className="profile">
            <h2 className="profile__title">Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={profile.specialty}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.specialty = evt.target.value
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hourly_rate">Hourly rate:</label>
                    <input type="number"
                        className="form-control"
                        value={profile.rate}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.rate = parseFloat(evt.target.value, 2)
                                updateProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => {
                    handleSaveButtonClick(clickEvent)
                }}
                className="btn btn-primary">
                Save Profile
            </button>
        </form>
    </>)
}