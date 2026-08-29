
import { Input } from "@/components/ui/input"
import useAppStore from "@/store/app"
import type { ChangeEvent } from "react"


export default function Searchbar(){
    const { searchInput, setSearchInput } = useAppStore(s=>s)

    function handleInput(e: ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        const input = e.target.value;
        setSearchInput(input);
    }

    return (
        <div>
            <Input 
                type="search" 
                placeholder="Search chats..." 
                value={searchInput}
                onChange={handleInput} 
            />
        </div>
    )
}
