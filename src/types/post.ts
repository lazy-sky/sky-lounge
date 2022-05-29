export interface IPost {
  id: string
  userId: string
  userName: string
  createdAt: string
  content: {
    text: string
    imgSrc?: string
  }
  tags?: string[]
  like?: string[]
  comments?: {
    user: string
    text: string
  }[]
}
