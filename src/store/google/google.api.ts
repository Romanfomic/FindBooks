import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Item, ServerResponce } from '../../models/models'

const baseUrl = 'https://www.googleapis.com/';
export const googleApi = createApi({
    reducerPath: 'google/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.googleapis.com/'
    }),
    endpoints: ( build ) => ({
        searchBooks: build.query<ServerResponce<Item>, {searchString: string, category: string, sortValue: string, startIndex: number}>({
            query: ({searchString, category, sortValue, startIndex}) => ({
                url: 'books/v1/volumes',
                params: {
                    q: category == 'all'? searchString : searchString + "+subject:" + category,
                    orderBy: sortValue,
                    maxResults: '30',
                    startIndex: startIndex,
                    key: 'AIzaSyBJuSP9L2zHVBJSXiRWpB3fX9ilDD8KRyU',
                },
            }),
            
        }),
    })
})

export const { useSearchBooksQuery } = googleApi