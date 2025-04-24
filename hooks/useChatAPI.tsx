import DataCleaner from "@/services/DataCleaner";
import useAPI from "./useAPI";

const ChatGPT =async  (startpoint:Number,prompt: any) => {
    try {
        const resp = await useAPI(`/chatapi/${startpoint}`, { prompt });
        return DataCleaner(resp);
    } catch (error) {
        console.log("Error in useChatAPI: ", error)
    }
}
export default ChatGPT;