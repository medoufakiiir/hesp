/** A bilingual string — every piece of legal copy carries both languages. */
export interface Bi {
  en: string
  ar: string
}

export interface LegalSection {
  heading: Bi
  paragraphs: Bi[]
  bullets?: Bi[]
  /** Emphasized callout rendered in an amber-bordered box (key disclaimers). */
  note?: Bi
}

export interface LegalDoc {
  title: Bi
  eyebrow: Bi
  lastUpdated: Bi
  intro: Bi[]
  sections: LegalSection[]
}
