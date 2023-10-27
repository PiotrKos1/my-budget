import { useState } from 'react'
import { useFetchExpensesQuery, useAddExpenseMutation} from '../store/store'
import { GoX, GoPlus } from 'react-icons/go'
import ExpensesList from './ExpensesList'
import ExpenseItem from './ExpenseItem'

function ExpensesAddingPanel({ category }) {
	const [expenseName, setExpenseName] = useState('')
	const [price, setPrice] = useState('')
	const { data, isLoading, error } = useFetchExpensesQuery(category)
	const [addExpense, results] = useAddExpenseMutation()


	if (results.isLoading) {
		console.log('git')
	}

	// const renderedExpenses = data.map((expense)=>{return <div key={expense.id}>
	// 	<div>{expense.name}</div>
	// 	<div>-</div>
	// 	<div>{expense.price}</div>
	// 	<div>zł</div>
	// 	<div><button class="flex-shrink-0 ml-2 text-red-500 py-1 px-2 rounded"><GoX /></button></div>
	// </div>})
	const handleSubmitExpense = (event) => {
		event.preventDefault()
		addExpense({budgetCategoryId: category.id, name: expenseName, price:price})
	}
	// const handleClick = () => {
	// 	addExpense(category)
	// }

	const handleChangeName = (event) => {
		setExpenseName(event.target.value)
		console.log(event.target.value)
	}

	const handleChangePrice = (event) => {
		setPrice(event.target.value)
		console.log(event.target.value)
	}

	

	let content
	if (isLoading) {
		content = <div>Loading ...</div>
	} else if (error) content = <div>Error</div>
	else {
		content = data.map(expense => {
			return <ExpenseItem key={expense.id} expense={expense} category={category} />
		})
	}

	return (
		<div class="w-80">
			<form onSubmit={handleSubmitExpense}>
			<div class="flex items-center border-b border-teal-500 py-1 m-3 h-7">
				{/* <div><input type="text" class="border-none" /></div> */}
				<div><input value={expenseName} type='text' class="appearance-none bg-transparent border-none w-full text-gray-700  mr-3 py-1 px-2 leading-tight focus:outline-none h-4" placeholder="Dodaj wydatki" onChange={handleChangeName} /></div>
				<div><input value={price} type='number' class="appearance-none bg-transparent border-none w-full text-gray-700  mr-3 py-1 px-2 leading-tight focus:outline-none h-4 w-20" placeholder="Cena" onChange={handleChangePrice} /></div>
				<button class="flex-shrink-0 ml-2 text-slate-700 py-1 px-2 font-bold"><GoPlus /></button>
				</div>
			</form>
			{content}
		</div>
	)
}

export default ExpensesAddingPanel
