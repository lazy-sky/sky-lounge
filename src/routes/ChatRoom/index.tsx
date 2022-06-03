import { useEffect, useState } from 'react'
import { Channel as IChannel, DefaultGenerics, StreamChat } from 'stream-chat'
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react'

import { getRandomNickname } from 'utils'
import PageHeader from 'components/_shared/PageHeader'

import 'stream-chat-react/dist/css/index.css'

const chatClient = StreamChat.getInstance(process.env.REACT_APP_STREAM_KEY!)

const ChatRoom = () => {
  const [channel, setChannel] = useState<IChannel<DefaultGenerics>>()

  useEffect(() => {
    ;(async () => {
      await chatClient.setGuestUser({
        id: String(Math.floor(Math.random() * Date.now())),
        name: getRandomNickname(),
      })

      setChannel(
        chatClient.channel('public-chat', 'random-chat', {
          name: '익명 채팅방',
        })
      )
    })()

    return () => {
      chatClient.disconnectUser()
    }
  }, [])

  return (
    <div>
      <PageHeader title='전체 채팅방' />
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatRoom
