import { useState } from 'react';
import * as Styled from '../shared/Dialog.styles'

interface Props {
    title: string;
    onAccept: (amount: number) => void;
    onCancel: () => void;
}

export function ConfirmAmountDialog({ title, onAccept, onCancel }: Props) {
    const [amount, setAmount] = useState(1);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value)

        if (isNaN(value)) {
            setAmount(0);

            return;
        }

        setAmount(value);
    }

    return (
        <Styled.Dialog>
            <Styled.DialogTitle>{title}</Styled.DialogTitle>
            <Styled.DialogContent>
                <Styled.Input onChange={handleChange} type="number" defaultValue={amount} />
            </Styled.DialogContent>
            <Styled.DialogActions>
                <Styled.Button onClick={() => onAccept(amount)}>OK</Styled.Button>
                <Styled.Button onClick={onCancel}>Cancel</Styled.Button>
            </Styled.DialogActions>
        </Styled.Dialog>
    )
}
