import React from 'react'
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  CollectionIcon,
  DotsCircleHorizontalIcon,
  MailIcon,
  UserIcon,
  HomeIcon,
} from '@heroicons/react/outline'
import { SidebarRow } from './SidebarRow'
import Image from 'next/image'
import { signIn, signOut, useSession } from 'next-auth/react'

export const Sidebar: React.FC = () => {
  const { data: session } = useSession()
  return (
    <div className="col-span-2 flex flex-col items-center px-4 md:items-start ">
      <div className="px-4 pt-3">
        <Image width={40} height={40} src="/twitter.svg" alt="Twitter logo" />
      </div>
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notifications" />
      <SidebarRow Icon={MailIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={CollectionIcon} title="Lists" />

      <SidebarRow
        onClick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? 'Sign Out' : 'Sign In'}
      />
      <SidebarRow Icon={DotsCircleHorizontalIcon} title="More" />
    </div>
  )
}
