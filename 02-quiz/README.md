# :triangular_flag_on_post: Purpose
  * Use Axios to get the Quiz API from [Open Trivia Database](https://opentdb.com/api_config.php)
  + Practice using `useContext()` to solved prop drilling
    - `prop drilling` : Passing data through several nested children components, but most of the components have no actual need for this data )
  * [Demo project]( https://02-quiz.netlify.app/ )

https://user-images.githubusercontent.com/52907691/171797604-6779a7b8-857b-406c-bc63-863865368040.mp4




# :memo: Note
#### React Hook
  >  `useState()`
  + `setState` is asynchronous ( ex : click handler will batch updates )
  > `useEffect()`

  > `useContext()` : Setup the `state` or `function` in `context.js` so every component can use them.
  + In `context.js`
    - create context and setup all state and function in it
      ```javascript
      import { useState,createContext } from 'react';
      
      const AppContext = createContext();
      const AppProvider = ({ children }) => {
        const [state1,setState1] = useState(true);
        
        const function1 = () => { ... }
        
        return <AppContext.Provider value={{state1,setState1,function1}}>{children}<AppContext.Provider>
      };
      
      export { AppContext, AppProvider };
      ```
  + In `index.js`
    - Surround parent component with `<AppProvider></AppProvider>`
       ```javascript
       import ReactDOM from 'react-dom/client';
       import { AppProvider } from './context';
       
       const root = ReactDOM.createRoot(document.getElementById('root'));
       root.render(
         <React.StrictMode>
           <AppProvider>
             <App />
           </AppProvider>
         </React.StrictMode>
       );
       ```
  + In children component ( ex : App.js )
    - import those state or function setted up in context.js with `useContext();`
      ```javascript
      import { useGlobalContext } from './context';
      import { useContext } from 'react';
      
      function App() {
        const {state1,setState1,funcion1} = useContext(AppContext);
        ...
      }
      
      export default App;
      ```
#### Popular React Package
  * [`Axios`](https://axios-http.com/) ( Just use simple get request in this project )
 
