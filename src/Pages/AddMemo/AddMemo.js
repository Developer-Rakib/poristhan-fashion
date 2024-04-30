import axios from 'axios'
import React, { memo } from 'react'
import { useQuery } from 'react-query'
import Loader from '../Shared/Loader';

function AddMemo() {
    const { isLoading, error, data: memos } = useQuery('memo', () =>
        axios.get('http://localhost:5000/memo')
    )
    var sellerNames = [];

    if (isLoading) {
        return <Loader></Loader>
    }

    Object.keys(memos?.data[0]).forEach(function (key) {
        sellerNames.push(key);
    });

    return (
        <div className='mt-[65px]'>
            <h1 className='text-xl mb-2'>All Memos</h1>
            {
                sellerNames.map(sellerName => {
                    return (
                        <div>{sellerName} : {
                            typeof memos?.data[0][`${sellerName}`]
                        }</div>
                    )
                })
            }

        </div>
    )
}

export default AddMemo