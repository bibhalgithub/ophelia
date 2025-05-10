import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Product, Gender, Category } from '../types';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  error: string | null;
  selectedGender: Gender | null;
  selectedCategory: Category | null;
  fetchProducts: () => Promise<void>;
  filterProducts: (gender: Gender | null, category: Category | null) => void;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'sold'>, files: File[]) => Promise<string | null>;
  markAsSold: (productId: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  isLoading: false,
  error: null,
  selectedGender: null,
  selectedCategory: null,
  
  fetchProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      set({ 
        products: data as Product[], 
        filteredProducts: data as Product[]
      });
      
      // Apply existing filters if any
      const { selectedGender, selectedCategory } = get();
      if (selectedGender || selectedCategory) {
        get().filterProducts(selectedGender, selectedCategory);
      }
      
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
  
  filterProducts: (gender, category) => {
    const { products } = get();
    
    set({ selectedGender: gender, selectedCategory: category });
    
    let filtered = [...products];
    
    if (gender) {
      filtered = filtered.filter(product => product.gender === gender);
    }
    
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    set({ filteredProducts: filtered });
  },
  
  addProduct: async (newProduct, files) => {
    try {
      set({ isLoading: true, error: null });
      
      const imageUrls: string[] = [];
      
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `uploads/${fileName}`; // Optional subfolder for organization
        
        const { error: uploadError } = await supabase.storage
          .from('product-images') // Using hyphen instead of underscore
          .upload(filePath, file);
        
        if (uploadError) throw uploadError;
        
        const { data: publicUrlData } = supabase.storage
          .from('product-images') // Using hyphen instead of underscore
          .getPublicUrl(filePath);
        
        if (!publicUrlData.publicUrl) {
          throw new Error('Failed to get public URL for uploaded image');
        }
        
        imageUrls.push(publicUrlData.publicUrl);
      }
      
      const { data, error } = await supabase
        .from('products')
        .insert({
          ...newProduct,
          images: imageUrls,
          sold: false,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      set(state => ({
        products: [data as Product, ...state.products],
        filteredProducts: get().selectedGender || get().selectedCategory 
          ? get().filteredProducts 
          : [data as Product, ...state.products],
      }));
      
      return data?.id || null;
      
    } catch (error) {
      set({ error: (error as Error).message });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
  
  markAsSold: async (productId) => {
    try {
      set({ isLoading: true, error: null });
      
      const { error } = await supabase
        .from('products')
        .update({ sold: true })
        .eq('id', productId);
      
      if (error) throw error;
      
      set(state => ({
        products: state.products.map(product => 
          product.id === productId ? { ...product, sold: true } : product
        ),
        filteredProducts: state.filteredProducts.map(product => 
          product.id === productId ? { ...product, sold: true } : product
        ),
      }));
      
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isLoading: false });
    }
  },
}));