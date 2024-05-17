import {toast} from 'react-hot-toast'
export const notify = (message:string,success:boolean)=>{
    if(success)
        toast.success(message);
    else
        toast.error(message);
        
}   