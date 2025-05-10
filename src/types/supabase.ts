export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          email: string
          created_at: string
        }
        Insert: {
          id: string
          username: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          gender: string
          size: string
          price: number
          condition: string
          seller_id: string
          seller_phone: string
          images: string[]
          created_at: string
          sold: boolean
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          gender: string
          size: string
          price: number
          condition: string
          seller_id: string
          seller_phone: string
          images: string[]
          created_at?: string
          sold?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          gender?: string
          size?: string
          price?: number
          condition?: string
          seller_id?: string
          seller_phone?: string
          images?: string[]
          created_at?: string
          sold?: boolean
        }
      }
      ratings: {
        Row: {
          id: string
          user_id: string
          product_id: string
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          rating: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          rating?: number
          created_at?: string
        }
      }
    }
  }
}