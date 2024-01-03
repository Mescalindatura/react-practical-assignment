
interface IPost {
    id: number
    title: string
    username: string
    likes: string[]
    dislikes: string[]
    imageSrc?: string
    date: number
    comments: []
}

interface IComment {
    id: number
    postId: number
    text: string
    username: string
    likes: string[]
    dislikes: string[]
    date: number
}
