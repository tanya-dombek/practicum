import React, {FC} from 'react';
import styles from './order-cards.module.css';

type TIngredientsIllustrations = {
    images: string[];
}

export const IngredientsIllustrations: FC<TIngredientsIllustrations> = ({images}) => {

  return ( 
    <div className={styles.ilustrationContainer}>
        {images.slice(0, 6).map((image, index) => (
            <img srcSet={image} key={index} className={styles.ingredientsIlustration} alt={'ingredient'}
            style={{ 
                position: "absolute", 
                left: `${index * 50}px`, 
                zIndex: `${images.length - index}` 
              }} />
        ))}
        {images.length > 6 && (
            <div 
            className={styles.blurLabel} 
            style={{ 
                left: `${5 * 50}px`, 
                zIndex: `${images.length - 5}` 
            }}
            >
            <span>+{images.length - 6}</span>
            </div>
        )}
    </div>
);
}