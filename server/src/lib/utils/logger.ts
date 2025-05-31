const blue = (text: string) => `\x1b[34m${text}\x1b[0m`;
const red = (text: string) => `\x1b[31m${text}\x1b[0m`;

export const infoLogger=(message:string)=>{
    if(process.env.NODE_ENV !== 'production') {
        console.log(blue(`[INFO] ${new Date().toISOString()} - ${message}`));
    }
} 

export const errorLogger =(message:string,err:unknown)=>{
    if(process.env.NODE_ENV !== "production"){
        console.log(red(`[ERROR] ${new Date().toISOString()} - message : ${message} - ${err}`))
    }
}