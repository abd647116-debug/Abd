export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL';

export type QualityMaterial = 
  | 'حرير طبيعي' 
  | 'كشمير فاخر' 
  | 'كتان إيطالي' 
  | 'قطن 100%' 
  | 'مخمل ملكي' 
  | 'شيفون ناعم' 
  | 'صوف ناعم' 
  | 'دانتيل فرنسي';

export type QualityGrade = 
  | 'درجة أولى (Premium)' 
  | 'فاخر للغاية (Luxury)' 
  | 'طبيعي 100%' 
  | 'صناعة يدوية (Handmade)';

export type ProductCategory = 'all' | 'dresses' | 'abayas' | 'tops' | 'bottoms' | 'outerwear' | 'loungewear';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface SizeMeasurement {
  size: ClothingSize;
  bustCm: number;  // الصدر
  waistCm: number; // الخصر
  hipsCm: number;  // الأوراك
  lengthCm: number; // الطول
}

export interface ProductReview {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  purchasedSize: ClothingSize;
  purchasedColor: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  price: number;
  originalPrice?: number;
  sizes: ClothingSize[];
  qualityMaterial: QualityMaterial;
  qualityGrade: QualityGrade;
  colors: ProductColor[];
  images: string[];
  description: string;
  features: string[];
  careInstructions: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  stockCount: number;
  sizeGuide: SizeMeasurement[];
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string; // unique item id (productId + size + colorName)
  product: Product;
  selectedSize: ClothingSize;
  selectedColor: ProductColor;
  quantity: number;
}

export interface FilterState {
  category: ProductCategory;
  selectedSizes: ClothingSize[];
  priceRange: [number, number];
  selectedMaterials: QualityMaterial[];
  selectedQualityGrades: QualityGrade[];
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  inStockOnly: boolean;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
}

export interface OrderInvoice {
  orderId: string;
  date: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'apple_pay' | 'cod';
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  shippingFee: number;
  total: number;
  status: 'تم التأكيد' | 'قيد التحضير' | 'جاري الشحن';
}
