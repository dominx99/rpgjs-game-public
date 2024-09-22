import * as Styled from './ItemPreview.styles';
import { isNil } from "../../../../../src/shared/utils/Utils";
import { ItemContract } from "../../../../inventory-extension/src/contracts/ItemContract";
import { MagnificenceName } from '../../../../inventory-extension/src/enum/ItemMagnificience';

interface Props {
    item: ItemContract
}

export const ItemPreview = ({ item }: Props) => {
    return (
        <Styled.ItemPreview>
            <Styled.ItemName $moreSpacing={isNil(item.requiredLevelToEquip)}>
                {item.displayName}&nbsp;
                {!isNil(item.magnificence) ? `(${MagnificenceName(item.magnificence)})` : ''}&nbsp;
                {!isNil(item.level) ? `+${item.level}` : ''}
            </Styled.ItemName>
            {!isNil(item.requiredLevelToEquip) && <div>
                <Styled.RequiredLevel as="div" $color='success'>Required level: {item.requiredLevelToEquip}</Styled.RequiredLevel>
            </div>}
            {item.description && <div>description: {item.description}</div>}
            {item.atk && <div>attack: {item.atk}</div>}
            {item.pdef && <div>defense: {item.pdef}</div>}
        </Styled.ItemPreview>
    )
}
