import styled from "styled-components";

// export const Search = styled.article`
//     width: 100%;
//     height: 100%;
//     padding: 1rem;
//     padding-top: calc( 1rem +  40px);
//     background: var(--color-blue-100);

//     & > section {
//         width: 100%;
//         height: calc( 100% - calc( 40px + 1rem ) );
//         margin: 1rem auto;
//         max-width: 72rem;
//         border-radius: 1rem;
//         overflow-y: scroll;

//         &::-webkit-scrollbar {
//             width: 5px;
//         }

//         &::-webkit-scrollbar-thumb {
//             height: 25%;
//             background: gray;
//             border-radius: 1rem;
//         }

//         &::-webkit-scrollbar-track {
//             background: #eeeeee8c;
//         }

//         & > div {
//             border-radius: 1rem;
//             overflow: hidden;
//             text-align: center;
//         }

//         & .title{
//             background-color: var(--color-moon-light);
//         }
//     }
// `;


export const Form = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 1rem;
    align-items: center;

    & input {
        padding: 0.5rem 1rem;
        border: 1px solid var(--color-blue-200);
        border-radius: 7px;
        width: 50%;
        max-width: 35rem;
        min-width: 15rem;
    }

    & button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 5px;
        background-color: var(--color-blue-200);
    }

    
    & button:hover,
    & button:active {
        background-color: var(--color-blue-300);
    }
`;


// export const Table = styled.div`
//     width: 100%;
//     display: flex;
//     flex-direction: row;
//     flex-wrap: nowrap;
//     justify-content: space-between;
//     align-items: center;
//     border: 1px solid var(--color-gray-100);
//     background: white;
//     text-align: center;

//     & div {
//         width: 5rem;
//     }

//     & div:nth-child(1) {
//         width: 27rem;
//     }

//     & div:nth-child(2) {
//         width: 8rem;
//     }
// `;