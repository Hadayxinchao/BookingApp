import React, { useContext, useState } from 'react';
import { PlaceContext } from '../providers/PlaceContext';
import axios from 'axios';
import { Mic, Search } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const { setPlaces, setLoading } = useContext(PlaceContext);
  const [isListening, setIsListening] = useState(false);
  let speech;
  if (window['webkitSpeechRecognition']) {
    const SpeechRecognition =
      window['SpeechRecognition'] || window['webkitSpeechRecognition'];
    speech = new SpeechRecognition();
  } else {
    speech = null;
  }

  const listen = () => {
    setIsListening(!isListening);
    // if (isListening) {
    //   speech.stop();
    // } else {
    speech.start();
    // }
  };

  if (speech === null) {
    return (
      <div>
        <h1>
          Voice recognition is not supported by your browser, please re-try with
          a supported browser e.g. Chrome
        </h1>
      </div>
    );
  }

  const handleSearch = async (e) => {
    setLoading(true);
    const searching = () => {
      if (e.target.value === undefined || e.target.value === '') {
        if (searchText !== '' && e.type === 'click') return searchText;
        setSearchText('');
        return undefined;
      }
      setSearchText(e.target.value);
      return e.target.value;
    };
    // debounce method
    const { data } = await axios.get(`/places/search/${searching()}`);
    setPlaces(data);
    setLoading(false);
  };

  speech.onresult = (event) => {
    const text = event.results[0][0].transcript.trim();
    setSearchText(text);
    handleSearch({ target: { value: text }, type: 'voice' }).then(() => {});
  };

  return (
    <>
      <div className="flex w-3/5 md:w-1/2 border shadow-3xl rounded-full overflow-hidden hover:scale-105 transition transform duration-200 ease-out">
        <div className="grow flex search-icon">
          <input
            id="search"
            type="search"
            placeholder="Search for a place"
            className="w-full py-2 px-6 border-none focus:outline-none"
            onChange={(e) => handleSearch(e)}
            value={searchText}
          />
          <IconButton variant="contained" className=" right-2" onClick={listen}>
            <Mic className={`microphone ${isListening && 'isListening'}`} />
          </IconButton>
        </div>

        <div className="flex  bg-blue text-white cursor-pointer">
          <button
            className="flex py-2 px-4 md:p-2 bg-primary hover:bg-secondary transition rounded-r-full"
            onClick={(e) => handleSearch(e)}
          >
            <Search />
            <span className="hidden md:block mx-2">Search</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;