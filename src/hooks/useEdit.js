import { useContext } from "react"
import { EditContext } from "../context/EditContext"

export const useEdit = () => {
  const context = useContext(EditContext)

  if (context === undefined) {
    throw new Error("useEdit() must be used inside a EditProvider")
  }

  return context
}