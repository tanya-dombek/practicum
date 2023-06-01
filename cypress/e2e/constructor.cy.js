describe('drag ingredients works correctly', () => {
    beforeEach(() => {
        cy.seedAndVisit();
    });

    it('should drag bun', () => {
        cy.get('[data-testid=ingredient]').contains('Булка 1').trigger('dragstart');
        cy.get('[data-testid=constructor-buns-area]').trigger('drop');

        cy.get('[data-test=top-bun]').contains('Булка 1 (верх)').should('exist');
        cy.get('[data-test=bottom-bun]').contains('Булка 1 (низ)').should('exist');
    });

    it('should drag ingredient', () => {
        cy.get('[data-testid=ingredient]').contains('Ингредиент 1').trigger('dragstart');
        cy.get('[data-testid=constructor-ingredients-area]').trigger('drop');
        cy.get('[data-testid=ingredient]').contains('Ингредиент 2').trigger('dragstart');
        cy.get('[data-testid=constructor-ingredients-area]').trigger('drop');

        cy.get('[data-testid=constructor-ingredients-area]').contains('Ингредиент 1').should('exist');
        cy.get('[data-testid=constructor-ingredients-area]').contains('Ингредиент 2').should('exist');
    });
});

describe('ingredient modal works correctly', () => {
    beforeEach(() => {
        cy.seedAndVisit();
    });

    it('should open modal', () => {
        cy.contains('Детали ингредиента').should('not.exist');
        cy.contains('Ингредиент 1').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('[data-testid=modal]').contains('Ингредиент 1').should('exist');
    });

    it('should close modal on button click', () => {
        cy.contains('Ингредиент 1').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('[data-testid=close-btn]').click();
        cy.contains('Детали ингредиента').should('not.exist');
    });

    it('should close modal on overlay click', () => {
        cy.contains('Ингредиент 1').click();
        cy.contains('Детали ингредиента').should('exist');
        cy.get('[data-testid=modal-overlay]').click('left', {force: true});
        cy.contains('Детали ингредиента').should('not.exist');
    });
});

describe('order modal works correctly', () => {
    beforeEach(() => {
        cy.seedAndVisit();
        cy.intercept("GET", "https://norma.nomoreparties.space/api/auth/user", { fixture: "user.json" });
        cy.intercept("POST", "https://norma.nomoreparties.space/api/orders", { fixture: "order.json" }).as("postOrder");

        window.localStorage.setItem(
            "refreshToken",
            JSON.stringify("test-refreshToken")
        );
        window.localStorage.setItem(
            "accessToken",
            JSON.stringify("test-accessToken")
        );
    });

    afterEach(() => {
        cy.window().then((window) => {
            window.localStorage.removeItem("accessToken");
        });
    });

    it('should order burger correctly', () => {
        cy.get('[data-testid=ingredient]').contains('Булка 1').trigger('dragstart');
        cy.get('[data-testid=constructor-buns-area]').trigger('drop');
        cy.get('[data-testid=ingredient]').contains('Ингредиент 1').trigger('dragstart');
        cy.get('[data-testid=constructor-ingredients-area]').trigger('drop');
        cy.get('[data-testid=ingredient]').contains('Ингредиент 2').trigger('dragstart');
        cy.get('[data-testid=constructor-ingredients-area]').trigger('drop');
        cy.get('[data-testid=create-order-btn]').click();

        cy.wait('@postOrder').its('request.body').should('deep.equal', {
            ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0941', '643d69a5c3f7b9001cfa0942', '643d69a5c3f7b9001cfa093c']
        });

        cy.get('[data-testid=order-number]').should('have.text', '6139');
        cy.get('[data-testid=close-btn]').click();
        cy.contains('[data-testid=order-number]').should('not.exist');
    });
});