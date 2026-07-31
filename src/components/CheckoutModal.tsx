import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  MapPin, 
  Phone, 
  User, 
  ShieldCheck, 
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { CartItem, ShippingAddress, OrderInvoice } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  discountAmount: number;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discountAmount,
  onOrderComplete
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'invoice'>('shipping');
  
  // Shipping form state
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'نورة عبد العزيز السليمان',
    phone: '0551234567',
    city: 'الرياض',
    address: 'حي النخيل - شارع التخصصي - مجمع الزمرد شقة 402',
    notes: 'يرجى الاتصال قبل التوصيل'
  });

  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8910');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('•••');

  // Completed Invoice State
  const [completedInvoice, setCompletedInvoice] = useState<OrderInvoice | null>(null);
  const [copiedOrderId, setCopiedOrderId] = useState(false);

  const shippingFee = subtotal >= 300 || subtotal === 0 ? 0 : 25;
  const taxAmount = Math.round(subtotal * 0.15);
  const total = Math.max(0, subtotal + shippingFee + taxAmount - discountAmount);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderId = 'VEL-' + Math.floor(100000 + Math.random() * 900000);
    const invoice: OrderInvoice = {
      orderId,
      date: new Date().toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' }),
      items: cartItems,
      shippingAddress: address,
      paymentMethod,
      subtotal,
      discountAmount,
      taxAmount,
      shippingFee,
      total,
      status: 'تم التأكيد'
    };

    setCompletedInvoice(invoice);
    setStep('invoice');
    onOrderComplete();
  };

  const copyOrderId = () => {
    if (completedInvoice) {
      navigator.clipboard.writeText(completedInvoice.orderId);
      setCopiedOrderId(true);
      setTimeout(() => setCopiedOrderId(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/75 backdrop-blur-sm flex items-center justify-center p-4 text-right">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold">إتمام الشراء والدفع الآمن</h2>
          </div>
          {step !== 'invoice' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        {step !== 'invoice' && (
          <div className="bg-stone-50 px-6 py-3 border-b border-stone-200 flex items-center justify-between text-xs font-bold text-stone-600">
            <div className={`flex items-center gap-1.5 ${step === 'shipping' ? 'text-rose-950 font-black' : 'text-emerald-700'}`}>
              <span className="w-5 h-5 rounded-full bg-rose-950 text-white flex items-center justify-center text-[10px]">1</span>
              <span>عنوان التوصيل</span>
            </div>
            <div className="w-8 h-0.5 bg-stone-300" />
            <div className={`flex items-center gap-1.5 ${step === 'payment' ? 'text-rose-950 font-black' : 'text-stone-400'}`}>
              <span className="w-5 h-5 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center text-[10px]">2</span>
              <span>الدفع والتأكيد</span>
            </div>
          </div>
        )}

        {/* Step 1: Shipping Address Form */}
        {step === 'shipping' && (
          <form onSubmit={() => setStep('payment')} className="p-6 space-y-4 overflow-y-auto">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              بيانات المستلم وعنوان الشحن:
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">الاسم الثلاثي:</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pr-9 pl-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-rose-400"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">رقم الجوال:</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pr-9 pl-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-rose-400 dir-ltr text-right"
                    />
                    <Phone className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">المدينة:</label>
                  <select
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-rose-400"
                  >
                    <option value="الرياض">الرياض</option>
                    <option value="جدة">جدة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="مكة المكرمة">مكة المكرمة</option>
                    <option value="المدينة المنورة">المدينة المنورة</option>
                    <option value="الخبر">الخبر</option>
                    <option value="أبها">أبها</option>
                    <option value="دبي">دبي (الإمارات)</option>
                    <option value="الكويت">الكويت</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">العنوان التفصيلي (الحي، الشارع، المبنى):</label>
                <textarea
                  required
                  rows={2}
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-rose-400 resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-stone-600 block mb-1">ملاحظات التوصيل (اختياري):</label>
                <input
                  type="text"
                  value={address.notes}
                  onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                  placeholder="مثال: يرجى الاتصال قبل الوصول بـ 15 دقيقة"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2 px-3 text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-stone-200 flex justify-end">
              <button
                type="submit"
                className="w-full py-3.5 bg-stone-900 text-amber-300 rounded-xl text-xs font-bold hover:bg-stone-800 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span>الانتقال لطريقة الدفع</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Payment Method */}
        {step === 'payment' && (
          <form onSubmit={handleCompleteOrder} className="p-6 space-y-4 overflow-y-auto">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-rose-600" />
              اختيار وسيلة الدفع المناسبة:
            </h3>

            {/* Payment method selection */}
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-rose-50 border-rose-900 text-rose-950 font-bold ring-2 ring-rose-900/20'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-rose-800" />
                <span className="text-xs block">مدى / بطاقة ائتمانية</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-rose-50 border-rose-900 text-rose-950 font-bold ring-2 ring-rose-900/20'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="text-base font-bold block mb-1"> Pay</span>
                <span className="text-xs block">آبل باي السريع</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-rose-50 border-rose-900 text-rose-950 font-bold ring-2 ring-rose-900/20'
                    : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <Truck className="w-5 h-5 mx-auto mb-1 text-stone-800" />
                <span className="text-xs block">الدفع عند الاستلام</span>
              </button>
            </div>

            {/* Card Inputs if card */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-stone-700 block mb-1">رقم البطاقة:</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl py-2 px-3 text-xs dir-ltr text-right"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">تاريخ الانتهاء:</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl py-2 px-3 text-xs text-center dir-ltr"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-stone-700 block mb-1">رمز الأمان CVC:</label>
                    <input
                      type="password"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl py-2 px-3 text-xs text-center dir-ltr"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Summary Box */}
            <div className="bg-stone-900 text-stone-200 p-4 rounded-2xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>إجمالي القطع:</span>
                <span>{subtotal} ر.س</span>
              </div>
              <div className="flex justify-between">
                <span>الشحن والضريبة:</span>
                <span>{shippingFee + taxAmount} ر.س</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-amber-300">
                  <span>التخفيض:</span>
                  <span>-{discountAmount} ر.س</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-stone-700">
                <span>الإجمالي النهائي المطلوب:</span>
                <span className="text-amber-300 font-extrabold">{total} ر.س</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('shipping')}
                className="py-3 px-4 bg-stone-100 text-stone-700 rounded-xl text-xs font-bold hover:bg-stone-200"
              >
                رجوع للعنوان
              </button>
              <button
                type="submit"
                className="flex-1 py-3.5 bg-rose-950 text-white rounded-xl text-xs font-bold hover:bg-rose-900 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>تأكيد الطلب والدفع النهائي ({total} ر.س)</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Completed Invoice */}
        {step === 'invoice' && completedInvoice && (
          <div className="p-6 space-y-5 overflow-y-auto text-right">
            
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">تم تسجيل طلبكِ بنجاح!</h3>
              <p className="text-xs text-stone-500">شكراً لتسوقك من فيلفيرا. سيتم تجهيز وشحن طلبيتك فوراً.</p>
            </div>

            {/* Invoice Ticket */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div>
                  <span className="text-[10px] text-stone-400 block">رقم الطلب المرجعي:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-extrabold text-stone-900 dir-ltr">{completedInvoice.orderId}</span>
                    <button
                      onClick={copyOrderId}
                      className="p-1 rounded text-stone-500 hover:text-stone-900"
                      title="نسخ رقم الطلب"
                    >
                      {copiedOrderId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="text-left">
                  <span className="text-[10px] text-stone-400 block">حالة الطلب:</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {completedInvoice.status}
                  </span>
                </div>
              </div>

              {/* Items Summary list */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-stone-800 block">القطع المطلوبة ومقاساتها:</span>
                {completedInvoice.items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between text-xs text-stone-700">
                    <span>{it.product.name} (مقاس: <strong className="text-stone-900">{it.selectedSize}</strong> × {it.quantity})</span>
                    <span className="font-bold text-stone-900">{it.product.price * it.quantity} ر.س</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between text-xs font-bold text-stone-900">
                <span>المبلغ النهائي المبتوت:</span>
                <span className="text-rose-950 text-sm font-black">{completedInvoice.total} ر.س</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 bg-stone-900 text-amber-300 rounded-2xl text-xs font-bold hover:bg-stone-800 transition-colors shadow-md"
            >
              متابعة التسوق وإغلاق الفاتورة
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
