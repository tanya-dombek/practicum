import React, {useEffect} from 'react';
import { useDispatch } from '../../types/types';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import styles from './app.module.css'
import AppHeader from '../header/app-header-form';
import BurgerIngredients from '../burger-ingredients/burger-ingredients-form'
import BurgerConstructor from '../burger-constructor/burger-constructor-form';
import { getIgredients } from '../../services/ingredients/ingredients-action';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LoginPage } from '../../pages/login-page';
import { RegistrationPage } from '../../pages/register';
import { ResetPasswordPage } from '../../pages/reset-password';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import {ProfilePage} from '../../pages/profile';
import { NotFound404 } from '../../pages/not-found-404';
import { OnlyAuth, OnlyUnAuth } from './protected-route';
import { checkUserAuth } from '../../services/user/user-action';
import { FeedForm } from '../feed/feed-form';
import Modal from '../modal-components/modal';
import IngredientDetails from '../burger-ingredients/ingredient-ditails';
import { OrderFeedDetails } from '../feed/order-details';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state && location.state.background;  
  
  const handleModalClose = () => {
    navigate(-1);
  }

  useEffect(() => {
    dispatch(getIgredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.App}>
        <AppHeader/>
        <Routes location={background || location}>
          <Route path="/" element={
            <main className={styles.constructorGroupe}>
              <DndProvider backend={HTML5Backend}>
                <BurgerIngredients />
                <BurgerConstructor />
              </DndProvider>
          </main>
          } />
          <Route path="/login" element={<OnlyUnAuth component={<LoginPage/>}/>} />
          <Route path="/register" element={<OnlyUnAuth component={<RegistrationPage/>}/>}/>
          <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage/>}/>}/>
          <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage/>}/>}/>
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage/>}/>} />
          <Route path="/profile/orders" element={<OnlyAuth component={<ProfilePage/>}/>} />
          <Route path="/profile/orders/:number" element={<OnlyAuth component={<OrderFeedDetails/>}/>} />
          <Route path="/ingredients/:id" element={<IngredientDetails/>}/>
          <Route path="/feed" element={<FeedForm/>}/>
          <Route path="/feed/:number" element={<OrderFeedDetails/>}/>
          <Route path="/*" element={<NotFound404/>} />
        </Routes>

        {background && (
          <Routes>
            <Route path="/ingredients/:id" element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails/>
              </Modal>
            }/>
              <Route path="/feed/:number" element={
              <Modal title='' onClose={handleModalClose}>
                <OrderFeedDetails/>
              </Modal>
            }/>
            <Route path="/profile/orders/:number" element={
              <OnlyAuth component={
                <Modal title='' onClose={handleModalClose}>
                  <OrderFeedDetails/>
                </Modal>}/>
            }/>
            
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
