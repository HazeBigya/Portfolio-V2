/**
 * Projects live in the single CV data source (`data/cv.ts`). This module
 * re-exports them so existing relative imports keep working.
 */
export type { Project } from "../data/cv"
export { PROJECTS } from "../data/cv"
