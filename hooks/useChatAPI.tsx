import useAPI from "./useAPI";

const useChatAPI=async(prompt:any)=>{
    const resp = await useAPI('/chatapi', { prompt });
    const rawContent = resp?.data?.choices[0]?.message;
    const content = rawContent.content.trim().replace('```json', '').replace('```', '');
    return content;
}
export default useChatAPI;