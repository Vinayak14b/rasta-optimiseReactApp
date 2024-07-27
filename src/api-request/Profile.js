import axios from "axios"
import mobileConfig from "./MobileConfigFile"

export const getVerifiedData = async (username) =>{
    try {
        const response = await axios(
            {
                method: "get",
                url:`${mobileConfig.API_DOMAIN_URL}/v1/getVerifiedProfile/${username}`,
                headers :{
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