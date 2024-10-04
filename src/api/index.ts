import axios, { InternalAxiosRequestConfig } from "npm:axios";
import { getCookies } from "@std/http/cookie";
import "jsr:@std/dotenv/load";

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

  const headers = new Headers();
  const cookies = getCookies(headers);

  if (cookies.sid) {
    config.params.sid = cookies.sid;
  }

  config.headers = {
    ...config.headers,
    tenant_id: cookies.tenantId,
    device: getCurrentDevice(),
    "x-szb-tenant-id": cookies.tenantId,
    "x-szb-device": getCurrentDevice(),
    "x-szb-country": cookies.countryValue! || null,
  } as InternalAxiosRequestConfig["headers"] & SizebayHeaders;

  return config;
});

export default api;
