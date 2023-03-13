export const normalaizedData = (data) => { 
    return [
        {
            id: 1,
            type: 'top',
            isLocked: true,
            text: "Краторная булка N-200i (верх)",
            price: 20,
            thumbnail: data[0].image_mobile
        },
        {
            id: 2,
            text: "Соус традиционный галактический",
            price: 30,
            thumbnail: data[5].image_mobile
        },
        {
            id: 3,
            text: "Мясо бессмертных моллюсков Protostomia",
            price: 300,
            thumbnail: data[4].image_mobile
        },
        {
            id: 4,
            text: "Плоды Фалленианского дерева",
            price: 80,
            thumbnail: data[7].image_mobile
        },
        {
            id: 5,
            text: "Хрустящие минеральные кольца",
            price: 80,
            thumbnail: data[8].image_mobile
        },
        {
            id: 6,
            text: "Хрустящие минеральные кольца",
            price: 80,
            thumbnail: data[8].image_mobile
        },
        {
            id: 7,
            type: 'bottom',
            isLocked: true,
            text: "Краторная булка N-200i (низ)",
            price: 20,
            thumbnail: data[0].image_mobile
        }
    ]
}