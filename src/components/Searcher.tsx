import React from 'react';
import bg from '../media/header-books-2.jpg'

export function Searcher(){
    return(
        <div 
        className="border row justify-content-center bg-img"
         style={{ backgroundImage: `url(${bg})` }}>
            <h1 className='row justify-content-center text-white'>Search for books</h1>
            <p className='d-flex justify-content-center'>
                <input type="search" placeholder="Введите название"></input>
                <input type="submit" value="Поиск"></input>
            </p>
            <p className='d-flex justify-content-center'>
                <div className='mx-2 text-white'>Categories</div>
                <form className='mx-2' action="categories-selector.php" method="post">
                    <select>
                        <option selected value="all">all</option>
                        <option value="art">art</option>
                        <option value="biography">biography</option>
                        <option value="computers">computers</option>
                        <option value="history">history</option>
                        <option value="medical">medical</option>
                        <option value="poetry">poetry</option>
                    </select>
                </form>
                <div className='mx-2 text-white'>Sorting</div>
                <form className='mx-2' action="sorting-selector.php" method="pos     t">
                    <select>
                        <option selected value="relevance">relevance</option>
                        <option value="news">news</option>
                    </select>
                </form>
            </p>
        </div>
    )
}