import useAPI from "./useAPI";

const useChatAPI =async  (prompt: any) => {
    try {
        const resp = await useAPI('/chatapi', { prompt });
        const rawContent = resp?.data?.choices[0]?.message;
        const content = rawContent.content.trim().replace('```json', '').replace('```', '');
        return content;
    } catch (error) {
        console.log("Error in useChatAPI: ", error)
    }
}
export default useChatAPI;