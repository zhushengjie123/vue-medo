import { nanoid } from "nanoid"
export const getNanoId=()=>{
    let getNanoId=localStorage.getItem('NANOID',)
    if(!getNanoId){//如果本地没有ID就生成一个,有的话就不执行，该操作可以使ID始终只生成一次
        getNanoId=nanoid()
        localStorage.setItem('NANOID',getNanoId)
    }return getNanoId
}