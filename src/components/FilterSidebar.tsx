import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  Check, 
  Sparkles, 
  SlidersHorizontal,
  DollarSign,
  Ruler,
  Layers,
  Award
} from 'lucide-react';
import { 
  FilterState, 
  ClothingSize, 
  QualityMaterial, 
  QualityGrade, 
  ProductCategory 
} from '../types';
import { ALL_SIZES, ALL_MATERIALS, ALL_GRADES, CATEGORIES_LIST } from '../data/products';

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  totalResults: number;
  onOpenSizeAdvisor: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  totalResults,
  onOpenSizeAdvisor
}) => {
  // Toggle a size selection
  const handleSizeToggle = (size: ClothingSize) => {
    const exists = filters.selectedSizes.includes(size);
    const newSizes = exists
      ? filters.selectedSizes.filter((s) => s !== size)
      : [...filters.selectedSizes, size];
    onFilterChange({ ...filters, selectedSizes: newSizes });
  };

  // Toggle a material selection
  const handleMaterialToggle = (material: QualityMaterial) => {
    const exists = filters.selectedMaterials.includes(material);
    const newMaterials = exists
      ? filters.selectedMaterials.filter((m) => m !== material)
      : [...filters.selectedMaterials, material];
    onFilterChange({ ...filters, selectedMaterials: newMaterials });
  };

  // Toggle a quality grade selection
  const handleGradeToggle = (grade: QualityGrade) => {
    const exists = filters.selectedQualityGrades.includes(grade);
    const newGrades = exists
      ? filters.selectedQualityGrades.filter((g) => g !== grade)
      : [...filters.selectedQualityGrades, grade];
    onFilterChange({ ...filters, selectedQualityGrades: newGrades });
  };

  // Set price range preset
  const setPricePreset = (min: number, max: number) => {
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  // Reset all filters
  const resetFilters = () => {
    onFilterChange({
      category: 'all',
      selectedSizes: [],
      priceRange: [0, 1500],
      selectedMaterials: [],
      selectedQualityGrades: [],
      searchQuery: '',
      sortBy: 'featured',
      inStockOnly: false
    });
  };

  const activeFiltersCount = 
    (filters.category !== 'all' ? 1 : 0) +
    filters.selectedSizes.length +
    filters.selectedMaterials.length +
    filters.selectedQualityGrades.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1500 ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <aside className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs space-y-6 text-right">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2 text-stone-900 font-bold">
          <SlidersHorizontal className="w-4 h-4 text-rose-600" />
          <span>تصفية النتائج</span>
          <span className="text-xs font-normal text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
            ({totalResults} قطعة)
          </span>
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-rose-600 hover:text-rose-800 font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط</span>
          </button>
        )}
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-stone-500" />
          <span>حسب فئة القطعة:</span>
        </label>
        <div className="flex flex-col gap-1">
          {CATEGORIES_LIST.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onFilterChange({ ...filters, category: cat.id as ProductCategory })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-rose-900 text-white font-bold shadow-xs'
                    : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  isSelected ? 'bg-rose-800 text-rose-100' : 'bg-stone-200/70 text-stone-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Size Filter (القياس) */}
      <div className="space-y-3 pt-3 border-t border-stone-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-rose-600" />
            <span>حسب القياس:</span>
          </label>
          <button
            onClick={onOpenSizeAdvisor}
            className="text-[11px] text-rose-700 hover:underline font-semibold flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            دليل قياسك
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-1.5">
          {ALL_SIZES.map((size) => {
            const isSelected = filters.selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-stone-900 text-amber-300 border-stone-900 shadow-xs ring-2 ring-stone-900/20'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
        {filters.selectedSizes.length > 0 && (
          <p className="text-[11px] text-stone-500">
            تم تحديد: <span className="font-bold text-stone-800">{filters.selectedSizes.join(', ')}</span>
          </p>
        )}
      </div>

      {/* 3. Price Filter (السعر) */}
      <div className="space-y-3 pt-3 border-t border-stone-100">
        <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
          <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
          <span>حسب نطاق السعر:</span>
        </label>

        {/* Range display */}
        <div className="flex items-center justify-between text-xs font-bold text-stone-800 bg-stone-50 p-2.5 rounded-xl border border-stone-200/80">
          <span>من: {filters.priceRange[0]} ر.س</span>
          <span>إلى: {filters.priceRange[1]} ر.س</span>
        </div>

        {/* Range Sliders */}
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={1500}
            step={20}
            value={filters.priceRange[1]}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                priceRange: [filters.priceRange[0], Number(e.target.value)],
              })
            }
            className="w-full accent-rose-900 h-1.5 bg-stone-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Quick Price Chips */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setPricePreset(0, 300)}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors"
          >
            أقل من 300 ر.س
          </button>
          <button
            onClick={() => setPricePreset(300, 600)}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors"
          >
            300 - 600 ر.س
          </button>
          <button
            onClick={() => setPricePreset(600, 1500)}
            className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-medium transition-colors"
          >
            أكثر من 600 ر.س
          </button>
        </div>
      </div>

      {/* 4. Material / Quality Filter (النوعية والخامة) */}
      <div className="space-y-2.5 pt-3 border-t border-stone-100">
        <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>حسب نوعية الخامة والقماش:</span>
        </label>
        <div className="space-y-1.5">
          {ALL_MATERIALS.map((mat) => {
            const isChecked = filters.selectedMaterials.includes(mat);
            return (
              <label
                key={mat}
                className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-all border ${
                  isChecked 
                    ? 'bg-rose-50/70 border-rose-300 text-rose-950 font-bold' 
                    : 'bg-stone-50/60 border-stone-200/60 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleMaterialToggle(mat)}
                    className="w-3.5 h-3.5 rounded-md accent-rose-900"
                  />
                  <span>{mat}</span>
                </span>
                {mat === 'حرير طبيعي' && (
                  <span className="text-[10px] bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-medium">
                    الأكثر طلباً
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Quality Tier Filter (درجة التصنيع) */}
      <div className="space-y-2 pt-3 border-t border-stone-100">
        <label className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>درجة الجودة والتصنيع:</span>
        </label>
        <div className="space-y-1.5">
          {ALL_GRADES.map((grade) => {
            const isChecked = filters.selectedQualityGrades.includes(grade);
            return (
              <label
                key={grade}
                className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer hover:text-stone-900"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleGradeToggle(grade)}
                  className="w-3.5 h-3.5 rounded accent-rose-900"
                />
                <span>{grade}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Stock toggle */}
      <div className="pt-3 border-t border-stone-100">
        <label className="flex items-center justify-between text-xs font-medium text-stone-800 cursor-pointer">
          <span>القطع المتوفرة فوراً فقط</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded accent-stone-900"
          />
        </label>
      </div>

    </aside>
  );
};
