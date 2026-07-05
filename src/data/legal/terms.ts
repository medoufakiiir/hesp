import type { LegalDoc } from "./types"

// Long-form legal copy lives here (server-side) rather than in messages/*.json:
// the locale layout passes the full message catalog to NextIntlClientProvider,
// so anything added there ships in every page's HTML.
export const termsDoc: LegalDoc = {
  title: {
    en: "Terms of Service",
    ar: "شروط الاستخدام",
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
      en: "These terms govern your use of the HESP platform operated by Riyada Ventures (\"we\", \"our\") from Riyadh, Kingdom of Saudi Arabia, and every quotation, order, and delivery made through it. By browsing the platform, requesting a quotation, or placing an order, you agree to these terms. If you are using the platform on behalf of a company, you confirm that you are authorized to bind that company.",
      ar: "تحكم هذه الشروط استخدامكم لمنصة HESP التي تديرها شركة ريادة فنتشرز (\"نحن\") من مدينة الرياض في المملكة العربية السعودية، كما تحكم كل عرض سعر وطلب وعملية تسليم تتم من خلالها. وباستخدامكم للمنصة أو طلب عرض سعر أو تقديم طلب شراء، فإنكم توافقون على هذه الشروط. وإذا كنتم تستخدمون المنصة نيابةً عن شركة، فإنكم تقرّون بأنكم مخوّلون بإلزام تلك الشركة بهذه الشروط.",
    },
    {
      en: "We wrote these terms to be read, not skimmed — they describe how we actually work. If anything is unclear, ask us before ordering; our contact details are at the end.",
      ar: "كتبنا هذه الشروط لتُقرأ لا لتُتجاوز — فهي تصف طريقة عملنا الفعلية. وإذا كان أي بند غير واضح، فلا تترددوا في سؤالنا قبل الطلب؛ وستجدون بيانات التواصل في نهاية هذه الصفحة.",
    },
  ],
  sections: [
    {
      heading: { en: "1. Scope of Service", ar: "١. نطاق الخدمة" },
      paragraphs: [
        {
          en: "Riyada Ventures supplies spare parts for heavy construction and industrial equipment — excavators, bulldozers, cranes, loaders, road machinery, engines, and hydraulic systems — to businesses and equipment operators across the Kingdom of Saudi Arabia. Through the platform you can browse our catalog, request quotations for specific part numbers, and submit purchase orders for genuine OEM and quality aftermarket parts.",
          ar: "توفّر ريادة فنتشرز قطع غيار معدات البناء والمعدات الصناعية الثقيلة — الحفارات والجرافات والرافعات واللودرات ومعدات الطرق والمحركات والأنظمة الهيدروليكية — للشركات ومشغّلي المعدات في جميع أنحاء المملكة العربية السعودية. ويمكنكم من خلال المنصة تصفح الكتالوج، وطلب عروض أسعار لأرقام قطع محددة، وتقديم طلبات شراء لقطع الغيار الأصلية (OEM) والقطع البديلة عالية الجودة.",
        },
        {
          en: "The platform is a business-to-business (B2B) service. It is directed at companies, workshops, fleet operators, and procurement professionals, not at individual consumers.",
          ar: "المنصة خدمة موجهة للأعمال (B2B)، وتستهدف الشركات والورش ومشغّلي الأساطيل ومسؤولي المشتريات، وليست موجهة للمستهلكين الأفراد.",
        },
      ],
    },
    {
      heading: { en: "2. Accounts and Access Roles", ar: "٢. الحسابات وأدوار الوصول" },
      paragraphs: [
        {
          en: "Parts of the platform require an account. Accounts are created and managed by our team — for our staff and, where agreed, for registered business customers. Access is controlled by role-based permissions (such as administrator, manager, marketing, and sales roles), and each user may only use the functions assigned to their role. We may adjust, suspend, or revoke access at any time to protect the platform or its data.",
          ar: "تتطلب بعض أجزاء المنصة حساباً مسجلاً. ويتولى فريقنا إنشاء الحسابات وإدارتها — لموظفينا، وكذلك للعملاء من الشركات المسجلة متى تم الاتفاق على ذلك. ويخضع الوصول إلى المنصة لنظام صلاحيات قائم على الأدوار (مثل أدوار: المشرف العام، والمدير، والتسويق، والمبيعات)، بحيث لا يستخدم كل مستخدم إلا الوظائف المخصصة لدوره. ويحق لنا تعديل الصلاحيات أو تعليقها أو إلغاؤها في أي وقت حمايةً للمنصة وبياناتها.",
        },
        {
          en: "You are responsible for keeping your login credentials confidential and for all activity performed under your account. If you suspect unauthorized use, notify us immediately at info@riyada-ventures.com so we can secure the account.",
          ar: "أنتم مسؤولون عن الحفاظ على سرية بيانات الدخول الخاصة بكم وعن جميع الأنشطة التي تتم عبر حسابكم. وفي حال الاشتباه بأي استخدام غير مصرح به، يرجى إبلاغنا فوراً عبر البريد الإلكتروني info@riyada-ventures.com لنتمكن من تأمين الحساب.",
        },
      ],
    },
    {
      heading: { en: "3. Product Information and Compatibility", ar: "٣. معلومات المنتجات والتوافق" },
      paragraphs: [
        {
          en: "We work hard to keep part numbers, specifications, images, and availability accurate and current. That said, catalog data comes from many manufacturers and suppliers, and errors or outdated entries can occur. Product images may show representative or generic items rather than the exact unit you will receive.",
          ar: "نحرص على أن تكون أرقام القطع والمواصفات والصور وحالة التوفر دقيقة ومحدّثة باستمرار. ومع ذلك، فإن بيانات الكتالوج تَرِد من عدد كبير من المصنّعين والموردين، وقد تتضمن أخطاء أو معلومات متقادمة. كما قد تعرض صور المنتجات نماذج تمثيلية أو عامة وليست بالضرورة القطعة ذاتها التي ستستلمونها.",
        },
      ],
      note: {
        en: "Verifying that a part fits your specific machine — model, serial number, and year of manufacture — is your responsibility as the buyer. Our team will gladly help you cross-reference part numbers, but the final confirmation before ordering rests with you.",
        ar: "التحقق من توافق القطعة مع معدّتكم تحديداً — من حيث الطراز والرقم التسلسلي وسنة الصنع — هو مسؤوليتكم بصفتكم المشتري. يسعد فريقنا بمساعدتكم في مطابقة أرقام القطع، غير أن التأكيد النهائي قبل الطلب يقع على عاتقكم.",
      },
    },
    {
      heading: { en: "4. Ordering and Quotations", ar: "٤. الطلبات وعروض الأسعار" },
      paragraphs: [
        {
          en: "Submitting a quote request or inquiry through the platform is not a binding order. We review each request and reply with a formal quotation covering price, availability, and estimated lead time. A binding contract is formed only when you confirm the quotation and we accept your order — normally in writing by email or WhatsApp.",
          ar: "إن تقديم طلب عرض سعر أو استفسار عبر المنصة لا يُعدّ طلب شراء ملزماً. فنحن ندرس كل طلب ونرد عليه بعرض سعر رسمي يشمل السعر وحالة التوفر والمدة التقديرية للتوريد. ولا ينعقد العقد الملزم إلا بتأكيدكم لعرض السعر وقبولنا للطلب — ويكون ذلك عادةً كتابياً عبر البريد الإلكتروني أو الواتساب.",
        },
        {
          en: "Quotations are valid for the period stated on them; if no period is stated, they remain valid for seven (7) days. Prices in quotations may need revision if supplier pricing, freight costs, or exchange rates change before confirmation. We may decline an order at our reasonable discretion — for example where a part is discontinued, unavailable, or was quoted at a clearly erroneous price.",
          ar: "تسري عروض الأسعار للمدة المحددة فيها، فإن لم تُحدد مدة فتبقى سارية لمدة سبعة (٧) أيام. وقد تستلزم الأسعار الواردة في العرض مراجعةً إذا تغيّرت أسعار الموردين أو تكاليف الشحن أو أسعار الصرف قبل التأكيد. ويحق لنا رفض أي طلب وفق تقديرنا المعقول — كأن تكون القطعة قد أُوقف إنتاجها أو غير متوفرة أو وردت في العرض بسعر خاطئ بشكل ظاهر.",
        },
      ],
    },
    {
      heading: { en: "5. Pricing and Payment", ar: "٥. الأسعار والدفع" },
      paragraphs: [
        {
          en: "Prices are quoted in Saudi Riyals (SAR) unless stated otherwise, and are exclusive of value-added tax (VAT), which is added at the rate applicable in the Kingdom at the time of invoicing.",
          ar: "تُحدد الأسعار بالريال السعودي ما لم يُنص على خلاف ذلك، وهي غير شاملة لضريبة القيمة المضافة التي تُضاف وفق النسبة المعمول بها في المملكة عند إصدار الفاتورة.",
        },
        {
          en: "Payment terms are stated on the quotation or invoice. For new customers, payment is typically by bank transfer in advance of shipment; approved credit terms may be offered to established accounts. Ownership of the goods passes to you upon receipt of full payment.",
          ar: "تُحدد شروط الدفع في عرض السعر أو الفاتورة. وبالنسبة للعملاء الجدد، يكون الدفع عادةً بالتحويل البنكي قبل الشحن، فيما يمكن منح تسهيلات ائتمانية معتمدة للحسابات ذات التعامل القائم. ولا تنتقل ملكية البضاعة إليكم إلا بعد سداد كامل قيمتها.",
        },
      ],
    },
    {
      heading: { en: "6. Shipping and Delivery within the Kingdom", ar: "٦. الشحن والتسليم داخل المملكة" },
      paragraphs: [
        {
          en: "We deliver across the Kingdom of Saudi Arabia. Delivery times shown on quotations are good-faith estimates: parts held in local stock typically ship within a few business days, while imported or special-order parts depend on manufacturer and customs lead times, which are outside our direct control. We will keep you informed of any material delay.",
          ar: "نقوم بالتوصيل إلى جميع مناطق المملكة العربية السعودية. ومدد التسليم المذكورة في عروض الأسعار هي تقديرات بحسن نية: فالقطع المتوفرة في مخزوننا المحلي تُشحن عادةً خلال أيام عمل قليلة، بينما تعتمد القطع المستوردة أو المطلوبة خصيصاً على مدد التوريد لدى المصنّع وإجراءات الجمارك، وهي أمور خارجة عن سيطرتنا المباشرة. وسنحرص على إبلاغكم بأي تأخير جوهري.",
        },
        {
          en: "Risk in the goods passes to you upon delivery. Please inspect every shipment on receipt and report any damage, shortage, or discrepancy within forty-eight (48) hours of delivery so we can resolve it with the carrier and our suppliers.",
          ar: "تنتقل مسؤولية هلاك البضاعة أو تلفها إليكم عند التسليم. يرجى فحص كل شحنة فور استلامها وإبلاغنا بأي تلف أو نقص أو اختلاف خلال ثمانٍ وأربعين (٤٨) ساعة من التسليم لنتمكن من معالجة الأمر مع شركة النقل وموردينا.",
        },
      ],
    },
    {
      heading: { en: "7. Returns and Warranty", ar: "٧. الإرجاع والضمان" },
      paragraphs: [
        {
          en: "Where a manufacturer offers a warranty on a part, we pass that warranty through to you and will assist you with the claim process. We do not offer warranties of our own beyond the manufacturer's warranty. Warranty coverage does not extend to normal wear items, damage from misuse or incorrect installation, or parts that have been modified after delivery.",
          ar: "متى وفّر المصنّع ضماناً على القطعة، فإننا ننقل هذا الضمان إليكم ونساعدكم في إجراءات المطالبة به. ولا نقدم ضمانات إضافية من طرفنا تتجاوز ضمان المصنّع. ولا يشمل الضمان القطع الاستهلاكية المعرضة للتآكل الطبيعي، أو الأضرار الناتجة عن سوء الاستخدام أو التركيب الخاطئ، أو القطع التي جرى تعديلها بعد التسليم.",
        },
        {
          en: "Returns of locally stocked items may be accepted within fourteen (14) days of delivery, provided the part is unused, in its original packaging, and accompanied by the invoice. A restocking fee may apply. Items found defective on arrival are replaced or refunded at no cost to you.",
          ar: "يجوز قبول إرجاع القطع المتوفرة في مخزوننا المحلي خلال أربعة عشر (١٤) يوماً من التسليم، شريطة أن تكون القطعة غير مستخدمة وفي عبوتها الأصلية ومرفقة بالفاتورة، وقد تُطبق رسوم إعادة تخزين. أما القطع التي يثبت أنها معيبة عند الاستلام فتُستبدل أو يُرد ثمنها دون أي تكلفة عليكم.",
        },
      ],
      note: {
        en: "Special-order and imported items — parts we source specifically for your request — are non-returnable and non-refundable, except where they arrive defective or do not match what was quoted.",
        ar: "القطع المطلوبة خصيصاً والقطع المستوردة — أي القطع التي نوفرها بناءً على طلبكم تحديداً — غير قابلة للإرجاع أو الاسترداد، إلا إذا وصلت معيبة أو مخالفة لما ورد في عرض السعر.",
      },
    },
    {
      heading: { en: "8. Limitation of Liability", ar: "٨. حدود المسؤولية" },
      paragraphs: [
        {
          en: "To the maximum extent permitted by law, our total liability for any claim arising from an order is limited to the amount you actually paid for the part or parts concerned. We are not liable for indirect or consequential losses — including machine downtime, lost production, lost profits, or lost contracts — even if we were advised of the possibility of such losses.",
          ar: "إلى أقصى حد يجيزه النظام، تنحصر مسؤوليتنا الإجمالية عن أي مطالبة ناشئة عن أي طلب في المبلغ الذي دفعتموه فعلياً مقابل القطعة أو القطع محل المطالبة. ولا نتحمل المسؤولية عن الأضرار غير المباشرة أو التبعية — بما في ذلك توقف المعدات، أو خسارة الإنتاج، أو فوات الأرباح، أو خسارة العقود — حتى لو أُبلغنا باحتمال وقوعها.",
        },
        {
          en: "Nothing in these terms excludes or limits any liability that cannot be excluded or limited under the laws of the Kingdom of Saudi Arabia.",
          ar: "ليس في هذه الشروط ما يستبعد أو يقيّد أي مسؤولية لا يجوز استبعادها أو تقييدها بموجب أنظمة المملكة العربية السعودية.",
        },
      ],
    },
    {
      heading: { en: "9. Intellectual Property", ar: "٩. الملكية الفكرية" },
      paragraphs: [
        {
          en: "The platform's content — design, text, graphics, and the compilation of our catalog — belongs to Riyada Ventures and may not be reproduced without our written permission.",
          ar: "محتوى المنصة — من تصميم ونصوص ورسومات وتجميعٍ لبيانات الكتالوج — مملوك لريادة فنتشرز، ولا يجوز إعادة إنتاجه دون إذن كتابي منا.",
        },
        {
          en: "Manufacturer names, logos, and original part numbers appearing on the platform — including CAT (Caterpillar), Komatsu, Volvo, JCB, Hitachi, John Deere, Liebherr, Doosan, Hyundai, and others — are trademarks of their respective owners. They are used solely to identify parts and indicate compatibility. Riyada Ventures is an independent parts supplier and, unless expressly stated otherwise, is not an authorized dealer, agent, or affiliate of any of these manufacturers.",
          ar: "أسماء الشركات المصنّعة وشعاراتها وأرقام القطع الأصلية الواردة في المنصة — بما فيها كاتربيلر (CAT) وكوماتسو وفولفو وJCB وهيتاشي وجون دير وليبهر ودوسان وهيونداي وغيرها — هي علامات تجارية مملوكة لأصحابها. وتُستخدم هذه الأسماء حصراً لأغراض تحديد القطع وبيان توافقها. وريادة فنتشرز مورد مستقل لقطع الغيار، وليست — ما لم يُنص صراحةً على خلاف ذلك — وكيلاً معتمداً أو موزعاً رسمياً أو جهة تابعة لأي من هؤلاء المصنّعين.",
        },
      ],
    },
    {
      heading: { en: "10. Governing Law and Jurisdiction", ar: "١٠. القانون الواجب التطبيق والاختصاص القضائي" },
      paragraphs: [
        {
          en: "These terms, and every quotation and order made under them, are governed by the laws and regulations of the Kingdom of Saudi Arabia. Any dispute that cannot be resolved amicably shall be referred to the competent courts and judicial committees in the city of Riyadh.",
          ar: "تخضع هذه الشروط، وكل عرض سعر وطلب يتم بموجبها، لأنظمة ولوائح المملكة العربية السعودية. وأي نزاع يتعذر حله ودياً يُحال إلى المحاكم واللجان القضائية المختصة في مدينة الرياض.",
        },
      ],
    },
    {
      heading: { en: "11. Changes to These Terms", ar: "١١. تعديل هذه الشروط" },
      paragraphs: [
        {
          en: "We may update these terms from time to time — for example when our services, regulations, or business practices change. The \"last updated\" date at the top of this page reflects the current version. Changes apply from the date they are published and do not affect orders already confirmed. Your continued use of the platform after an update constitutes acceptance of the revised terms.",
          ar: "قد نقوم بتحديث هذه الشروط من وقت لآخر — كأن تتغير خدماتنا أو الأنظمة أو ممارسات عملنا. ويعكس تاريخ \"آخر تحديث\" أعلى هذه الصفحة النسخة السارية. وتسري التعديلات اعتباراً من تاريخ نشرها، ولا تمس الطلبات المؤكدة قبل ذلك. ويُعدّ استمراركم في استخدام المنصة بعد التحديث قبولاً بالشروط المعدّلة.",
        },
      ],
    },
    {
      heading: { en: "12. Contact", ar: "١٢. التواصل" },
      paragraphs: [
        {
          en: "Questions about these terms? Reach us at info@riyada-ventures.com, by phone or WhatsApp on +966 55 228 2868, or at our office: Al Faisaliyyah, Riyadh 12882, Kingdom of Saudi Arabia.",
          ar: "لأي استفسار حول هذه الشروط، يمكنكم مراسلتنا عبر البريد الإلكتروني info@riyada-ventures.com، أو الاتصال والواتساب على الرقم ‎+966 55 228 2868، أو زيارة مكتبنا: الفيصلية، الرياض ١٢٨٨٢، المملكة العربية السعودية.",
        },
      ],
    },
  ],
}
