import { ITooltip, Tooltip } from "react-tooltip";
import tooltipImg from '@/modules/config/assets/gui/tooltips/tooltip_1.png';

export const SkillTooltip = (props: ITooltip) => {
    return (
        <Tooltip
            noArrow={true}
            style={{
                background: `url(${tooltipImg})`,
                fontSize: '22px',
                width: '250px',
                padding: '20px',
                minHeight: '100px',
                color: 'white',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                zIndex: 1000,
            }}
            {...props}
        />
    )
};
