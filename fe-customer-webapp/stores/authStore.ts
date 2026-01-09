import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUser } from '@/lib/mockData';

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string | null;
    addresses: Array<{
        id: string;
        type: string;
        name: string;
        phone: string;
        line1: string;
        line2: string;
        city: string;
        state: string;
        pincode: string;
        isDefault: boolean;
    }>;
    stylePassport: {
        skinTone: string;
        preferredMetal: string;
        preferredStyle: string[];
        wristSize: string;
        ringSize: string;
    };
    refundWallet: number;
}

interface RecentView {
    productId: string;
    name: string;
    image: string;
    price: number;
    viewedAt: number;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    recentViews: RecentView[];
    recentSearches: string[];
    login: (email: string, password: string) => Promise<boolean>;
    loginWithOTP: (phone: string, otp: string) => Promise<boolean>;
    signup: (data: { name: string; email: string; phone: string; password: string }) => Promise<boolean>;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
    updateStylePassport: (data: Partial<User['stylePassport']>) => void;
    addRecentView: (view: Omit<RecentView, 'viewedAt'>) => void;
    addRecentSearch: (query: string) => void;
    clearRecentSearches: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            recentViews: [],
            recentSearches: [],

            login: async (email, password) => {
                set({ isLoading: true });
                await new Promise((resolve) => setTimeout(resolve, 1000));

                if (email && password) {
                    set({ user: mockUser as User, isAuthenticated: true, isLoading: false });
                    return true;
                }
                set({ isLoading: false });
                return false;
            },

            loginWithOTP: async (phone, otp) => {
                set({ isLoading: true });
                await new Promise((resolve) => setTimeout(resolve, 1000));

                if (phone && otp === '123456') {
                    set({ user: mockUser as User, isAuthenticated: true, isLoading: false });
                    return true;
                }
                set({ isLoading: false });
                return false;
            },

            signup: async (data) => {
                set({ isLoading: true });
                await new Promise((resolve) => setTimeout(resolve, 1500));

                if (data.email && data.password) {
                    const newUser = {
                        ...mockUser,
                        name: data.name,
                        email: data.email,
                        phone: data.phone,
                    } as User;
                    set({ user: newUser, isAuthenticated: true, isLoading: false });
                    return true;
                }
                set({ isLoading: false });
                return false;
            },

            logout: () => {
                set({ user: null, isAuthenticated: false });
                // Redirect happens in the component
            },

            updateProfile: (data) => {
                set((state) => ({
                    user: state.user ? { ...state.user, ...data } : null,
                }));
            },

            updateStylePassport: (data) => {
                set((state) => ({
                    user: state.user
                        ? {
                            ...state.user,
                            stylePassport: { ...state.user.stylePassport, ...data },
                        }
                        : null,
                }));
            },

            addRecentView: (view) => {
                set((state) => {
                    const filtered = state.recentViews.filter(v => v.productId !== view.productId);
                    const newView = { ...view, viewedAt: Date.now() };
                    return { recentViews: [newView, ...filtered].slice(0, 10) };
                });
            },

            addRecentSearch: (query) => {
                set((state) => {
                    const filtered = state.recentSearches.filter(s => s.toLowerCase() !== query.toLowerCase());
                    return { recentSearches: [query, ...filtered].slice(0, 8) };
                });
            },

            clearRecentSearches: () => {
                set({ recentSearches: [] });
            },
        }),
        {
            name: 'forique-auth',
        }
    )
);
