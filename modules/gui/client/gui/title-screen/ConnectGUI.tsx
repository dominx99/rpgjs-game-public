import { useState } from "react";
import { LoginPage } from "./pages/LoginPage.tsx";
import { RegisterPage } from "./pages/RegisterPage.tsx";
import * as Styled from "./Connect.styles";
import { GUIWrapper } from "../../components/shared/GUIWrapper.tsx";

export default function ConnectGUI() {
    const [hasAccount, setHasAccount] = useState(true);

    return (
        <GUIWrapper>
            <Styled.ConnectScreenWrapper>
                {hasAccount
                    ? <LoginPage goToRegisterPage={() => setHasAccount(false)} />
                    : <RegisterPage goToLoginPage={() => setHasAccount(true)} />
                }
            </Styled.ConnectScreenWrapper>
        </GUIWrapper>
    )
}
