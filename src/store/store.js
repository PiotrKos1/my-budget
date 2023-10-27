import { configureStore } from "@reduxjs/toolkit";
import {budgetReducer} from './slices/budgetSlice'
import { expensesApi } from "./apis/expensesApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        budget: budgetReducer,
        [expensesApi.reducerPath]:expensesApi.reducer
    },
    middleware: (getDefaultMiddleware) => { return getDefaultMiddleware().concat(expensesApi.middleware)}
})

setupListeners(store.dispatch)

export * from './thunks/fetchBudget'
export * from './thunks/addBudgetCategory'
export * from './thunks/removeBudgetCategory'
export {useFetchExpensesQuery, useAddExpenseMutation, useRemoveExpenseMutation} from './apis/expensesApi'
