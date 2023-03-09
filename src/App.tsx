import React, {useState, useEffect} from 'react';
import './index.css'
import AppHeader from './components/header/app-header-form';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients-form'
import BurgerConstructor from './components/burger-constructor/burger-constructor-form';

function App() {
  const [state, setState] = useState({
    data: [],
    hasError: false
  });

  useEffect(() => {
    const url= 'https://norma.nomoreparties.space/api/ingredients';
    fetch(url)
    .then(res => res.json())
    .then(result => setState({...state, data: result.data}))
    .catch(err => {
      setState({...state, hasError: true})
    });
  }, []);

  return (
    <div className="App">
      <AppHeader/>
      <div className='constructorGroupe'>
        <BurgerIngredients ingredientsData={state.data}/>
        <BurgerConstructor />
      </div>
    </div>
  );
}

export default App;
