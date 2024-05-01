import axios from 'axios'
import React, { memo, useState } from 'react'
import { useQuery } from 'react-query'
import Loader from '../Shared/Loader';
import AddMemoModal from './AddMemoModal';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

function AddMemo() {
    const { isLoading, error, data: memos, refetch } = useQuery('memo', () =>
        axios.get('http://localhost:5000/memo')
    )
    const [modalError, setModalError] = useState("")


    let selllerArr = [];

    if (isLoading) {
        return <Loader></Loader>
    }

    function addMemoFanction(e) {
        e.preventDefault();
        const sName = e.target[0].value.toLowerCase();
        const memo = parseInt(e.target[1].value)
        const id = memos?.data[0]._id;
        if (memo % 10 !== 1) {
            setModalError("Invalid memo, please enter a memo number starting from 1")
            return;
        }
        setModalError("")

        let totalMemo;
        if (memos?.data[0][`${sName}`]) {
            memos?.data[0][`${sName}`].push(memo)
            totalMemo = memos?.data[0][`${sName}`]
        } else {
            totalMemo = [memo]
        }

        const editedData = {
            [sName]: totalMemo
        }
        axios.put(`http://localhost:5000/addMemo/${id}`, editedData)
            .then(data => {
                console.log(data.data);
                if ((data.data.matchedCount || data.data.upsertedCount) > 0) {
                    document.getElementById('my_modal_5').close()
                    toast.success(`${memo} no memo successfully added for ${sName}`)
                    e.target.reset()
                    refetch()
                }
                else {
                    toast.error("Something is wrong, please try again")
                }
            })
    }

    Object.keys(memos?.data[0]).forEach(function (key) {
        selllerArr.push(key);
    });
    let sellerNames = selllerArr.filter(sName => sName !== "_id");




    return (
        <div className='mt-[65px] w-6/12 mx-auto'>
            <h1 className='text-xl mb-6'>All Memos</h1>
            <div className='text-center sm:text-right'>
                <button onClick={() => document.getElementById('my_modal_5').showModal()} className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150" type="button">
                    Add Memo
                </button>
                {/* add memo modal  */}
                <AddMemoModal
                    sellerNames={sellerNames}
                    memo={memos.data[0]}
                    addMemoFanction={addMemoFanction}
                    modalError={modalError}
                />

            </div>
            <div className='flex flex-row items-start justify-between flex-wrap  mx-auto'>
                <div>
                    {
                        sellerNames.map(sellerName => {
                            let memoArr = [];
                            if (sellerName !== "_id") {
                                for (let i = 0; i < memos?.data[0][`${sellerName}`].length; i++) {
                                    memoArr.push(<span className='px-2 py-1 border rounded-sm mx-1 my-1'>{`${memos?.data[0][`${sellerName}`][i]}`} </span>);
                                }
                            }
                            // console.log(memoArr);
                            return (
                                <div className='text-gray-600'>
                                    {sellerName !== "_id" &&
                                        <div className='flex  flex-col sm:flex-row sm:items-center my-4'>
                                            <h1 className='text-xl sm:text-left capitalize min-w-[8rem] text-green-700'>{sellerName} :</h1>
                                            <p className='flex flex-wrap justify-center sm:justify-start'>{memoArr} </p>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                <div className=' '>


                </div>
            </div>
        </div>
    )
}

export default AddMemo