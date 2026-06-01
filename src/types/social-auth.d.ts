// Google Identity Services (GIS)
interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (config: GoogleIdConfig) => void;
        prompt: (callback?: (notification: GooglePromptNotification) => void) => void;
        cancel: () => void;
        disableAutoSelect: () => void;
      };
    };
  };
}

interface GoogleIdConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_select?: boolean;
  cancel_on_tap_outside?: boolean;
  nonce?: string;
}

interface GoogleCredentialResponse {
  credential: string;
  select_by: string;
}

interface GooglePromptNotification {
  isDisplayMoment: () => boolean;
  isDisplayed: () => boolean;
  isNotDisplayed: () => boolean;
  getNotDisplayedReason: () => string;
  isSkippedMoment: () => boolean;
  getSkippedReason: () => string;
  isDismissedMoment: () => boolean;
  getDismissedReason: () => string;
  getMomentType: () => string;
}

// Kakao SDK
interface Window {
  Kakao?: KakaoStatic;
}

interface KakaoStatic {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Auth: {
    login: (settings: KakaoLoginSettings) => void;
    logout: (callback?: () => void) => void;
  };
}

interface KakaoLoginSettings {
  success: (authObj: KakaoAuthObj) => void;
  fail: (err: KakaoError) => void;
  persistAccessToken?: boolean;
}

interface KakaoAuthObj {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface KakaoError {
  error: string;
  error_description: string;
}

// Apple Sign In JS SDK
interface Window {
  AppleID?: {
    auth: {
      init: (config: AppleAuthConfig) => void;
      signIn: () => Promise<AppleSignInResponse>;
    };
  };
}

interface AppleAuthConfig {
  clientId: string;
  scope?: string;
  redirectURI: string;
  state?: string;
  nonce?: string;
  usePopup?: boolean;
}

interface AppleSignInResponse {
  authorization: {
    code: string;
    id_token: string;
    state?: string;
  };
  user?: {
    email: string;
    name?: { firstName?: string; lastName?: string };
  };
}
