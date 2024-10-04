import api from "../api/index.ts";

/**
 * Get the recommendation for a product
 * @param productId - The product id
 * @param tenantId - The tenant id
 * @returns The recommendation for the product
 * @throws If the request fails
 */
export default async function getRecommendation(
  productId: number,
  tenantId: number
) {
  try {
    const { data } = await api.get(
      `/api/me/analysis/${productId}?page-recommendation=false&tenant=${tenantId}`
    );

    return data as SizebayRecommendation;
  } catch (_error) {
    console.log(_error);
    return false;
  }
}

type SizeName = string;
type Measure =
  | "height"
  | "weight"
  | "chest"
  | "waist"
  | "hip"
  | "sleeve"
  | "insideLeg"
  | "neck"
  | "length"
  | "fist"
  | "biceps"
  | "underBust"
  | "thigh"
  | "headCircumference"
  | "palm"
  | "wrist"
  | "insoleLength"
  | "insoleWidth";

type MeasuresList = {
  [key in Measure]: {
    value: number | null;
    suitable: false;
    comfort: number | null;
    aptitudeGrade: number | null;
  };
};

interface Analysis {
  [key: SizeName]: MeasuresList;
}

export interface SizebayRecommendation {
  analysis: Analysis;
  recommendedSize: string;
}
