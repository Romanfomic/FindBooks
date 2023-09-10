import React, { useState, useEffect } from 'react';
import bg from '../media/header-books-4.jpg'
import bookImg from '../media/book.png'

import { useSearchBooksQuery } from '../store/google/google.api';
import { Item } from '../models/models';

export function HomePage(){
    const [search, setSearch] = useState(''); // updatable seacrh string
    const [searchString, setSearchString] = useState(''); // final search string
    const [sortValue, setSortValue] = useState('relevance'); // sort value
    const [category, setCategory] = useState('all'); // category

    const[elementsCount, elementsInc] = useState(30); // Count of elements on page


    const {isLoading, isError, data} = useSearchBooksQuery({searchString, category, sortValue, startIndex: elementsCount - 30}, {
        skip: searchString.length == 0
    });
    const initialData: Array<Item> = [];
    const [fullData, setFullData] = useState(initialData);
    
    const loadMore = () =>{ 
        elementsInc(elementsCount + 30);
        setFullData(fullData.concat(data?.items!));
    }
    
    try{
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
                    onKeyDown={e => {
                        if(e.key == "Enter"){
                            setSearchString(search);}
                    }}
                    onChange={ e => {
                        setSearch(e.target.value)
                    }}
                    ></input>
                    <input type="submit" onClick={ e => {setSearchString(search);} } value="Поиск"></input>
                </p>
                <p className='d-flex justify-content-center'>
                    <div className='mx-2 text-white'>Categories</div>
                    <form className='mx-2' method="post">
                        <select onChange={e => setCategory(e.target.value)}>
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
                    <form className='mx-2' method="post">
                        <select onChange={e => setSortValue(e.target.value)}>
                            <option selected value="relevance">relevance</option>
                            <option value="newest">newest</option>
                        </select>
                    </form>
                </p>
            </div>
                            
            <div>
            <section className='py-4 container'>
                    <div className="row justify-content-center">
                        {data && <div className="text-center">Найдено книг: {data?.totalItems}</div>}
                        {isError && <p className='text-center'>Something went wrong!</p>}
                        {isLoading && <p className='text-center'>Loading...</p>}
                        {
                            fullData.slice(0, elementsCount).map(book => (
                                <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                                    <div className="card p-0 owerflow-hidden h-100 shadow" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                    <img src={typeof book.volumeInfo.imageLinks !== 'undefined' ? book.volumeInfo.imageLinks.smallThumbnail : bookImg} alt="" className='card-img-top'></img>
                                        <div className="card-body">
                                            <h5 className="card-title"><a href={book.volumeInfo.previewLink}>{book.volumeInfo.title}</a></h5>
                                            <p className="card-text">{book.volumeInfo.publisher}</p>
                                            <p className="font-italic">Category: {category}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}{
                            data?.items.slice(0, elementsCount).map(book => (
                                <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                                    <div className="card p-0 owerflow-hidden h-100 shadow" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
                                        <img src={typeof book.volumeInfo.imageLinks !== 'undefined' ? book.volumeInfo.imageLinks.smallThumbnail : bookImg} alt="" className='card-img-top'></img>
                                        <div className="card-body">
                                            <h5 className="card-title"><a href={book.volumeInfo.previewLink}>{book.volumeInfo.title}</a></h5>
                                            <p className="card-text">{book.volumeInfo.publisher}</p>
                                            <p className="font-italic">Category: {category}</p>
                                        </div>
                                    </div>
                                </div>
                            ))               
                        }
                    </div>
                </section>
                    </div>
                    {data && 
                    <div className="row justify-content-center">
                        <button 
                            className='btn btn-dark w-25 row justify-content-center'
                            onClick={() =>loadMore()}
                            >
                            Load More
                        </button>
                    </div>}
        </div>
        
    )
    }
    catch(e){
        return(
            <h6 className='text-center'>Something went wrong...</h6>
        )
    }
}