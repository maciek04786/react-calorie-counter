import { useState} from 'react'
import { useEdit } from "../../hooks/useEdit"
import { useLocalStorage } from '../../hooks/useLocalStorage'

// styles
import "./MealList.css"

// bootstrap
import { Card, ListGroup, Button, Form, Col, Row } from 'react-bootstrap'

export default function MealList() {
    const [newName, setNewName] = useState("")
    const [newCalories, setNewCalories] = useState(0)
    const { id, editOn, editOff, editMode } = useEdit()
    const { data, getItem, editItem, deleteItem, clearData } = useLocalStorage()

    const editClick = (e) => {
        const meal = getItem(parseInt(e.target.id))
        setNewName(meal.name)
        setNewCalories(meal.caloriesAmount)
        editOn(parseInt(e.target.id))
    }

    const backClick = () => {
        editOff()
        setNewName("")
        setNewCalories(0)
    }

    const updateClick = () => {
        const newItem = { id: id, name: newName, caloriesAmount: newCalories }
        editItem(newItem)
        editOff()
        setNewName("")
        setNewCalories(0)
    }

    const deleteMealClick = () => {
        deleteItem(id)
        editOff()
        setNewName("")
        setNewCalories(0)
    }

    const deleteAllClick = () => {
        clearData()
        editOff()
    }

    return (
        <ListGroup variant='flush'>
            {data.map(meal => (
                <ListGroup.Item key={meal.id}>
                    <div><strong>{meal.name}</strong>: <em>{meal.caloriesAmount}</em>
                    {id === meal.id ? (
                        <Button
                            className="back-btn"
                            variant="success"
                            size="sm"
                            onClick={backClick}
                        >back</Button>
                    ) : (
                        <Button
                            id={meal.id}
                            onClick={editClick}
                            className="edit-btn"
                            variant="outline-success"
                            size="sm"
                        >edit</Button>
                    )}</div>
                {id === meal.id  && (
                    <Card border="success">
                        <Card.Body>
                            <Card.Title>Edit item</Card.Title>
                            <Row>
                                <Col>
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='text'
                                            onChange={(e) => setNewName(e.target.value)}
                                            value={newName}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group>
                                        <Form.Label>Calories</Form.Label>
                                        <Form.Control
                                            type='number'
                                            onChange={(e) => setNewCalories(e.target.value)}
                                            value={newCalories}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button
                                variant="warning"
                                className="update-btn"
                                onClick={updateClick}
                            >UPDATE</Button>
                            <Button 
                                className="delete-btn"
                                variant="danger"
                                onClick={deleteMealClick}
                            >DELETE MEAL
                            </Button>
                        </Card.Body>
                    </Card>
                )}
                </ListGroup.Item>
            ))}
            {editMode && (
                <Button
                    variant="danger"
                    className="clear-btn" 
                    onClick={deleteAllClick}
                >CLEAR ALL</Button>
            )}
        </ListGroup>
    )
}
