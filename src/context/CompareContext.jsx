import React, { createContext, useContext, useState, useEffect } from 'react';

const CompareContext = createContext(null);

export const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState(() => {
    try {
      const saved = localStorage.getItem('trv_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('trv_compare', JSON.stringify(compareItems));
    } catch (e) {
      console.error(e);
    }
  }, [compareItems]);

  const addToCompare = (property) => {
    if (compareItems.some((item) => item._id === property._id)) {
      return { success: false, message: 'Property is already in compare list' };
    }
    if (compareItems.length >= 4) {
      return { success: false, message: 'You can compare a maximum of 4 properties' };
    }
    setCompareItems((prev) => [...prev, property]);
    return { success: true, message: 'Added to comparison' };
  };

  const removeFromCompare = (propertyId) => {
    setCompareItems((prev) => prev.filter((item) => item._id !== propertyId));
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  const isInCompare = (propertyId) => {
    return compareItems.some((item) => item._id === propertyId);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        count: compareItems.length,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) throw new Error('useCompare must be used within CompareProvider');
  return context;
};
