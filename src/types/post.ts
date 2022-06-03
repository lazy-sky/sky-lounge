export interface IPost {
  id: string
  user: {
    id: string
    name: string
    profileImg: string
  }
  createdAt: string
  updatedAt: string
  content: {
    text: string
    imgSrc?: string
  }
  tags?: string[]
  like?: string[]
  comments?: {
    id: string
    user: {
      id: string
      name: string
      profileImg: string
    }
    text: string
  }[]
}

export interface IComment {
  id: string
  user: {
    id: string
    name: string
    profileImg: string
  }
  text: string
}
