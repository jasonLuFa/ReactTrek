import { useState, useEffect } from 'react';
import data from './data';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

function App() {
  const [people, setPeople] = useState(data);
  const [peopleIndex, setPeopleIndex] = useState(0);

  useEffect(() => {
    const lastPeopleIndex = people.length - 1;
    if (peopleIndex > lastPeopleIndex) {
      setPeopleIndex(0);
    }
    if (peopleIndex < 0) {
      setPeopleIndex(lastPeopleIndex);
    }
  }, [peopleIndex, people]);

  useEffect(() => {
    const autoSlider = setTimeout(() => {
      setPeopleIndex(peopleIndex + 1);
    }, 4000);
    return clearTimeout(autoSlider);
  });

  return (
    <section className='section'>
      <h2 className='title'>
        <span>/</span> reviews
      </h2>
      <div className='section-center'>
        {people.map((person, index) => {
          const { id, image, name, title, quote } = person;
          let position = 'nextSlide';
          if (index === peopleIndex) {
            position = 'activeSlide';
          }
          if (
            index === peopleIndex - 1 ||
            (index === people.length - 1 && peopleIndex === 0)
          ) {
            position = 'lastSlide';
          }
          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className='person-img ' />
              <h4>{name}</h4>
              <p className='title'>{title}</p>
              <p className='text'>{quote}</p>
            </article>
          );
        })}
        <button
          className='prev'
          onClick={() => setPeopleIndex(peopleIndex - 1)}
        >
          <FiChevronLeft />
        </button>
        <button
          className='next'
          onClick={() => setPeopleIndex(peopleIndex + 1)}
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default App;
