//maybe make it search as typing and go away when clicked off

import { useState } from "react";

export default function SearchBar() {
    const [searchString, setSearchString] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (!searchString) 
            return;
        try {
            const url = `/api/search/?query=${searchString}`;
            const responce = await fetch(url);
            const data = await responce.json();
            setResults(data.users)
        }catch(e){
            console.error('error fetching users' , e)
        }
    };

    return(
        <div>
            <input
            type="text"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="search"
            />
            <button onClick={handleSearch}>
                Search
            </button>

            {results.length > 0 &&(
                <ul>
                    {results.map((user) => (
                        <li key = {user.id}>
                            <a href= {`/profile/${user.username}`}>{user.username}</a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}