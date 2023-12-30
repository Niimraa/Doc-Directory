//SearchResult.js

import React from 'react';
import '../../../css/SearchResults.css';
import SearchResult from './SearchResult';
import { Stack } from '@chakra-ui/react';


const SearchResults = ({ results }) => {
    // Check if there are no results
  if (!results || results.length === 0) {
    return null; // Return null to render nothing
  }

  return (
    // <div className="results-list" style={{ width: '100%' }}>
    //   {results &&
    //     results.map((result, id) => {
    //       return <SearchResult result={result} key={id}/>
    //     })}
    // </div>

    <Stack spacing={0.5} width="100%">
  {results &&
    results.map((result, id) => (
      <SearchResult result={result} key={id} />
    ))}
</Stack>



  );
};

export default SearchResults;