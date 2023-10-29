import { useRemoveExpenseMutation } from '../store/store'
import { GoX, GoSync } from 'react-icons/go'

function ExpenseItem({ expense }) {
	const [removeExpense, results] = useRemoveExpenseMutation()
	const handleRemoveExpense = () => {
		removeExpense(expense)
	}

	let content
	if (results.isLoading) {
		content = (
			<div class='flex space-x-10 ml-4 bg-slate-50 italic'>
				<GoSync />
			</div>
		)
	} else {
		content = (
			<div class='flex space-x-10 ml-4 bg-slate-50 italic' key={expense.id}>
				<div class='w-32'>{expense.name}</div>
				<div class='w-12'>{expense.price} zł</div>
				<button onClick={handleRemoveExpense} class='flex-shrink-0 text-red-500 py-1'>
					<GoX />
				</button>
			</div>
		)
	}

	return <div>{content}</div>
}

export default ExpenseItem
