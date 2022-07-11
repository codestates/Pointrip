export interface Member {
  readonly uuid:string;
  memberId:string;
  password?:string;
  name:string;
  age:number;
  gender:GenderType;
  role:RoleType;
}

export const Gender = {
  FEMALE : "F" 
  , MAN : "M"
} as const;

export type GenderType = typeof Gender[keyof typeof Gender];

export const Role = {
  MEMBER : "ROLE_MEMBER"
  , MANAGER : "ROLE_MANAGER"
  , ADMIN : "ROLE_ADMIN"
} as const;

export type RoleType = typeof Role[keyof typeof Role];

export interface Category {
  idx : number;
  name : string;
  path : string;
  role : Array<RoleType>;
  sub : Array<Category>;
}


export interface LayoutDefaultProps {
  children? : React.ReactElement;
}

// export interface User {
//   email: string;
//   imagePath: null | string;
//   username: string;
//   // 00번재 이야기 추가 필요
// }

// export interface PostDataType {
//   id: number;
//   userId: number;
//   user: User;
//   title: string;
//   contents: string;
//   imagePath: string;
//   address: string; // 주소
//   latitude: string; // 위도
//   longitude: string; // 경도
//   createdAt: string; // 생성일
// }