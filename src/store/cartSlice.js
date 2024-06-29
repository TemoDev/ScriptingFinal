import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allItems: [
    {
      id: 1,
      category: "Mobile Phones",
      title: "iPhone 13 Pro",
      description: "The iPhone 13 Pro features a 6.1-inch OLED display, A15 Bionic chip, and triple-camera system with LiDAR scanner.",
      price: 999.99,
      amount: 0,
      image: "src/assets/imgs/1.jpeg",
      quantity: 0
    },
    {
      id: 2,
      category: "Mobile Phones",
      title: "Samsung Galaxy S21",
      description: "Samsung Galaxy S21 comes with a 6.2-inch AMOLED display, Exynos 2100 processor, and triple-camera setup.",
      price: 799.99,
      amount: 5,
      image: "src/assets/imgs/2.jpg",
      quantity: 0
    },
    {
      id: 3,
      category: "Mobile Phones",
      title: "Google Pixel 6",
      description: "Google Pixel 6 offers a 6.4-inch OLED display, Google Tensor processor, and dual-camera system.",
      price: 599.99,
      amount: 40,
      image: "src/assets/imgs/3.webp",
      quantity: 0
    },
    {
      id: 4,
      category: "Laptops",
      title: "MacBook Pro 14-inch",
      description: "The new MacBook Pro 14-inch features an M1 Pro chip, 14-inch Liquid Retina XDR display, and up to 64GB of RAM.",
      price: 1999.99,
      amount: 30,
      image: "src/assets/imgs/4.jpeg",
      quantity: 0
    },
    {
      id: 5,
      category: "Laptops",
      title: "Dell XPS 13",
      description: "Dell XPS 13 comes with a 13.4-inch FHD+ display, 11th Gen Intel Core processors, and up to 32GB of RAM.",
      price: 1249.99,
      amount: 25,
      image: "src/assets/imgs/5.webp",
      quantity: 0
    },
    {
      id: 6,
      category: "Laptops",
      title: "HP Spectre x360",
      description: "HP Spectre x360 offers a 13.3-inch 4K OLED display, Intel Evo platform, and 2-in-1 design for versatility.",
      price: 1399.99,
      amount: 20,
      image: "src/assets/imgs/6.jpg",
      quantity: 0
    },
    {
      id: 7,
      category: "Audio Systems",
      title: "Sony WH-1000XM4",
      description: "Sony WH-1000XM4 wireless noise-canceling headphones with up to 30 hours of battery life and superior sound quality.",
      price: 349.99,
      amount: 100,
      image: "src/assets/imgs/7.webp",
      quantity: 0
    },
    {
      id: 8,
      category: "Audio Systems",
      title: "Bose QuietComfort 35 II",
      description: "Bose QuietComfort 35 II wireless Bluetooth headphones with world-class noise cancellation and Alexa voice control.",
      price: 299.99,
      amount: 80,
      image: "src/assets/imgs/8.jpg",
      quantity: 0
    },
    {
      id: 9,
      category: "Audio Systems",
      title: "JBL Charge 5",
      description: "JBL Charge 5 portable Bluetooth speaker with IP67 waterproof and dustproof rating, and up to 20 hours of playtime.",
      price: 179.99,
      amount: 60,
      image: "src/assets/imgs/9.jpg",
      quantity: 0
    },
    {
      id: 10,
      category: "Audio Systems",
      title: "Sonos One (Gen 2)",
      description: "Sonos One (Gen 2) smart speaker with voice control, multi-room audio, and rich, room-filling sound.",
      price: 219.99,
      amount: 40,
      image: "src/assets/imgs/10.jpg",
      quantity: 0
    }
  ]
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const selectedItem = state.allItems.find(item => item.id === action.payload.id);
      selectedItem.quantity++;
      selectedItem.amount--;
    },
    removeItem: (state, action) => {
      const removedItem = state.allItems.find(item => item.id === action.payload);
      removedItem.amount += removedItem.quantity;
      removedItem.quantity = 0;
    },
    incrementAmount: (state, action) => {
      const item = state.allItems.find(item => item.id === action.payload);
      if (item && item.amount > 0) {
        item.amount--;
        item.quantity++;
      }
    },
    decrementAmount: (state, action) => {
      const item = state.allItems.find(item => item.id === action.payload);
      if (item && item.quantity > 0) {
        item.amount++;
        item.quantity--;
      }
    },
    clearCart: (state) => {
      state.allItems.forEach(item => {
        item.amount += item.quantity;
        item.quantity = 0;
      });
    },
    checkout: (state) => {
      state.allItems.forEach(item => {
        if(item.quantity > 0) {
          item.quantity = 0;
        }
      });
    },
  },
});

export const { addItem, removeItem, clearCart, incrementAmount, decrementAmount, checkout } = cartSlice.actions;
export default cartSlice.reducer;