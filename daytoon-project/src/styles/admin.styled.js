import styled from "styled-components";

export const Card = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;

    & > form{
        width: 25rem;
        background: white;
        padding: 2rem 1rem;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        box-shadow: 0rem 1rem 1rem #bbbed936;

        h1 {
            margin: 0;
            text-align: left;
            width: 100%;
            padding: 1rem;
            font-size: xx-large;
        }

        p {
            margin: 0;
            font-size: 12px;
            color: gray;
        }

        & div {
            width: 100%;

            & > input {
                width: 100%;
                padding: 0.5rem;
                border: 1px solid var(--color-gray-300);
                border-radius: 10px;
            }

            & > p {
                margin: 0;
                text-align: left;
                font-size: 13px;
                color: red;
            }
        }

        & .error { 
            & input {
                background-color: var(--color-error-color);
                border: 1px solid var(--color-error-border);
            }
        }

        & > button {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid var(--color-gray-100);
            border-radius: 10px;
            font-size: 14px;
            background-color: var(--color-submit);
            color: white;
        }

        & > button: hover, 
        & > button: active {
            background-color: var(--color-submit-dark);
            color: white;
        }

        & > button:disabled {
            background-color: var(--color-gray-100);
            color: var(--color-gray-500); 
        }
        
    }
`;