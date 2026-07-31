import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Ruler, 
  Sparkles, 
  X, 
  Menu,
  ChevronDown,
  PhoneCall,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { ProductCategory, ClothingSize } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSizeAdvisor: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedSize: ClothingSize | null;
  onSelectSize: (size: ClothingSize | null) => void;
  cartTotal: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSizeAdvisor,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedSize,
  onSelectSize,
  cartTotal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'الكل' },
    { id: 'dresses', label: 'فساتين' },
    { id: 'abayas', label: 'عبايات وجلابيات' },
    { id: 'tops', label: 'بلوزات وقمصان' },
    { id: 'bottoms', label: 'تنانير وبنطلونات' },
    { id: 'outerwear', label: 'معاطف وسترات' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-rose-100/60 transition-all">
      {/* Top Banner */}
      <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 text-center flex justify-between items-center overflow-x-auto whitespace-nowrap gap-4">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>توصيل مجاني للطلبات فوق 300 ريال سعودي</span>
          <span className="hidden md:inline text-stone-500">|</span>
          <span className="hidden md:inline text-amber-300 font-medium">خصم 20% بكود: VELVERA20</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-stone-300 text-xs">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            ضمان جودة الخامات 100%
          </span>
          <span>خدمة العملاء: 800-890-0099</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Menu Toggle & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-stone-100 transition-colors"
              aria-label="قائمة التصفح"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex flex-col">
              <span className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 font-['Alexandria'] flex items-center gap-1">
                ڤيلفيرا
                <span className="inline-block w-2 h-2 rounded-full bg-rose-500 mb-3"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] text-stone-500 tracking-wider font-sans uppercase -mt-1">
                VELVERA LUXURY FASHION
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="ابحثي عن فستان، حبات حرير، كتان، أو عباية..."
                className="w-full bg-stone-50 border border-stone-200 rounded-full py-2.5 pr-10 pl-10 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50 focus:border-rose-400 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute left-3 top-3 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons: Smart Size Advisor, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Smart Size Finder Button */}
            <button
              onClick={onOpenSizeAdvisor}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-50 text-rose-900 hover:bg-rose-100 text-xs font-semibold border border-rose-200/60 transition-all shadow-2xs hover:shadow-xs"
              title="احسبي مقاسك بدقة"
            >
              <Ruler className="w-4 h-4 text-rose-600" />
              <span>دليل المقاس الذكي</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-full text-stone-700 hover:bg-stone-100 transition-colors"
              title="المفضلة"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white transition-all shadow-sm hover:shadow-md"
              title="سلة التسوق"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-rose-200" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-right text-xs">
                <span className="text-[10px] text-stone-400 leading-none">السلة</span>
                <span className="font-bold text-amber-300 leading-snug">{cartTotal} ر.س</span>
              </div>
            </button>
          </div>
        </div>

        {/* Search Bar Mobile */}
        <div className="md:hidden mt-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحثي في الملابس والأقمشة والقياسات..."
              className="w-full bg-stone-50 border border-stone-200 rounded-full py-2 pr-9 pl-9 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-rose-400/50"
            />
            <Search className="w-4 h-4 text-stone-400 absolute right-3 top-2.5" />
          </div>
        </div>

        {/* Categories Navbar Navigation */}
        <nav className="hidden lg:flex items-center justify-between border-t border-stone-100 mt-3 pt-2.5 text-sm font-medium">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-rose-900 text-white shadow-xs'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="text-stone-400 font-normal">نوعيات فاخرة:</span>
            <span className="bg-amber-50 text-amber-900 border border-amber-200/60 px-2.5 py-0.5 rounded-md font-medium">
              حرير 100%
            </span>
            <span className="bg-stone-100 text-stone-800 px-2.5 py-0.5 rounded-md font-medium">
              كشمير
            </span>
            <span className="bg-stone-100 text-stone-800 px-2.5 py-0.5 rounded-md font-medium">
              كتان إيطالي
            </span>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-3 animate-in fade-in slide-in-from-top-2">
          <div className="text-xs font-bold text-stone-400 px-2">الفئات الرئيسية</div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-right text-xs font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-rose-900 text-white font-bold'
                    : 'bg-stone-50 text-stone-800 hover:bg-stone-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-100">
            <button
              onClick={() => {
                onOpenSizeAdvisor();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-rose-50 text-rose-900 rounded-xl font-bold text-xs border border-rose-200"
            >
              <Ruler className="w-4 h-4 text-rose-600" />
              <span>دليل حاسبة المقاسات الذكي</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
