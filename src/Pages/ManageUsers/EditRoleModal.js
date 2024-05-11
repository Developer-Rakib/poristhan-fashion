import React from 'react'

function EditRoleModal({ editRole, SingelUser, setRoleModal }) {
    // console.log(singleUser);
    // const editRole = (e, s) => {
    //     e.preventDefault();
    //     // console.log(e.target[0].value);
    //     console.log(s);
    //     // const updatedRole = {
    //     //     role: e.target[0].value
    //     // }
    //     // axios.put(`http://localhost:5000/user/editRole/${singleUser?.email}`, updatedRole)
    //     //     .then(data => {
    //     //         console.log(data.data);
    //     //         if (data?.data.acknowledged) {
    //     //             toast.success(`${singleUser.email} has been Successfully Made ${updatedRole.role}`)
    //     //             refetch()
    //     //         }
    //     //     }).catch(error => {
    //     //         console.log(error.response);
    //     //         if (error.response.status === 403) {
    //     //             toast.error("You are Not Admin")
    //     //         }
    //     //     })

    // }
    return (
        <>
            <input type="checkbox" id="my_modal_10" class="modal-toggle" />
            <label for="my_modal_10" className="modal text-center modal-bottom sm:modal-middle z-30">
                <div className="modal-box relative ">

                    <div className="modal-action">

                        <form onSubmit={(e) => editRole(e, SingelUser)} className=' flex flex-col w-full'>
                            {/* if there is a button in form, it will close the modal */}
                            <div className='flex w-full justify-center items-end'>
                                <div class="w-full my-2 sm:w-[120px]  mx-2">
                                    <label for="role" class="block text-sm font-medium leading-6 text-gray-900">Select Role</label>
                                    <div class="">
                                        <select id="role" name="role" autocomplete="role" class="bg-white block w-full capitalize rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            <option>admin</option>
                                            <option>employ</option>
                                            <option>visitor</option>
                                        </select>
                                    </div>
                                </div>
                                {/* <div class="w-full my-2 sm:w-[120px]  mx-2">
                            <label for="role" class="block text-sm font-medium leading-6 text-gray-900">Role</label>
                            <div class="">
                                <input required type="text" name="role" id="role" autocomplete="address-level2" class="block w-full rounded-md border-0 text-center p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div> */}
                                <button type='submit' className="px-6 py-2 mb-2 ml-4 bg-green-600 text-white rounded-md">Save</button>
                            </div>
                            {/* <p className='text-red-500'>{modalError}</p> */}

                        </form>

                        <form method="dialog" className='absolute top-2 right-2'>
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={() => setRoleModal(false)} htmlFor='my_modal_10' className="h-8 w-8 bg-gray-500 text-white rounded-full">X</button>
                        </form>
                    </div>
                </div>
            </label>
        </>
    )
}

export default EditRoleModal