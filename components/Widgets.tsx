import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

interface WidgetsProps {}

export const Widgets: React.FC<WidgetsProps> = ({}) => {
  return (
    <div className="col-span-2 mt-2 hidden px-2 lg:inline ">
      {/* Search */}
      <div className="mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        <SearchIcon className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="flex-1 bg-transparent outline-none"
        />
      </div>

      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="joseenr_"
        options={{ height: 1000 }}
      />
    </div>
  )
}
