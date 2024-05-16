import { useState } from "react";
import axios from "axios";

const useRole = (user) => {
    const [role, setRole] = useState("")
    const [roleLoading, setRoleLoading] = useState(true)
    // console.log(user);
    if (user) {
        axios.get(`http://13.235.246.2:5000/role/${user?.email}`)
            .then(data => {
                // console.log(data.data?.role);
                setRoleLoading(false)
                setRole(data.data?.role)
            })
    }

    return [role, roleLoading]
}
export default useRole;
