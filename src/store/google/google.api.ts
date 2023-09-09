import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Item, ServerResponce } from '../../models/models'

export const googleApi = createApi({
    reducerPath: 'google/api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://www.googleapis.com/'
    }),
    endpoints: build => ({
        searchBooks: build.query<ServerResponce<Item>, string>({
            query: (search: string) => ({
                url: 'books/v1/volumes',
                params: {
                    q: search,
                    key: 'AIzaSyBJuSP9L2zHVBJSXiRWpB3fX9ilDD8KRyU',
                    maxResults: '30',
                },
                
            }),
        }),
        pagination: build.query<ServerResponce<Item>, string>({
            query: (page: string) => ({
                url: 'books/v1/volumes',
                
            })
        })
    })
})

export const { useSearchBooksQuery } = googleApi