import type { LegalDoc } from "./types"

// See the note in terms.ts for why this copy lives server-side instead of in
// the next-intl message files.
export const privacyDoc: LegalDoc = {
  title: {
    en: "Privacy Policy",
    ar: "سياسة الخصوصية",
  },
  eyebrow: {
    en: "Legal",
    ar: "الشؤون القانونية",
  },
  lastUpdated: {
    en: "Last updated: July 5, 2026",
    ar: "آخر تحديث: ٥ يوليو ٢٠٢٦م",
  },
  intro: [
    {
      en: "Riyada Ventures (\"we\", \"our\") respects your privacy. This policy explains what personal data we collect through the HESP platform, why we collect it, who we share it with, and the rights you hold over it. We process personal data in accordance with the Saudi Personal Data Protection Law (PDPL — نظام حماية البيانات الشخصية) and its implementing regulations.",
      ar: "تحترم ريادة فنتشرز (\"نحن\") خصوصيتكم. توضح هذه السياسة البيانات الشخصية التي نجمعها عبر منصة HESP، وأسباب جمعها، والجهات التي نشاركها معها، والحقوق التي تملكونها بشأنها. ونعالج البيانات الشخصية وفقاً لنظام حماية البيانات الشخصية في المملكة العربية السعودية ولوائحه التنفيذية.",
    },
    {
      en: "In short: we collect only what we need to answer your inquiries, fulfil your orders, and run the platform. We do not sell personal data, and we do not use it for advertising networks.",
      ar: "باختصار: لا نجمع إلا ما نحتاجه للرد على استفساراتكم وتنفيذ طلباتكم وتشغيل المنصة. ولا نبيع البيانات الشخصية، ولا نستخدمها في شبكات الإعلانات.",
    },
  ],
  sections: [
    {
      heading: { en: "1. Who Controls Your Data", ar: "١. الجهة المتحكمة في بياناتكم" },
      paragraphs: [
        {
          en: "The data controller is Riyada Ventures, Al Faisaliyyah, Riyadh 12882, Kingdom of Saudi Arabia. For anything related to your personal data, contact us at info@riyada-ventures.com.",
          ar: "الجهة المتحكمة في البيانات هي شركة ريادة فنتشرز، الفيصلية، الرياض ١٢٨٨٢، المملكة العربية السعودية. ولأي أمر يتعلق ببياناتكم الشخصية، يمكنكم التواصل معنا عبر البريد الإلكتروني info@riyada-ventures.com.",
        },
      ],
    },
    {
      heading: { en: "2. What We Collect", ar: "٢. البيانات التي نجمعها" },
      paragraphs: [
        {
          en: "We collect personal data in the following situations:",
          ar: "نجمع البيانات الشخصية في الحالات التالية:",
        },
      ],
      bullets: [
        {
          en: "Contact and quote requests — your name, company, phone number, email address, and the details of the parts you ask about, when you submit a form on the platform or message us on WhatsApp.",
          ar: "طلبات التواصل وعروض الأسعار — الاسم، والشركة، ورقم الهاتف، والبريد الإلكتروني، وتفاصيل القطع المطلوبة، عند تعبئة نموذج على المنصة أو مراسلتنا عبر الواتساب.",
        },
        {
          en: "Order and invoicing data — company details, delivery addresses, and payment references needed to fulfil confirmed orders and issue tax invoices.",
          ar: "بيانات الطلبات والفواتير — بيانات الشركة، وعناوين التسليم، ومراجع الدفع اللازمة لتنفيذ الطلبات المؤكدة وإصدار الفواتير الضريبية.",
        },
        {
          en: "Account data — name, business email, and assigned role, for staff and registered business users who are issued platform accounts.",
          ar: "بيانات الحسابات — الاسم، والبريد الإلكتروني للعمل، والدور المخصص، وذلك للموظفين ومستخدمي الشركات المسجلين الذين تُنشأ لهم حسابات على المنصة.",
        },
        {
          en: "Technical data — IP address, browser type, and pages visited, collected automatically in aggregate form to measure site traffic and keep the platform secure.",
          ar: "البيانات التقنية — عنوان IP، ونوع المتصفح، والصفحات التي تمت زيارتها، وتُجمع تلقائياً بشكل مجمّع لقياس حركة الزيارات والحفاظ على أمن المنصة.",
        },
      ],
    },
    {
      heading: { en: "3. Why We Use It", ar: "٣. أغراض المعالجة" },
      paragraphs: [
        {
          en: "We process personal data on the legal bases recognized by the PDPL — your consent, the performance of a contract with you, our legitimate interests in operating a B2B business, and compliance with legal obligations. Specifically, we use your data to:",
          ar: "نعالج البيانات الشخصية استناداً إلى الأسس النظامية المقررة في نظام حماية البيانات الشخصية — وهي موافقتكم، وتنفيذ العقد المبرم معكم، ومصالحنا المشروعة في إدارة نشاط تجاري موجه للأعمال، والامتثال للالتزامات النظامية. وعلى وجه التحديد، نستخدم بياناتكم من أجل:",
        },
      ],
      bullets: [
        { en: "Responding to your inquiries and preparing quotations.", ar: "الرد على استفساراتكم وإعداد عروض الأسعار." },
        { en: "Fulfilling confirmed orders, arranging delivery, and issuing invoices.", ar: "تنفيذ الطلبات المؤكدة وترتيب التسليم وإصدار الفواتير." },
        { en: "Operating and securing platform accounts under role-based access.", ar: "تشغيل حسابات المنصة وتأمينها وفق نظام الصلاحيات القائم على الأدوار." },
        { en: "Understanding, in aggregate, how the site is used so we can improve it.", ar: "فهم كيفية استخدام الموقع بشكل مجمّع بهدف تحسينه." },
        { en: "Meeting record-keeping obligations under Saudi commercial and tax regulations.", ar: "الوفاء بالتزامات حفظ السجلات بموجب الأنظمة التجارية والضريبية السعودية." },
      ],
      note: {
        en: "We do not send marketing messages without your consent, and we never sell or rent personal data to third parties.",
        ar: "لا نرسل رسائل تسويقية دون موافقتكم، ولا نبيع البيانات الشخصية أو نؤجرها لأي طرف ثالث على الإطلاق.",
      },
    },
    {
      heading: { en: "4. Cookies and Analytics", ar: "٤. ملفات تعريف الارتباط والتحليلات" },
      paragraphs: [
        {
          en: "The platform uses essential cookies only where they are needed for the service to function — for example, to keep authorized users signed in to their accounts. For traffic measurement, we record simple, aggregate visit statistics (such as which pages are viewed). We do not use cross-site advertising trackers or social media pixels.",
          ar: "تستخدم المنصة ملفات تعريف الارتباط الضرورية فقط حيثما تتطلبها الخدمة للعمل — مثل إبقاء المستخدمين المصرح لهم في جلساتهم داخل حساباتهم. ولقياس حركة الزيارات، نسجل إحصاءات مجمّعة وبسيطة (مثل الصفحات التي تُعرض). ولا نستخدم أدوات التتبع الإعلانية عبر المواقع ولا وحدات البكسل الخاصة بمنصات التواصل الاجتماعي.",
        },
        {
          en: "You can set your browser to refuse cookies; the public catalog remains fully usable, though account sign-in requires them.",
          ar: "يمكنكم ضبط المتصفح لرفض ملفات تعريف الارتباط، وسيبقى الكتالوج العام قابلاً للاستخدام بالكامل، غير أن تسجيل الدخول إلى الحسابات يتطلبها.",
        },
      ],
    },
    {
      heading: { en: "5. Who We Share Data With", ar: "٥. الجهات التي نشارك البيانات معها" },
      paragraphs: [
        {
          en: "We share personal data only with service providers who help us run the platform, and only to the extent needed:",
          ar: "لا نشارك البيانات الشخصية إلا مع مزودي الخدمات الذين يساعدوننا في تشغيل المنصة، وفي الحدود اللازمة فقط:",
        },
      ],
      bullets: [
        {
          en: "Hosting and infrastructure providers that run the website and its database.",
          ar: "مزودو الاستضافة والبنية التحتية الذين يشغّلون الموقع وقاعدة بياناته.",
        },
        {
          en: "Email delivery services used to send transactional messages such as quotation replies.",
          ar: "خدمات البريد الإلكتروني المستخدمة لإرسال الرسائل التشغيلية مثل الردود على طلبات عروض الأسعار.",
        },
        {
          en: "WhatsApp (Meta), when you choose to contact us through it — governed by Meta's own privacy terms.",
          ar: "واتساب (شركة ميتا)، عندما تختارون التواصل معنا عبره — ويخضع ذلك لشروط الخصوصية الخاصة بشركة ميتا.",
        },
        {
          en: "Delivery carriers, who receive the name, address, and phone number needed to deliver your order.",
          ar: "شركات النقل والتوصيل، التي تتلقى الاسم والعنوان ورقم الهاتف اللازمة لتسليم طلبكم.",
        },
        {
          en: "Government authorities, where disclosure is required by Saudi law.",
          ar: "الجهات الحكومية، متى كان الإفصاح واجباً بموجب الأنظمة السعودية.",
        },
      ],
      note: {
        en: "Some infrastructure providers host data on servers outside the Kingdom. Where personal data is transferred outside Saudi Arabia, we do so only with safeguards consistent with the PDPL's rules on cross-border transfer, and our providers process data solely on our instructions.",
        ar: "يستضيف بعض مزودي البنية التحتية البيانات على خوادم خارج المملكة. وحيثما تُنقل بيانات شخصية إلى خارج المملكة العربية السعودية، فإن ذلك يتم فقط وفق ضمانات تتفق مع أحكام نقل البيانات خارج الحدود في نظام حماية البيانات الشخصية، ويعالج مزودونا البيانات بناءً على تعليماتنا حصراً.",
      },
    },
    {
      heading: { en: "6. How Long We Keep Data", ar: "٦. مدة الاحتفاظ بالبيانات" },
      paragraphs: [
        {
          en: "We keep personal data only as long as it is needed for the purpose it was collected for. Inquiry and quote data is deleted or anonymized once it is no longer needed for follow-up. Order, invoicing, and accounting records are retained for the periods required by Saudi commercial and tax regulations (up to ten years for certain financial records), after which they are securely deleted.",
          ar: "نحتفظ بالبيانات الشخصية للمدة اللازمة لتحقيق الغرض الذي جُمعت من أجله فقط. فبيانات الاستفسارات وعروض الأسعار تُحذف أو تُجعل مجهولة الهوية متى انتفت الحاجة إليها للمتابعة. أما سجلات الطلبات والفواتير والمحاسبة فيُحتفظ بها للمدد التي تفرضها الأنظمة التجارية والضريبية السعودية (وقد تصل إلى عشر سنوات لبعض السجلات المالية)، ثم تُحذف بشكل آمن.",
        },
      ],
    },
    {
      heading: { en: "7. Your Rights", ar: "٧. حقوقكم" },
      paragraphs: [
        {
          en: "Under the PDPL, you have the right to:",
          ar: "يكفل لكم نظام حماية البيانات الشخصية الحقوق التالية:",
        },
      ],
      bullets: [
        { en: "Know how we collect and process your personal data.", ar: "العلم بكيفية جمعنا لبياناتكم الشخصية ومعالجتها." },
        { en: "Request access to, and a copy of, the personal data we hold about you.", ar: "طلب الاطلاع على بياناتكم الشخصية التي نحتفظ بها والحصول على نسخة منها." },
        { en: "Request correction of inaccurate or incomplete data.", ar: "طلب تصحيح البيانات غير الدقيقة أو غير المكتملة." },
        { en: "Request deletion of your data, subject to the legal retention obligations above.", ar: "طلب حذف بياناتكم، مع مراعاة التزامات الاحتفاظ النظامية المذكورة أعلاه." },
        { en: "Withdraw consent at any time, where processing is based on consent.", ar: "سحب الموافقة في أي وقت، متى كانت المعالجة قائمة على الموافقة." },
      ],
      note: {
        en: "To exercise any of these rights, email info@riyada-ventures.com. We respond within the timeframes set by the PDPL's implementing regulations. You also have the right to lodge a complaint with the competent data protection authority in the Kingdom (SDAIA).",
        ar: "لممارسة أي من هذه الحقوق، راسلونا على info@riyada-ventures.com، وسنرد خلال المهل المحددة في اللوائح التنفيذية للنظام. كما يحق لكم تقديم شكوى إلى الجهة المختصة بحماية البيانات في المملكة (الهيئة السعودية للبيانات والذكاء الاصطناعي «سدايا»).",
      },
    },
    {
      heading: { en: "8. How We Protect Data", ar: "٨. كيف نحمي البيانات" },
      paragraphs: [
        {
          en: "We apply technical and organizational safeguards appropriate to the data we handle: encrypted connections (HTTPS) across the platform, role-based access so each user sees only what their role requires, hashed credentials, and access limited to staff who need the data for their work.",
          ar: "نطبّق ضوابط تقنية وتنظيمية تتناسب مع طبيعة البيانات التي نتعامل معها: اتصالات مشفرة (HTTPS) في جميع أجزاء المنصة، وصلاحيات وصول قائمة على الأدوار بحيث لا يطّلع كل مستخدم إلا على ما يتطلبه دوره، وتشفير بيانات الاعتماد، وقصر الوصول على الموظفين الذين تقتضي أعمالهم ذلك.",
        },
      ],
    },
    {
      heading: { en: "9. Changes to This Policy", ar: "٩. التعديلات على هذه السياسة" },
      paragraphs: [
        {
          en: "If we change how we handle personal data, we will update this policy and revise the \"last updated\" date at the top of the page. Material changes will be highlighted on the platform.",
          ar: "إذا غيّرنا طريقة تعاملنا مع البيانات الشخصية، فسنحدّث هذه السياسة ونعدّل تاريخ \"آخر تحديث\" أعلى الصفحة. وسيتم إبراز التغييرات الجوهرية على المنصة.",
        },
      ],
    },
    {
      heading: { en: "10. Contact Us", ar: "١٠. التواصل معنا" },
      paragraphs: [
        {
          en: "For any question about this policy or your personal data: info@riyada-ventures.com · +966 55 228 2868 · Al Faisaliyyah, Riyadh 12882, Kingdom of Saudi Arabia.",
          ar: "لأي استفسار حول هذه السياسة أو بياناتكم الشخصية: info@riyada-ventures.com · ‏‎+966 55 228 2868 · الفيصلية، الرياض ١٢٨٨٢، المملكة العربية السعودية.",
        },
      ],
    },
  ],
}
