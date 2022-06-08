import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DotSpinner } from '@uiball/loaders';
import axios from 'axios';
import Error from './Error';
import './css/singleCocktail.css';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

function getIngredient(cocktail) {
  const ingredients = [];
  let ingredient = null;
  let number = 1;
  do {
    const ingredientTemp = `strIngredient${number}`;
    ingredient = cocktail[`${ingredientTemp}`];
    if (ingredient) {
      ingredients.push(ingredient);
    }
    number++;
  } while (ingredient);
  // console.log(ingredients);
  return ingredients;
}

const SingleCocktail = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const [cocktail, setCocktail] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios(`${url}${productId}`);
        if (response.data.length === 0) {
          setCocktail(null);
        }
        const cocktail = response.data.drinks[0];
        const {
          strDrink: name,
          strDrinkThumb: image,
          strAlcoholic: info,
          strCategory: category,
          strGlass: glass,
          strInstructions: instructions,
        } = cocktail;
        const ingredients = getIngredient(cocktail);
        setCocktail({
          name,
          image,
          info,
          category,
          glass,
          instructions,
          ingredients,
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };
    fetchData();
  }, [productId]);

  if (isLoading) {
    return (
      <div className='loading'>
        <DotSpinner size={60} speed={0.9} color='#476a2e' />
      </div>
    );
  }

  if (!cocktail) {
    return <Error />;
  }

  const { name, image, info, category, glass, instructions, ingredients } =
    cocktail;
  return (
    <section className='section cocktail-section'>
      <div className='drink'>
        <img src={image} alt={image} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name:</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category:</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info:</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass:</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instructions:</span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients:</span>
            {ingredients.map((ingredient, index) => {
              return <span key={index}>{ingredient},</span>;
            })}
          </p>
        </div>
      </div>
      <button className='btn btn-primary'>
        <Link to='/'>back home</Link>
      </button>
    </section>
  );
};

export default SingleCocktail;
