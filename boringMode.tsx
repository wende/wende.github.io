import React, { createContext, useContext, useState, useEffect } from 'react';

const BoringModeContext = createContext<{ boring: boolean; toggle: () => void }>({
  boring: false,
  toggle: () => {},
});

export const useBoringMode = () => useContext(BoringModeContext);

export const BoringModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [boring, setBoring] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.has('boring');
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    if (boring) {
      url.searchParams.set('boring', '');
    } else {
      url.searchParams.delete('boring');
    }
    window.history.replaceState({}, '', url.toString());
  }, [boring]);

  return (
    <BoringModeContext.Provider value={{ boring, toggle: () => setBoring(b => !b) }}>
      {children}
    </BoringModeContext.Provider>
  );
};
