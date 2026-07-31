import React from 'react';
import { Sparkles, ArrowLeft, ShieldCheck, Ruler, Award } from 'lucide-react';
import { ClothingSize, QualityMaterial } from '../types';

interface HeroBannerProps {
  onOpenSizeAdvisor: () => void;
  onFilterSize: (size: ClothingSize) => void;
  onFilterMaterial: (mat: QualityMaterial) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenSizeAdvisor,
  onFilterSize,
  onFilterMaterial,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white shadow-xl mb-8 border border-stone-800">
      
      {/* Background Image Overlay with Gradient */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop"
          alt="تشكيلة الأزياء النسائية الفاخرة"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl space-y-5 text-right">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-bold backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>تشكيلة الموسم الجديد - خامات الحرير والكتان الإيطالي</span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-['Alexandria']">
          أناقتكِ الاستثنائية بكل القياسات والخامات الفاخرة
        </h1>

        {/* Description */}
        <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
          متجر إلكتروني مخصص لتقديم أرقى الفساتين، العبايات، البلوزات الحريرية والسترات النسائية. ابحثي وقارني حسب مقاسك المناسب، نطاق السعر، ونوعية القماش.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onOpenSizeAdvisor}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-800 text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-rose-900/50 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Ruler className="w-4 h-4 text-amber-300" />
            <span>احسبي مقاسك بدقة مع الدليل الذكي</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Material / Size shortcuts */}
        <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center gap-2 text-xs text-stone-300">
          <span className="text-stone-400 font-medium">تسوقي فوراً حسب القياس:</span>
          {(['S', 'M', 'L', 'XL', 'XXL'] as ClothingSize[]).map((sz) => (
            <button
              key={sz}
              onClick={() => onFilterSize(sz)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold transition-colors border border-white/10"
            >
              مقاس {sz}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
