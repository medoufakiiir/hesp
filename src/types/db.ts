import type { Product, Category, Brand, BlogPost, Inquiry } from "@prisma/client"

export type ProductData = Omit<Product, "createdAt" | "updatedAt"> & {
  createdAt?: string
  updatedAt?: string
}

export type CategoryData = Omit<Category, "createdAt" | "updatedAt"> & {
  createdAt?: string
  updatedAt?: string
}

export type BrandData = Omit<Brand, "createdAt" | "updatedAt"> & {
  createdAt?: string
  updatedAt?: string
}

export type BlogPostData = Omit<BlogPost, "createdAt" | "updatedAt"> & {
  createdAt?: string
  updatedAt?: string
}

export type InquiryData = Omit<Inquiry, "createdAt" | "updatedAt"> & {
  createdAt?: string
  updatedAt?: string
}
