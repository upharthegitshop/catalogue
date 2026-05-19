import { supabase, isSupabaseConfigured } from './supabase';
import { DUMMY_PRODUCTS } from '../data/products';
import type { Product } from '../types';

// Local storage key for fallback mode
const LOCAL_STORAGE_KEY = 'uphar_products';

// Get products from local storage (fallback mode)
const getLocalProducts = (): Product[] => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with dummy data
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DUMMY_PRODUCTS));
  return DUMMY_PRODUCTS;
};

// Save products to local storage (fallback mode)
const saveLocalProducts = (products: Product[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(products));
};

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return getLocalProducts();
    }

    return data.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      image_url: p.image_url,
      costPrice: p.cost_price,
      sellingPrice: p.selling_price,
      quantity: p.quantity,
      tags: p.tags || [],
    }));
  }

  return getLocalProducts();
};

// Fetch single product by ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      image_url: data.image_url,
      costPrice: data.cost_price,
      sellingPrice: data.selling_price,
      quantity: data.quantity,
    };
  }

  const products = getLocalProducts();
  return products.find((p) => p.id === id) || null;
};

// Add new product
export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product | null> => {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from('products')
      .insert({
        name: product.name,
        description: product.description,
        image_url: product.image_url,
        cost_price: product.costPrice,
        selling_price: product.sellingPrice,
        quantity: product.quantity,
        tags: product.tags || [],
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding product:', error);
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      image_url: data.image_url,
      costPrice: data.cost_price,
      sellingPrice: data.selling_price,
      quantity: data.quantity,
      tags: data.tags || [],
    };
  }

  // Fallback: save to local storage
  const products = getLocalProducts();
  const newProduct: Product = {
    id: String(Date.now()),
    ...product,
  };
  products.unshift(newProduct);
  saveLocalProducts(products);
  return newProduct;
};

// Update existing product
export const updateProduct = async (id: string, updates: Partial<Omit<Product, 'id'>>): Promise<Product | null> => {
  if (isSupabaseConfigured() && supabase) {
    const supabaseUpdates: Record<string, unknown> = {};
    if (updates.name !== undefined) supabaseUpdates.name = updates.name;
    if (updates.description !== undefined) supabaseUpdates.description = updates.description;
    if (updates.image_url !== undefined) supabaseUpdates.image_url = updates.image_url;
    if (updates.costPrice !== undefined) supabaseUpdates.cost_price = updates.costPrice;
    if (updates.sellingPrice !== undefined) supabaseUpdates.selling_price = updates.sellingPrice;
    if (updates.quantity !== undefined) supabaseUpdates.quantity = updates.quantity;
    if (updates.tags !== undefined) supabaseUpdates.tags = updates.tags;

    const { data, error } = await supabase
      .from('products')
      .update(supabaseUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return null;
    }

    return {
      id: data.id,
      name: data.name,
      description: data.description,
      image_url: data.image_url,
      costPrice: data.cost_price,
      sellingPrice: data.selling_price,
      quantity: data.quantity,
    };
  }

  // Fallback: update local storage
  const products = getLocalProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...updates };
  saveLocalProducts(products);
  return products[index];
};

// Delete product
export const deleteProduct = async (id: string): Promise<boolean> => {
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return false;
    }
    return true;
  }

  // Fallback: delete from local storage
  const products = getLocalProducts();
  const filtered = products.filter((p) => p.id !== id);
  saveLocalProducts(filtered);
  return true;
};

// ============ TAGS ============

const TAGS_STORAGE_KEY = 'uphar_tags';
const DEFAULT_TAGS = ['Birthday', 'Anniversary', 'Self Care', 'Luxury', 'Hampers', 'Personalized'];

// Get tags from local storage
const getLocalTags = (): string[] => {
  const stored = localStorage.getItem(TAGS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(DEFAULT_TAGS));
  return DEFAULT_TAGS;
};

// Save tags to local storage
const saveLocalTags = (tags: string[]) => {
  localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(tags));
};

// Fetch all tags
export const fetchTags = async (): Promise<string[]> => {
  if (isSupabaseConfigured() && supabase) {
    const { data, error } = await supabase
      .from('tags')
      .select('name')
      .order('name');

    if (error) {
      console.error('Error fetching tags:', error);
      return getLocalTags();
    }

    return data.map((t) => t.name);
  }

  return getLocalTags();
};

// Add new tag
export const addTag = async (name: string): Promise<boolean> => {
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase
      .from('tags')
      .insert({ name });

    if (error) {
      console.error('Error adding tag:', error);
      return false;
    }
    return true;
  }

  const tags = getLocalTags();
  if (!tags.includes(name)) {
    tags.push(name);
    saveLocalTags(tags);
  }
  return true;
};

// Delete tag
export const deleteTag = async (name: string): Promise<boolean> => {
  if (isSupabaseConfigured() && supabase) {
    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('name', name);

    if (error) {
      console.error('Error deleting tag:', error);
      return false;
    }
    return true;
  }

  const tags = getLocalTags();
  const filtered = tags.filter((t) => t !== name);
  saveLocalTags(filtered);
  return true;
};
