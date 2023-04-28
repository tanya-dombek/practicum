import React, {useRef, FC, ReactNode} from 'react'
import styles from'./burger-contructor.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop, useDrag, DropTargetMonitor } from "react-dnd";
import { useDispatch } from '../../types/types';
import { DELETE_ITEM } from '../../services/constructor/constructor-action';
import { DECREASE_COUNTER } from '../../services/ingredients/ingredients-action';
import { TIngredientData } from '../../types/types';

type TIngredientConstructorListProps = {
    item: TIngredientData;
    moveIngredient: (dragIndex: number, hoverIndex: number) => void;
    id: string;
    index: number;
  }

  type TClientOffset = {
    x: number;
    y: number;
  }

const IngredientsConstructorList: FC<TIngredientConstructorListProps> = ({item, moveIngredient, id, index}) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLDivElement>(null);
    let addIcon: ReactNode;
    if (!item.isLocked) {
        addIcon = (<DragIcon type="primary" />);
    }

    const onDelete = (item: TIngredientData) => {
        dispatch({type: DELETE_ITEM, item});
        dispatch({type: DECREASE_COUNTER, item})
    };

    const [, dropIngredient] = useDrop({
        accept: 'sort',
        hover: (item: { id: string, index: number }, monitor: DropTargetMonitor) => {
            
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
            const clientOffset = monitor.getClientOffset() as TClientOffset;
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

export default IngredientsConstructorList ;