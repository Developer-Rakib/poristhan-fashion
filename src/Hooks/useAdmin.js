import { useState } from "react";
import axios from "axios";

const useAdmin = (user) => {
    const [admin, setAdmin] = useState()
    const [adminLoading, setAdminLoading] = useState(true)
    // console.log(admin);
    axios.get(`https://poristhan-fashion-server.onrender.com/admin/${user.email}`)
        .then(data => {
            // console.log(data.data);
            setAdmin(data.data.admin)
            setAdminLoading(false)
        })

    return [admin, adminLoading]
}
export default useAdmin;
