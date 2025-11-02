export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  accessToken: string
  [key: string]: any
}

export interface Vendor {
  id: string,
  name: string,
  domain: string,
  [key: string]: any
}

export interface Session {
  user?: User
  expires: string
}

