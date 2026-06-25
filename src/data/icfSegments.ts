import { IcfSegment } from '../types';

export const defaultIcfSegments: IcfSegment[] = [
  { id: 'country-main-non-eu',       name: 'Country Main – Non-EU',       category: 'country-main',       icfsPerYear: 1392,  casHoursPerIcf: 20.2, potentialAiImpactPct: 50, adoptionPct: 70 },
  { id: 'country-main-eu',           name: 'Country Main – EU',           category: 'country-main',       icfsPerYear: 1413,  casHoursPerIcf: 10.0, potentialAiImpactPct: 50, adoptionPct: 70 },
  { id: 'country-additional-non-eu', name: 'Country Additional – Non-EU', category: 'country-additional', icfsPerYear: 2163,  casHoursPerIcf: 13.6, potentialAiImpactPct: 50, adoptionPct: 70 },
  { id: 'country-additional-eu',     name: 'Country Additional – EU',     category: 'country-additional', icfsPerYear: 2742,  casHoursPerIcf: 4.0,  potentialAiImpactPct: 50, adoptionPct: 70 },
  { id: 'country-amendment-non-eu',  name: 'Country Amendment – Non-EU',  category: 'country-amendment',  icfsPerYear: 9060,  casHoursPerIcf: 4.8,  potentialAiImpactPct: 50, adoptionPct: 70 },
  { id: 'country-amendment-eu',      name: 'Country Amendment – EU',      category: 'country-amendment',  icfsPerYear: 12659, casHoursPerIcf: 2.0,  potentialAiImpactPct: 50, adoptionPct: 70 },
  { id: 'site-initial',              name: 'Site Initial',                     category: 'site-initial',       icfsPerYear: 20799, casHoursPerIcf: 5.0,  potentialAiImpactPct: 50, adoptionPct: 70 },
  { id: 'site-amendment',            name: 'Site Amendment',                   category: 'site-amendment',     icfsPerYear: 64916, casHoursPerIcf: 1.0,  potentialAiImpactPct: 50, adoptionPct: 70 },
];
