import { useEffect, useState } from 'react'

const useDebounse = (value, delay) => {
    const [state, setState] = useState(0);
    
    useEffect(()=>{
        const st = setTimeout(()=>{
            setState(value);
        },delay);
        return ()=>{
            clearTimeout(st);
        }
    },[value, delay])

    return state;
}

export default useDebounse