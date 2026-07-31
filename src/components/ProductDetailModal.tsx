import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Ruler, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { Product, ClothingSize, ProductColor } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCartWithSize: (product: Product, size: ClothingSize, color: ProductColor, qty: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenSizeAdvisor: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCartWithSize,
  isWishlisted,
  onToggleWishlist,
  onOpenSizeAdvisor
}) => {
  if (!isOpen || !product) return null;

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ClothingSize>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'افتراضي', hex: '#000000' });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'sizeChart' | 'care' | 'reviews'>('details');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAddToCart = () => {
    onAddToCartWithSize(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 text-right">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-stone-100 relative animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2.5 rounded-full bg-white/90 text-stone-700 hover:bg-stone-100 hover:text-stone-900 shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Gallery Column */}
            <div className="space-y-4">
              {/* Main Image Stage */}
              <div className="relative aspect-3/4 rounded-2xl bg-stone-100 overflow-hidden shadow-inner border border-stone-200/60">
                <img
                  src={product.images[selectedImgIndex] || product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                
                {/* Material Pill Overlay */}
                <div className="absolute bottom-4 right-4 bg-stone-900/85 backdrop-blur-md text-stone-100 text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 shadow-md">
                  ✨ {product.qualityMaterial} ({product.qualityGrade})
                </div>

                {/* Left/Right image arrows if multiple */}
                {product.images.length > 1 && (
                  <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
                    <button
                      onClick={() => setSelectedImgIndex((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                      className="p-2 rounded-full bg-white/80 text-stone-900 hover:bg-white pointer-events-auto shadow-md"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedImgIndex((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                      className="p-2 rounded-full bg-white/80 text-stone-900 hover:bg-white pointer-events-auto shadow-md"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Image Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto py-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`relative w-20 aspect-3/4 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImgIndex === idx
                          ? 'border-rose-900 ring-2 ring-rose-900/30'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Specs & Ordering Column */}
            <div className="space-y-6">
              
              {/* Category & Title */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/50">
                    {product.categoryName}
                  </span>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{product.rating}</span>
                    <span className="text-stone-400 font-normal">({product.reviewCount} تقييم)</span>
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-stone-900 leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price & Discount */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 block mb-0.5">السعر النهائي المعروض:</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-extrabold text-stone-900">
                      {product.price} <span className="text-sm font-normal text-stone-600">ريال سعودي</span>
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-stone-400 line-through">
                        {product.originalPrice} ر.س
                      </span>
                    )}
                  </div>
                </div>

                {product.originalPrice && (
                  <span className="bg-emerald-100 text-emerald-900 text-xs font-extrabold px-3 py-1.5 rounded-full border border-emerald-300">
                    وفرتِ {product.originalPrice - product.price} ر.س!
                  </span>
                )}
              </div>

              {/* Size Selector (الفئة المحددة حسب القياس) */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    <Ruler className="w-4 h-4 text-rose-600" />
                    <span>اختر القياس المناسب:</span>
                  </label>
                  <button
                    onClick={onOpenSizeAdvisor}
                    className="text-xs text-rose-700 font-bold hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    حاسبة مقاسك الذكية
                  </button>
                </div>

                <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                  {product.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          isSelected
                            ? 'bg-stone-900 text-amber-300 border-stone-900 shadow-md ring-2 ring-stone-900/20'
                            : 'bg-white text-stone-800 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
                
                <p className="text-[11px] text-stone-500 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-stone-400" />
                  المقاس المختار: <strong className="text-stone-900">{selectedSize}</strong> (متوفر في المستودع وجاهز للشحن الفوري)
                </p>
              </div>

              {/* Color Selector */}
              {product.colors.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-900">اختر اللون المفصل:</label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((clr) => {
                      const isSelected = selectedColor.name === clr.name;
                      return (
                        <button
                          key={clr.name}
                          onClick={() => setSelectedColor(clr)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all ${
                            isSelected
                              ? 'border-rose-900 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-900/20'
                              : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          <span 
                            className="w-3.5 h-3.5 rounded-full border border-stone-300 shadow-inner"
                            style={{ backgroundColor: clr.hex }}
                          />
                          <span>{clr.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Picker & Add to Cart */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-white text-stone-700 hover:bg-stone-200 font-bold text-sm flex items-center justify-center shadow-xs"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded-lg bg-white text-stone-700 hover:bg-stone-200 font-bold text-sm flex items-center justify-center shadow-xs"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                    addedSuccess
                      ? 'bg-emerald-700 text-white'
                      : 'bg-rose-950 hover:bg-rose-900 text-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-5 h-5 text-emerald-300 animate-bounce" />
                      <span>تمت إضافة المقاس ({selectedSize}) إلى السلة!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 text-amber-300" />
                      <span>إضافة المقاس ({selectedSize}) لسلة التسوق</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-300 text-rose-600 shadow-xs'
                      : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                  title="حفظ في المفضلة"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Tab Navigation (تفاصيل الخامة / جدول القياسات / التقييمات) */}
              <div className="border-t border-stone-200 pt-4">
                <div className="flex border-b border-stone-200 gap-4 text-xs font-bold text-stone-600 mb-3">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'details' ? 'text-rose-950 border-b-2 border-rose-950' : 'hover:text-stone-900'
                    }`}
                  >
                    مواصفات الخامة والقصة
                  </button>
                  <button
                    onClick={() => setActiveTab('sizeChart')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'sizeChart' ? 'text-rose-950 border-b-2 border-rose-950' : 'hover:text-stone-900'
                    }`}
                  >
                    جدول مقاسات القطعة
                  </button>
                  <button
                    onClick={() => setActiveTab('care')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'care' ? 'text-rose-950 border-b-2 border-rose-950' : 'hover:text-stone-900'
                    }`}
                  >
                    إرشادات العناية
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2 transition-colors relative ${
                      activeTab === 'reviews' ? 'text-rose-950 border-b-2 border-rose-950' : 'hover:text-stone-900'
                    }`}
                  >
                    التقييمات ({product.reviews?.length || 0})
                  </button>
                </div>

                {/* Tab 1: Details */}
                {activeTab === 'details' && (
                  <div className="space-y-3 text-xs text-stone-700 leading-relaxed">
                    <p>{product.description}</p>
                    <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60 space-y-1.5">
                      <span className="font-bold text-amber-900 block">مميزات القماش والتصنيع:</span>
                      <ul className="list-disc list-inside space-y-1 text-stone-700">
                        {product.features.map((ft, idx) => (
                          <li key={idx}>{ft}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Tab 2: Size Chart */}
                {activeTab === 'sizeChart' && (
                  <div className="space-y-2">
                    <div className="text-xs text-stone-600 font-medium mb-2">
                      أبعاد القطعة بالسنتمتر (CM):
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-center border-collapse">
                        <thead>
                          <tr className="bg-stone-100 text-stone-900 font-bold border-b border-stone-200">
                            <th className="p-2 text-right">القياس</th>
                            <th className="p-2">الصدر</th>
                            <th className="p-2">الخصر</th>
                            <th className="p-2">الأوراك</th>
                            <th className="p-2">الطول</th>
                          </tr>
                        </thead>
                        <tbody>
                          {product.sizeGuide.map((sg) => (
                            <tr
                              key={sg.size}
                              className={`border-b border-stone-100 ${
                                selectedSize === sg.size ? 'bg-rose-50 font-bold text-rose-950' : 'hover:bg-stone-50'
                              }`}
                            >
                              <td className="p-2 font-bold text-right">{sg.size}</td>
                              <td className="p-2">{sg.bustCm || '-'} سم</td>
                              <td className="p-2">{sg.waistCm || '-'} سم</td>
                              <td className="p-2">{sg.hipsCm || '-'} سم</td>
                              <td className="p-2">{sg.lengthCm || '-'} سم</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Tab 3: Care Instructions */}
                {activeTab === 'care' && (
                  <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-700 border border-stone-200 space-y-2">
                    <span className="font-bold text-stone-900 block">طريقة الغسيل والحفظ:</span>
                    <p>{product.careInstructions}</p>
                  </div>
                )}

                {/* Tab 4: Reviews */}
                {activeTab === 'reviews' && (
                  <div className="space-y-3">
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((rev) => (
                        <div key={rev.id} className="p-3 bg-stone-50 rounded-xl text-xs border border-stone-200 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-stone-900">{rev.userName}</span>
                            <div className="flex items-center gap-1 text-amber-500">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              <span>{rev.rating}/5</span>
                            </div>
                          </div>
                          <p className="text-stone-700">{rev.comment}</p>
                          <div className="text-[10px] text-stone-400">
                            مقاس الشراء: {rev.purchasedSize} | {rev.date}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-stone-500 py-4 text-center">
                        لا تتوفر تقييمات مكتوبة لهذه القطعة بعد. كن أول من يقيم!
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-stone-600 pt-2 border-t border-stone-100">
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/60">
                  <Truck className="w-4 h-4 text-stone-700 mx-auto mb-1" />
                  <span>توصيل خلال 2-4 أيام</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/60">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <span>خامة مضمونة 100%</span>
                </div>
                <div className="p-2 rounded-xl bg-stone-50 border border-stone-200/60">
                  <RotateCcw className="w-4 h-4 text-rose-600 mx-auto mb-1" />
                  <span>استبدال مقاس خلال 14 يوم</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
