import DataCleaner from "@/services/DataCleaner";
import useAPI from "./useAPI";
import { Alert } from "react-native";

const ChatGPT = async (startpoint: Number, prompt: any) => {
    try {
        const resp = await useAPI(`/chatapi/${startpoint}`, { prompt });
        return DataCleaner(resp);
    } catch (error) {
        let errorMessage = "Something went wrong";
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === "string") {
            errorMessage = error;
        }
        Alert.alert("Error", errorMessage);
    }
}

export default ChatGPT;