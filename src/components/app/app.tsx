import React, {useState, useEffect} from 'react';
import styles from './app.module.css'
import AppHeader from '../header/app-header-form';
import BurgerIngredients from '../burger-ingredients/burger-ingredients-form'
import BurgerConstructor from '../burger-constructor/burger-constructor-form';

function App() {
  const [state, setState] = useState({
    data: [],
    hasError: false
  });

  useEffect(() => {
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Ошибка ${res.status}`);
        }
        return res.json();
      })
      .then(result => setState({ ...state, data: result.data }))
      .catch(err => {
        console.error(err);
        setState({ ...state, hasError: true });
      });
  }, []);

  return (
    <main className={styles.App}>
      <AppHeader/>
      <div className={styles.constructorGroupe}>
        <BurgerIngredients ingredientData={state.data}/>
        <BurgerConstructor />
      </div>
    </main>
  );
}

export default App;
