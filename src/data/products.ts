import { Product, QualityMaterial, QualityGrade } from '../types';

export const CATEGORIES_LIST = [
  { id: 'all', name: 'جميع المعروضات', icon: 'Sparkles', count: 18 },
  { id: 'dresses', name: 'فساتين سهرة وكاجوال', icon: 'Shirt', count: 5 },
  { id: 'abayas', name: 'عبايات وجلابيات فاخرة', icon: 'Sparkle', count: 4 },
  { id: 'tops', name: 'بلوزات وقمصان حريرية', icon: 'Scissors', count: 3 },
  { id: 'bottoms', name: 'تنانير وبنطلونات أنيقة', icon: 'Layers', count: 3 },
  { id: 'outerwear', name: 'معاطف وسترات راقية', icon: 'Feather', count: 3 },
];

export const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'] as const;

export const ALL_MATERIALS: QualityMaterial[] = [
  'حرير طبيعي',
  'كشمير فاخر',
  'كتان إيطالي',
  'قطن 100%',
  'مخمل ملكي',
  'شيفون ناعم',
  'صوف ناعم',
  'دانتيل فرنسي',
];

export const ALL_GRADES: QualityGrade[] = [
  'فاخر للغاية (Luxury)',
  'درجة أولى (Premium)',
  'طبيعي 100%',
  'صناعة يدوية (Handmade)',
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    name: 'فستان سهرة بليسيه حريري مطرز بالذهبي',
    category: 'dresses',
    categoryName: 'فساتين سهرة وكاجوال',
    price: 680,
    originalPrice: 850,
    sizes: ['S', 'M', 'L', 'XL'],
    qualityMaterial: 'حرير طبيعي',
    qualityGrade: 'فاخر للغاية (Luxury)',
    colors: [
      { name: 'وردي زمردي', hex: '#E0A96D' },
      { name: 'أوف وايت عاجي', hex: '#F9F6F0' },
      { name: 'أسود ملكي', hex: '#1C1917' },
    ],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
    ],
    description: 'فستان أنيق بتصميم عصري من الحرير الطبيعي الخالص بنسبة 100%، يجسد الفخامة والأناقة في المناسبات الخاصة. يتميز بقصة بليسيه انسيابية تمنحك حركة مفعمة بالأنوثة.',
    features: [
      'مصنوع من حرير التوت الطبيعي الخالص 100%',
      'بطانة ناعمة تمنع الالتصاق والشفافية',
      'حزام خصر مدمج قابل للتعديل لتحديد القوام',
      'حواشٍ خياطة يدوية غير مرئية'
    ],
    careInstructions: 'تنظيف جاف فقط. عدم استخدام المبيضات. الكوي بالبخار عند درجة حرارة منخفضة.',
    rating: 4.9,
    reviewCount: 38,
    isNew: true,
    isBestSeller: true,
    stockCount: 8,
    sizeGuide: [
      { size: 'S', bustCm: 84, waistCm: 66, hipsCm: 90, lengthCm: 142 },
      { size: 'M', bustCm: 88, waistCm: 70, hipsCm: 94, lengthCm: 144 },
      { size: 'L', bustCm: 94, waistCm: 76, hipsCm: 100, lengthCm: 146 },
      { size: 'XL', bustCm: 100, waistCm: 82, hipsCm: 106, lengthCm: 147 },
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'سارة العتيبي',
        rating: 5,
        date: 'منذ 3 أيام',
        comment: 'الخامة خرافية جودة الحرير ممتازة المقاس جاء مضاد تماما حسب دليل المقاسات الذكي! شكراً فيلفيرا.',
        purchasedSize: 'M',
        purchasedColor: 'وردي زمردي',
        verified: true
      },
      {
        id: 'rev-2',
        userName: 'ريم الشمري',
        rating: 5,
        date: 'منذ أسبوع',
        comment: 'فخم جداً في الطبيعة ولونه رائع والتطريز الدقيق يثبت أنه درجة أولى.',
        purchasedSize: 'S',
        purchasedColor: 'أوف وايت عاجي',
        verified: true
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'عباية ملكية سوداء من الكتان الإيطالي مع كشكشة المخمل',
    category: 'abayas',
    categoryName: 'عبايات وجلابيات فاخرة',
    price: 490,
    originalPrice: 620,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
    qualityMaterial: 'كتان إيطالي',
    qualityGrade: 'صناعة يدوية (Handmade)',
    colors: [
      { name: 'أسود ملكي', hex: '#111827' },
      { name: 'كحلي داكن', hex: '#1E293B' },
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    ],
    description: 'عباية ملكية فريدة من نوعها من الكتان الإيطالي الممتاز المعالج ضد التعديل مع لمسات مخملية راقية على الأكمام، تأتي مع طرحة متناسقة بحواشٍ مطرزة.',
    features: [
      'خامة كتان إيطالي ناعم وجيد التهوية',
      'أكمام مزينة بقطع مخملية فرنسية',
      'تتضمن طرحة ناعمة مجانية طقم كامل',
      'قصة نص كلوش تمنح راحة تامة أثناء الحركة'
    ],
    careInstructions: 'غسيل يدوي بماء بارد وشامبو عبايات خاص. التجفيف في الظل.',
    rating: 4.8,
    reviewCount: 42,
    isBestSeller: true,
    stockCount: 15,
    sizeGuide: [
      { size: 'XS', bustCm: 80, waistCm: 62, hipsCm: 86, lengthCm: 135 },
      { size: 'S', bustCm: 84, waistCm: 66, hipsCm: 90, lengthCm: 138 },
      { size: 'M', bustCm: 88, waistCm: 70, hipsCm: 94, lengthCm: 140 },
      { size: 'L', bustCm: 94, waistCm: 76, hipsCm: 100, lengthCm: 143 },
      { size: 'XL', bustCm: 102, waistCm: 84, hipsCm: 108, lengthCm: 145 },
      { size: 'XXL', bustCm: 110, waistCm: 92, hipsCm: 116, lengthCm: 148 },
      { size: '3XL', bustCm: 118, waistCm: 100, hipsCm: 124, lengthCm: 150 },
    ],
    reviews: [
      {
        id: 'rev-3',
        userName: 'نورة القحطاني',
        rating: 5,
        date: 'منذ يومين',
        comment: 'الكتان بارد وجميل وقماش ممتااااز لا يتكسر بسهولة، والمقاس XXL ممتاز جداً!',
        purchasedSize: 'XXL',
        purchasedColor: 'أسود ملكي',
        verified: true
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'كارديجان بلوزة كشمير فاخر بقصة أنيقة',
    category: 'outerwear',
    categoryName: 'معاطف وسترات راقية',
    price: 820,
    originalPrice: 950,
    sizes: ['S', 'M', 'L', 'XL'],
    qualityMaterial: 'كشمير فاخر',
    qualityGrade: 'فاخر للغاية (Luxury)',
    colors: [
      { name: 'كاميل دافئ', hex: '#C19A6B' },
      { name: 'رمادي لؤلؤي', hex: '#D1D5DB' },
      { name: 'أوف وايت', hex: '#FAF5EF' },
    ],
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1000&auto=format&fit=crop',
    ],
    description: 'سترة كارديجان فاخرة نسيج صوف الكشمير الجبلي الصافي 100%. خفيف الوزن للغاية مع قدرة فائقة على التدفئة والدفء مع لمس ناعم كالسحاب.',
    features: [
      '100% صوف كشمير نقي خالي من الألياف الصناعية',
      'مظهر كلاسيكي يلائم كافة إطلالات اليوم والمساء',
      'أزرار لؤلؤية طبيعية مصقولة',
      'لا يتوبر ومقاوم للتآكل مع العناية'
    ],
    careInstructions: 'تنظيف جاف حصراً. يحفظ مطوياً ولا يعلق على حمالات لمنع التمدد.',
    rating: 5.0,
    reviewCount: 29,
    isNew: true,
    stockCount: 5,
    sizeGuide: [
      { size: 'S', bustCm: 86, waistCm: 68, hipsCm: 92, lengthCm: 65 },
      { size: 'M', bustCm: 90, waistCm: 72, hipsCm: 96, lengthCm: 67 },
      { size: 'L', bustCm: 96, waistCm: 78, hipsCm: 102, lengthCm: 69 },
      { size: 'XL', bustCm: 104, waistCm: 86, hipsCm: 110, lengthCm: 71 },
    ]
  },
  {
    id: 'prod-4',
    name: 'قميص حرير طبيعي بياقة درابيه ورقبة مربعة',
    category: 'tops',
    categoryName: 'بلوزات وقمصان حريرية',
    price: 340,
    originalPrice: 420,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    qualityMaterial: 'حرير طبيعي',
    qualityGrade: 'درجة أولى (Premium)',
    colors: [
      { name: 'شامبانيا براق', hex: '#F7E7CE' },
      { name: 'أخضر زمردي', hex: '#065F46' },
      { name: 'أبيض عاجي', hex: '#FFFFFF' },
    ],
    images: [
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1000&auto=format&fit=crop',
    ],
    description: 'قميص حريري فاخر بتصميم عصري وأكمام واسعة بربطة معصم. القماش ناعم جداً على البشرة ومريح طوال اليوم.',
    features: [
      'حرير نقي 100% ببريق طبيعي خفيف',
      'قصة مريحة تمنحك الحرية في التنسيق',
      'أزرار مخفية لمظهر أنيق وأملس',
      'النوعية جودة صالحة للمكتب واللقاءات الرسمية'
    ],
    careInstructions: 'غسيل يدوي بماء فاتر. كي بخار خفيف.',
    rating: 4.7,
    reviewCount: 19,
    stockCount: 12,
    sizeGuide: [
      { size: 'XS', bustCm: 82, waistCm: 64, hipsCm: 88, lengthCm: 62 },
      { size: 'S', bustCm: 86, waistCm: 68, hipsCm: 92, lengthCm: 63 },
      { size: 'M', bustCm: 90, waistCm: 72, hipsCm: 96, lengthCm: 64 },
      { size: 'L', bustCm: 96, waistCm: 78, hipsCm: 102, lengthCm: 66 },
      { size: 'XL', bustCm: 102, waistCm: 84, hipsCm: 108, lengthCm: 67 },
    ]
  },
  {
    id: 'prod-5',
    name: 'تنورة كلوش مخمل ملكي بكسرات دقيقة',
    category: 'bottoms',
    categoryName: 'تنانير وبنطلونات أنيقة',
    price: 380,
    originalPrice: 450,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    qualityMaterial: 'مخمل ملكي',
    qualityGrade: 'فاخر للغاية (Luxury)',
    colors: [
      { name: 'عنابي دافئ', hex: '#722F37' },
      { name: 'كحلي نايت', hex: '#0B132B' },
      { name: 'زيتي غامق', hex: '#2D372E' },
    ],
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    ],
    description: 'تنورة طويلة مصنوعة من قماش المخمل الملكي السميك ببريق مخملي ساحر. حزام الخصر مطاطي ومريح للغاية.',
    features: [
      'مخمل ملكي عالي الكثافة ومقاوم للانكماش',
      'كسرات بليسيه دائمة لا تضيع بعد الغسيل',
      'حزام خصر مرن مريح مقاس متكيف',
      'طول كامل مناسب للمناسبات الرسمية'
    ],
    careInstructions: 'تنظيف جاف للحفاظ على لون وبريق المخمل.',
    rating: 4.9,
    reviewCount: 31,
    isBestSeller: true,
    stockCount: 9,
    sizeGuide: [
      { size: 'S', bustCm: 0, waistCm: 66, hipsCm: 94, lengthCm: 98 },
      { size: 'M', bustCm: 0, waistCm: 70, hipsCm: 98, lengthCm: 100 },
      { size: 'L', bustCm: 0, waistCm: 76, hipsCm: 104, lengthCm: 101 },
      { size: 'XL', bustCm: 0, waistCm: 82, hipsCm: 110, lengthCm: 102 },
      { size: 'XXL', bustCm: 0, waistCm: 90, hipsCm: 118, lengthCm: 103 },
    ]
  },
  {
    id: 'prod-6',
    name: 'معطف صوف فاخر بطول كامل وأزرار مزدوجة',
    category: 'outerwear',
    categoryName: 'معاطف وسترات راقية',
    price: 920,
    originalPrice: 1150,
    sizes: ['M', 'L', 'XL', 'XXL', '3XL'],
    qualityMaterial: 'صوف ناعم',
    qualityGrade: 'درجة أولى (Premium)',
    colors: [
      { name: 'بيج عاجي', hex: '#E6D7C3' },
      { name: 'أسود فحم', hex: '#262626' },
    ],
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
    ],
    description: 'معطف صوف محبوك بعناية مع بطانة حريرية داخلية عازلة للبرودة، قصة كلاسيكية راقية تمنحك إطلالة ملكية دافئة.',
    features: [
      '80% صوف غنم طبيعي + 20% ألياف حماية وتنعيم',
      'بطانة حريرية ناعمة تحمي الملابس الداخلية',
      'جيبان واسعان جانبيان بتصميم سري',
      'تحديد خصر متناسق بحزام صوف مدمج'
    ],
    careInstructions: 'تنظيف جاف متخصص فقط.',
    rating: 4.8,
    reviewCount: 22,
    isNew: true,
    stockCount: 6,
    sizeGuide: [
      { size: 'M', bustCm: 92, waistCm: 76, hipsCm: 98, lengthCm: 115 },
      { size: 'L', bustCm: 98, waistCm: 82, hipsCm: 104, lengthCm: 117 },
      { size: 'XL', bustCm: 106, waistCm: 90, hipsCm: 112, lengthCm: 119 },
      { size: 'XXL', bustCm: 114, waistCm: 98, hipsCm: 120, lengthCm: 120 },
      { size: '3XL', bustCm: 122, waistCm: 106, hipsCm: 128, lengthCm: 121 },
    ]
  },
  {
    id: 'prod-7',
    name: 'جلابية قطن 100% تطريز فرنسي بارد',
    category: 'abayas',
    categoryName: 'عبايات وجلابيات فاخرة',
    price: 290,
    originalPrice: 360,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    qualityMaterial: 'قطن 100%',
    qualityGrade: 'طبيعي 100%',
    colors: [
      { name: 'أزرق سماوي', hex: '#BAE6FD' },
      { name: 'أبيض زهري', hex: '#FCE7F3' },
      { name: 'نعناعي فاتح', hex: '#D1FAE5' },
    ],
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
    ],
    description: 'جلابية منزلية واستقبال فاخرة من القطن الطبيعي الصافي 100% الناعم للغاية والمناسب للأجواء الحارة، مطرزة بخيوط الدانتيل على الياقة.',
    features: [
      'قطن مصري طويل الألياف ممتاز 100%',
      'تمتص الرطوبة وباردة على الجلد',
      'تطريز دانتيل فرنسي دقيق لا يسبب أي تحسس',
      'قصة واسعة مريحة جداً'
    ],
    careInstructions: 'غسيل آلي بماء فاتر. التجفيف على حبل الملابس.',
    rating: 4.9,
    reviewCount: 54,
    isBestSeller: true,
    stockCount: 20,
    sizeGuide: [
      { size: 'S', bustCm: 88, waistCm: 72, hipsCm: 96, lengthCm: 138 },
      { size: 'M', bustCm: 92, waistCm: 76, hipsCm: 100, lengthCm: 140 },
      { size: 'L', bustCm: 98, waistCm: 82, hipsCm: 106, lengthCm: 142 },
      { size: 'XL', bustCm: 106, waistCm: 90, hipsCm: 114, lengthCm: 144 },
      { size: 'XXL', bustCm: 114, waistCm: 98, hipsCm: 122, lengthCm: 146 },
      { size: '3XL', bustCm: 122, waistCm: 106, hipsCm: 130, lengthCm: 148 },
    ]
  },
  {
    id: 'prod-8',
    name: 'فستان شيفون ناعم بكسرات أوف شولدر',
    category: 'dresses',
    categoryName: 'فساتين سهرة وكاجوال',
    price: 450,
    originalPrice: 550,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    qualityMaterial: 'شيفون ناعم',
    qualityGrade: 'درجة أولى (Premium)',
    colors: [
      { name: 'وردي هادئ', hex: '#F472B6' },
      { name: 'لافندر ناعم', hex: '#C084FC' },
      { name: 'سماء صافية', hex: '#38BDF8' },
    ],
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
    ],
    description: 'فستان شيفون ناعم بطبقات متدرجة ينبض بالحيوية والأناقة، مثالي للحفلات والمناسبات الصيفية والربيعية.',
    features: [
      'شيفون حريري خفيف وجذاب',
      'بطانة كاملة سميكة غير شفافة',
      'مرونة في الكتف ارتداء متكيف',
      'لا يتأثر بالحركة ويحتفظ بشكله الرائع'
    ],
    careInstructions: 'غسيل يدوي رقيق أو تنظيف جاف.',
    rating: 4.6,
    reviewCount: 16,
    stockCount: 10,
    sizeGuide: [
      { size: 'XS', bustCm: 80, waistCm: 62, hipsCm: 88, lengthCm: 138 },
      { size: 'S', bustCm: 84, waistCm: 66, hipsCm: 92, lengthCm: 140 },
      { size: 'M', bustCm: 88, waistCm: 70, hipsCm: 96, lengthCm: 142 },
      { size: 'L', bustCm: 94, waistCm: 76, hipsCm: 102, lengthCm: 144 },
      { size: 'XL', bustCm: 100, waistCm: 82, hipsCm: 108, lengthCm: 145 },
    ]
  },
  {
    id: 'prod-9',
    name: 'بنطال كتان إيطالي بقصة واسعة وخصر عالٍ',
    category: 'bottoms',
    categoryName: 'تنانير وبنطلونات أنيقة',
    price: 260,
    originalPrice: 310,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    qualityMaterial: 'كتان إيطالي',
    qualityGrade: 'طبيعي 100%',
    colors: [
      { name: 'رملي بيج', hex: '#E5D3B3' },
      { name: 'أبيض ناصع', hex: '#FFFFFF' },
      { name: 'زيتوني هادئ', hex: '#656D4A' },
    ],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1000&auto=format&fit=crop',
    ],
    description: 'بنطال نسائي مريح بتصميم عصري بقصة رجل واسعة، مصنوع من أفضل خيوط الكتان الإيطالي الطبيعي 100%.',
    features: [
      'كتان إيطالي مغسول مسبقاً لمنع الانكماش',
      'خصر مرتفع مع حزام مطاطي خلفي مريح',
      'جيوب جانبية عميقة وعملية',
      'إطلالة عصرية مناسبة للدوام والرحلات'
    ],
    careInstructions: 'غسيل يدوي بماء بارد وكي بالبخار.',
    rating: 4.8,
    reviewCount: 27,
    stockCount: 14,
    sizeGuide: [
      { size: 'XS', bustCm: 0, waistCm: 62, hipsCm: 90, lengthCm: 102 },
      { size: 'S', bustCm: 0, waistCm: 66, hipsCm: 94, lengthCm: 103 },
      { size: 'M', bustCm: 0, waistCm: 70, hipsCm: 98, lengthCm: 104 },
      { size: 'L', bustCm: 0, waistCm: 76, hipsCm: 104, lengthCm: 105 },
      { size: 'XL', bustCm: 0, waistCm: 82, hipsCm: 110, lengthCm: 106 },
      { size: 'XXL', bustCm: 0, waistCm: 90, hipsCm: 118, lengthCm: 107 },
    ]
  },
  {
    id: 'prod-10',
    name: 'بلوزة دانتيل فرنسي بياقة عالية وأكمام شفافة',
    category: 'tops',
    categoryName: 'بلوزات وقمصان حريرية',
    price: 390,
    originalPrice: 480,
    sizes: ['S', 'M', 'L', 'XL'],
    qualityMaterial: 'دانتيل فرنسي',
    qualityGrade: 'فاخر للغاية (Luxury)',
    colors: [
      { name: 'أسود شبكي', hex: '#000000' },
      { name: 'سوف وايت', hex: '#FFFDD0' },
    ],
    images: [
      'https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1000&auto=format&fit=crop',
    ],
    description: 'قطعة فنية من الدانتيل الفرنسي المشغولة بنقوش وردية دقيقة، مبطنة بحرير ناعم من منطقة الصدر لتوفير التغطية والأناقة المثالية.',
    features: [
      'دانتيل جيبور فرنسي أصلي ناعم الملمس',
      'بطانة حريرية مدمجة بحمالات ناعمة',
      'أزرار لؤلؤ على الياقة الخلفية',
      'مرونة متوازنة تتيح الحركة بسلاسة'
    ],
    careInstructions: 'تنظيف رقيق جداً بماء بارد أو تنظيف جاف.',
    rating: 4.9,
    reviewCount: 18,
    stockCount: 7,
    sizeGuide: [
      { size: 'S', bustCm: 84, waistCm: 66, hipsCm: 90, lengthCm: 60 },
      { size: 'M', bustCm: 88, waistCm: 70, hipsCm: 94, lengthCm: 61 },
      { size: 'L', bustCm: 94, waistCm: 76, hipsCm: 100, lengthCm: 63 },
      { size: 'XL', bustCm: 100, waistCm: 82, hipsCm: 106, lengthCm: 64 },
    ]
  },
  {
    id: 'prod-11',
    name: 'عباية مخملية فاخرة بتطريز خيوط القصب الذهبية',
    category: 'abayas',
    categoryName: 'عبايات وجلابيات فاخرة',
    price: 740,
    originalPrice: 890,
    sizes: ['S', 'M', 'L', 'XL', 'XXL', '3XL'],
    qualityMaterial: 'مخمل ملكي',
    qualityGrade: 'صناعة يدوية (Handmade)',
    colors: [
      { name: 'أسود مع ذهبي', hex: '#1C1917' },
      { name: 'زيتي ملكي', hex: '#1B3B2B' },
    ],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    ],
    description: 'عباية مخملية ملكية للمناسبات والأعياد، مشغولة يدوياً بخيوط القصب الذهبي النقي على الجانبين والأكمام، تعكس الأصالة والفخامة.',
    features: [
      'قماش مخمل ملكي سميك ذو ملمس قطيفي دافئ',
      'تطريز يديوي أصيل يدوم مدى الحياة',
      'طقم مكتمل مع طرحة مخملية الحواف',
      'إغلاق بطقطق سري من الأمام'
    ],
    careInstructions: 'تنظيف جاف فقط للحفاظ على خيوط القصب.',
    rating: 5.0,
    reviewCount: 35,
    isNew: true,
    isBestSeller: true,
    stockCount: 5,
    sizeGuide: [
      { size: 'S', bustCm: 84, waistCm: 66, hipsCm: 90, lengthCm: 138 },
      { size: 'M', bustCm: 88, waistCm: 70, hipsCm: 94, lengthCm: 140 },
      { size: 'L', bustCm: 94, waistCm: 76, hipsCm: 100, lengthCm: 143 },
      { size: 'XL', bustCm: 102, waistCm: 84, hipsCm: 108, lengthCm: 145 },
      { size: 'XXL', bustCm: 110, waistCm: 92, hipsCm: 116, lengthCm: 148 },
      { size: '3XL', bustCm: 118, waistCm: 100, hipsCm: 124, lengthCm: 150 },
    ]
  },
  {
    id: 'prod-12',
    name: 'فستان ميدي حرير بفتحة ياقةV وربطة خصر',
    category: 'dresses',
    categoryName: 'فساتين سهرة وكاجوال',
    price: 520,
    originalPrice: 650,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    qualityMaterial: 'حرير طبيعي',
    qualityGrade: 'فاخر للغاية (Luxury)',
    colors: [
      { name: 'أحمر ياكوتي', hex: '#991B1B' },
      { name: 'كحلي ناعم', hex: '#1E3A8A' },
      { name: 'ذهبي خفيف', hex: '#D97706' },
    ],
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop',
    ],
    description: 'فستان حريري متوسط الطول (ميدي) مفعم بالأناقة والأنوثة، يتميز بقصة خصر ملفوفة تعطي رشاقة وإشراقة ساحرة.',
    features: [
      'حرير ساتان طبيعي ناعم ومقاوم للكهرباء الساكنة',
      'ربطة خصر حرة للتضييق أو التوسيع حسب الرغبة',
      'أكمام مزمومة أنيقة بالمعصم',
      'صنع خصيصاً للمناسبات الراقية'
    ],
    careInstructions: 'تنظيف جاف.',
    rating: 4.8,
    reviewCount: 23,
    stockCount: 11,
    sizeGuide: [
      { size: 'XS', bustCm: 80, waistCm: 62, hipsCm: 88, lengthCm: 118 },
      { size: 'S', bustCm: 84, waistCm: 66, hipsCm: 92, lengthCm: 120 },
      { size: 'M', bustCm: 88, waistCm: 70, hipsCm: 96, lengthCm: 122 },
      { size: 'L', bustCm: 94, waistCm: 76, hipsCm: 102, lengthCm: 124 },
      { size: 'XL', bustCm: 100, waistCm: 82, hipsCm: 108, lengthCm: 125 },
    ]
  }
];
