const { createContext, useState } = require("react");
export let storeContext = createContext(0);
export default function StoreContextProvider({ children }) {
  let [counter, setCounter] = useState(0);
  return (
    <storeContext.Provider value={{ counter, setCounter }}>
      {children}
    </storeContext.Provider>
  );
}
