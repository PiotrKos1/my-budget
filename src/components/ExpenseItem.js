import { useRemoveExpenseMutation } from "../store/store";
import { GoX } from "react-icons/go";

function ExpenseItem({expense}) {
    const [removeExpense, results] = useRemoveExpenseMutation()
    const handleRemoveExpense = () => {
		removeExpense(expense)
	}
    return (
        <div class="flex space-x-14 w-80 bg-slate-50 italic" key={expense.id}>
					<div class="w-32">{expense.name}</div>
					<div class="w-10">{expense.price} zł</div>
					
						<button onClick={handleRemoveExpense} class='flex-shrink-0 text-red-500 py-1'>
							<GoX />
						</button>
					
				</div>
    )
}

export default ExpenseItem;