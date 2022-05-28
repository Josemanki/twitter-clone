import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { fetchTweets } from '../utils/fetchTweets'
import { Tweet, TweetBody } from '../utils/types'

interface TweetBoxProps {
  setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

export const TweetBox: React.FC<TweetBoxProps> = ({ setTweets }) => {
  const defaultProfileImage =
    'https://www.itdp.org/wp-content/uploads/2021/06/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpg'

  const { data: session } = useSession()
  const [input, setInput] = useState<string>('')
  const [image, setImage] = useState<string>('')

  const imageInputRef = useRef<HTMLInputElement>(null)

  const [imageUrlBoxOpen, setImageUrlBoxOpen] = useState<boolean>(false)

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    if (!imageInputRef.current?.value) return

    setImage(imageInputRef.current.value)
    imageInputRef.current.value = ' '
    setImageUrlBoxOpen(false)
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown User',
      profileImg: session?.user?.image || defaultProfileImage,
      image: image,
    }

    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })

    const json = await result.json()

    const newTweets = await fetchTweets()
    setTweets(newTweets)

    toast('Tweet Posted!', {
      icon: '🚀',
    })

    return json
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    postTweet()
    setInput('')
    setImage('')
    setImageUrlBoxOpen(false)
  }

  return (
    <div className="flex space-x-2 p-5">
      <div className="mt-4 h-14 w-14">
        <Image
          src={session?.user?.image || defaultProfileImage}
          alt={'Avatar'}
          width={56}
          height={56}
          className="rounded-full object-cover"
        />
      </div>

      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
            }}
            type="text"
            placeholder="What's Happening?"
            className="h-24 w-full text-xl outline-none placeholder:text-xl "
          />
          <div className="flex items-center">
            <div className="flex flex-1 space-x-2 text-twitter-blue">
              <PhotographIcon
                onClick={() => setImageUrlBoxOpen(!imageUrlBoxOpen)}
                className="h-5 w-5 transition-transform duration-150 ease-out hover:scale-150 hover:cursor-pointer"
              />
              <SearchCircleIcon className="h-5 w-5 transition-transform duration-150 ease-out hover:scale-150 hover:cursor-pointer" />
              <CalendarIcon className="h-5 w-5 transition-transform duration-150 ease-out hover:scale-150 hover:cursor-pointer" />
              <CalendarIcon className="h-5 w-5 transition-transform duration-150 ease-out hover:scale-150 hover:cursor-pointer" />
              <LocationMarkerIcon className="h-5 w-5 transition-transform duration-150 ease-out hover:scale-150 hover:cursor-pointer" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className="rounded-full bg-twitter-blue px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              Tweet
            </button>
          </div>

          {imageUrlBoxOpen && (
            <form className="mt-5 flex rounded-lg bg-twitter-blue/80 py-2 px-4">
              <input
                ref={imageInputRef}
                className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                type="text"
                placeholder="Enter image URL..."
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add image
              </button>
            </form>
          )}
          {image && (
            <img
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
              src={image}
              alt=""
            />
          )}
        </form>
      </div>
    </div>
  )
}
