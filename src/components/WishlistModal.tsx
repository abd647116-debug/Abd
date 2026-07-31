import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onQuickViewProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onQuickViewProduct
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4 text-right">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h2 className="text-base font-bold">قائمة المفضلة والمحفوظات</h2>
            <span className="text-xs font-normal text-stone-300 bg-stone-800 px-2 py-0.5 rounded-full">
              ({wishlistItems.length} قطعة)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1">
          {wishlistItems.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-stone-800">لم تقمي بإضافة قطع للمفضلة بعد</h3>
              <p className="text-xs text-stone-500">احفظي قطعك المفضلة للعودة إليها ومقارنة الخامات والمقاسات بسهولة</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishlistItems.map((prod) => (
                <div 
                  key={prod.id}
                  className="bg-stone-50 p-3 rounded-2xl border border-stone-200 flex gap-3 items-center relative group hover:bg-white hover:shadow-xs transition-all"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-20 rounded-xl object-cover shrink-0 border border-stone-300"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="text-xs font-bold text-stone-900 truncate">{prod.name}</h4>
                    <span className="text-[10px] text-stone-500 bg-amber-50 text-amber-900 px-2 py-0.5 rounded font-medium inline-block">
                      {prod.qualityMaterial}
                    </span>
                    <div className="text-xs font-extrabold text-stone-900">{prod.price} ر.س</div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        onClose();
                        onQuickViewProduct(prod);
                      }}
                      className="p-2 rounded-xl bg-stone-900 text-amber-300 hover:bg-stone-800 text-xs font-bold flex items-center gap-1"
                      title="عرض وانتقاء المقاس"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(prod)}
                      className="p-2 rounded-xl bg-stone-200 text-stone-600 hover:bg-rose-100 hover:text-rose-700 transition-colors"
                      title="حذف من المفضلة"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
