import React, { useState } from 'react';
import { useEffect } from 'react';
import styles from '../styles/Navbar.module.css'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const bodyText = document.body.innerHTML;
    const regex = new RegExp(searchTerm, 'gi');
    const matches = bodyText.match(regex);

    //replace all occurrences of search term with highlighted version
    if (matches.length > 0) {
      setSearchResults(matches);
      // document.body.innerHTML = bodyText.replace(
      //   regex,
      //   `<span class={{color:/"red/"}}>${searchTerm}</span>`
      // );
    } else {
      setSearchResults([]);
    }
    if(searchTerm.length === 0) setSearchResults([])
  };

  useEffect(() => {
    if(searchTerm.length === 0) {setSearchResults([])}
    else handleSearch()
    }, [searchTerm])

  return (
    <div style={{"display":"flex","flexDirection":"column","width":"10rem"}}>
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
      <div className={styles.results}>
        {searchResults.length > 0 ? (
          <>
            <ul>
              {/* remove one search value of what user typed */}
              {/* reduce the results by 1 of what user typed*/}
              {searchResults.slice(0, searchResults.length-1).map((result, index) => (
                <li key={index}>
                  {result}
                </li>
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
