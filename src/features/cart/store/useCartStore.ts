import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartProductItem {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  imageSrc: string;
  quantity: number;
}

interface CartState {
  items: CartProductItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Omit<CartProductItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true,
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
            isOpen: true,
          };
        });
      },

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, delta) => {
        set((state) => ({
          items: state.items
            .map((item) => {
              if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean) as CartProductItem[],
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalCount: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),

      getSubtotal: () =>
        get().items.reduce(
          (acc, item) => acc + item.numericPrice * item.quantity,
          0
        ),
    }),
    {
      name: 'origen-mates-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
