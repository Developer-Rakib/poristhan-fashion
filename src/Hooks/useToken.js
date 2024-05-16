import axios from "axios"
import { useEffect, useState } from "react"

const useToken = (user) => {
    const [token, setToken] = useState(null)
    useEffect(() => {
        if (user) {
            if (user) {
                // console.log(user?.user.email);
                axios.put(`https://server.poristhan-fashion.xyz/user/${user.user.email}`, user?.user.email)
                    .then(data => {
                        // console.log(data.data);
                        // if (data.data.token) {
                        //     // console.log(data.data.token);
                        //     const token = data.data.token;
                        //     setToken(token)
                        //     localStorage.setItem('accessToken', token)
                        // }
                    })
            }
        }
    }, [user])
    return [token, setToken];
}
export default useToken;