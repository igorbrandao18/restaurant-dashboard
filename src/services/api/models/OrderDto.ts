/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderItemsDto } from './OrderItemsDto';
export type OrderDto = {
    /**
     * ID do restaurante ao qual o pedido pertence
     */
    restaurantId: number;
    /**
     * ID do cliente que fez o pedido
     */
    customerId: number;
    /**
     * Itens do pedido
     */
    items: OrderItemsDto;
    /**
     * Valor total do pedido
     */
    total: number;
    /**
     * Status do pedido
     */
    status: OrderDto.status;
};
export namespace OrderDto {
    /**
     * Status do pedido
     */
    export enum status {
        PENDING = 'PENDING',
        PREPARING = 'PREPARING',
        READY = 'READY',
        COMPLETED = 'COMPLETED',
        CANCELLED = 'CANCELLED',
        ACCEPTED = 'ACCEPTED',
        DELIVERED = 'DELIVERED',
    }
}

