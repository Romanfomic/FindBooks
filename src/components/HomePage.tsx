import React, { useState, useEffect } from 'react';
import bg from '../media/header-books-4.jpg'

import dataTest from './data'
import { useSearchBooksQuery } from '../store/google/google.api';
import { Item } from '../models/models';

export function HomePage(){
    let books = [];
    const [search, setSearch] = useState('');

    const [searchString, setSearchString] = useState('');

    const[elementsCount, elementsInc] = useState(30);
    const loadMore = () =>{ elementsInc(elementsCount + 30); }

    const {isLoading, isError, data} = useSearchBooksQuery(searchString, {
        skip: searchString.length == 0
    });

    // let booksData: Item[] = [];

    // if(data?.totalItems !== undefined){
    //     booksData = booksData.concat(data?.items);
    // }

    const slice = dataTest.cardData.slice(0, elementsCount);
    return(
        <div>
            <div 
            className="border row justify-content-center bg-img"
            style={{ backgroundImage: `url(${bg})` }}>
                <h1 className='row justify-content-center text-white'>Search for books</h1>
                <p className='d-flex justify-content-center'>
                    <input 
                    type="text" 
                    placeholder="Введите название"
                    value={search}
                    onChange={ e => {
                        setSearch(e.target.value)
                    }}
                    ></input>
                    <input type="submit" onClick={e => setSearchString(search)} value="Поиск"></input>
                </p>
                <p className='d-flex justify-content-center'>
                    <div className='mx-2 text-white'>Categories</div>
                    <form className='mx-2' method="post">
                        <select>
                            <option defaultValue="all">all</option>
                            <option value="art">art</option>
                            <option value="biography">biography</option>
                            <option value="computers">computers</option>
                            <option value="history">history</option>
                            <option value="medical">medical</option>
                            <option value="poetry">poetry</option>
                        </select>
                    </form>
                    <div className='mx-2 text-white'>Sorting</div>
                    <form className='mx-2' method="pos     t">
                        <select>
                            <option selected value="relevance">relevance</option>
                            <option value="news">news</option>
                        </select>
                    </form>
                </p>
            </div>

            <div>
            <section className='py-4 container'>
                    <div className="row justify-content-center">
                        {isError && <p className='text-center'>Something went wrong!</p>}
                        {isLoading && <p className='text-center'>Loading...</p>}
                        {
                            data?.items.slice(0, elementsCount).map(book => (
                                <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                                    <div className="card p-0 owerflow-hidden h-100 shadow" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                        <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="" className="card-img-top" />
                                        <div className="card-body">
                                            <h5 className="card-title">{book.volumeInfo.title}</h5>
                                            <p className="card-text">{book.volumeInfo.publisher}</p>
                                            <p className="font-italic">Category</p>
                                        </div>
                                    </div>
                                </div>
                            ))                
                        }
                    </div>
                </section>
                    </div>
                    <div className="row justify-content-center">
                    <button 
                        className='btn btn-dark w-25 row justify-content-center'
                        onClick={() =>loadMore()}
                        >
                        Load More
                    </button>

        </div>
        </div>
        
    )
}