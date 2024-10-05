import axios, { InternalAxiosRequestConfig } from "npm:axios";

class Device {
  static isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  static isTablet = /iPad/i.test(navigator.userAgent);
}

interface SizebayHeaders {
  tenant_id: string;
  device: string;
  "x-szb-tenant-id": string;
  "x-szb-device": string;
  "x-szb-country": string | null;
}

export const getCurrentDevice = () => {
  const isApp = (window.navigator as any).standalone === true;

  if (Device.isMobile && !isApp) return "mobile";
  if (isApp) return "app";
  if (Device.isTablet) return "tablet";

  return "desktop";
};

const api = axios.create({
  baseURL: Deno.env.get("SIZEBAY_PROD_URL"),
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.params = config.params || {};

  let tenantId;
  let countryValue;

  if (window.SizebaySDK) {
    config.params.sid = window.SizebaySDK.userId;
    tenantId = window.SizebaySDK.tenantId;
    countryValue = window.SizebaySDK.country;
  }

  config.headers = {
    ...config.headers,
    tenant_id: String(tenantId),
    device: getCurrentDevice(),
    "x-szb-tenant-id": String(tenantId),
    "x-szb-device": getCurrentDevice(),
    "x-szb-country": countryValue!,
  } as InternalAxiosRequestConfig["headers"] & SizebayHeaders;

  return config;
});

export default api;
