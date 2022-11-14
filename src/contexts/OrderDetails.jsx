import { createContext, useContext, useState } from 'react';
import { pricePerItem } from '../constants';
const OrderDetails = createContext();

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);
  if (!contextValue) {
    throw new Error(
      'useOrderDetails must be called from within an OrderDetailsProvider'
    );
  }
  return contextValue;
}

export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: {},
    topping: {},
  });

  function updateItemCount(itemName, newItemCount, optionType) {
    const newOptionCounts = { ...optionCounts };

    newOptionCounts[optionType][itemName] = newItemCount;
    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, topping: {} });
  }
  //utility function to derive totals from optionCounts state value
  function calculateTotal(optionType) {
    //get an array of counts for  option type   example [1,2]
    const countsArray = Object.values(optionCounts[optionType]);
    //total the values in the array of counts for the number of items
    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    //multiply by price
    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal('scoops'),
    toppings: calculateTotal('topping'),
  };

  const value = { optionCounts, totals, updateItemCount, resetOrder };
  return <OrderDetails.Provider value={value} {...props} />;
}
