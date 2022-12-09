import { useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

// bootstrap
import { Form, Card, Row, Col, Button } from "react-bootstrap"

export default function ItemForm() {
    const [name, setName] = useState("")
    const [calories, setCalories] = useState(0)
    const { data, addItem } = useLocalStorage()

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

    return (
        <Card border="success">
            <Card.Body>
                <Card.Title>Add Meal/Food Item</Card.Title>
                <Form onSubmit={addClick}>
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
                    <Button variant="success" type="submit">ADD MEAL</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
