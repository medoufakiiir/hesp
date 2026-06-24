# TODO
- [ ] Update `src/app/admin/analytics/page.tsx` to compute real analytics from B2B `Quote`/`QuoteItem`/`Invoice` schema.
- [ ] Map quote statuses to analytics pipeline buckets (New/Contacted/Quoted/Closed) and compute last 7/30 days.
- [ ] Compute “Top Requested Categories” and “Top Requested Brands” from `QuoteItem` joined to `Part -> Category/Brand`.
- [ ] Compute recent RFQs list for the table using `Quote` + `Company` + derived category/brand.
- [ ] Run `npm run lint` and `npm run build` to verify compilation.


