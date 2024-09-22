import { useContext, useState } from "react";
import * as Styled from "./../Connect.styles";
import axios from "axios";
import { RpgReactContext } from "@rpgjs/client/react";

interface Props {
    goToLoginPage: () => void;
}

const NICKNAME_EXISTS_MSG = 'The nickname already exists, please choose another one';

export function RegisterPage({ goToLoginPage }: Props) {
    const { rpgGui, rpgEngine } = useContext(RpgReactContext);

    const [form, setForm] = useState({
        email: "",
        nickname: "",
        password: "",
        confirmPassword: "",
    });

    const [nicknameExists, setNicknameExists] = useState(false);

    const checkNicknameExists = async () => {
        const { data } = await axios.post(apiUrl() + '/user/exists', {
            nickname: form.nickname
        })
        setNicknameExists(data.exists)
        if (data.exists) {
            notificationError(NICKNAME_EXISTS_MSG)
        }
    }

    const apiUrl = () => {
        return rpgEngine.globalConfig.titleScreen?.apiUrl ?? rpgEngine.serverUrl
    }

    const notificationError = (msg: string) => {
        rpgGui.display('rpg-notification', {
            message: msg,
            time: 5000,
            position: 'top',
            type: 'error'
        })
    }

    const tryToCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (nicknameExists) {
                throw NICKNAME_EXISTS_MSG
            }
            if (!form.nickname) {
                throw 'Please enter a nickname'
            }
            if (!form.password) {
                throw 'Please enter a password'
            }
            if (!form.email) {
                throw 'Please enter an email'
            }
            if (form.password.length < 6) {
                throw 'Set a password with at least 6 characters'
            }
            if (form.password != form.confirmPassword) {
                throw 'The confirmed password is different from the password'
            }
            await axios.post(apiUrl() + '/user/create', form)
            rpgGui.display('rpg-notification', {
                message: 'Your account has been created. Log in now to play the game',
                time: 5000,
                position: 'top',
                type: 'success'
            })

            goToLoginPage();
        }
        catch (err) {
            if (typeof err == 'string') {
                notificationError(err)
            }
        }
    }

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Styled.LoginWrapper>
            <Styled.LoginContainer>
                <Styled.LoginTitle>Create account to play</Styled.LoginTitle>

                <Styled.LoginForm onSubmit={tryToCreateAccount}>
                    <Styled.LoginInput name="nickname" placeholder="Nickname" required onChange={onFormChange} onBlur={checkNicknameExists} />
                    <Styled.LoginInput name="email" placeholder="Email" type="email" required onChange={onFormChange} />
                    <Styled.LoginInput name="password" type="password" placeholder="Password" required onChange={onFormChange} />
                    <Styled.LoginInput name="confirmPassword" type="password" placeholder="Password (6 characters min.)" required onChange={onFormChange} />
                    <Styled.LoginButton>Create</Styled.LoginButton>
                    <Styled.LoginButton onClick={goToLoginPage} type="button">Back</Styled.LoginButton>
                </Styled.LoginForm>
            </Styled.LoginContainer>
        </Styled.LoginWrapper>
    )
}
