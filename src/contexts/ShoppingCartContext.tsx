import { createContext, ReactNode, SetStateAction, useState } from 'react';

interface ShoppingCartContextType {
  handleShoppingCartContainer: (param?: string) => void;
  showShoppingCartContainer: boolean;
}

interface ShoppingCartContextProps {
  children: ReactNode;
}

export const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function ShoppingCartContextProvider({ children }: ShoppingCartContextProps) {

  const [showShoppingCartContainer, setShowShoppingCartContainer] = useState(false)
 
  function handleShoppingCartContainer(params?: string) {
    if (params === 'close' && showShoppingCartContainer === true) {
      setShowShoppingCartContainer(false)
    } else if (params === 'open' && showShoppingCartContainer === false) {
      setShowShoppingCartContainer(true)
    }
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        handleShoppingCartContainer,
        showShoppingCartContainer
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}