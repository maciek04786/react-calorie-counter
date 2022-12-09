import{ useState, useEffect } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

// styles
import "./Home.css"

// bootstrap
import { Container } from 'react-bootstrap'

// components
import ItemForm from './ItemForm'
import MealList from './MealList'

export default function Home() {
    const [totalCalories, setTotalCalories] = useState(0)
    const { data } = useLocalStorage()

    // calculate total calories
    useEffect(() => {
        let calories = 0
        data.forEach((meal) => {
            calories += parseInt(meal.caloriesAmount)
        })
        setTotalCalories(calories)
    }, [data])

    return (
        <div>
            <Container>
                <ItemForm />
                <h2 className='total-calories'>Total calories: {totalCalories}</h2>
            </Container>
            <Container>
                {data && <MealList />}
            </Container>
        </div>
    )
}