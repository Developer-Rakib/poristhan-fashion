import axios from 'axios'
import React, { memo } from 'react'
import { useQuery } from 'react-query'
import Loader from '../Shared/Loader';
import AddMemoModal from './AddMemoModal';

function AddMemo() {
    const { isLoading, error, data: memos } = useQuery('memo', () =>
        axios.get('http://localhost:5000/memo')
    )

    var selllerArr = [];

    if (isLoading) {
        return <Loader></Loader>
    }

    function addMemoFanction(e) {
        e.preventDefault();
        const sName = e.target[0]
        const memo = e.target[1].value
        console.log(sName, memo);
    }

    Object.keys(memos?.data[0]).forEach(function (key) {
        selllerArr.push(key);
    });

    let sellerNames = selllerArr.filter(sName => sName !== "_id");

    return (
        <div className='mt-[65px] w-8/12 mx-auto'>
            <h1 className='text-xl mb-6'>All Memos</h1>
            <div className='flex flex-row items-start justify-between flex-wrap  mx-auto'>
                <div>
                    {
                        sellerNames.map(sellerName => {
                            let memoArr = [];
                            if (sellerName !== "_id") {
                                for (let i = 0; i < memos?.data[0][`${sellerName}`].length; i++) {
                                    memoArr.push(<span className='px-2 py-1 border rounded-sm mx-1'>{`${memos?.data[0][`${sellerName}`][i]}`} </span>);
                                }
                            }
                            // console.log(memoArr);
                            return (
                                <div className='text-gray-600'>
                                    {sellerName !== "_id" &&
                                        <div className='flex items-center my-4'>
                                            <h1 className='text-xl text-left capitalize w-[6rem] text-green-700'>{sellerName} :</h1>
                                            <p className=''>{memoArr} </p>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className=' '>


                    {/* modal  */}
                    <button className="bg-cyan-500 text-white active:bg-cyan-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-pointer">
                        Add Seller
                    </button>

                    <button onClick={() => document.getElementById('my_modal_5').showModal()} className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                        Add Memo
                    </button>

                    {/* add memo modal  */}
                    <AddMemoModal
                        sellerNames={sellerNames}
                        memo={memos.data[0]}
                        addMemoFanction={addMemoFanction}
                    />



                </div>
            </div>
        </div>
    )
}

export default AddMemo