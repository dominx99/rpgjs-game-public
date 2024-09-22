import { useContext, useEffect, useState } from "react";
import * as Styled from "./../Connect.styles";
import { RpgReactContext } from "@rpgjs/client/react";

interface Props {
    goToRegisterPage: () => void;
}

export function LoginPage({ goToRegisterPage }: Props) {
    const { rpgGui, rpgGuiInteraction, rpgSocket } = useContext(RpgReactContext);

    const [form, setForm] = useState({
        nickname: "",
        password: ""
    });

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const tryToAuthenticate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.nickname) {
            return notificationError('Please enter a nickname')
        }
        if (!form.password) {
            return notificationError('Please enter a password')
        }
        rpgGuiInteraction('connect-gui', 'login', form)
    }

    useEffect(() => {
        listenAuthenticationFail();
    }, []);

    const listenAuthenticationFail = () => {
        const socket = rpgSocket()
        socket.on('login-fail', ({ message }) => {
            let msg = ''
            switch (message) {
                case 'LOGIN_FAIL':
                    msg = 'Your login details are not correct!'
                    break;
                case 'PLAYER_IN_GAME':
                    msg = 'You are already playing in the game'
                    break;
                default:
                    msg = 'An error has occurred'
            }
            notificationError(msg)
        })
    }

    const notificationError = (msg: string) => {
        rpgGui.display('rpg-notification', {
            message: msg,
            time: 5000,
            position: 'top',
            type: 'error'
        })
    }

    return (
        <Styled.LoginWrapper>
            <Styled.LoginContainer>
                <Styled.LoginTitle>Welcome to RPG World!</Styled.LoginTitle>

                <Styled.LoginForm onSubmit={tryToAuthenticate}>
                    <Styled.LoginInput name="nickname" placeholder="Nickname" onChange={onFormChange} />
                    <Styled.LoginInput name="password" type="password" placeholder="Password" onChange={onFormChange} />
                    <Styled.LoginButton>Login</Styled.LoginButton>
                    <Styled.LoginButton onClick={goToRegisterPage} type="button">Create Account</Styled.LoginButton>
                </Styled.LoginForm>
            </Styled.LoginContainer>
        </Styled.LoginWrapper>
    )
}
