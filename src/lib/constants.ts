/**
 * Constantes do Mundo News
 */

import { BRAND, NAV_LINKS_BRANDED } from './brand';

export const SITE_NAME = BRAND.name;
export const SITE_TAGLINE = BRAND.tagline;
export const SITE_DESCRIPTION = BRAND.description;

export const NAV_LINKS = NAV_LINKS_BRANDED.map(({ path, label }) => ({ path, label }));

export const CATEGORY_ROUTES: Record<string, string> = {
  brasil: '/brasil',
  mundo: '/mundo',
  opiniao: '/opiniao',
  esporte: '/esporte',
  artigo: '/artigos',
};
