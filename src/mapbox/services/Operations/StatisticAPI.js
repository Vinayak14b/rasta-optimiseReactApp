import { apiConnector } from "../../../usermanagement/services/apiConnector"
import { statisticsendpoints } from "../apis"

export const getStatisticsData=()=>{
    return async (dispatch,getState)=>{
        const {token}=getState().auth

        try{
        const response=await apiConnector(
            "GET",
            statisticsendpoints.GET_STATISTICS_DATA,
            null,
            { authorization : token }
        )
        // console.log(response.data.statisticsValue)
        return response.data.statisticsValue
    }catch(e){
        console.log(e)
    }
    }
}

export const getStatisticsDataSingleRoad=({roadName,roadNo})=>{
    return async (dispatch,getState)=>{
        const {token}=getState().auth

        try{
        const response=await apiConnector(
            "GET",
            statisticsendpoints.GET_STATISTICS_DATA_SINGLE_ROAD,
            null,
            { authorization : token },
            {roadName:roadName,roadNo:roadNo}
        
        )
        console.log(response.data.statisticsValue)
        console.log(roadName)
        return response.data.statisticsValue
    }catch(e){
        console.log(e)
    }
    }
}

