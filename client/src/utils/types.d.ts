
interface IState {
    username: string
    posts: IPost[],
    currentPage?: number,
    totalPages?: number
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
}

interface IItem {
    id: number
    postId?: number
    title?: string
    text?: string
    username: string
    likes: string[]
    dislikes: string[]
    imageSrc?: string
    date: number
}

// interface IPostProps {
//     post: IPost
//     edit: (post:IPost)=>void
//     delete: (id:number) =>void
// }
