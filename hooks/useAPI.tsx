import axios from "axios";
export const startpoint = "http://10.81.19.14:8001";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAPI = async (endpoint: string, data: any,ROUTETYPE = "POST") => {
    // console.log(endpoint,"data is",data,"Route",ROUTETYPE)
    const token = await AsyncStorage.getItem("jwtToken");
    // console.log(token);
    try {
        const resp = await axios({
            method: ROUTETYPE,
            url: startpoint + endpoint,
            data,
            headers: {
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                "Content-Type": "application/json",
              },
        })
        return resp;
    } catch (error) {
        console.log("Error in useAPI: ", error);
        throw error;
    }
};
export default useAPI;
