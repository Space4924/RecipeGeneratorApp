import axios from "axios";
const startpoint = "http://10.81.20.147:8001";

const useAPI = async (endpoint:string, data:any, ROUTETYPE="post" ) => {
    try {
        const resp = await axios({
            method: ROUTETYPE,
            url: startpoint+endpoint,
            data
        })  
        return resp;
    } catch (error) {
        console.log("API Error:",error);
        throw error;
    }
};
export default useAPI;
