import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeBudgetCategory = createAsyncThunk('budget/remove', async (category) => {
    await axios.delete(`http://localhost:3005/budget/${category.id}`)

    return category;
})

export {removeBudgetCategory}