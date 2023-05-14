// import { useLayoutEffect, useState } from 'react';

// export function useWindowSize() {
//   const [windowSize, setWindowSize] = useState({
//     width: undefined,
//     height: undefined,
//   });

//   useLayoutEffect(() => {
//     function handleResize() {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     }

//     window.addEventListener('resize', handleResize);

//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return windowSize;
// }
import { useEffect, useState } from 'react';

export function useWindowSize() {
  
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      try {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      } catch (error) {
        // handle error here
      }
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
