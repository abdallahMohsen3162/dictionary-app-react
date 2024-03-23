import { Cookie } from "next/font/google";
export const setCookie = (name:string, value:any, daysToLive:number) => {
  const cookieValue = encodeURIComponent(value);
  const maxAge = daysToLive * 24 * 60 * 60;
  document.cookie = `${name}=${cookieValue}; max-age=${maxAge}; path=/`;
};

export const deleteCookie = (name:string) => {
  document.cookie = `${name}=; Max-Age=0; path=/`;
};

export const getCookie = (name:string) => {
  const cDecode = decodeURIComponent(document.cookie);
  const cArray = cDecode.split("; ");
  let ret ;
  cArray.forEach((el, idx) => {
    if(el.indexOf(name) == 0){
      ret = el.substring(name.length + 1);
    }
  })
  return ret;
}