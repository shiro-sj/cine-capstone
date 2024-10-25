import { useState, useEffect, useRef } from "react";

export default function SearchBar() {
  const [searchString, setSearchString] = useState('');
  const [results, setResults] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = async () => {
    if (!searchString) return;
    try {
      const url = `/api/search/?query=${searchString}`;
      const response = await fetch(url);
      const data = await response.json();
      setResults(data.users);
      setDropdownVisible(true);
    } catch (e) {
      console.error('Error fetching users', e);
    }
  };

  useEffect(() => {
    if (searchString) {
      handleSearch();
    } else {
      setResults([]);
      setDropdownVisible(false);
    }
  }, [searchString]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="m-3 relative w-full max-w-md mx-auto" ref={searchRef}>
      <input
        type="text"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="Search"
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        style={{ color: 'black' }}
      />
      
      {results.length > 0 && isDropdownVisible && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-2">
          <ul className="divide-y divide-gray-200">
            {results.map((user) => (
              <li key={user.id} className="hover:bg-gray-100">
                <a href={`/profile/${user.username}`} className="block px-4 py-2 text-black">
                  {user.username}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
