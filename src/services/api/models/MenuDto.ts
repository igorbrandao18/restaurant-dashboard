/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MenuDto = {
    /**
     * ID do restaurante ao qual o menu pertence
     */
    restaurantId: number;
    /**
     * Nome do menu
     */
    name: string;
    /**
     * Tipo do menu
     */
    type: string;
    /**
     * Estado de colapso do menu (0 para expandido, 1 para colapsado)
     */
    collapse: number;
    /**
     * Seções do menu contendo categorias e itens
     */
    sections: Record<string, any>;
};

