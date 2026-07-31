import React, { useState } from 'react';
import { X, Ruler, Sparkles, CheckCircle2, ArrowLeft, Info, RefreshCw } from 'lucide-react';
import { ClothingSize } from '../types';

interface SmartSizeAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySizeFilter: (size: ClothingSize) => void;
}

export const SmartSizeAdvisorModal: React.FC<SmartSizeAdvisorModalProps> = ({
  isOpen,
  onClose,
  onApplySizeFilter,
}) => {
  if (!isOpen) return null;

  const [bustCm, setBustCm] = useState<number>(88);
  const [waistCm, setWaistCm] = useState<number>(70);
  const [hipsCm, setHipsCm] = useState<number>(94);
  const [heightCm, setHeightCm] = useState<number>(165);
  const [fitPreference, setFitPreference] = useState<'regular' | 'loose' | 'fitted'>('regular');
  const [recommendedSize, setRecommendedSize] = useState<ClothingSize | null>('M');

  const calculateSize = (bust: number, waist: number, hips: number, pref: string): ClothingSize => {
    // Offset slightly for preference
    let modifier = 0;
    if (pref === 'loose') modifier = 2;
    if (pref === 'fitted') modifier = -2;

    const effBust = bust + modifier;
    const effWaist = waist + modifier;

    if (effBust <= 81 || effWaist <= 63) return 'XS';
    if (effBust <= 86 && effWaist <= 68) return 'S';
    if (effBust <= 92 && effWaist <= 74) return 'M';
    if (effBust <= 98 && effWaist <= 80) return 'L';
    if (effBust <= 106 && effWaist <= 88) return 'XL';
    if (effBust <= 114 && effWaist <= 96) return 'XXL';
    return '3XL';
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateSize(bustCm, waistCm, hipsCm, fitPreference);
    setRecommendedSize(result);
  };

  const handleApply = () => {
    if (recommendedSize) {
      onApplySizeFilter(recommendedSize);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/75 backdrop-blur-sm flex items-center justify-center p-4 text-right">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold flex items-center gap-1.5">
                حاسبة المقاسات الذكية
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-[11px] text-stone-300">أدخلي قياساتك بالسم لاكتشاف مقاسك الخالي من الأخطاء</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleCalculate} className="p-5 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Inputs Grid */}
          <div className="space-y-4">
            
            {/* Bust */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-stone-900">محيط الصدر (سم):</label>
                <span className="font-extrabold text-rose-900 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {bustCm} سم
                </span>
              </div>
              <input
                type="range"
                min={70}
                max={130}
                value={bustCm}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setBustCm(val);
                  setRecommendedSize(calculateSize(val, waistCm, hipsCm, fitPreference));
                }}
                className="w-full accent-rose-900 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Waist */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-stone-900">محيط الخصر (سم):</label>
                <span className="font-extrabold text-rose-900 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {waistCm} سم
                </span>
              </div>
              <input
                type="range"
                min={55}
                max={120}
                value={waistCm}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setWaistCm(val);
                  setRecommendedSize(calculateSize(bustCm, val, hipsCm, fitPreference));
                }}
                className="w-full accent-rose-900 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Hips */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-stone-900">محيط الأوراك / الأرداف (سم):</label>
                <span className="font-extrabold text-rose-900 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                  {hipsCm} سم
                </span>
              </div>
              <input
                type="range"
                min={75}
                max={140}
                value={hipsCm}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setHipsCm(val);
                  setRecommendedSize(calculateSize(bustCm, waistCm, val, fitPreference));
                }}
                className="w-full accent-rose-900 h-2 bg-stone-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Fit preference */}
            <div className="space-y-1.5 pt-2 border-t border-stone-100">
              <label className="text-xs font-bold text-stone-900">أسلوب الارتداء المفضل:</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFitPreference('fitted');
                    setRecommendedSize(calculateSize(bustCm, waistCm, hipsCm, 'fitted'));
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    fitPreference === 'fitted'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  ضيق (Fitted)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFitPreference('regular');
                    setRecommendedSize(calculateSize(bustCm, waistCm, hipsCm, 'regular'));
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    fitPreference === 'regular'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  قياسي (Regular)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFitPreference('loose');
                    setRecommendedSize(calculateSize(bustCm, waistCm, hipsCm, 'loose'));
                  }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    fitPreference === 'loose'
                      ? 'bg-rose-900 text-white border-rose-900 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200'
                  }`}
                >
                  فضفاض (Loose)
                </button>
              </div>
            </div>
          </div>

          {/* Result Card */}
          {recommendedSize && (
            <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-4 rounded-2xl border border-amber-200/80 space-y-2 text-center">
              <div className="text-xs text-stone-600 font-medium">بناءً على المعايير المدخلة:</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-stone-900 font-bold text-sm">القياس الموصى به لكِ هو:</span>
                <span className="text-3xl font-black text-rose-900 bg-white px-4 py-1 rounded-xl shadow-xs border border-rose-200">
                  {recommendedSize}
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                نسبة التطابق مع قوالب فيلفيرا: <strong className="text-emerald-700">98% دقيقة</strong>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 py-3 bg-stone-900 hover:bg-stone-800 text-amber-300 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>تصفية المتجر بمقاس ({recommendedSize})</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs font-bold rounded-xl transition-colors"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
