import type { UserProfile } from '../api/user';

export const mockUserProfile: UserProfile = {
  nickname: '둘러보기 유저',
  profileImageUrl: null,
  email: 'guest@atune.app',
  notifications: {
    medication: true,
    report: true,
    marketing: false,
  },
};
