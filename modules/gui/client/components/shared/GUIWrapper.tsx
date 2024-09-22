import { ThemeProvider } from "styled-components"
import { globalTheme } from "../../theme/Theme"

export const GUIWrapper = ({ children }) => {
    return (
        <ThemeProvider theme={globalTheme}>
            {children}
        </ThemeProvider>
    )
}
