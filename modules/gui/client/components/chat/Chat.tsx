import { createRef, useContext, useEffect, useState } from "react";
import * as Styled from './../../gui/chat/ChatGUI.styles';
import { RpgReactContext } from "@rpgjs/client/react";
import { useTheme } from "styled-components";
import { MessageContract } from "../../../../chat/server/contracts/MessageContract";
import { Theme } from "../../theme/Theme";
import Channels from "./Channels.tsx";
import { Channel } from "../../../../chat/server/enums/Channel.ts";
import { ChatEvents } from "../../../../chat/server/enums/ChatEvents.ts";

const CLOSE_CHAT_TIMEOUT = 5000;

export default function Chat() {
    const [messages, setMessages] = useState<MessageContract[]>([]);
    const [inputVisible, setInputVisible] = useState<boolean>(false);
    const [chatVisible, setChatVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [closeChatTimer, setCloseChatTimer] = useState<NodeJS.Timeout | null>(null);
    const [channel, setChannel] = useState<Channel>(Channel.MAP);

    const { rpgSocket, rpgGui, rpgEngine } = useContext(RpgReactContext);

    const inputRef = createRef<HTMLInputElement>();
    const chatRef = createRef<HTMLDivElement>();
    const messagesRef = createRef<HTMLUListElement>();

    // @ts-ignore
    const theme: Theme = useTheme<Theme>();

    const addMessage = (message: MessageContract) => {
        setMessages((messages) => [...messages, message]);
    }

    useEffect(() => {
        if (!messagesRef.current) {
            return;
        }

        const lastElement = messagesRef.current.lastElementChild;
        lastElement?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [messages]);

    useEffect(() => {
        if (!chatVisible) {
            return;
        }

        if (!messagesRef.current) {
            return;
        }

        const lastElement = messagesRef.current.lastElementChild;
        lastElement?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [chatVisible])

    useEffect(() => {
        const socket = rpgSocket()
        socket.on(ChatEvents.chatMessage, ({ message, type }) => {
            closeChatAfter(CLOSE_CHAT_TIMEOUT);

            addMessage({
                message,
                type
            });

            setChatVisible(true);
        });

        socket.on('chat.open', () => {
            setChatVisible(true);
            setInputVisible(true);
            clearTimeout(closeChatTimer as NodeJS.Timeout);
            setCloseChatTimer(null);
            inputRef.current?.focus();
        });

        socket.on('chat.close', () => {
            setInputVisible(false);
            closeChatAfter(CLOSE_CHAT_TIMEOUT);
        });

        return () => {
            socket.off(ChatEvents.chatMessage);
            socket.off(ChatEvents.chatOpen);
            socket.off(ChatEvents.chatClose);
        }
    }, [inputVisible, closeChatTimer]);

    useEffect(() => {
        if (!inputVisible) {
            inputRef.current?.blur();
            unlockControls();

            return;
        }

        inputRef.current?.focus();
        blockControls();
    }, [inputVisible]);

    const blockControls = () => {
        if (rpgGui.exists('rpg-controls')) rpgGui.hide('rpg-controls')
        rpgEngine.controls.stop = true
    }

    const unlockControls = () => {
        if (rpgGui.exists('rpg-controls')) rpgGui.display('rpg-controls')
        rpgEngine.controls.stop = false
    }

    const closeInput = () => {
        setInputVisible(false);
    }

    const sendMessage = () => {
        if (!message) {
            return;
        }

        rpgSocket().emit(ChatEvents.chatMessage, {
            message,
            channel
        });
        setMessage('');
    }

    const closeChatAfter = (timeout: number) => {
        if (inputVisible) {
            return;
        }

        if (closeChatTimer !== null) {
            clearTimeout(closeChatTimer);
        }

        const timer = setTimeout(() => {
            closeChat();
        }, timeout);

        setCloseChatTimer(timer);
    }

    const closeChat = () => {
        if (inputVisible) {
            return;
        }
        setChatVisible(false);
    }

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Escape') {
            closeInput();
        }

        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    const colorByType = (type: string): string => {
        if (theme.colors.text.hasOwnProperty(type)) {
            return theme.colors.text[type];
        }

        return theme.colors.text.default;
    }

    const chooseChannel = (channel: Channel) => {
        setChannel(channel);
        inputRef.current?.focus();
    }

    if (!chatVisible) {
        return null;
    }

    return (
        <Styled.Chat ref={chatRef}>
            <Channels channel={channel} chooseChannel={chooseChannel} />
            <Styled.MessagesList ref={messagesRef}>
                {messages && messages.map((message, index) => (
                    <Styled.Message color={colorByType(message.type)} key={index}>{message.message}</Styled.Message>
                ))}
            </Styled.MessagesList>
            {inputVisible && <Styled.Input
                ref={inputRef}
                onFocus={blockControls}
                onBlur={unlockControls}
                onKeyDown={handleInputKeyDown}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />}
        </Styled.Chat>
    )
}
