export interface IPost {
  id: string
  userName: string
  createdAt: string
  content: {
    text: string
    imgSrc?: string
  }
  tags?: string[]
  like?: {
    count: number
    users: string[]
  }
  comments?: {
    count: number
    contents: {
      user: string
      text: string
    }
  }
}
