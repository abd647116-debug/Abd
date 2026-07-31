import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group bg-white rounded-2xl border border-stone-200/70 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer relative"
    >
      {/* Product Image Stage */}
      <div 
        className="relative aspect-3/4 w-full bg-stone-100 overflow-hidden"
        onMouseEnter={() => product.images.length > 1 && setCurrentImgIndex(1)}
        onMouseLeave={() => setCurrentImgIndex(0)}
      >
        <img
          src={product.images[currentImgIndex] || product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Badges Top Left & Right */}
        <div className="absolute top-3 right-3 left-3 flex items-start justify-between pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            {discountPercent > 0 && (
              <span className="bg-rose-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                خصم {discountPercent}%-
              </span>
            )}
            {product.isNew && (
              <span className="bg-amber-400 text-stone-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> جديد
              </span>
            )}
            {product.isBestSeller && (
              <span className="bg-stone-900 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                الأكثر مبيعاً
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`p-2.5 rounded-full backdrop-blur-md transition-all pointer-events-auto ${
              isWishlisted
                ? 'bg-rose-500 text-white shadow-md scale-110'
                : 'bg-white/80 text-stone-700 hover:bg-white hover:text-rose-600 shadow-xs'
            }`}
            title="إضافة للمفضلة"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quality Material Badge Overlay Bottom */}
        <div className="absolute bottom-3 right-3 pointer-events-none">
          <span className="bg-stone-900/80 backdrop-blur-md text-stone-100 text-[10px] font-semibold px-2.5 py-1 rounded-lg border border-white/20">
            ✨ {product.qualityMaterial}
          </span>
        </div>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-4 bottom-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2 bg-white/95 backdrop-blur-md text-stone-900 rounded-xl text-xs font-bold shadow-md hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            معاينة سريعة التفاصيل
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Quality Tier */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
            <span>{product.categoryName}</span>
            <span className="text-amber-700 font-medium bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">
              {product.qualityGrade}
            </span>
          </div>

          {/* Product Title */}
          <h3 className="text-stone-900 font-bold text-sm leading-snug line-clamp-2 group-hover:text-rose-950 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Available Sizes List */}
        <div className="space-y-1">
          <div className="text-[10px] text-stone-400">القياسات المتوفرة:</div>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((sz) => (
              <span
                key={sz}
                className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-100 text-stone-700 border border-stone-200/60"
              >
                {sz}
              </span>
            ))}
          </div>
        </div>

        {/* Rating & Pricing */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{product.rating}</span>
            <span className="text-stone-400 font-normal text-[10px]">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="text-left">
            {product.originalPrice && (
              <span className="block text-[11px] text-stone-400 line-through">
                {product.originalPrice} ر.س
              </span>
            )}
            <span className="text-base font-extrabold text-stone-900">
              {product.price} <span className="text-xs font-normal text-stone-600">ر.س</span>
            </span>
          </div>
        </div>

        {/* Add to Cart CTA */}
        <button
          onClick={handleAddToCartClick}
          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            addedAnimation
              ? 'bg-emerald-700 text-white'
              : 'bg-rose-950 hover:bg-rose-900 text-rose-50 shadow-2xs hover:shadow-xs'
          }`}
        >
          {addedAnimation ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>تمت الإضافة للسلة!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>إضافة سريعة للسلة</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
