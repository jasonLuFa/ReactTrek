# Slider Project Introduce
##  Purpose
  * accomplish the Review Slider when screen is smaller than 1080px
  * Slider will automatelly change slide every 4 seconds 
  * [成品](https://01-slider.netlify.app/)

https://user-images.githubusercontent.com/52907691/169970175-ceb1dc6f-1710-4e11-b9d1-eb6f39cb57e3.mp4



## Note
#### React Hook
  >  `useState()` : a hook that allows you to have state variables in functional components

  >  `useEffect(callback, dependencies)` :  the hook that manages the side-effects in functional components
  
  1. Dependencies arguments control when to run side-effects
     + Not provided : the side-effect runs after every rendering.
     + Empty array : the side-effect runs once after the initial rendering.
     + Has props or state value ( ex: [prop1,state1] ) : the side-effect runs only when any depenendecy value (prop1,state1) changes.
  3. Sometimes we need to return the clean-up function ( ex : remove the event listener )
     * clean-up function is promise
    
