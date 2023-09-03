import styled from "styled-components";

export const Card = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: ${({ $direction }) => $direction || 'row'};
    justify-content: center;
    align-items: center;
    padding: 1rem 0;
    gap: 1rem;

    & > form {
        width: ${({ $width }) => $width || '25'}rem;
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

        hr {
            width: 100%;
            height: 1px;
            margin: 0;
            border: 1px solid var(--color-gray-200);
        }

        & div {
            width: 100%;
            padding: ${({ $padding }) => $padding || 'auto'};

            & > label {
                width: 100%;
                text-align: left;
                display: block;
                font-size: 14px;
                padding-left: 2px;
                color: var(--color-blue-800);
            }

            & > input, 
            & > textarea, 
            & > select {
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

        & button {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid var(--color-gray-100);
            border-radius: 10px;
            font-size: 14px;
            background-color: var(--color-submit);
            color: white;
            

            &: hover, 
            &: active {
                background-color: var(--color-submit-dark);
                color: white;
            }

            &:disabled {
                background-color: var(--color-gray-100);
                color: var(--color-gray-500); 
            }
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

        .delete {
            background-color: var(--color-error);

            &:hover,
            &:active{
                background-color: var(--color-error-dark);
            }
        }

        & a {
            width: 100%;

            & button {
                background-color: var(--color-blue-100);
                color: var(--color-blue-500);
            }
            
            & button: hover, 
            & button: active {
                background-color: #e1e2ea;
                color: var(--color-blue-500);
            }
        }
        
    }
`;

export const SearchBar = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    & > select {
        width: 9rem;
        padding: 0.5rem;
        border: 1px solid var(--color-gray-500);
        border-radius: 8px;
    }

    & > input {
        width: 19rem;
        padding: 0.5rem;
        border: 1px solid var(--color-gray-500);
        border-radius: 8px;
    }

    & > button {
        padding: 0.5rem 1rem;
        border-radius: 8px; 
        border: none;
        box-shadow: 1px 1px 10px var(--color-gray-300);
        background-color: var(--color-submit);
        color: white;
        
        &: hover, 
        &: active {
            background-color: var(--color-submit-dark);
        }
    }
`;

export const OptionBar = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
    column-gap: 1rem;

    & .delete {
        background-color: var(--color-error);
        color: white;
        
        &: hover, 
        &: active {
            background-color: var(--color-error-dark);
        }
    }
    
    & .add {
        background-color: var(--color-warning);
        
        &: hover, 
        &: active {
            background-color: var(--color-warning-dark);
        }
    }
    
    & .upload {
        background-color: var(--color-error-color);
        color: var(--color-error-dark);
        
        &: hover, 
        &: active {
        background-color: #eadede;
        }
    }
    
    & .download {
        background-color: var(--color-submit-color);
        color: var(--color-submit-dark);
        
        &: hover, 
        &: active {
            background-color: #d8d8e3b5;
        }
    }
    
    & .logout {
        background-color: var(--color-gray-700);
        color: white;
        
        &: hover, 
        &: active {
            background-color: var(--color-gray-800);
        }
    }
`;