import { createNavigation } from "next-intl/navigation"
import { routing } from "./routing"

// Locale-aware Link/router/redirect wrappers — kept here for Task 2 (the
// language switcher and any internal links will adopt these). Not wired
// into any component yet.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
