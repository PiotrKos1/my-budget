import {createSlice} from '@reduxjs/toolkit'
import { fetchBudget } from '../thunks/fetchBudget';
import { addBudgetCategory } from '../thunks/addBudgetCategory';
import { removeBudgetCategory } from '../thunks/removeBudgetCategory';

const budgetSlice = createSlice({
    name: 'budget',
    initialState: {
        isLoading: false,
        data: [],
        error: null
    },
    extraReducers(builder) {
        builder.addCase(fetchBudget.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchBudget.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchBudget.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(addBudgetCategory.pending, (state)=>{
            state.isLoading = true;
        });
        builder.addCase(addBudgetCategory.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data.push(action.payload)
        });
        builder.addCase(addBudgetCategory.rejected, (state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        });
        builder.addCase(removeBudgetCategory.pending, (state)=>{
            state.isLoading = true
        });
        builder.addCase(removeBudgetCategory.fulfilled,(state, action)=>{
            state.isLoading = false;
            state.data = state.data.filter((category)=>{return category.id !== action.payload.id});
        });
        builder.addCase(removeBudgetCategory.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.error;
        });
    }
})

export const budgetReducer = budgetSlice.reducer;