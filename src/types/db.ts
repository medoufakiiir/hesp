// Public-facing data shapes used by client components.
// These are decoupled from Prisma types since the B2B schema differs from what the frontend renders.

export interface ProductData {
  id: string
  slug: string
  nameEN: string
  nameAR: string
  descriptionEN: string
  descriptionAR: string
  image: string
  category: string
  brand: string
  partNumber: string
  inStock: boolean
  featured: boolean
  createdAt?: string
  updatedAt?: string
}

export interface CategoryData {
  id: string
  slug: string
  nameEN: string
  nameAR: string
  image: string
  iconName?: string
  descriptionEN?: string
  descriptionAR?: string
  metaTitleEN?: string
  metaTitleAR?: string
  metaDescEN?: string
  metaDescAR?: string
  keywordsEN?: string[]
  keywordsAR?: string[]
  productCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface BrandData {
  id: string
  slug: string
  name: string
  nameAR: string
  logo?: string
  description?: string
  descriptionAR?: string
  categories?: string[]
  country?: string
  founded?: string
  metaTitleEN?: string
  metaTitleAR?: string
  metaDescEN?: string
  metaDescAR?: string
  createdAt?: string
  updatedAt?: string
}

export interface BlogPostData {
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
  metaTitleEN?: string
  metaTitleAR?: string
  metaDescEN?: string
  metaDescAR?: string
  createdAt?: string
  updatedAt?: string
}

export interface InquiryData {
  id: string
  name: string
  company: string
  phone: string
  email: string
  part?: string
  details: string
  source: string
  status: string
  createdAt?: string
  updatedAt?: string
}
