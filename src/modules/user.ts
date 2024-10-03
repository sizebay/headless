import api from "../api/index.ts";
import parseBodyShape from "../utils/parse-body-shape.ts";

const EMPTY_USERNAME = "szb-profile-no-name";

async function getUserId(): Promise<string> {
  try {
    const { data } = await api.get("/api/me/session-id");

    return data;
  } catch (_error) {
    return "";
  }
}

/**
 * Retrieves the user's profiles from the API. It'll use the SID from the cookie to authenticate the request.
 * @param params {UserParams}
 * @returns {Promise<SizebayProfile[] | SizebayProfile>}
 */
export async function getUser(
  params?: UserParams
): Promise<SizebayProfile[] | SizebayProfile> {
  try {
    const { data } = await api.get("/api/me");

    if (params?.profileId) {
      return data.catalogUser.find(
        (profile: InternalSizebayProfile) => profile.idView === params.profileId
      );
    }
    return data.catalogUser as SizebayProfile[];
  } catch (_error) {
    return [];
  }
}

/**
 *
 * @param payload
 * @returns {Promise<SizebayProfile>}
 */
export async function sendUser(
  payload: SizebayProfile
): Promise<SizebayProfile | null> {
  try {
    const bodyShapes = {
      bodyShapeChest: parseBodyShape(payload.bodyShapeChest),
      bodyShapeWaist: parseBodyShape(payload.bodyShapeWaist),
      bodyShapeHip: parseBodyShape(payload.bodyShapeHip),
    };

    const sid = await getUserId();

    const builtPayload = {
      id: payload.id || null,
      userId: sid,
      name: EMPTY_USERNAME,
      skinType: 0,
      footShape: null,
      gender: payload.gender.toUpperCase(),
      age: String(payload.age),
      is3dFeel: true,
      weight: String(payload.weight),
      height: String(payload.height),
      product: null,
      measures: { insoleLength: 0, poundWeight: null },
      isMetric: false,
      ...bodyShapes,
    };

    const response = await api.post(
      `/api/me/user/profile?sid=${sid}`,
      builtPayload
    );

    return response.data;
  } catch (_error) {
    console.log(_error);
    return null;
  }
}

export enum SizebayBodyShapes {
  Loose = 5,
  Slighter = 4,
  Normal = 3,
  Tight = 2,
  Tighter = 1,
}

interface UserParams {
  profileId?: string;
}

interface Measures {
  chest: number;
  fist: number;
  hip: number;
  insideLeg: number;
  neck: number;
  sleeve: number;
  underBust: number;
  waist: number;
}

export interface SizebayProfile {
  id?: string;
  height: number;
  weight: number;
  age: number;
  gender: "f" | "m" | "u";
  bodyShapeChest: SizebayBodyShapes;
  bodyShapeWaist: SizebayBodyShapes;
  bodyShapeHip: SizebayBodyShapes;
  measures?: Measures;
}

interface InternalSizebayProfile {
  id: number | null;
  userId: string | null;
  name: string | null;
  gender: string | null;
  skinType: number | null;
  age: number | null;
  weight: number | null;
  height: number | null;
  bodyShapeChest: number | null;
  ignoreGender: boolean;
  bodyShapeWaist: number | null;
  bodyShapeHip: number | null;
  footShape: number | null;
  isActive: number | null;
  lastActiveTime: number | null;
  measures: any | null;
  product: any | null;
  idView: string | null;
  isMetric: boolean;
}
