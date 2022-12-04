import { useCallback, useEffect, useState } from 'react'
import { useEdit } from './useEdit'

export const useLocalStorage = () => {
    const [data, setData] = useState([])
    const { editMode } = useEdit()

    const fetchData = useCallback(() => {
        const ref = JSON.parse(localStorage.getItem("meals"))
        if (ref !== null) {
            setData(ref)
        }
    }, [])

    // fetch data from local storage
    useEffect(() => {
        fetchData()
    }, [fetchData, editMode])

    const addItem = (newMeal) => {
        data.push(newMeal)
        localStorage.setItem("meals", JSON.stringify(data))
    }

    // fetch single item
    const getItem = id => {
        let found
        data.forEach(item => {
            if (item.id === id) {
                found = item
            }
        })
        return found
    }
        
    // edit single item
    const editItem = (newItem) => {
        let itemIndex
        data.forEach((item, index) => {
            if (item.id === newItem.id) {
                itemIndex = index
            }
        })
        data.splice(itemIndex, 1, newItem)
        localStorage.setItem("meals", JSON.stringify(data))
    }

    // remove single item
    const deleteItem = id => {
        let itemIndex
        data.forEach((item, index) => {
            if (item.id === id) {
                itemIndex = index
                data.splice(itemIndex, 1)
            }
        })
        localStorage.setItem("meals", JSON.stringify(data))
    }

    // delete all
    const clearData = () => {
        localStorage.setItem("meals", JSON.stringify([]))
    }
  
    return { data, addItem, getItem, editItem, deleteItem, clearData }
}
