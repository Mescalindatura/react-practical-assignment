
interface IState {
    username: string
    posts: IPost[],
    currentPage: number
    totalPages: number
    isError: boolean
}

interface IPost {
    id: number
    title: string
    username: string
    likes: string[]
    dislikes: string[]
    imageSrc?: string
    date: number
    comments: IComment[]
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

interface IReactions {
    likes: string[]
    dislikes: string[]
    postid: number
    commentid?: number
    text?:string
}


