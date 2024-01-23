export enum MockResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface MockResponseBasic {
  status: MockResponseStatus
  msg: string
}
