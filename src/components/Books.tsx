import React, {useState} from 'react';
import dataTest from './data'
import { useSearchBooksQuery } from '../store/google/google.api';

export function Books(){
    const {isLoading, isError, data} = useSearchBooksQuery('js');

    const[elementsCount, elementsInc] = useState(4);
    const loadMore = () =>{
        elementsInc(elementsCount + 4);
    }

    const slice = dataTest.cardData.slice(0, elementsCount);

    return(
        <div>
            {isError && <p className='text-center'>Something went wrong!</p>}

            <section className='py-4 container'>
                <div className="row justify-content-center">

                    {slice.map((item, index)=>{
                        return(
                            <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
                                <div className="card p-0 owerflow-hidden h-100 shadow">
                                    <img src={item.img} alt="" className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.authors}</p>
                                        <p className="font-italic">Category</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="row justify-content-center">
                <button 
                    className='btn btn-dark w-25 row justify-content-center'
                    onClick={() =>loadMore()}
                    >
                    Load More
                </button>
                </div>
            </section>
        </div>
    )
}
