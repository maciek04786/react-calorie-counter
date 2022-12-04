import { useState, useEffect } from 'react'
import { useEdit } from "../../hooks/useEdit"
import { useLocalStorage } from '../../hooks/useLocalStorage'

// styles
import "./ItemForm.css"

// bootstrap
import { Form, Card, Row, Col, Button } from "react-bootstrap"

export default function ItemForm() {
    const [name, setName] = useState("")
    const [calories, setCalories] = useState(0)
    const { id, editMode, editOff } = useEdit()
    const { data, addItem, getItem, editItem, deleteItem, clearData } = useLocalStorage()

    // add new meal
    const addClick = () => {

        // create id for new meal using highest id from existing meals
        let newItemID = 0
        if (data.length > 0) {
            data.forEach((item) => {
            if (item.id >= newItemID) {
                newItemID = item.id + 1
            }
        })
        }

        // creating new meal object
        const newMeal = { id: newItemID, name: name, caloriesAmount: calories }
        addItem(newMeal)
    }

    // reset edit mode
    const backClick = () => {
        editOff()
        setName("")
        setCalories(0)
    }

    // update meal
    const updateClick = () => {
        const newItem = { id: id, name: name, caloriesAmount: calories }
        editItem(newItem)
        editOff()
        setName("")
        setCalories(0)
    }

    // delete meal
    const deleteClick = () => {
        deleteItem(id)
        editOff()
        setName("")
        setCalories(0)
    }

    // delete all meals
    const clearClick = () => {
        clearData()
        editOff()
        setName("")
        setCalories(0)
    }

    // set input for currently edited meal
    useEffect(() => {
        if (editMode) {
            const editedMeal = getItem(id)
            setName(editedMeal.name)
            setCalories(editedMeal.caloriesAmount)
        }
    }, [editMode])

    return (
        <Form onSubmit={addClick}>
            <Card.Title>Add Meal/Food Item</Card.Title>
            <Row>
                <Col>
                    <Form.Group className='mb-3'>
                        <Form.Label>Meal</Form.Label>
                        <Form.Control
                            autoFocus
                            required
                            type='text'
                            placeholder='Add Item'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>Calories</Form.Label>
                        <Form.Control
                            required
                            type='number'
                            placeholder='Add calories'
                            onChange={(e) => setCalories(e.target.value)}
                            value={calories}
                        />
                    </Form.Group>
                </Col>
            </Row>
            {!editMode && <Button variant="success" type="submit">ADD MEAL</Button>}
            {editMode && 
                <>
                    <Button 
                        variant="info"
                        onClick={updateClick}
                    >UPDATE MEAL</Button>
                    <Button 
                        className="delete-btn" 
                        variant="warning"
                        onClick={deleteClick}
                    >DELETE MEAL
                    </Button>
                    <Button
                        className="back-btn"
                        variant="secondary"
                        onClick={backClick}
                    >BACK</Button>
                    <Button
                        className="clear-btn"
                        onClick={clearClick}
                        variant="danger"
                    >DELETE ALL</Button>
                </>
            }
        </Form>
    )
}
