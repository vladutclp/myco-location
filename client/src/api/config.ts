const ALLOWED_PROTOCOLS = ["http:", "https:"];

export const PARSE_API_BASE_URL_ERROR_MESSAGE =
  "VITE_API_BASE_URL is missing or invalid";

export const parseApiBaseUrl = (rawURL: unknown): string => {
  if (typeof rawURL !== "string") {
    throw new Error(PARSE_API_BASE_URL_ERROR_MESSAGE);
  }

  try {
    const url = new URL(rawURL);
    const isInvalidProtocol = !ALLOWED_PROTOCOLS.includes(url.protocol);

    if (isInvalidProtocol) {
      throw new Error(PARSE_API_BASE_URL_ERROR_MESSAGE);
    }

    let parsedUrl = url.href;

    while (parsedUrl.endsWith("/")) {
      parsedUrl = parsedUrl.slice(0, -1);
    }
    return parsedUrl;
  } catch {
    throw new Error(PARSE_API_BASE_URL_ERROR_MESSAGE);
  }
};

export const BASE_API = parseApiBaseUrl(import.meta.env.VITE_API_BASE_URL);
