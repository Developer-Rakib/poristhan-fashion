import axios from 'axios';
import React, { useState } from 'react'
import { FaPlusCircle } from "react-icons/fa";
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';
import toast from 'react-hot-toast';
// import DatePicker from "react-datepicker";
import Loader from '../Shared/Loader';

function CreateOrder() {
    const { isLoading, error, data: memo } = useQuery('memo', () =>
        axios.get('https://server.poristhan-fashion.xyz/memo')
    )
    // const [startDate, setStartDate] = useState(new Date());
    const [mobileErr, setMobileErr] = useState(null);
    const [qtyCount, setQtyCount] = useState(1);


    if (isLoading) {
        return <Loader></Loader>
    }
    // console.log(memo.data[0]);

    // let qtyCount = 1;
    let itemName = [
        "BLC",
        "BLC",
        "BLS",
        "DBLS",
        "BLP",
        "BLF",
        "HPC",
        "HPS",
        "SHPS",
        "HPP",
        "HPF",
        "SKC",
        "SKS",
        "SSKS",
        "SKP",
        "SKF",
        "EMC",
        "EMS",
        "EMP",
        "EMF",
        "CHC",
        "CHS",
        "CHP",
        "CHF",
        "CMC",
        "CMS",
        "CMP",
        "CMF",
        "RMC",
        "RMS",
        "RMP",
        "RMF",
        "OCC",
        "OCS",
        "OCP",
        "OCF",
        "NPC",
        "NPS",
        "NPP",
        "NPF",
    ]
    let itemString = itemName.map(itSt => `<option>${itSt}</option>`,)
    let itemInner = itemName.map(itSt => <option>{itSt}</option>,)

    // console.log(qtyCount);

    function mobileHandle(e) {
        if (!/^\d{11}$/.test(e.target.value)) {
            setMobileErr(true)
        }
        else {
            setMobileErr(false)
        }
    }
    function handleClear(e) {
        e.target.form.reset();
        let allQtyClear = document.getElementsByClassName('addMoreChild');
        for (const [key, value] of Object.entries(allQtyClear)) {
            value.remove()
        }
        setQtyCount(1)

    }
    function deleteAddMoreBtn(e) {
        // console.log(e.target.id);
        if (e.target.id === "deleteQty") {
            e.target.parentNode.parentNode.parentNode.parentNode.remove()
        }
        // setQtyCount(qtyCount - 1)
        // let deleteBtn = document.getElementById()
    }

    function addMoreFunction() {
        setQtyCount(qtyCount + 1)
        let addMoreParent = document.querySelector('#addMoreConteiner');
        // console.log(qtyCount);
        let addMoreCreate = document.createElement("div");
        addMoreCreate.innerHTML = `
      <div class="flex addMoreChild">
                    <div class=" my-2 w-full sm:w-[100px]  mr-2">
                      <label for="item" class="block text-sm font-medium leading-6 text-gray-900">ITEM</label>
                      <div class="">
                        <select id="item" name="item${qtyCount}" autocomplete="item-name" class="bg-white block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                          ${itemString}
                        </select>
                      </div>
                    </div>
                    <div>
                      <div class="my-2 ">
                        <label for="qty" class="block text-sm font-medium leading-6 text-gray-900">QTY</label>
                        <div class="flex items-center">
                          <input required type="number" name="qty${qtyCount}" id="qty" autocomplete="address-level2" class="block w-full sm:w-[80px] rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                          <button class="text-sm px-1 ml-1 bg-[#f15048] text-white rounded-md" id="deleteQty" type="button">
                          Del
                          </button>
                        </div>
                        
                      </div>
                    </div>
                  </div>
      `;
        addMoreParent.appendChild(addMoreCreate)

    }


    // let deleteBtns = document.querySelectorAll("#deleteQty");
    // for (const deleteBtn of deleteBtns) {
    //   deleteBtn.addEventListener("click", function () {
    //     deleteBtn.parentNode.parentNode.style.display = "none";
    //     // deleteBtn.parentNode.parentNode.parentNode.removeChild(deleteBtn.parentNode.parentNode);

    //   })
    // }


    function hangleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formatedData = Array.from(formData.entries())
        // console.log(formData);


        let bookingData = {}
        formatedData.map((data) => {
            let obj = {
                ...bookingData,
                [data[0]]: data[1],
            }
            bookingData = obj
        })
        if (bookingData.mobile.toString().length !== 11) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid mmobile!",
            });
            return;
        }
        console.log(qtyCount);

        let itemQty = []
        for (let i = 1; i <= qtyCount; i++) {
            if (bookingData[`item${i}`]) {
                // console.log(bookingData[`item${i}`], ":", bookingData[`qty${i}`]);
                itemQty.push({ [bookingData[`item${i}`]]: parseInt(bookingData[`qty${i}`]) })
            }
        };
        let bookingMemo = parseInt(bookingData.memo);

        let sellerName = undefined;
        for (const [key, value] of Object.entries(memo.data[0])) {
            for (let i = 0; i < value.length; i++) {
                if (bookingMemo >= value[i] && bookingMemo <= (value[i]) + 99) {
                    sellerName = key
                }
            }
        }


        if (sellerName === undefined || sellerName === "_id") {
            Swal.fire({
                icon: "error",
                title: "Opps...",
                text: `Memo Not Found, Please Add New Memo`,
            });
            return;
        }
        // const date = Date()
        // console.log(date);
        // console.log(bookingData);


        let steadfastData = {
            invoice: bookingMemo.toString(),
            recipient_name: bookingData.name.toString(),
            recipient_phone: bookingData.mobile.toString(),
            recipient_address: bookingData.adress.toString(),
            cod_amount: parseInt(bookingData.cod),
            note: bookingData.note ? bookingData.note.toString() : (bookingData.exchange === "Yes" ? "exchane hobe" : ""),
        }

        // console.log(steadfastData);



        // console.log(finalData);

        axios.post(`https://portal.steadfast.com.bd/api/v1/create_order`, steadfastData, {
            headers: {
                'Api-Key': `${process.env.REACT_APP_MF_Api_Key}`,
                'Secret-Key': `${process.env.REACT_APP_MF_Secret_Key}`
            }
        }).then(data => {
            console.log(data.data.consignment);
            if (data.data.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: `Wow...`,
                    html: `
                    <p>${data.data.message}</p>
                    <p>Order id : <b class="tracking-wide text-2xl">${data.data.consignment.consignment_id}</b></p>`,
                });

                let netAmount = (parseInt(bookingData.advance) + parseInt(bookingData.cod)) - parseInt(bookingData.d_ch)
                let finalData = {
                    sellerName: sellerName,
                    memo: bookingMemo,
                    bookingID: data.data.consignment.consignment_id.toString(),
                    d_ch: parseInt(bookingData.d_ch),
                    item: itemQty,
                    amount: netAmount,
                    advance: parseInt(bookingData.advance),
                    partial: { PAmount: null, PItem: [] },
                    exchange: bookingData.exchange === "No" ? false : true,
                    status: "Pending",
                    bookingDate: moment().format('MMM DD yyyy'),
                    note: bookingData.note ? bookingData.note : "",
                }

                axios.post(`https://server.poristhan-fashion.xyz/orders`, finalData).then(data => {
                    // console.log(data.data.success);
                    // console.log(data.data);
                    if (data.data.success) {
                        toast.success(`${data.data.message}`)
                        e.target.reset();
                        let allQtyClear = document.getElementsByClassName('addMoreChild');
                        for (const [key, value] of Object.entries(allQtyClear)) {
                            value.remove()
                        }
                        setQtyCount(1)
                    }
                    else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: `${data.data.message}`,
                        });
                        // toast.error(`${data.data.message}`)
                    }
                })



            }
        })


    }

    return (
        <div className='mb-20 mt-[60px] sm:mt-[80px]'>
            <h1 className='mt-1 text-2xl sm:text-2xl text-green-600 mx-8'>Create Order with Steadfast Courier</h1>
            <form onSubmit={(e) => hangleSubmit(e)} className='w-4/6 mx-auto' >
                <div class="">

                    <h2 class="text-base  leading-7 text-gray-900 mb-2 ">Enter Booking Information</h2>
                    {/* <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

                    {/* <DatePicker
                        className='border-2 rounded-md w-32 text-center py-1.5'
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        required
                        form="external-form"
                        showYearDropdown
                        dateFormat="MMM d yyyy"
                        yearDropdownItemNumber={15}
                        scrollableYearDropdown
                    /> */}

                    <div className='flex  justify-center items-center  flex-col  sm:justify-center flex-wrap'>

                        <div class="w-full my-2 sm:w-[28%]  sm:mx-2">
                            <label for="mobile" class="block text-sm font-medium leading-6 text-gray-900">Mobile</label>
                            <div class="">
                                <input onChange={(e) => mobileHandle(e)} required type="number" name="mobile" id="mobile" class="block w-full rounded-md border-0 tracking-wider p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='প্রাপকের নাম্বার' pattern="(09)[0-9]{11}" />
                                {
                                    mobileErr && <p className='text-red-600'>invalid mobile number</p>
                                }
                            </div>
                        </div>
                        <div class="w-full my-2 sm:w-[28%]  sm:mx-2">
                            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div class="">
                                <input required type="text" id='name' name="name" class="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='প্রাপকের নাম' />
                            </div>
                        </div>
                        <div class="w-full my-2 sm:w-[28%]  sm:mx-2">
                            <label for="adress" class="block text-sm font-medium leading-6 text-gray-900">Adress</label>
                            <div class="">
                                <textarea required type="text" name="adress" id="adress" class="min-h-[36px]  block w-full rounded-md border-0 tracking-wider p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" rows={3} placeholder='প্রাপকের ঠিকানা' ></textarea>
                            </div>
                        </div>

                        <div className='w-full sm:w-[28%] '>
                            <div className='flex w-full mr-1'>
                                <div class="w-full my-2">
                                    <label for="item" class="block text-sm font-medium leading-6 text-gray-900">ITEM</label>
                                    <div class="">
                                        <select id="item" name={`item${qtyCount}`} autocomplete="item-name" class="bg-white block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            {itemInner}
                                        </select>
                                    </div>
                                </div>
                                <div class="my-2  sm:mx-2">
                                    <label for="qty" class="block text-sm font-medium leading-6 text-gray-900">QTY</label>
                                    <div class="flex items-center">
                                        <input required type="number" name={`qty${qtyCount}`} autocomplete="address-level2" class="block w-full sm:w-[80px] rounded-md border-0 text-center p-1.5 pb-2 sm:pb-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                                        <button onClick={addMoreFunction} className='ml-1 addMore' type='button'><FaPlusCircle className='text-xl'></FaPlusCircle></button>

                                    </div>
                                </div>
                            </div>

                            <div className='w-full' onClick={(e) => deleteAddMoreBtn(e)} id='addMoreConteiner'>

                            </div>




                        </div>



                        <div className='w-full sm:w-[28%] flex justify-between'>
                            <div class=" my-2 w-[50%]  mr-1 ">
                                <label for="d_ch" class="block text-sm font-medium leading-6 text-gray-900">D. CH.</label>
                                <div class="">
                                    <input required type="number" name="d_ch" id="d_ch" autocomplete="address-level2" class="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='ডেলিভারি চার্জ' />
                                </div>
                            </div>

                            <div class=" my-2 w-[50%]  ml-1 ">
                                <label for="advance" class="block text-sm font-medium leading-6 text-gray-900">Advance</label>
                                <div class="">
                                    <input required type="number" name="advance" id="advance" autocomplete="address-level2" class="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='এডভান্স' />
                                </div>
                            </div>
                        </div>

                        <div className='w-full sm:w-[28%] flex justify-between'>

                            <div class="my-2 w-[50%]  mr-1 ">
                                <label for="cod" class="block text-sm font-medium leading-6 text-gray-900">COD</label>
                                <div class="">
                                    <input required type="number" name="cod" id="cod" autocomplete="address-level2" class="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='COD' />
                                </div>
                            </div>
                            <div class="my-2 w-[50%]  ml-1 ">
                                <label for="memo" class="block text-sm font-medium leading-6 text-gray-900">Memo</label>
                                <div class="">
                                    <input required type="number" name="memo" id="memo" autocomplete="address-level2" class="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder='মেমো নং' />
                                </div>
                            </div>
                        </div>

                        <div class="w-full my-2 sm:w-[28%]  sm:mx-2">
                            <label for="exchange" class="block text-sm font-medium leading-6 text-gray-900">Exchange</label>
                            <div class="">
                                <select id="exchange" name="exchange" autocomplete="exchange" class="bg-white block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option>No</option>
                                    <option>Yes</option>

                                </select>
                            </div>
                        </div>

                        <div class="w-full my-2 sm:w-[28%]  sm:mx-2">
                            <label for="note" class="block text-sm font-medium leading-6 text-gray-900">Note</label>
                            <div class="">
                                <textarea type="text" name="note" id="note" class="min-h-[36px]  block w-full rounded-md border-0 tracking-wider p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" rows={4} placeholder='Note.' ></textarea>
                            </div>
                        </div>


                    </div>


                </div>

                <div class="mt-4 flex items-center flex-col justify-center">
                    <button id='submitBtn' type="submit" class="rounded-md bg-[#f15048] border border-[#f15048] w-full sm:w-[28%] py-4 text-base sm:text-sm font-semibold text-white shadow-sm hover:bg-[#ce3b33]">Submit</button>
                    <button onClick={(e) => handleClear(e)} type="button" class=" mt-3 rounded-md border text-slate-900 border-[#f15048] w-full sm:w-[28%] py-3 text-sm font-semibold  shadow-sm hover:bg-[#ce3b33] hover:text-white">Clear</button>
                </div>
            </form>
        </div>
    )
}

export default CreateOrder