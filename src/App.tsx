import React, { useState, useMemo } from 'react';
import { 
  FilterState, 
  Product, 
  CartItem, 
  ClothingSize, 
  QualityMaterial, 
  ProductCategory, 
  ProductColor 
} from './types';
import { PRODUCTS_DATA } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FilterSidebar } from './components/FilterSidebar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SmartSizeAdvisorModal } from './components/SmartSizeAdvisorModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { CheckoutModal } from './components/CheckoutModal';
import { FeaturesBar } from './components/FeaturesBar';
import { 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Grid, 
  ListFilter,
  PackageX,
  Heart,
  ShoppingBag
} from 'lucide-react';

export default function App() {
  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    selectedSizes: [],
    priceRange: [0, 1500],
    selectedMaterials: [],
    selectedQualityGrades: [],
    searchQuery: '',
    sortBy: 'featured',
    inStockOnly: false
  });

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Modals & Drawers State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSizeAdvisorOpen, setIsSizeAdvisorOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filtered & Sorted Products computation
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // 1. Category
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false;
      }

      // 2. Sizes (حسب القياس)
      if (filters.selectedSizes.length > 0) {
        const hasMatchingSize = filters.selectedSizes.some((sz) =>
          product.sizes.includes(sz)
        );
        if (!hasMatchingSize) return false;
      }

      // 3. Price (حسب السعر)
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }

      // 4. Material / Quality (حسب النوعية والخامة)
      if (filters.selectedMaterials.length > 0) {
        if (!filters.selectedMaterials.includes(product.qualityMaterial)) {
          return false;
        }
      }

      // 5. Quality Grade (درجة الجودة)
      if (filters.selectedQualityGrades.length > 0) {
        if (!filters.selectedQualityGrades.includes(product.qualityGrade)) {
          return false;
        }
      }

      // 6. Search Query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesMaterial = product.qualityMaterial.toLowerCase().includes(query);
        const matchesCategory = product.categoryName.toLowerCase().includes(query);
        const matchesDescription = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesMaterial && !matchesCategory && !matchesDescription) {
          return false;
        }
      }

      // 7. In stock only
      if (filters.inStockOnly && product.stockCount <= 0) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured
    });
  }, [filters]);

  // Cart operations
  const handleAddToCartQuick = (product: Product) => {
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0] || { name: 'افتراضي', hex: '#000000' };
    handleAddToCartWithSize(product, defaultSize, defaultColor, 1);
  };

  const handleAddToCartWithSize = (
    product: Product,
    size: ClothingSize,
    color: ProductColor,
    qty: number
  ) => {
    const itemId = `${product.id}-${size}-${color.name}`;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity: qty,
          },
        ];
      }
    });
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleApplyDiscountCode = (code: string) => {
    setDiscountCode(code);
    const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    if (code === 'VELVERA20' || code === 'ELEGANCE20') {
      setDiscountAmount(Math.round(cartSubtotal * 0.2));
    } else if (code === 'FREE100') {
      setDiscountAmount(25);
    }
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Quick Filter remove helpers
  const removeSizeFilter = (size: ClothingSize) => {
    setFilters((prev) => ({
      ...prev,
      selectedSizes: prev.selectedSizes.filter((s) => s !== size),
    }));
  };

  const removeMaterialFilter = (mat: QualityMaterial) => {
    setFilters((prev) => ({
      ...prev,
      selectedMaterials: prev.selectedMaterials.filter((m) => m !== mat),
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800">
      
      {/* Main Navbar */}
      <Navbar
        cartCount={cartItemCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSizeAdvisor={() => setIsSizeAdvisorOpen(true)}
        searchQuery={filters.searchQuery}
        onSearchChange={(q) => setFilters({ ...filters, searchQuery: q })}
        selectedCategory={filters.category}
        onSelectCategory={(cat) => setFilters({ ...filters, category: cat })}
        selectedSize={filters.selectedSizes[0] || null}
        onSelectSize={(sz) =>
          setFilters({ ...filters, selectedSizes: sz ? [sz] : [] })
        }
        cartTotal={cartSubtotal}
      />

      {/* App Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Hero Promotional Banner */}
        <HeroBanner
          onOpenSizeAdvisor={() => setIsSizeAdvisorOpen(true)}
          onFilterSize={(sz) => setFilters({ ...filters, selectedSizes: [sz] })}
          onFilterMaterial={(mat) =>
            setFilters({ ...filters, selectedMaterials: [mat] })
          }
        />

        {/* Toolbar Header Above Grid */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-stone-200/80 shadow-2xs">
          
          {/* Active Title / Results Count */}
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              تصفح التشكيلة المتاحة
              <span className="text-xs font-semibold bg-rose-50 text-rose-900 px-2.5 py-0.5 rounded-full border border-rose-200/50">
                {filteredProducts.length} قطعة
              </span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              استخدمي الفلاتر الجانبية لتصفية المعروضات حسب قياسك المحدد، ميزانيتك، ونوعية القماش.
            </p>
          </div>

          {/* Right Controls: Sort Dropdown & Mobile Filter Toggle */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 bg-stone-900 text-amber-300 rounded-xl text-xs font-bold"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>تصفية النتائج</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-medium whitespace-nowrap hidden md:inline">ترتيب حسب:</span>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as any })
                }
                className="bg-stone-50 border border-stone-200 text-stone-900 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-rose-400"
              >
                <option value="featured">الأكثر ملاءمة (المُميّز)</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="rating">الأعلى تقييماً</option>
                <option value="newest">القطع الأحدث وصل حديثاً</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters Chips Bar */}
        {(filters.selectedSizes.length > 0 ||
          filters.selectedMaterials.length > 0 ||
          filters.category !== 'all' ||
          filters.priceRange[0] > 0 ||
          filters.priceRange[1] < 1500) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-stone-100/70 rounded-2xl border border-stone-200/60 text-xs">
            <span className="text-stone-500 font-bold ml-1">الفلاتر النشطة:</span>

            {/* Category Chip */}
            {filters.category !== 'all' && (
              <span className="inline-flex items-center gap-1.5 bg-rose-900 text-white font-semibold px-3 py-1 rounded-full shadow-2xs">
                الفئة: {filters.category}
                <button
                  onClick={() => setFilters({ ...filters, category: 'all' })}
                  className="hover:text-amber-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Sizes Chips */}
            {filters.selectedSizes.map((sz) => (
              <span
                key={sz}
                className="inline-flex items-center gap-1.5 bg-stone-900 text-amber-300 font-bold px-3 py-1 rounded-full shadow-2xs"
              >
                قياس: {sz}
                <button onClick={() => removeSizeFilter(sz)} className="hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}

            {/* Materials Chips */}
            {filters.selectedMaterials.map((mat) => (
              <span
                key={mat}
                className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-950 border border-amber-300 font-bold px-3 py-1 rounded-full shadow-2xs"
              >
                خامة: {mat}
                <button onClick={() => removeMaterialFilter(mat)} className="hover:text-rose-700">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}

            {/* Price Chip */}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1500) && (
              <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-950 border border-emerald-300 font-bold px-3 py-1 rounded-full shadow-2xs">
                السعر: {filters.priceRange[0]} - {filters.priceRange[1]} ر.س
                <button
                  onClick={() => setFilters({ ...filters, priceRange: [0, 1500] })}
                  className="hover:text-rose-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}

            {/* Reset All */}
            <button
              onClick={() =>
                setFilters({
                  category: 'all',
                  selectedSizes: [],
                  priceRange: [0, 1500],
                  selectedMaterials: [],
                  selectedQualityGrades: [],
                  searchQuery: '',
                  sortBy: 'featured',
                  inStockOnly: false,
                })
              }
              className="text-xs text-rose-700 hover:underline font-bold mr-auto"
            >
              مسح كافة الفلاتر
            </button>
          </div>
        )}

        {/* Main 2-Column Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-1 sticky top-28">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              totalResults={filteredProducts.length}
              onOpenSizeAdvisor={() => setIsSizeAdvisorOpen(true)}
            />
          </div>

          {/* Mobile Filter Drawer Overlay */}
          {mobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-stone-900/75 backdrop-blur-sm p-4 overflow-y-auto flex items-center justify-center">
              <div className="bg-white w-full max-w-lg rounded-3xl p-4 space-y-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                  <span className="font-bold text-sm text-stone-900">تصفية نتائج البحث</span>
                  <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-stone-500">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  totalResults={filteredProducts.length}
                  onOpenSizeAdvisor={() => {
                    setMobileFilterOpen(false);
                    setIsSizeAdvisorOpen(true);
                  }}
                />
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 bg-stone-900 text-white font-bold rounded-xl text-xs"
                >
                  تطبيق الفلاتر ومعاينة النتائج ({filteredProducts.length})
                </button>
              </div>
            </div>
          )}

          {/* Products Catalog Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <PackageX className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-stone-800">لا توجد قطع تطابق الفلاتر المحددة</h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  جربي توسيع نطاق السعر أو اختيار قياسات وخامات إضافية لرؤية التشكيلات المتوفرة لدينا.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      category: 'all',
                      selectedSizes: [],
                      priceRange: [0, 1500],
                      selectedMaterials: [],
                      selectedQualityGrades: [],
                      searchQuery: '',
                      sortBy: 'featured',
                      inStockOnly: false,
                    })
                  }
                  className="px-6 py-2.5 rounded-full bg-stone-900 text-amber-300 text-xs font-bold hover:bg-stone-800 transition-colors shadow-xs"
                >
                  إلغاء تصفية النتائج
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.some((w) => w.id === product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={(p) => {
                      setSelectedProduct(p);
                      setIsDetailModalOpen(true);
                    }}
                    onAddToCart={handleAddToCartQuick}
                  />
                ))}
              </div>
            )}

            {/* Features Bar */}
            <FeaturesBar />
          </div>

        </div>

      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onAddToCartWithSize={handleAddToCartWithSize}
        isWishlisted={selectedProduct ? wishlist.some((w) => w.id === selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenSizeAdvisor={() => {
          setIsDetailModalOpen(false);
          setIsSizeAdvisorOpen(true);
        }}
      />

      {/* Smart Size Advisor Modal */}
      <SmartSizeAdvisorModal
        isOpen={isSizeAdvisorOpen}
        onClose={() => setIsSizeAdvisorOpen(false)}
        onApplySizeFilter={(recommendedSize) => {
          setFilters({ ...filters, selectedSizes: [recommendedSize] });
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => setIsCheckoutOpen(true)}
        subtotal={cartSubtotal}
        discountCode={discountCode}
        onApplyDiscountCode={handleApplyDiscountCode}
        discountAmount={discountAmount}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onQuickViewProduct={(prod) => {
          setSelectedProduct(prod);
          setIsDetailModalOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        subtotal={cartSubtotal}
        discountAmount={discountAmount}
        onOrderComplete={() => setCart([])}
      />

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 text-xs border-t border-stone-800 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-right">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-3">
              <span className="text-2xl font-bold text-white font-['Alexandria'] block">
                ڤيلفيرا VELVERA
              </span>
              <p className="text-stone-400 text-xs leading-relaxed">
                وجهتك الأولى للأزياء والملابس النسائية الفاخرة مصنفة بدقة حسب القياس، السعر، ونوعية الأقمشة والخامات.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">تصنيفات القياسات:</h4>
              <ul className="space-y-1 text-stone-400">
                <li><button onClick={() => setFilters({ ...filters, selectedSizes: ['S'] })} className="hover:text-amber-300">مقاسات S / سمول</button></li>
                <li><button onClick={() => setFilters({ ...filters, selectedSizes: ['M'] })} className="hover:text-amber-300">مقاسات M / ميديوم</button></li>
                <li><button onClick={() => setFilters({ ...filters, selectedSizes: ['L'] })} className="hover:text-amber-300">مقاسات L / لارج</button></li>
                <li><button onClick={() => setFilters({ ...filters, selectedSizes: ['XL', 'XXL', '3XL'] })} className="hover:text-amber-300">القياسات الممتدة Plus Size</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm">نوعية الخامات والأقمشة:</h4>
              <ul className="space-y-1 text-stone-400">
                <li><button onClick={() => setFilters({ ...filters, selectedMaterials: ['حرير طبيعي'] })} className="hover:text-amber-300">حرير التوت الطبيعي 100%</button></li>
                <li><button onClick={() => setFilters({ ...filters, selectedMaterials: ['كشمير فاخر'] })} className="hover:text-amber-300">صوف الكشمير الجبلي</button></li>
                <li><button onClick={() => setFilters({ ...filters, selectedMaterials: ['كتان إيطالي'] })} className="hover:text-amber-300">الكتان الإيطالي البارد</button></li>
                <li><button onClick={() => setFilters({ ...filters, selectedMaterials: ['مخمل ملكي'] })} className="hover:text-amber-300">المخمل القطيفي الملكي</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm">وسائل الدفع والتحصيل الآمن:</h4>
              <div className="flex flex-wrap gap-2 text-stone-400">
                <span className="bg-stone-800 px-3 py-1 rounded border border-stone-700 font-bold text-amber-300">مدى mada</span>
                <span className="bg-stone-800 px-3 py-1 rounded border border-stone-700 font-bold text-white">VISA</span>
                <span className="bg-stone-800 px-3 py-1 rounded border border-stone-700 font-bold text-white">Mastercard</span>
                <span className="bg-stone-800 px-3 py-1 rounded border border-stone-700 font-bold text-white"> Pay</span>
              </div>
            </div>

          </div>

          <div className="pt-6 border-t border-stone-800 text-center text-stone-500 text-xs">
            جميع الحقوق محفوظة © 2026 متجر فيلفيرا للأزياء النسائية والملابس الفاخرة VELVERA.
          </div>
        </div>
      </footer>

    </div>
  );
}
