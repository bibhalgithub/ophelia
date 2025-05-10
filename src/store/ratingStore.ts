import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface RatingState {
  isLoading: boolean;
  error: string | null;
  addRating: (userId: string, productId: string, rating: number) => Promise<void>;
}

export const useRatingStore = create<RatingState>((set) => ({
  isLoading: false,
  error: null,
  
  addRating: async (userId, productId, rating) => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase
        .from('ratings')
        .insert({
          user_id: userId,
          product_id: productId,
          rating,
        });
      
      if (error) throw error;
      
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));