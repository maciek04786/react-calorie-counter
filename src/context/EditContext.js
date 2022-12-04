import { createContext, useReducer } from 'react'

export const EditContext = createContext()

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'EDIT_ON':
      return { ...state, id: action.payload, editMode: true }
    case 'EDIT_OFF':
      return { ...state, id: null, editMode: false }
    default:
      return state
  }
}

export function EditProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    id: null,
    editMode: false
  })

  const editOn = (id) => {
    dispatch({ type: 'EDIT_ON', payload: id })
  }
  const editOff = () => {
    dispatch({ type: 'EDIT_OFF' })
  }

  return (
    <EditContext.Provider value={{...state, editOn, editOff}}>
      {children}
    </EditContext.Provider>
  )
}