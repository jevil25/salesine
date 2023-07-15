import React, { useState } from 'react';
import { useEffect } from 'react';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const bodyText = document.body.innerHTML;
    const regex = new RegExp(searchTerm, 'gi');
    const matches = bodyText.match(regex);

    if (matches) {
      setSearchResults(matches);
    } else {
      setSearchResults([]);
    }
    if(searchTerm.length === 0) setSearchResults([])
  };

  useEffect(() => {
    if(searchTerm.length === 0) setSearchResults([])
    handleSearch()
    }, [searchTerm])

  return (
    <div style={{"display":"flex","flexDirection":"column"}}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
            setSearchTerm(e.target.value)
        }
        }
        placeholder="Search..."
        style={{"width":"10rem","height":"2rem","borderRadius":"0.5rem","border":"none","outline":"none","paddingLeft":"0.5rem"}}
      />
      <div>
        {searchResults.length > 0 ? (
          <>
            <p>Found {searchResults.length} occurrences of '{searchTerm}'.</p>
            <ul>
                {searchResults.slice(0, 10).map((result, index) => (
                <li key={index}>{result}</li>
                ))}
            </ul>
          </>
        ) : (
            //check if search term is empty
            searchTerm.length > 0 &&
            <p>No occurrences found for '{searchTerm}'.</p>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
