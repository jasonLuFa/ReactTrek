import React from 'react';
import Cocktail from './Cocktail';
import { DotSpinner } from '@uiball/loaders';
import { useGlobalContext } from '../context';
import './css/cocktailList.css';

const CocktailList = () => {
  const { isLoading, cocktails } = useGlobalContext();
  if (isLoading) {
    return (
      <div className='loading'>
        <DotSpinner size={60} speed={0.9} color='#476a2e' />
      </div>
    );
  }

  if (cocktails.length < 1) {
    return (
      <h2 className='section-title warning'>
        no cocktails matched your search criteria
      </h2>
    );
  }
  return (
    <section>
      <h2 className='section-title'>cocktails</h2>
      <div className='cocktails-center'>
        {cocktails.map((cocktail) => (
          <Cocktail key={cocktail.id} {...cocktail} />
        ))}
      </div>
    </section>
  );
};

export default CocktailList;
