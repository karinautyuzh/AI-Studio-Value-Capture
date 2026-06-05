import { CalculatorInputs } from '../types';

export function calcCountryHoursSavedPerDoc(inputs: CalculatorInputs): number {
  return inputs.countryBaseline * (inputs.countryTargetReduction / 100);
}

export function calcCountryAnnualHoursSaved(inputs: CalculatorInputs): number {
  return calcCountryHoursSavedPerDoc(inputs) * inputs.countryAnnualVolume;
}

export function calcSiteHoursSavedPerDoc(inputs: CalculatorInputs): number {
  return inputs.siteBaseline * (inputs.siteTargetReduction / 100);
}

export function calcSiteAnnualHoursSaved(inputs: CalculatorInputs): number {
  return calcSiteHoursSavedPerDoc(inputs) * inputs.siteAnnualVolume;
}

export function calcTotalAnnualHoursSaved(inputs: CalculatorInputs): number {
  return calcCountryAnnualHoursSaved(inputs) + calcSiteAnnualHoursSaved(inputs);
}

export function calcQETotalBaseline(inputs: CalculatorInputs): number {
  return inputs.qeCriticalCount + inputs.qeMajorCount + inputs.qeMinorCount;
}

export function calcQEBaselineCost(inputs: CalculatorInputs): number {
  return (
    inputs.qeCriticalCount * inputs.qeCriticalCost +
    inputs.qeMajorCount * inputs.qeMajorCost +
    inputs.qeMinorCount * inputs.qeMinorCost
  );
}

export function calcQEsAvoided(inputs: CalculatorInputs): number {
  return calcQETotalBaseline(inputs) * (inputs.qeTargetReduction / 100);
}

export function calcQEDollarValue(inputs: CalculatorInputs): number {
  return calcQEBaselineCost(inputs) * (inputs.qeTargetReduction / 100);
}

export function calcTotalHardValue(inputs: CalculatorInputs): number {
  return calcTotalAnnualHoursSaved(inputs) * inputs.hourlyRate + calcQEDollarValue(inputs);
}

export function calcEndToEndDaysSaved(inputs: CalculatorInputs): number {
  return inputs.endToEndBaseline * (inputs.endToEndTargetReduction / 100);
}

export function calcAnnualDaysSaved(inputs: CalculatorInputs): number {
  return calcEndToEndDaysSaved(inputs) * inputs.annualStudyVolume;
}

export function calcWeightedValueScore(
  categories: Array<{ projectedScore: number; actualScore: number; weight: number }>
): { projected: number; actual: number } {
  const totalWeight = categories.reduce((s, c) => s + c.weight, 0);
  const projected = categories.reduce((s, c) => s + (c.projectedScore * c.weight) / totalWeight, 0);
  const actual = categories.reduce((s, c) => s + (c.actualScore * c.weight) / totalWeight, 0);
  return { projected: Math.round(projected), actual: Math.round(actual) };
}
