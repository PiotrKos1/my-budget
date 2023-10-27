import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchBudget = createAsyncThunk('budget/fetch', async () => {
    const response = await axios.get('http://localhost:3005/budget')

    return response.data;
})

export {fetchBudget};