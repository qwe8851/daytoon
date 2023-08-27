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

export const Section = styled.section`
    width: 100%;
    height: 100%;
    padding: 1rem;
    padding-top: calc( 1rem +  40px);
    background: var(--color-blue-100);
    text-align: center;
`;