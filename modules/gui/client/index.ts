import { RpgClient, RpgModule } from '@rpgjs/client'
import InventoryGUI from './gui/inventory/InventoryGUI.tsx';
import SkillsGUI from './gui/skills/SkillsGUI.tsx';
import ActionBarGUI from './gui/action-bar/ActionBarGUI.tsx';
import ItemUpgradeGUI from './gui/upgrading-item/ItemUpgradeGUI.tsx';
import ProfileGUI from './gui/profile/ProfileGUI.tsx';
import ChatGUI from './gui/chat/ChatGUI.tsx';
import ConnectGUI from './gui/title-screen/ConnectGUI.tsx';
import UnitInformationGUI from './gui/unit-information/UnitInformationGUI.tsx';

/** @ts-ignore */
@RpgModule<RpgClient>({
    gui: [
        InventoryGUI,
        SkillsGUI,
        ActionBarGUI,
        ItemUpgradeGUI,
        ProfileGUI,
        ChatGUI,
        ConnectGUI,
        UnitInformationGUI,
    ]
})
export default class RpgClientEngine { }
