import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const addBudgetCategory = createAsyncThunk('budget/add', async (categoryName) =>{
    const response = await axios.post('http://localhost:3005/budget', {
        name: categoryName
    })

    return response.data
})

export {addBudgetCategory}