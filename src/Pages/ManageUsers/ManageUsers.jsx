import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import Loader from '../Shared/Loader';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import EditRoleModal from './EditRoleModal';
import SingelUser from './SingelUser';

function ManageUsers() {
    const { isLoading, error, data: users, refetch } = useQuery('users', () =>
        axios.get(`http://65.0.95.143:5000/users`)
    )
    let [user, loading] = useAuthState(auth)



    // console.log(users);
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='w-[95%] sm:w-[60%]  mx-auto pb-5 mt-[80px]'>
            {/* <h5 className="text-lg text-center font-bold  mb-2 text-primary">Make Admin</h5> */}
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-2  sm:py-3">

                            </th>
                            <th scope="col" className="py-2 sm:py-3">
                                user
                            </th>
                            <th scope="col" className="py-2 sm:py-3 text-">
                                Role
                            </th>
                            <th scope="col" className="py-2 sm:py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.data?.map((singleUser, i) => {
                                return <SingelUser
                                    singleUser={singleUser}
                                    i={i}
                                    refetch={refetch}
                                />
                            }

                            )
                        }

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ManageUsers