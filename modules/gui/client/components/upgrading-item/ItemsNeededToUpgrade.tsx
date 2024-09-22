import { useCallback, useContext, useEffect, useState } from "react";
import { isNil } from "../../../../../src/shared/utils/Utils";
import { InventoryItemContract, ItemContract } from "../../../../inventory-extension/src/contracts/ItemContract"
import { ItemNeededToUpgrade, NeededToUpgradeItem } from "../../../../upgrading-items/server/src/NeededToUpgradeItem"
import { ItemClass } from "../../../../inventory-extension/src/interfaces/ItemClass";
import { RpgReactContext } from "@rpgjs/client/react";
import * as Styled from './ItemsNeededToUpgrade.styles'

interface Props {
    item: ItemContract;
}

export const ItemsNeededToUpgradeSection = ({ item }: Props) => {
    const { rpgResource, rpgCurrentPlayer } = useContext(RpgReactContext);
    const [items, setItems] = useState<InventoryItemContract[]>([]);

    if (isNil(item.level)) {
        return;
    }

    const neededItems = NeededToUpgradeItem.all(item.level).map(item => {
        let newItem: ItemNeededToUpgrade = {
            item: {
                ...item.item,
            } as ItemClass,
            nb: item.nb
        }

        newItem.item.icon = rpgResource.spritesheets.get(item.item.icon).image;

        return newItem;
    }) as ItemNeededToUpgrade[];

    const hasItem = useCallback((item?: ItemNeededToUpgrade) => {
        if (!item || !item.item) {
            return false;
        }

        return items.some(inventoryItem => inventoryItem.item.id === item.item.id && inventoryItem.nb >= item.nb);
    }, [items, item])

    useEffect(() => {
        const subscription = rpgCurrentPlayer.subscribe(({ object }) => {
            setItems(Object.values(object.items as InventoryItemContract[]).filter(item => !isNil(item)));
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return (
        <>
            <Styled.Text>Items needed to upgrade:</Styled.Text>
            <Styled.NeededItemsContainer>
                {neededItems.map((neededItem, index) => (
                    <Styled.NeededItem key={index}>
                        <Styled.NeededItemIcon $hasItem={hasItem(neededItem)} $src={neededItem.item.icon} />
                        <Styled.NeededItemAmount>{neededItem.nb} x&nbsp;</Styled.NeededItemAmount>
                        <Styled.NeededItemName>{neededItem?.item?.displayName}</Styled.NeededItemName>
                    </Styled.NeededItem>
                ))}
            </Styled.NeededItemsContainer>
        </>
    )
}
