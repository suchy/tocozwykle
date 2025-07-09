export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export const DEFAULT_USER_ROLE = USER_ROLES.USER;

export const ALL_USER_ROLES: UserRole[] = Object.values(USER_ROLES);
