import getUserId from "./id.ts";

/**
 * Initializes basic Sizebay SDK configurations.
 */
export default async function init(config: SizebaySDKConfig) {
  if (!window) {
    throw new Error("This function must be called in the browser environment");
  }

  window.SizebaySDK = {
    userId: config.userId ?? (await getUserId()),
    tenantId: config.tenantId,
    country: config.country ?? "BR",
    version: "1.0.0",
  };

  window.SizebaySDK = window.SizebaySDK || {};

  return new Promise((resolve) => {
    resolve(window.SizebaySDK);
  });
}

declare global {
  interface Window {
    SizebaySDK: SizebaySDKConfig;
    postMessage(message: string, targetOrigin: string): void;
    addEventListener(
      type: string,
      listener: any,
      options?: any
    ): void;
  }
}

interface SizebaySDKConfig {
  tenantId: number;
  userId?: string;
  country?: string;
  version?: string;
}
