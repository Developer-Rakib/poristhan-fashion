import axios from 'axios';
import React, { useState } from 'react'
import { FaPlusCircle } from "react-icons/fa";
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../../Shared/Loader';
import moment from 'moment';
import toast from 'react-hot-toast';
import DatePicker from "react-datepicker";

// import { HiMinusCircle } from "react-icons/hi";



export default function AddOrderInfo() {
  const { isLoading, error, data: memo } = useQuery('memo', () =>
    axios.get('http://localhost:5000/memo')
  )
  const [startDate, setStartDate] = useState(new Date());


  if (isLoading) {
    return <Loader></Loader>
  }
  // console.log(memo.data[0]);

  let qtyCount = 1;
  let memoSerials = {
    jakir: [1, 901, 2101, 501],
    alamgir: [2601, 4301, 2501, 2701, 3801, 2001, 401, 1001, 1601],
    amir: [201, 1801, 2401, 4501, 701, 4401],
    sohail: [3601, 3901, 1701, 1501, 2301],
    arafat: [1901, 1201],
    rakib: [1101],

  }

  function handleClear(e) {
    e.target.form.reset();
    let allQtyClear = document.getElementsByClassName('addMoreChild');
    for (const [key, value] of Object.entries(allQtyClear)) {
      value.remove()
    }
    qtyCount = 1

  }
  function deleteAddMoreBtn(e) {
    // console.log(e.target.id);
    if (e.target.id === "deleteQty") {
      e.target.parentNode.parentNode.parentNode.parentNode.remove()
    }
    // let deleteBtn = document.getElementById()
  }

  function addMoreFunction() {
    qtyCount++;
    let addMoreParent = document.querySelector('#addMoreConteiner');
    // console.log(qtyCount);
    let addMoreCreate = document.createElement("div");
    addMoreCreate.innerHTML = `
  <div class="flex addMoreChild">
                <div class="w-full my-2 sm:w-[100px]  mx-2">
                  <label for="item" class="block text-sm font-medium leading-6 text-gray-900">ITEM</label>
                  <div class="">
                    <select id="item" name="item${qtyCount}" autocomplete="item-name" class="bg-white block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option>BLC</option>
                      <option>BLS</option>
                      <option>BLP</option>
                      <option>HPC</option>
                      <option>HPS</option>
                      <option>HPP</option>
                      <option>SKC</option>
                      <option>SKS</option>
                      <option>SKP</option>
                      <option>EMC</option>
                      <option>EMS</option>
                      <option>EMP</option>
                      <option>CHC</option>
                      <option>CHS</option>
                      <option>CHP</option>
                      <option>NPC</option>
                      <option>NPS</option>
                      <option>NPP</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div class="w-full my-2 sm:w-[100px]  mx-2">
                    <label for="qty" class="block text-sm font-medium leading-6 text-gray-900">QTY</label>
                    <div class="flex items-center">
                      <input required type="number" name="qty${qtyCount}" id="qty" autocomplete="address-level2" class="block w-full sm:w-[80px] rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      <button class="text-sm px-1 ml-1 bg-[#f15048] text-white rounded-md" id="deleteQty" type="button">
                      Delete
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
    if (bookingData.bookingID.toString().length !== 8) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid ID !",
      });
      return;
    }

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

    let finalData = {
      sellerName: sellerName,
      memo: bookingMemo,
      bookingID: bookingData.bookingID,
      d_ch: parseInt(bookingData.d_ch),
      item: itemQty,
      amount: parseInt(bookingData.amount),
      advance: parseInt(bookingData.advance),
      partial: { PAmount: undefined, PItem: [] },
      exchange: bookingData.exchange === "No" ? false : true,
      status: "Pending",
      bookingDate: moment(startDate).format('MMM DD yyyy'),
      // bookingDate: moment().format("MMM DD yyyy"),
      note: ""
    }
    // console.log(finalData);
    axios.post(`http://localhost:5000/orders`, finalData).then(data => {
      // console.log(data.data.success);
      // console.log(data.data);
      if (data.data.success) {
        toast.success(`${data.data.message}`)
        e.target.reset();
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

  return (
    <div>
      {/* <div className='text-right'>
        <NavLink className={({ isActive }) => (isActive ? 'activeLink' : 'navLink')} to={"/viewOrder"}>View Order</NavLink>
      </div> */}
      <h1 className='mt-10 text-4xl text-[#f15048]'>Poristhan Fashion</h1>
      <h1 className='mt-1 text-lg'>Entry Form</h1>
      <form onSubmit={(e) => hangleSubmit(e)} className='w-4/6 mx-auto' >
        <div class="">

          <h2 class="text-base font-semibold leading-7 text-gray-900 mb-12">Booking Information</h2>
          {/* <p class="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p> */}

          <DatePicker
            className='border-2 rounded-md w-32 text-center py-1.5'
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            required
            form="external-form"
            showYearDropdown
            dateFormat="MMM d yyyy"
            yearDropdownItemNumber={15}
            scrollableYearDropdown
          />

          <div className='flex  justify-center  flex-col sm:flex-row sm:justify-around'>

            {/* <div class="w-full my-2 sm:w-[280px]  mx-2">
              <label for="sellerName" class="block text-sm font-medium leading-6 text-gray-900">SELLER NAME</label>
              <div class="">
                <select id="sellerName" name="sellerName" autocomplete="sellerName-name" class="bg-white block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option>Alamgir Hossain</option>
                  <option>Amir Hossain</option>
                  <option>Sohail Ahsan</option>
                  <option>Jakir Hossain</option>
                  <option>Arafat Hossain</option>
                  <option>Rakib</option>
                </select>
              </div>
            </div> */}


            <div class="w-full my-2 sm:w-[120px]  mx-2">
              <label for="memo" class="block text-sm font-medium leading-6 text-gray-900">Memo</label>
              <div class="">
                <input required type="number" id='memo' name="memo" class="block text-center w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
            <div class="w-full my-2 sm:w-[120px]  mx-2">
              <label for="bookingID" class="block text-sm font-medium leading-6 text-gray-900">ID NO</label>
              <div class="">
                <input required type="number" name="bookingID" id="bookingID" min={7} class="block w-full text-center rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div >
              <div className='flex'>
                <div class="w-full my-2 sm:w-[100px]  mx-2">
                  <label for="item" class="block text-sm font-medium leading-6 text-gray-900">ITEM</label>
                  <div class="">
                    <select id="item" name={`item${qtyCount}`} autocomplete="item-name" class="bg-white block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option>BLC</option>
                      <option>BLS</option>
                      <option>BLP</option>
                      <option>HPC</option>
                      <option>HPS</option>
                      <option>HPP</option>
                      <option>SKC</option>
                      <option>SKS</option>
                      <option>SKP</option>
                      <option>EMC</option>
                      <option>EMS</option>
                      <option>EMP</option>
                      <option>CHC</option>
                      <option>CHS</option>
                      <option>CHP</option>
                      <option>NPC</option>
                      <option>NPS</option>
                      <option>NPP</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div class="w-full my-2 sm:w-[100px]  mx-2">
                    <label for="qty" class="block text-sm font-medium leading-6 text-gray-900">QTY</label>
                    <div class="flex items-center">
                      <input required type="number" name="qty1" id="qty" autocomplete="address-level2" class="block w-full sm:w-[80px] rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      <button onClick={addMoreFunction} className='ml-1 addMore' type='button'><FaPlusCircle className='text-xl'></FaPlusCircle></button>

                    </div>
                  </div>
                </div>
              </div>
              <div onClick={(e) => deleteAddMoreBtn(e)} id='addMoreConteiner'>

              </div>




            </div>



            <div class="w-full my-2 sm:w-[120px]  mx-2">
              <label for="d_ch" class="block text-sm font-medium leading-6 text-gray-900">D. CH.</label>
              <div class="">
                <input required type="number" name="d_ch" id="d_ch" autocomplete="address-level2" class="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="w-full my-2 sm:w-[120px]  mx-2">
              <label for="advance" class="block text-sm font-medium leading-6 text-gray-900">Advance</label>
              <div class="">
                <input required type="number" name="advance" id="advance" autocomplete="address-level2" class="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>


            <div class="w-full my-2 sm:w-[120px]  mx-2">
              <label for="amount" class="block text-sm font-medium leading-6 text-gray-900">Amount</label>
              <div class="">
                <input required type="number" name="amount" id="amount" autocomplete="address-level2" class="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div class="w-full my-2 sm:w-[100px]  mx-2">
              <label for="exchange" class="block text-sm font-medium leading-6 text-gray-900">Exchange</label>
              <div class="">
                <select id="exchange" name="exchange" autocomplete="exchange" class="bg-white block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option>No</option>
                  <option>Yes</option>

                </select>
              </div>
            </div>


          </div>


        </div>

        <div class="mt-6 flex items-center justify-center gap-x-6">
          <button id='submitBtn' type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">Submit</button>
          <button onClick={(e) => handleClear(e)} type="button" class="text-sm font-semibold leading-6 text-gray-900">Clear</button>
        </div>
      </form>
    </div>
  )
}
