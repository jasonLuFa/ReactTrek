import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [cocktails, setCocktails] = useState([]);
  const [searchLetter, setSearchLetter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios(`${url}${searchLetter}`);
        const drinks = response.data.drinks;
        if (!drinks) {
          setCocktails([]);
          return;
        }
        const cocktails = drinks.map((drink) => {
          const {
            idDrink: id,
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strGlass: glass,
          } = drink;
          return { id, name, image, info, glass };
        });
        console.log(cocktails);
        setCocktails(cocktails);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchLetter]);

  return (
    <AppContext.Provider
      value={{ isLoading, cocktails, searchLetter, setSearchLetter }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
