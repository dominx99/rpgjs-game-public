import styled from "styled-components";
import skillsImg from '@/modules/config/assets/gui/shared/char_box.png';

export const Skills = styled.div`
    background-image: url(${skillsImg});
    background-size: 100% 100%;
    position: absolute;
    left: 300px;
    top: 50%;
    transform: translateY(-50%);
    width: 300px;
    height: 600px;
    z-index: 1;
`

export const SkillsContent = styled.div`
    margin: 66px 10px 0 10px;
    width: calc(100% - 20px);
    height: calc(100% - 66px);
    padding: 1rem;
`
