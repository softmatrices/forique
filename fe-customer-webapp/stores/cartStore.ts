import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    productId: string;
    name: string;
    price: number;
    image: string;
    color: string;
    quantity: number;
    brandName: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (productId: string, color: string) => void;
    updateQuantity: (productId: string, color: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                set((state) => {
                    const existingIndex = state.items.findIndex(
                        (i) => i.productId === item.productId && i.color === item.color
                    );

                    if (existingIndex >= 0) {
                        const newItems = [...state.items];
                        newItems[existingIndex].quantity += 1;
                        return { items: newItems };
                    }

                    return { items: [...state.items, { ...item, quantity: 1 }] };
                });
            },

            removeItem: (productId, color) => {
                set((state) => ({
                    items: state.items.filter(
                        (i) => !(i.productId === productId && i.color === color)
                    ),
                }));
            },

            updateQuantity: (productId, color, quantity) => {
                set((state) => {
                    if (quantity <= 0) {
                        return {
                            items: state.items.filter(
                                (i) => !(i.productId === productId && i.color === color)
                            ),
                        };
                    }

                    return {
                        items: state.items.map((item) =>
                            item.productId === productId && item.color === color
                                ? { ...item, quantity }
                                : item
                        ),
                    };
                });
            },

            clearCart: () => set({ items: [] }),

            getTotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: 'forique-cart',
        }
    )
);
