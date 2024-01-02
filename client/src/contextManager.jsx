import { createContext, useState } from "react";


export const TestContext = createContext({});


export function TestContextProvider({ children }) {
  const [message, setMessage] = useState({})
  return(
    <TestContext.Provider value={{message, setMessage}}>
      { children }
    </TestContext.Provider>
  )
}
