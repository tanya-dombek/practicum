import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './app.module.css'
import AppHeader from '../header/app-header-form';
import BurgerIngredients from '../burger-ingredients/burger-ingredients-form'
import BurgerConstructor from '../burger-constructor/burger-constructor-form';
import { getIgredients } from '../../services/ingredients/ingredients-action';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIgredients())
  }, []);

  return (
    <div className={styles.App}>
      <AppHeader/>
      <main className={styles.constructorGroupe}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
      </main>
    </div>
  );
}

export default App;
