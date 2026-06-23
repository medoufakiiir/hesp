export const cinematicText = {
  EN: {
    loading: {
      tagline: "Initializing supply chain visibility...",
    },
    hero: {
      frames: [
        { headline: "Your Fleet's\nLifeline", sub: "Premium OEM spare parts for every machine in your fleet" },
        { headline: "Parts That\nMove Earth", sub: "Bulldozer components engineered to outlast the toughest terrain" },
        { headline: "Precision\nLifting Power", sub: "Crane and lifting components trusted on Saudi mega-projects" },
        { headline: "Built for\nSaudi Terrain", sub: "Loader parts tested against desert heat and sandstorms" },
        { headline: "48-Hour\nDelivery Promise", sub: "From our Riyadh warehouse to your site — fast" },
        { headline: "Road\nConstruction", sub: "Grader and compactor parts keeping Saudi roads moving" },
        { headline: "Engineering\nExcellence", sub: "Hydraulic systems with zero-defect precision" },
        { headline: "Your Trusted\nPartner", sub: "15+ years powering Saudi Arabia's construction backbone" },
      ],
    },
    stats: {
      items: [
        { value: 1200, suffix: "+", label: "Parts Delivered" },
        { value: 99.2, suffix: "%", label: "On-Time Rate" },
        { display: "48hr", label: "Average Lead Time" },
      ],
    },
    twoWorlds: {
      title: "The Procurement Gap",
      sub: "See the difference a specialized parts partner makes",
      toggleWithout: "Without Riyada",
      toggleWith: "With Riyada",
      without: [
        { time: "Day 1", text: "Part failure detected on excavator", status: "CRITICAL", type: "critical" as const },
        { time: "Day 3", text: "Start sourcing globally — dozens of calls", status: "SEARCHING", type: "pending" as const },
        { time: "Day 14", text: "Quote received, price unclear, specs unverified", status: "PENDING", type: "pending" as const },
        { time: "Day 28", text: "Part arrives — wrong specification", status: "FAILED", type: "critical" as const },
        { time: "Day 35+", text: "Reorder. More downtime. Revenue lost.", status: "DELAYED", type: "critical" as const },
      ],
      with: [
        { time: "Hour 0", text: "Part failure detected — reported to Riyada", status: "REPORTED", type: "pending" as const },
        { time: "Hour 2", text: "OEM-verified quote confirmed with specs", status: "CONFIRMED", type: "success" as const },
        { time: "Hour 8", text: "Part dispatched from Riyadh warehouse", status: "SHIPPED", type: "success" as const },
        { time: "Day 2", text: "Correct part installed, machine operational", status: "DELIVERED", type: "success" as const },
        { time: "Day 2", text: "Fleet back online — zero revenue loss", status: "RESOLVED", type: "success" as const },
      ],
    },
    closingCta: {
      headline: "Ready to Cut\nYour Downtime?",
      sub: "Get a verified quote within 2 hours. No guesswork.",
      cta: "Request a Quote",
    },
  },
  AR: {
    loading: {
      tagline: "جاري تهيئة رؤية سلسلة التوريد...",
    },
    hero: {
      frames: [
        { headline: "شريان الحياة\nلأسطولك", sub: "قطع غيار أصلية متميزة لكل آلة في أسطولك" },
        { headline: "قطع تحرك\nالأرض", sub: "مكونات جرافات مصممة لتتحمل أقسى التضاريس" },
        { headline: "قوة الرفع\nبدقة عالية", sub: "مكونات رافعات موثوقة في المشاريع الكبرى بالسعودية" },
        { headline: "صُنعت\nللتضاريس السعودية", sub: "قطع لودرات مختبرة ضد حرارة الصحراء والعواصف الرملية" },
        { headline: "وعد التوصيل\nخلال ٤٨ ساعة", sub: "من مستودعنا في الرياض إلى موقعك — بسرعة" },
        { headline: "إنشاء\nالطرق", sub: "قطع غيار معدات تمهيد وهراسات تحافظ على حركة الطرق" },
        { headline: "تميز\nهندسي", sub: "أنظمة هيدروليكية بدقة خالية من العيوب" },
        { headline: "شريكك\nالموثوق", sub: "+١٥ سنة في دعم العمود الفقري للبناء في السعودية" },
      ],
    },
    stats: {
      items: [
        { value: 1200, suffix: "+", label: "قطعة تم توصيلها" },
        { value: 99.2, suffix: "%", label: "نسبة التسليم في الوقت" },
        { display: "٤٨ ساعة", label: "متوسط وقت التسليم" },
      ],
    },
    twoWorlds: {
      title: "فجوة التوريد",
      sub: "شاهد الفرق الذي يصنعه شريك قطع غيار متخصص",
      toggleWithout: "بدون ريادة",
      toggleWith: "مع ريادة",
      without: [
        { time: "اليوم ١", text: "اكتشاف عطل في الحفارة", status: "حرج", type: "critical" as const },
        { time: "اليوم ٣", text: "بدء البحث عالمياً — عشرات المكالمات", status: "بحث", type: "pending" as const },
        { time: "اليوم ١٤", text: "استلام عرض سعر غير واضح والمواصفات غير مؤكدة", status: "معلق", type: "pending" as const },
        { time: "اليوم ٢٨", text: "وصول القطعة — مواصفات خاطئة", status: "فشل", type: "critical" as const },
        { time: "اليوم ٣٥+", text: "إعادة الطلب. مزيد من التوقف. خسارة الإيرادات.", status: "تأخير", type: "critical" as const },
      ],
      with: [
        { time: "الساعة ٠", text: "اكتشاف العطل — إبلاغ ريادة", status: "مُبلغ", type: "pending" as const },
        { time: "الساعة ٢", text: "تأكيد عرض سعر معتمد OEM مع المواصفات", status: "مؤكد", type: "success" as const },
        { time: "الساعة ٨", text: "شحن القطعة من مستودع الرياض", status: "تم الشحن", type: "success" as const },
        { time: "اليوم ٢", text: "تركيب القطعة الصحيحة، الآلة تعمل", status: "تم التسليم", type: "success" as const },
        { time: "اليوم ٢", text: "الأسطول يعمل — صفر خسائر", status: "تم الحل", type: "success" as const },
      ],
    },
    closingCta: {
      headline: "جاهز لتقليل\nوقت التوقف؟",
      sub: "احصل على عرض سعر مؤكد خلال ساعتين. بدون تخمين.",
      cta: "اطلب عرض سعر",
    },
  },
} as const

export type CinematicLang = typeof cinematicText.EN
