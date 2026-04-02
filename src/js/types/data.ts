/**
 * Type definitions for homepage.json
 * Auto-generated from the JSON import
 */

import type homepageData from '@/js/pages/homepage.json';

export type HomepageData = typeof homepageData;

/**
 * Typed template data for render() function.
 * Supports both string values and nested objects/arrays.
 */
export type TemplateData = Record<string, string | number | boolean | null | undefined>;

/**
 * Card data with type field and arbitrary properties.
 */
export interface Card extends Record<string, unknown> {
  type: string;
}
