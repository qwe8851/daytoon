import styled from "styled-components";

export const Header = styled.header`    
    width: 100%;
    height: 40px;
    padding: 0 1rem;
    background: var(--color-blue-200);

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    gap: 1rem;
    
    position: fixed;
    top: 0;
`;