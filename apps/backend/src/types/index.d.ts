export type PermissionType = 'MENU' | 'BUTTON' | 'API';
export type MethodType = 'GET' | 'POST' | 'PATCH' | 'DELETE';
export type ReturnType = 'primitive' | '';

export interface RoleState {
  id: number;
  code: string;
  name: string;
  enable: true;
}

export interface UserState {
  id: number;
  username: string;
  enable: boolean;
  roles: RoleState[];
}
