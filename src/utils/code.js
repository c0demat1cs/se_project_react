const handleDeleteItem = (id) => {
  // call the deleteItem method from api.js and update the clothingItems state variable
  // with a new array that does not contain the item with the specified id
  deleteItem(id)
    .then(() => {
      setClothingItems(clothingItems.filter((item) => item.id !== id));
    })
    .catch(console.error);
};

const handleDeleteItem2 = () => {
  deleteItem(selectedCard.id)
    .then(() => {
      const updatedItems = clothingItems.filter(
        (item) => item.id !== selectedCard.id
      );
      setClothingItems(updatedItems);
      closeActiveModal();
    })
    .catch(console.error);
};

const handleAddItemSubmit = (item) => {
  postItem(item)
    .then((item) => {
      setClothingItems([item, ...clothingItems]);
    })
    .catch(console.error);
};
