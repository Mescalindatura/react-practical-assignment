
interface Post {
    id: number
    title: string
    username: string
    likes: string[]
    dislikes: string[]
    imageSrc?: string
    date: number
    comments: []
}

interface Comment {
    id: number
    postId: number
    text: string
    username: string
    likes: string[]
    dislikes: string[]
    date: number
}
