import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import type { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),
      setRole: (role) => set((state) => ({ 
        user: state.user ? { ...state.user, role } : null 
      })),
      signUp: async (email, password, username) => {
        try {
          set({ isLoading: true, error: null });
          
          const { data, error } = await supabase.auth.signUp({
                     email,
                   password,
                   options: {
                   data: { username }, // ✅ Pass username as user_metadata
                    },
          });
          
          if (error) throw error;
          
          if (data.user) {
             set({ 
    user: {
      id: data.user.id,
      username,
      email,
      role: 'buyer',
    }
  });
          }
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },
      signIn: async (email, password, role) => {
        try {
          set({ isLoading: true, error: null });
          
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (error) throw error;
          
          if (data.user) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('username')
              .eq('id', data.user.id)
              .single();
              
            set({ 
              user: {
                id: data.user.id,
                username: profileData?.username || '',
                email: data.user.email || '',
                role,
              }
            });
          }
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },
      signOut: async () => {
        try {
          set({ isLoading: true, error: null });
          
          const { error } = await supabase.auth.signOut();
          
          if (error) throw error;
          
          set({ user: null });
        } catch (error) {
          set({ error: (error as Error).message });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'ophelia-auth',
      partialize: (state) => ({ user: state.user }),
    }
  )
);