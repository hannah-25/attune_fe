// Google Identity Services (GIS)
interface Window {
  google?: {
    accounts: {
      id: {
        initialize: (config: GoogleIdConfig) => void;
        renderButton: (parent: HTMLElement, options: GoogleButtonConfig) => void;
        prompt: (callback?: (notification: GooglePromptNotification) => void) => void;
        cancel: () => void;
        disableAutoSelect: () => void;
      };
      oauth2?: {
        initCodeClient: (config: GoogleCodeClientConfig) => GoogleCodeClient;
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

interface GoogleButtonConfig {
  type?: 'standard' | 'icon';
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  logo_alignment?: 'left' | 'center';
  width?: number;
  locale?: string;
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

interface GoogleCodeClientConfig {
  client_id: string;
  scope: string;
  callback: (response: GoogleCodeResponse) => void;
  ux_mode?: 'popup' | 'redirect';
  redirect_uri?: string;
  state?: string;
  include_granted_scopes?: boolean;
  prompt?: string;
}

interface GoogleCodeClient {
  requestCode: () => void;
}

interface GoogleCodeResponse {
  code?: string;
  scope?: string;
  state?: string;
  error?: string;
  error_description?: string;
  error_uri?: string;
}

// Kakao SDK
interface Window {
  Kakao?: KakaoStatic;
}

interface KakaoStatic {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  API: {
    request: (settings: KakaoApiRequestSettings) => void;
  };
  Auth: {
    login: (settings: KakaoLoginSettings) => void;
    logout: (callback?: () => void) => void;
  };
}

interface KakaoLoginSettings {
  success: (authObj: KakaoAuthObj) => void;
  fail: (err: KakaoError) => void;
  persistAccessToken?: boolean;
  throughTalk?: boolean;
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

interface KakaoApiRequestSettings {
  url: string;
  success: (response: KakaoApiResponse) => void;
  fail: (err: KakaoError) => void;
}

interface KakaoApiResponse {
  kakao_account?: {
    email?: string | null;
  };
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
