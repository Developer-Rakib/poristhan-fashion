import { useState } from "react";
import axios from "axios";

const useRole = (user) => {
    const [role, setRole] = useState("")
    const [roleLoading, setRoleLoading] = useState(true)
    // console.log(user);
    if (user) {
        axios.get(`https://poristhan-fashion-server.onrender.com/role/${user?.email}`)
            .then(data => {
                // console.log(data.data.role);
                setRole(data.data.role)
                setRoleLoading(false)
            })
    }

    return [role, roleLoading]
}
export default useRole;
