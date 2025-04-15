import axios from "axios";
export const startpoint = "http://10.81.24.138:8001";

const useAPI = async (endpoint: string, data: any, ROUTETYPE = "post") => {
    console.log("data in useAPI" ,data);
    try {
        const resp = await axios({
            method: ROUTETYPE,
            url: startpoint + endpoint,
            data
        })
        return resp;
    } catch (error) {
        console.log("Error in useAPI: ", error);
        throw error;
    }
};
export default useAPI;
