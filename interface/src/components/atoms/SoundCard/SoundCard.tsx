import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem 0;
    padding: 1rem 1.2rem 1rem 1.2rem;
    font-size: 1.2rem;
    border-radius: 13px;
    min-height: 4rem;
    background-color: #262626;
    border: 1px solid #3a3a3a;
    cursor: pointer;
    transition: all 200ms;

    &:hover {
        box-shadow: 0px 4px 5px 0px hsla(0, 0%, 0%, 0.14), 0px 1px 10px 0px hsla(0, 0%, 0%, 0.12),
            0px 2px 4px -1px hsla(0, 0%, 0%, 0.2);
        transform: translateY(-1px);
    }
`;

interface Props {
    label: string;
}

const SoundCard = ({ label }: Props) => {
    return (
        <Styles>
            {label}
        </Styles>
    );
}

export default SoundCard;