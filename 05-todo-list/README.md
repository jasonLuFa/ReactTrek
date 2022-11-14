# :triangular_flag_on_post: Purpose
  * practice useReducer to build the todo list and pomodoro
  * learn how to store info in local storage
  * [Demo project]( https://todo-list-with-pomodoro.netlify.app/ )


# :memo: Note
#### React Hook
  > `useState()`
  
  > `useEffect()`
  
  > `useContext()`
  - `const [state, dispatch] = useReducer(reducer, initialState, initStateFn)`
    - `dispatch` : It uesd to trigger action ( This function need to pass Object type including type attribute )
      ```JavaScript
      const XXXevent = () => {
        dispatch({ type: 'ADD_ITEM',payload:AAA);
      };
      ```
    - `reducer` : According to type attribute of dispatch to write the corresponding logic
    - `initialState` : This is the initial state ( usually the object type )
    - `initStatFn` : initla state function ( Optional )
  
  > `useReducer()` : 
  - Solving the prop drilling problem
    - prop drilling : a situation where data is passed from one component through multiple interdependent components until you get to the component where the data is needed
  
  
  > custonm hooks
  - When you have component logic that needs to be used by multiple components, we can extract that logic to a custom Hook.
  - Custom Hooks start with "use". Example: `useAudio()`
  
  
#### others
  * [`React-Icons`](https://axios-http.com/) ( many styled icons )
  * [`Loaders`](https://www.npmjs.com/package/react-circular-progressbar) ( many styled of circular progressbar )
  * [`react-slider`](https://mui.com/material-ui/react-slider/) ( allow users to make selections from a range of values )
