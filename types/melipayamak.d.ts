declare module 'melipayamak' {
  export class Base {
    username: string
    password: string
    data: {
      username: string
      password: string
    }

    constructor(username: string, password: string)
  }

  export class Rest extends Base {
    sms() {
      throw new Error('Method not implemented.')
    }
    constructor(username: string, password: string)

    request(method: string, params: Record<string, any>): Promise<any>

    send(
      to: string,
      from: string,
      text: string,
      isFlash?: boolean
    ): Promise<any>

    sendByBaseNumber(text: string, to: string, bodyId: string): Promise<any>

    isDelivered(recId: string): Promise<any>

    getMessages(
      location: string,
      index: number,
      count: number,
      from?: string
    ): Promise<any>

    getCredit(): Promise<any>

    getBasePrice(): Promise<any>

    getNumbers(): Promise<any>
  }
  export = Rest
}
