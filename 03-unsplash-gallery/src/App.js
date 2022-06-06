import './css/App.css';
import { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';
import axios from 'axios';
import { Waveform } from '@uiball/loaders';

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = 'https://api.unsplash.com/photos/';
const searchUrl = 'https://api.unsplash.com/search/photos';

const isScrollToButton = () =>
  window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isNoPhoto, setIsNoPhoto] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    setIsLoading(true);
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    const url = query
      ? `${searchUrl}${clientID}${urlPage}${urlQuery}`
      : `${mainUrl}${clientID}${urlPage}`;

    const response = await axios(url).catch((err) => {
      console.log(err);
    });
    let data = response.data;
    setPhotos((oldPhotos) => {
      if (query && page === 1) {
        return data.results;
      } else if (query) {
        return [...oldPhotos, ...data.results];
      } else if (!query && page === 1) {
        return data;
      } else {
        return [...oldPhotos, ...data];
      }
    });
    setIsLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
      return;
    }
    setPage(1);
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (photos.length === 0) {
      setIsNoPhoto(true);
      return;
    }
    setIsNoPhoto(false);
  }, [photos]);

  const scrollToButtonEvent = () => {
    console.log(isScrollToButton());
    if (isScrollToButton()) {
      setPage((oldPage) => {
        return oldPage + 1;
      });
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollToButtonEvent);
    // return () => window.removeEventListener('scroll', scrollToButtonEvent);
  }, []);

  return (
    <main>
      <section className='search'>
        <form className='search-form'>
          <input
            type='text'
            placeholder='search'
            className='form-input'
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className='submit-btn' type='submit' onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      {isLoading && page === 1 && (
        <div className='loading'>
          <Waveform />
        </div>
      )}
      <section className='photos'>
        <div className='photos-center'>
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
        {isLoading && (
          <div className='loading'>
            <Waveform />
          </div>
        )}
      </section>
      {isNoPhoto && <p className='no-image'>no image</p>}
    </main>
  );
}

export default App;
