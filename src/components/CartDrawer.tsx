import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Tag, 
  ArrowLeft, 
  ShieldCheck, 
  Truck,
  Sparkles,
  Check
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  subtotal: number;
  discountCode: string;
  onApplyDiscountCode: (code: string) => void;
  discountAmount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  subtotal,
  discountCode,
  onApplyDiscountCode,
  discountAmount
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState(discountCode);
  const [codeMessage, setCodeMessage] = useState<string | null>(null);

  const shippingFee = subtotal >= 300 || subtotal === 0 ? 0 : 25;
  const taxAmount = Math.round(subtotal * 0.15);
  const total = Math.max(0, subtotal + shippingFee + taxAmount - discountAmount);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    if (inputCode.toUpperCase() === 'VELVERA20' || inputCode.toUpperCase() === 'ELEGANCE20') {
      onApplyDiscountCode(inputCode.toUpperCase());
      setCodeMessage('تم تطبيق خصم 20% بنجاح!');
    } else if (inputCode.toUpperCase() === 'FREE100') {
      onApplyDiscountCode(inputCode.toUpperCase());
      setCodeMessage('تم تطبيق الشحن المجاني!');
    } else {
      setCodeMessage('كود التخفيض غير صالح أو منتهي الصلاحية');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex justify-start text-right">
      <div 
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 relative border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-300" />
            <h2 className="text-base font-bold">سلة التسوق الخاص بكِ</h2>
            <span className="text-xs font-normal text-stone-400 bg-stone-800 px-2 py-0.5 rounded-full">
              ({cartItems.length} قطعة)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-amber-50 p-3 text-xs text-amber-900 border-b border-amber-200/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-medium">
            <Truck className="w-4 h-4 text-amber-700 shrink-0" />
            {subtotal >= 300 ? (
              <span className="text-emerald-800 font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> تهانينا! الشحن مجاني لطلبك
              </span>
            ) : (
              <span>أضيفي بـ <strong className="text-rose-900 font-extrabold">{300 - subtotal} ر.س</strong> أخرى للحصول على شحن مجاني!</span>
            )}
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-300 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-800">سلتك فارغة حالياً</h3>
                <p className="text-xs text-stone-500 mt-1">تصفحي أرقى الفساتين والعبايات واختاري قياسك المناسب</p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-rose-950 text-rose-100 text-xs font-bold hover:bg-rose-900 transition-colors shadow-xs"
              >
                تصفح تشكيلة الأزياء
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div 
                key={item.id}
                className="bg-stone-50/80 p-3 rounded-2xl border border-stone-200/70 flex gap-3 items-center hover:bg-stone-50 transition-colors"
              >
                {/* Thumb */}
                <div className="w-16 h-20 rounded-xl bg-stone-200 overflow-hidden shrink-0 border border-stone-300/60">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-stone-900 truncate">
                    {item.product.name}
                  </h4>
                  
                  <div className="flex items-center gap-2 text-[11px] text-stone-500">
                    <span>القياس: <strong className="text-stone-900 font-bold">{item.selectedSize}</strong></span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full border" style={{ backgroundColor: item.selectedColor.hex }} />
                      {item.selectedColor.name}
                    </span>
                  </div>

                  <div className="text-xs font-extrabold text-stone-900">
                    {item.product.price} ر.س
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end justify-between h-full space-y-2">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-100"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold text-stone-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 flex items-center justify-center text-xs font-bold text-stone-600 hover:bg-stone-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Promo */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-white space-y-3">
            
            {/* Promo code form */}
            <form onSubmit={handleCodeSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="رمز التخفيض (مثل VELVERA20)"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 pr-8 pl-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-rose-400 uppercase"
                />
                <Tag className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-2.5" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors"
              >
                تطبيق
              </button>
            </form>
            {codeMessage && (
              <div className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-lg">
                {codeMessage}
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
              <div className="flex justify-between">
                <span>المجموع الفرعي:</span>
                <span className="font-bold text-stone-900">{subtotal} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>رسوم الشحن:</span>
                <span className="font-bold text-stone-900">
                  {shippingFee === 0 ? <span className="text-emerald-700">مجاني</span> : `${shippingFee} ر.س`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>ضريبة القيمة المضافة (15%):</span>
                <span className="font-bold text-stone-900">{taxAmount} ر.س</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>خصم التخفيض:</span>
                  <span>-{discountAmount} ر.س</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-stone-200">
                <span>الإجمالي النهائي:</span>
                <span className="text-rose-950">{total} ر.س</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-3.5 bg-rose-950 hover:bg-rose-900 text-amber-200 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>إتمام الطلب والدفع الآمن</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
