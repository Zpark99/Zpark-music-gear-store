import { create } from 'zustand';
// persist 미들웨어 추가
import { persist } from 'zustand/middleware'; 

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [] as CartItem[],

      addToCart: (newItem) => set((state) => {
        const existingItem = state.cart.find((item) => item.id === newItem.id);
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { cart: [...state.cart, { ...newItem, quantity: 1 }] };
      }),

      increaseQuantity: (id) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      })),

      decreaseQuantity: (id) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ),
      })),

      removeItem: (id) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'music-gear-cart', // 로컬 스토리지에 저장될 이름
    }
  )
);