import { useEffect } from 'react';

export default function useExternalScripts({ url }){
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");

    script.setAttribute("src", url);
    head.appendChild(script);

    return () => {
      head.removeChild(script);
    };
  }, [url]);
};


/*
In a component where you want to add a new script, paste the following code:

import useExternalScripts from "./hooks/useExternalScripts"

const Component = () => {
  useExternalScripts("https://www.scriptdomain.com/script")
  ...
}

*/
