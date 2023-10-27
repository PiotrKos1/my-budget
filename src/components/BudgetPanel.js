import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeBudgetCategory } from '../store/store'
import { GoTriangleLeft, GoTriangleDown, GoX } from 'react-icons/go'
import ExpensesAddingPanel from './ExpensesAddingPanel'

function BudgetList({ category }) {
	const [showExpensesAddingPanel, setShowExpensesAddingPanel] = useState(false)
	const dispatch = useDispatch()

	const handleDeleteClick = () => {
		dispatch(removeBudgetCategory(category))
	}

	const handleShowExpensesAddingPanel = () => {
		setShowExpensesAddingPanel(!showExpensesAddingPanel)
	}

	return (
		<div class='basis-1/4 p-2 w-80'>
			<div class='flex space-x-40 p-3 bg-slate-100'>
				<div class='w-14 text-teal-700 font-bold uppercase'>{category.name}</div>
				<div class='flex'>
					<button class='flex-shrink-0 ml-2 text-red-500 py-1' onClick={handleDeleteClick}>
						<GoX />
					</button>
                    {showExpensesAddingPanel ? <button class='text-teal-700 text-xl' onClick={handleShowExpensesAddingPanel}>
						<GoTriangleDown />
					</button> : <button class='text-teal-700 text-xl' onClick={handleShowExpensesAddingPanel}>
						<GoTriangleLeft />
					</button> }
					{/* <button class='text-teal-700 text-xl' onClick={handleShowExpensesAddingPanel}>
						<GoTriangleLeft />
					</button> */}
				</div>
			</div>
			<div>{showExpensesAddingPanel && <ExpensesAddingPanel category={category} />}</div>
		</div>
	)
}

export default BudgetList
