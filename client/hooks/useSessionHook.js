import React, { useState, useEffect } from 'react';

export function useSessionHook(props) {
  console.log("props = " + props);
  const [isSignIn, setSignIn] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
        setSignIn(status.isOnline);
    }
    
  });

  return isSignIn;
}