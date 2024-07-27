import axios from "axios"
import webConfig from "./WebConfigFile"

export const getTripApprovalData = async () =>{
    // const token = Cookies.get('jwt_token')
    try {
        const response = await axios(
            {
                method: "get",
                url:`${webConfig.API_DOMAIN_URL}/displaydata`,
                headers :{
                    // Authorization:`Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        const responseData = await response.data
        return responseData
    } catch (error) {
        return error.message
    }
}



export const putTripApprovalData = async (data) =>{
    const newData = JSON.stringify(data);

    try {
        const response = await axios(
            {
                method: "put",
                url:`${webConfig.API_DOMAIN_URL}/ApprovalStatus`,
                
                headers :{
                    "Content-Type": "application/json"
                },
                data:newData
            }
        );
        const responseData = await response.data
        return responseData
    } catch (error) {
        return error.message
    }
}
