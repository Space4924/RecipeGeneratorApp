export default function DataCleaner(resp:any) {
console.log("resp is",resp)
    const rawContent = resp?.data?.choices[0]?.message;
    console.log("rawContent is ",rawContent);
    const content = rawContent.content.trim().replace('```json', '').replace('```', '');
    return content;
}
