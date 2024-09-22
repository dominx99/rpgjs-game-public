import * as Styled from './Channels.styles'
import { useState } from 'react';
import { Channel } from '../../../../chat/server/enums/Channel';

interface Props {
    channel: Channel;
    chooseChannel: (channel: Channel) => void;
}

export default function Channels({ channel, chooseChannel }: Props) {
    const [channels] = useState<Channel[]>([Channel.MAP, Channel.GLOBAL]);

    const getClassName = (channelName: string) => {
        return channel === channelName ? 'active' : '';
    }

    return (
        <Styled.ChannelsContainer>
            {channels.map((channel, index) => (
                <Styled.Channel key={index} onClick={() => chooseChannel(channel)} className={getClassName(channel)}>{channel}</Styled.Channel>
            ))}
        </Styled.ChannelsContainer>
    )
}
