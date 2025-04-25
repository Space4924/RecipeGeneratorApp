import axios from "axios";
export const startpoint ="https://recipe-generator-dc45.onrender.com"
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAPI = async (endpoint: string, data: any,ROUTETYPE = "POST") => {
    const token = await AsyncStorage.getItem("jwtToken");
    console.log(startpoint+endpoint);
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
