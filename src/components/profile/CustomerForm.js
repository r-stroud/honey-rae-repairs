import { useEffect, useState } from "react"


export const CustomerForm = () => {

    const [feedback, setFeedback] = useState("")

    useEffect(
        () => {
            if (feedback !== "") {
                setTimeout(() => setFeedback(""), 3000)
            }
        },
        [feedback]
    )

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    const [profile, updateProfile] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const postProfile = async () => {
            const fetchData = await fetch(`http://localhost:8088/customers/${profile.id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(profile)
                })
        }
        postProfile()
        setFeedback("Customer Profile Updated Successfully")

    }

    useEffect(
        () => {
            const fetchProfile = async () => {
                const fetchData = await fetch(`http://localhost:8088/customers?userId=${honeyUserObject.id}`)
                const fetchJson = await fetchData.json()
                updateProfile(fetchJson[0])
            }

            fetchProfile()
        }
        , []
    )

    return <>
        <div
            className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        <form
            className="profile">
            <h2
                className="profile_title">Profile</h2>
            <fieldset>
                <div
                    className="form_group">
                    <label
                        htmlFor="address">Address</label>
                    <input
                        required
                        autoFocus
                        type="text"
                        className="form_control"
                        value={profile.address}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.address = evt.target.value
                                updateProfile(copy)
                            }
                        }
                    >
                    </input>
                </div>
            </fieldset>
            <fieldset>
                <div
                    className="form_group">
                    <label
                        htmlFor="phone_number">Phone Number</label>
                    <input
                        required
                        autoFocus
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        className="form_control"
                        value={profile.phoneNumber}
                        onChange={
                            (evt) => {
                                const copy = { ...profile }
                                copy.phoneNumber = evt.target.value
                                updateProfile(copy)
                            }
                        }
                    >
                    </input>
                </div>
            </fieldset>
            <button
                className="btn btn-primary"
                onClick={
                    (clickEvent) => {
                        handleSaveButtonClick(clickEvent)
                    }
                }>
                Save Profile
            </button>

        </form>

    </>
}