import * as Styled from './Dialog.styles'

interface Props {
    title: string;
    onAccept: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({ title, onAccept, onCancel }: Props) {
    return  (
        <Styled.Dialog>
            <Styled.DialogTitle>{title}</Styled.DialogTitle>
            <Styled.DialogActions>
                <Styled.Button onClick={onAccept}>OK</Styled.Button>
                <Styled.Button onClick={onCancel}>Cancel</Styled.Button>
            </Styled.DialogActions>
        </Styled.Dialog>
    )
}
