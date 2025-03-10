/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OrderDto } from '../models/OrderDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersService {
    /**
     * Criar um novo pedido
     * @param requestBody
     * @returns OrderDto Pedido criado com sucesso
     * @throws ApiError
     */
    public static orderControllerCreate(
        requestBody: OrderDto,
    ): CancelablePromise<OrderDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/orders',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dados inválidos`,
                401: `Não autorizado`,
            },
        });
    }
    /**
     * Listar todos os pedidos do restaurante autenticado
     * @returns OrderDto Lista de pedidos retornada com sucesso
     * @throws ApiError
     */
    public static orderControllerGetAll(): CancelablePromise<Array<OrderDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/orders',
            errors: {
                401: `Não autorizado`,
            },
        });
    }
    /**
     * Atualizar um pedido existente
     * @param id ID do pedido a ser atualizado
     * @param requestBody
     * @returns OrderDto Pedido atualizado com sucesso
     * @throws ApiError
     */
    public static orderControllerUpdate(
        id: number,
        requestBody: OrderDto,
    ): CancelablePromise<OrderDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/orders/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dados inválidos`,
                401: `Não autorizado`,
                403: `Acesso negado`,
                404: `Pedido não encontrado`,
            },
        });
    }
}
