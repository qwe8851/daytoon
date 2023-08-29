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
    height: fit-content;
    min-height: 100%;
    padding: 1rem;
    padding-top: calc( 1rem +  40px);
    background: var(--color-blue-100);
    text-align: center;
`;

export const Article = styled.article`
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    
    & button {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        border: none;
        box-shadow: 1px 1px 10px var(--color-gray-300);
    }
`;

export const Table = styled.table`
    width: 100%;
    height: auto;
    word-break:break-all;
    margin: 1rem 0;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: white;

    & th {
        background: var(--color-blue-500);
        color: white;
        font-weight: 100;
        font-size: 14px;
        padding: 0.5rem;
    }

    & thead th {
        border: 1px solid var(--color-blue-400);
    }

    & tbody td {
        border: 1px solid var(--color-blue-100);
        text-align: center;
        background: white;
    }
`;

export const Th = styled.th`
    width: ${({ width }) => width || 'auto'};
`;


export const ButtonList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    & > button,
    & > label {
        flex: 1;
    }

    .cancel{
        background-color: white;
        color: var(--color-gray-700);
        border-color: var(--color-gray-400);

        &:hover,
        &:active{
            background-color: var(--color-gray-100);
            color: var(--color-gray-700);
        }
    }
`;