import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones, Sparkles, Award } from 'lucide-react';

export const FeaturesBar: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs my-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-right">
        
        <div className="flex items-start gap-3">
          <div className="p-3 rounded-2xl bg-rose-50 text-rose-900 border border-rose-100 shrink-0">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">توصيل سريع ومجاني</h4>
            <p className="text-[11px] text-stone-500 mt-0.5">مجاني للطلبات فوق 300 ريال سعودي لكافة المناطق</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-900 border border-amber-100 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">خامات طبيعية 100%</h4>
            <p className="text-[11px] text-stone-500 mt-0.5">حرير نقي، كتان إيطالي، وكشمير فاخر معتمد</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-900 border border-emerald-100 shrink-0">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">استبدال مقاس خلال 14 يوماً</h4>
            <p className="text-[11px] text-stone-500 mt-0.5">سهولة تامة في تبديل المقاسات واسترجاع الأموال</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-3 rounded-2xl bg-stone-100 text-stone-900 border border-stone-200 shrink-0">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-900">دعم واستشارات أنوثة 24/7</h4>
            <p className="text-[11px] text-stone-500 mt-0.5">فريق متكامل لمساعدتك في اختيار المقاس والتنسيق</p>
          </div>
        </div>

      </div>
    </div>
  );
};
