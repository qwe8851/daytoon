import Search from './components/Search';

import './App.css';
import * as S from './styles/layout.styled';
import daytoon_symbol_horizontal from './images/daytoon_symbol_horizontal.svg';

function App() {
  return (
    <>
      <S.Header>
        <img src={daytoon_symbol_horizontal} alt="데이툰" />
      </S.Header>
      <S.Section>
        <Search />
      </S.Section>
    </>
  );
}

export default App;
