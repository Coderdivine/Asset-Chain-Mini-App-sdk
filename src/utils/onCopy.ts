export const onCopy = async (text: string) => {
   try {
     await navigator.clipboard.writeText(text);
     console.log("Text copied");
   } catch (error) {
        console.log({ error });
   }
}