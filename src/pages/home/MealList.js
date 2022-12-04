import React from 'react'
import { useEdit } from "../../hooks/useEdit"

// styles
import "./MealList.css"

// bootstrap
import { ListGroup, Button } from 'react-bootstrap'

export default function MealList({ meals }) {
    const { editOn } = useEdit()

    const handleClick = (e) => {
        editOn(parseInt(e.target.id))
    }

    return (
        <ListGroup variant='flush'>
            {meals.map(meal => (
                <ListGroup.Item key={meal.id} id={meal.id}>
                    <div>{meal.name}: {meal.caloriesAmount} 
                    <Button
                        id={meal.id}
                        onClick={handleClick}
                        className="edit-btn"
                        variant="outline-success"
                        size="sm"
                    >edit</Button></div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
