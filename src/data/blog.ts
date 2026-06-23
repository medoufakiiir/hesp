export interface BlogPost {
  id: string
  slug: string
  titleEN: string
  titleAR: string
  excerptEN: string
  excerptAR: string
  contentEN: string
  contentAR: string
  image: string
  date: string
  author: string
  tags: string[]
  metaTitleEN: string
  metaTitleAR: string
  metaDescEN: string
  metaDescAR: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "how-to-choose-hydraulic-pump-heavy-equipment",
    titleEN: "How to Choose the Right Hydraulic Pump for Your Heavy Equipment",
    titleAR: "كيف تختار المضخة الهيدروليكية المناسبة لمعداتك الثقيلة",
    excerptEN: "A comprehensive guide to selecting hydraulic pumps for excavators, loaders, and bulldozers. Learn about gear pumps, piston pumps, and vane pumps.",
    excerptAR: "دليل شامل لاختيار المضخات الهيدروليكية للحفارات واللودرات والجرافات. تعرف على مضخات التروس ومضخات المكبس ومضخات الريشة.",
    contentEN: `Selecting the right hydraulic pump is critical for maintaining your heavy equipment's performance and longevity. Here's what you need to know:\n\n## Types of Hydraulic Pumps\n\n### Gear Pumps\nGear pumps are the simplest and most cost-effective option. They work well for low-pressure applications and are commonly found in smaller equipment. However, they offer lower efficiency compared to other types.\n\n### Piston Pumps\nAxial piston pumps are the most common in heavy equipment. They provide high pressure and excellent efficiency, making them ideal for excavators and large loaders. Variable displacement piston pumps allow the system to adjust flow based on demand.\n\n### Vane Pumps\nVane pumps offer smooth, quiet operation and are often used in crane hydraulic systems. They provide good efficiency at moderate pressures.\n\n## Key Selection Factors\n\n1. **Flow Rate**: Match the pump's GPM rating to your equipment's requirements\n2. **Pressure Rating**: Ensure the pump can handle maximum system pressure\n3. **Displacement**: Choose between fixed and variable displacement based on your application\n4. **Brand Compatibility**: Always verify the pump matches your equipment's specifications\n5. **Operating Temperature**: Consider the temperature range of your work environment\n\n## OEM vs Aftermarket\n\nOEM parts guarantee perfect compatibility but come at a premium price. Quality aftermarket parts can offer the same performance at 40-60% of the cost. At Riyada Ventures, we source only from certified manufacturers to ensure reliability.\n\n## Maintenance Tips\n\n- Change hydraulic fluid at recommended intervals\n- Monitor pump noise — unusual sounds indicate wear\n- Check for leaks regularly\n- Keep fluid clean with proper filtration\n\nContact our engineering team for expert guidance on selecting the right hydraulic pump for your specific equipment model.`,
    contentAR: `اختيار المضخة الهيدروليكية المناسبة أمر بالغ الأهمية للحفاظ على أداء معداتك الثقيلة وعمرها الافتراضي. إليك ما تحتاج معرفته:\n\n## أنواع المضخات الهيدروليكية\n\n### مضخات التروس\nمضخات التروس هي الأبسط والأكثر فعالية من حيث التكلفة. تعمل بشكل جيد لتطبيقات الضغط المنخفض وتوجد عادة في المعدات الأصغر.\n\n### مضخات المكبس\nمضخات المكبس المحورية هي الأكثر شيوعاً في المعدات الثقيلة. توفر ضغطاً عالياً وكفاءة ممتازة، مما يجعلها مثالية للحفارات واللودرات الكبيرة.\n\n### مضخات الريشة\nتوفر مضخات الريشة تشغيلاً سلساً وهادئاً وتستخدم غالباً في أنظمة الرافعات الهيدروليكية.\n\n## عوامل الاختيار الرئيسية\n\n1. **معدل التدفق**: طابق تصنيف GPM للمضخة مع متطلبات معداتك\n2. **تصنيف الضغط**: تأكد من أن المضخة يمكنها التعامل مع الضغط الأقصى\n3. **الإزاحة**: اختر بين الإزاحة الثابتة والمتغيرة\n4. **توافق العلامة التجارية**: تحقق دائماً من تطابق المضخة مع مواصفات معداتك\n\nتواصل مع فريقنا الهندسي للحصول على إرشادات متخصصة.`,
    image: "/images/equipment/hydraulic-parts.jpg",
    date: "2024-12-15",
    author: "Riyada Engineering Team",
    tags: ["hydraulic", "pumps", "maintenance", "guide"],
    metaTitleEN: "How to Choose Hydraulic Pumps for Heavy Equipment | Riyada Guide",
    metaTitleAR: "كيف تختار المضخة الهيدروليكية للمعدات الثقيلة | دليل ريادة",
    metaDescEN: "Expert guide on choosing hydraulic pumps for excavators, loaders & bulldozers. Learn about gear, piston & vane pumps. Riyada Ventures Saudi Arabia.",
    metaDescAR: "دليل متخصص لاختيار المضخات الهيدروليكية للحفارات واللودرات والجرافات. تعرف على مضخات التروس والمكبس والريشة.",
  },
  {
    id: "2",
    slug: "undercarriage-maintenance-tips-excavators",
    titleEN: "Essential Undercarriage Maintenance Tips for Excavators",
    titleAR: "نصائح أساسية لصيانة الهيكل السفلي للحفارات",
    excerptEN: "The undercarriage accounts for up to 50% of maintenance costs. Learn how to extend its life and reduce downtime with proper maintenance practices.",
    excerptAR: "يمثل الهيكل السفلي ما يصل إلى 50% من تكاليف الصيانة. تعلم كيف تمدد عمره وتقلل وقت التوقف بممارسات الصيانة المناسبة.",
    contentEN: `The undercarriage is one of the most expensive components of any tracked excavator, accounting for up to 50% of total maintenance costs. Proper maintenance can significantly extend its service life.\n\n## Daily Inspection Checklist\n\n- Check track tension — both too tight and too loose cause accelerated wear\n- Inspect for damaged or missing track shoes\n- Look for oil leaks from track rollers and idlers\n- Clean debris from between track components\n- Check sprocket teeth for wear patterns\n\n## Track Tension\n\nCorrect track tension is critical. A track that's too tight increases wear on all components and wastes fuel. Too loose, and the track can come off or cause uneven wear.\n\n## When to Replace Components\n\n- **Track chains**: When pins and bushings show more than 50% wear\n- **Sprockets**: When teeth show visible hooking or rounding\n- **Rollers**: When flats develop or seals leak\n- **Idlers**: When excessive play is detected\n\n## Cost-Saving Strategies\n\n1. **Turn track shoes**: Most shoes can be turned 180° to double their life\n2. **Match working conditions**: Use the right shoe width for your terrain\n3. **Rotate components**: Swap left and right tracks periodically\n4. **Avoid unnecessary travel**: Move the machine by truck when possible\n\nRiyada Ventures stocks complete undercarriage kits for CAT, Komatsu, Hitachi, and all major brands. Contact us for competitive pricing.`,
    contentAR: `الهيكل السفلي هو أحد أغلى مكونات أي حفار مجنزر، حيث يمثل ما يصل إلى 50% من إجمالي تكاليف الصيانة. يمكن للصيانة المناسبة أن تمدد عمره بشكل كبير.\n\n## قائمة الفحص اليومي\n\n- تحقق من شد الجنزير\n- افحص أحذية الجنزير التالفة أو المفقودة\n- ابحث عن تسربات الزيت\n- نظف الحطام بين مكونات الجنزير\n- تحقق من أسنان العجلة المسننة\n\n## متى يجب استبدال المكونات\n\n- **سلاسل الجنزير**: عندما يظهر التآكل بنسبة تزيد عن 50%\n- **العجلات المسننة**: عندما تظهر الأسنان تآكلاً واضحاً\n- **البكرات**: عندما تتطور مسطحات أو تتسرب الحشوات\n\nريادة فنتشرز توفر مجموعات هيكل سفلي كاملة لكاتربيلر وكوماتسو وهيتاشي وجميع العلامات الكبرى.`,
    image: "/images/equipment/excavator-1.jpg",
    date: "2024-11-28",
    author: "Riyada Engineering Team",
    tags: ["undercarriage", "excavator", "maintenance", "tracks"],
    metaTitleEN: "Excavator Undercarriage Maintenance Tips | Extend Track Life",
    metaTitleAR: "نصائح صيانة الهيكل السفلي للحفارات | أطل عمر الجنزير",
    metaDescEN: "Essential undercarriage maintenance tips for excavators. Learn how to extend track chain, sprocket & roller life. Save up to 50% on maintenance costs.",
    metaDescAR: "نصائح أساسية لصيانة الهيكل السفلي للحفارات. تعلم كيف تمدد عمر سلاسل الجنزير والعجلات والبكرات.",
  },
  {
    id: "3",
    slug: "oem-vs-aftermarket-parts-guide",
    titleEN: "OEM vs Aftermarket Parts: Complete Guide for Fleet Managers",
    titleAR: "قطع أصلية مقابل بديلة: دليل كامل لمديري الأساطيل",
    excerptEN: "Should you buy OEM or aftermarket parts? We break down the pros, cons, quality differences, and cost analysis to help you make the right decision.",
    excerptAR: "هل يجب شراء قطع أصلية أو بديلة؟ نحلل الإيجابيات والسلبيات وفروقات الجودة وتحليل التكلفة لمساعدتك في اتخاذ القرار الصحيح.",
    contentEN: `One of the most common questions fleet managers face is whether to use OEM (Original Equipment Manufacturer) or aftermarket parts. Here's a comprehensive comparison.\n\n## OEM Parts\n\n### Advantages\n- Guaranteed compatibility with your equipment\n- Warranty coverage from the manufacturer\n- Consistent quality standards\n- Access to latest engineering improvements\n\n### Disadvantages\n- Premium pricing (often 2-3x aftermarket)\n- Limited availability in some regions\n- Longer lead times for specialized parts\n\n## Aftermarket Parts\n\n### Advantages\n- Significant cost savings (40-60% less than OEM)\n- Wider availability from multiple sources\n- Competition drives quality improvements\n- Faster delivery in many cases\n\n### Disadvantages\n- Quality varies significantly between manufacturers\n- Need to verify specifications carefully\n- May not include latest design improvements\n\n## Our Recommendation\n\nFor critical components like hydraulic pumps, engines, and safety systems — invest in OEM or premium aftermarket. For wear parts like bucket teeth, cutting edges, and filters — quality aftermarket offers excellent value.\n\nAt Riyada Ventures, we source from verified manufacturers and provide quality guarantees on all aftermarket parts.`,
    contentAR: `أحد أكثر الأسئلة شيوعاً التي يواجهها مديرو الأساطيل هو ما إذا كان يجب استخدام قطع أصلية (OEM) أو بديلة. إليك مقارنة شاملة.\n\n## القطع الأصلية (OEM)\n\n### المزايا\n- توافق مضمون مع معداتك\n- تغطية ضمان من الشركة المصنعة\n- معايير جودة ثابتة\n\n### العيوب\n- أسعار مرتفعة (غالباً 2-3 أضعاف البديلة)\n- توفر محدود في بعض المناطق\n\n## القطع البديلة\n\n### المزايا\n- توفير كبير في التكلفة (40-60% أقل)\n- توفر أوسع من مصادر متعددة\n\n### العيوب\n- الجودة تتفاوت بشكل كبير\n- تحتاج للتحقق من المواصفات بعناية\n\nفي ريادة فنتشرز، نحصل على قطعنا من مصنعين معتمدين ونقدم ضمانات جودة على جميع القطع البديلة.`,
    image: "/images/equipment/gear-parts.jpg",
    date: "2024-11-10",
    author: "Riyada Engineering Team",
    tags: ["oem", "aftermarket", "fleet", "procurement", "guide"],
    metaTitleEN: "OEM vs Aftermarket Heavy Equipment Parts | Complete Guide",
    metaTitleAR: "قطع أصلية مقابل بديلة للمعدات الثقيلة | دليل كامل",
    metaDescEN: "OEM vs aftermarket parts comparison for heavy equipment. Cost analysis, quality differences, and expert recommendations for fleet managers.",
    metaDescAR: "مقارنة بين القطع الأصلية والبديلة للمعدات الثقيلة. تحليل التكلفة، فروقات الجودة، وتوصيات الخبراء لمديري الأساطيل.",
  },
  {
    id: "4",
    slug: "heavy-equipment-maintenance-schedule-saudi-climate",
    titleEN: "Heavy Equipment Maintenance Schedule for Saudi Arabia's Climate",
    titleAR: "جدول صيانة المعدات الثقيلة لمناخ السعودية",
    excerptEN: "Saudi Arabia's extreme heat and dusty conditions demand modified maintenance schedules. Learn the adjusted intervals that keep your fleet running in harsh desert conditions.",
    excerptAR: "الحرارة الشديدة والظروف المغبرة في السعودية تتطلب جداول صيانة معدلة. تعرف على الفترات المعدلة التي تبقي أسطولك يعمل في ظروف الصحراء القاسية.",
    contentEN: `Operating heavy equipment in Saudi Arabia presents unique challenges. Temperatures exceeding 50°C, fine desert sand, and high humidity in coastal areas all accelerate wear.\n\n## Modified Maintenance Intervals\n\n### Engine Oil\n- Standard interval: 500 hours\n- Saudi adjustment: 350-400 hours\n- Reason: High temperatures break down oil faster\n\n### Air Filters\n- Standard: 500 hours\n- Saudi adjustment: 200-250 hours\n- Reason: Fine desert sand clogs filters rapidly\n\n### Hydraulic Fluid\n- Standard: 2000 hours\n- Saudi adjustment: 1500 hours\n- Reason: Heat reduces fluid viscosity and life\n\n### Coolant System\n- Standard: Annual flush\n- Saudi adjustment: Every 6 months\n- Reason: Cooling systems work harder in extreme heat\n\n## Desert-Specific Practices\n\n1. **Pre-start inspection** every morning before starting\n2. **Radiator cleaning** — blow out sand daily\n3. **Track/tire inspection** — hot surfaces accelerate rubber degradation\n4. **Battery maintenance** — heat reduces battery life significantly\n5. **Cabin air filtration** — change filters monthly\n\nRiyada Ventures maintains a large inventory of filters, fluids, and maintenance parts specifically for the Saudi market. Contact us for bulk maintenance kit pricing.`,
    contentAR: `تشغيل المعدات الثقيلة في السعودية يقدم تحديات فريدة. درجات حرارة تتجاوز 50 درجة مئوية، رمال صحراوية ناعمة، ورطوبة عالية في المناطق الساحلية تسرع التآكل.\n\n## فترات الصيانة المعدلة\n\n### زيت المحرك\n- الفترة القياسية: 500 ساعة\n- التعديل السعودي: 350-400 ساعة\n\n### فلاتر الهواء\n- القياسي: 500 ساعة\n- التعديل السعودي: 200-250 ساعة\n\n### السائل الهيدروليكي\n- القياسي: 2000 ساعة\n- التعديل السعودي: 1500 ساعة\n\nريادة فنتشرز تحتفظ بمخزون كبير من الفلاتر والسوائل وقطع الصيانة خصيصاً للسوق السعودي.`,
    image: "/images/equipment/workshop.jpg",
    date: "2024-10-22",
    author: "Riyada Engineering Team",
    tags: ["maintenance", "saudi", "climate", "schedule", "desert"],
    metaTitleEN: "Heavy Equipment Maintenance Schedule Saudi Arabia | Desert Climate Guide",
    metaTitleAR: "جدول صيانة المعدات الثقيلة في السعودية | دليل المناخ الصحراوي",
    metaDescEN: "Adjusted maintenance schedules for heavy equipment in Saudi Arabia's extreme climate. Modified intervals for oil, filters, hydraulic fluid & more.",
    metaDescAR: "جداول صيانة معدلة للمعدات الثقيلة في مناخ السعودية القاسي. فترات معدلة للزيت والفلاتر والسائل الهيدروليكي.",
  },
]

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug)
}
