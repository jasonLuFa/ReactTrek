# :triangular_flag_on_post: Purpose
  * Use Axios to get the API from [unsplash](https://unsplash.com/documentation#creating-a-developer-account)
  * practice with infinite scroll
  * [Demo project]( https://03-unsplash-gallery.netlify.app/ )



https://user-images.githubusercontent.com/52907691/172281155-cf066460-1632-4037-8e76-ca9a51ca080e.mp4


# :memo: Note
#### React Hook
  > `useState()`
  
  > `useEffect()`
  
   * we can using useEffect with empty array ( initial rendering ), instead of using clean-up function to remove event listener
     ```javascript
     useEffect(() => {
       window.addEventListener('scroll', scrollToButtonEvent);
       return () => window.removeEventListener('scroll', scrollToButtonEvent);
     });

     // another way to avoid to add too much event listener
     useEffect(() => {
       window.addEventListener('scroll', scrollToButtonEvent);
     },[]);
     ```

#### Popular React Package
  * [`Axios`](https://react-icons.github.io/react-icons/) ( Just use simple get request in this project )
 
#### others
  * [`React-Icons`](https://react-icons.github.io/react-icons/) ( many styled icons )
  * [`Loaders`](https://uiball.com/loaders/) ( many styled of loading )
