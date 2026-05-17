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
 * Card type discriminator.
 */
const CARD_TYPES = ['editorialeStandard', 'inlineMini', 'informativa'] as const;
export type CardType = (typeof CARD_TYPES)[number];

/**
 * Type guard: narrows `string` to `CardType`.
 */
export const isCardType = (value: unknown): value is CardType =>
  typeof value === 'string' && (CARD_TYPES as readonly string[]).includes(value);

/**
 * Card data with type field and arbitrary properties.
 * `type` is `string` to accept JSON; validate with `isCardType()` in business logic.
 */
export interface Card extends Record<string, unknown> {
  type: string;
}
