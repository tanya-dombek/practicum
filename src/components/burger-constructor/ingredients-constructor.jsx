import React, {useRef} from 'react'
import PropTypes from 'prop-types';
import styles from'./burger-contructor.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import { DELETE_ITEM } from '../../services/constructor/constructor-action';
import { DECREASE_COUNTER } from '../../services/ingredients/ingredients-action';

function IngredientsConstructorList ({item, moveIngredient, id, index}) {
    const dispatch = useDispatch();
    const ref = useRef(null);
    let addIcon;
    if (!item.isLocked) {
        addIcon = (<DragIcon type="primary" />);
    }

    const onDelete = (item) => {
        dispatch({type: DELETE_ITEM, item});
        dispatch({type: DECREASE_COUNTER, item})
      };

    const [, dropIngredient] = useDrop({
        accept: 'sort',
        hover: (item, monitor) => {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveIngredient(dragIndex, hoverIndex);

            item.index = hoverIndex;
        }
    })

    const [{isDragging}, dragIngredient] = useDrag({
        type: 'sort',
        item: () => {
            return {id, index};
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    const opacity = isDragging ? 0 : 1;
    dragIngredient(dropIngredient(ref));

    return (
        <div ref={ref} style={{opacity}} className={styles.ingredientIconContainer} key={item.key}>
            <div style={{cursor: 'pointer'}}>
                {addIcon}
            </div>
            <ConstructorElement
                text={item.name ? item.name : 'Выберите ингредиенты'}
                price={item.price}
                thumbnail={item.image_mobile}
                handleClose={()=>onDelete(item)}
            />
        </div>
    );
}

IngredientsConstructorList.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
    }).isRequired,
    moveIngredient: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
}

export default IngredientsConstructorList ;