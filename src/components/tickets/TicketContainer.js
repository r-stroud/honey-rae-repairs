import { useState, useEffect } from "react"
import { TicketSearch } from "./TicketSearch"
import { TicketList } from "./TicketList"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <TicketSearch setterFunction={setSearchTerms} example1={100} example2={"foobar"} />
        <TicketList searchTermState={searchTerms} />
    </>
}