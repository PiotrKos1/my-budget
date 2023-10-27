import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const expensesApi = createApi({
    reducerPath: 'expenses',
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:3005'}),
    endpoints(builder) {
        return {
            removeExpense: builder.mutation({
                invalidatesTags: (result, error, expense) =>{return [{type:'Expense', id: expense.budgetCategoryId}]},
                query: (expense) => {
                    return {
                        url: `/expenses/${expense.id}`,
                        method: 'DELETE'
                    }
                }
            }),
            addExpense: builder.mutation({
                invalidatesTags: (result, error, category) =>  {return [{type:['Expense'], id:category.id}]},
                query: (data) => {
                    return {
                        url: '/expenses',
                        method: 'POST',
                        body: data,
                        // {
                        //     budgetCategoryId: category.id,
                        //     name: expenseName,
                        //     price: price,
                        // },
                    };
                     
                }
            }),
            fetchExpenses: builder.query({
                providesTags: (result, error, category) => {return [{type: 'Expense', id: category.id}]},
                query: (category) => {
                    return {
                        url: '/expenses',
                        params: {
                            budgetCategoryId: category.id
                        },
                        method:'GET'
                    };
                }
            })
        }
    }
})

export const {useFetchExpensesQuery, useAddExpenseMutation, useRemoveExpenseMutation} = expensesApi; 