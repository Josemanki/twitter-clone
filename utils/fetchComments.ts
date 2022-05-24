import { Comment } from './types'

export const fetchComments = async (tweetId: string) => {
  const res = await fetch(`/api/getComments?tweetId=${tweetId}`)

  const comments: Comment[] = await res.json()

  return comments
}
