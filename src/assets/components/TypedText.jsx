import { useEffect, useRef } from 'react';

import Typed from 'typed.js';

const TypedText = ({ strings }) => {
  const typedTextRef = useRef(null);

  useEffect(() => {
    if (typedTextRef.current) {
      const typed = new Typed(typedTextRef.current, {
        strings,
        typeSpeed: 100,   
      });

      // Clean up the instance when the component unmounts
      return () => {
        typed.destroy();
      };
    }
  }, [strings]);

  return <span ref={typedTextRef}></span>;
};



export default TypedText;
