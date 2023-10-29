import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBudget } from "../store/thunks/fetchBudget"
import { addBudgetCategory } from "../store/store"
import BudgetPanel from "./BudgetPanel"


function BudgetLoading() {
    const dispatch = useDispatch()
    const [categoryValue, setCategoryValue] = useState('')
    const [isLoadingBudget, setIsLoadingBudget] = useState(false)
    const [isLoadingBudgetError, setIsLoadingBudgetError] = useState(null)
    const {data} = useSelector((state)=>{return state.budget})
    
   
  
    useEffect(()=>{
        setIsLoadingBudget(true)
        dispatch(fetchBudget())
        .unwrap()
        .catch((err)=>setIsLoadingBudgetError(err))
        .finally(()=>setIsLoadingBudget(false))
        
    },[dispatch])

    const handleSubmitCategory = (event) => {
        event.preventDefault()
        if (categoryValue !== '') {
        dispatch(addBudgetCategory(categoryValue))}
        setCategoryValue('')
    }

    const handleChangeCategory = (event) => {
        setCategoryValue(event.target.value)
    }

  
    let content
    if (isLoadingBudget) {
      content = <p>Loading...</p>
    } else if (isLoadingBudgetError) {
        content = <p>Error...</p>
    } else {
        content = data.map((category)=>{return <BudgetPanel key={category.id} category={category} />
}) }

    return (<div>
        <form onSubmit={handleSubmitCategory} class="w-full max-w-sm" >
    <div class="flex items-center border-b border-teal-500 py-2 m-5">
      <input value={categoryValue} class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Dodaj kategorię wydatków" aria-label="Full name" onChange={handleChangeCategory} />
      <button class="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded">
        DODAJ
      </button>
    </div>
  </form>
  <div class="flex flex-wrap p-3">
      {content}
  </div>
    </div>)

}

export default BudgetLoading;