import { useState } from 'react'
import { useFetchExpensesQuery, useAddExpenseMutation} from '../store/store'
import { GoPlus, GoSync } from 'react-icons/go'
import ExpenseItem from './ExpenseItem'

function ExpensesAddingPanel({ category }) {
	const [expenseName, setExpenseName] = useState('')
	const [price, setPrice] = useState()
	const { data, isLoading, error } = useFetchExpensesQuery(category) 
	const [addExpense, results] = useAddExpenseMutation()
	
	
	const handleSubmitExpense = (event) => {
		event.preventDefault()
		if (expenseName !== '' && price !== '' && price >= 0)
		{addExpense({budgetCategoryId: category.id, name: expenseName, price:price})}
		setExpenseName('')
		setPrice('')
		
	}
	

	const handleChangeName = (event) => {
		setExpenseName(event.target.value)
	}

	const handleChangePrice = (event) => {
		setPrice(parseFloat(event.target.value))

	}

	

	let content
	if (isLoading) {
		content = <div>Loading ...</div>
	} else if (error) content = <div>Error</div>
	else {
		content = data.map(expense => {
			return <ExpenseItem key={expense.id} data={data} expense={expense} category={category} />
		})
	}

	return (
		<div >
			<form onSubmit={handleSubmitExpense}>
			<div class="flex items-center border-b border-teal-500 py-1 m-3 h-7">
				<div><input value={expenseName} type='text' class="appearance-none bg-transparent border-none w-full text-gray-700  mr-3 py-1 px-2 leading-tight focus:outline-none h-4" placeholder="Dodaj wydatki" onChange={handleChangeName} /></div>
				<div><input value={price} type='number' class="appearance-none bg-transparent border-none w-full text-gray-700  mr-3 py-1 px-2 leading-tight focus:outline-none h-4 w-20" placeholder="Cena" onChange={handleChangePrice} /></div>
				<button class="flex-shrink-0 ml-2 text-slate-700 py-1 px-2 font-bold"><GoPlus /></button>
				</div>
			</form>
			{content}
			<div class="ml-3">{results.isLoading && <GoSync />}</div>
			{results.isError && 'Error...'}
		</div>
	)
}

export default ExpensesAddingPanel
