import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import Image from 'next/image'
import React, { useState } from 'react'

interface TweetBoxProps {}

export const TweetBox: React.FC<TweetBoxProps> = ({}) => {
  const [input, setInput] = useState<string>('')

  return (
    <div className="flex space-x-2 p-5">
      <div className="mt-4 h-14 w-14">
        <Image
          src={
            'https://www.itdp.org/wp-content/uploads/2021/06/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpg'
          }
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
              <PhotographIcon className="h-5 w-5 transition-transform duration-150 ease-out hover:scale-150 hover:cursor-pointer" />
              <SearchCircleIcon className="h-5 w-5 transition-transform duration-150 ease-out hover:scale-150 hover:cursor-pointer" />
              <CalendarIcon className="h-5 w-5 transition-transform duration-150 ease-out hover:scale-150 hover:cursor-pointer" />
              <CalendarIcon className="h-5 w-5 transition-transform duration-150 ease-out hover:scale-150 hover:cursor-pointer" />
              <LocationMarkerIcon className="h-5 w-5 transition-transform duration-150 ease-out hover:scale-150 hover:cursor-pointer" />
            </div>
            <button
              disabled={!input}
              className="rounded-full bg-twitter-blue px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
