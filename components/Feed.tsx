import { RefreshIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Tweet } from '../utils/types'
import { TweetComponent } from './TweetComponent'
import { TweetBox } from './TweetBox'
import { fetchTweets } from '../utils/fetchTweets'

interface FeedProps {
  tweets: Tweet[]
}

export const Feed: React.FC<FeedProps> = ({ tweets: tweetsProp }) => {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)

  const handleRefresh = async () => {
    const tweets = await fetchTweets()
    setTweets(tweets)
  }

  return (
    <div className="col-span-7 border-x lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          className="mr-5 mt-5 h-8 w-8 cursor-pointer text-twitter-blue transition-all duration-500
        ease-out hover:rotate-180 active:scale-125 "
          onClick={handleRefresh}
        />
      </div>
      <div>
        <TweetBox />
      </div>
      <div>
        {tweets.map((tweet) => (
          <TweetComponent key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}
