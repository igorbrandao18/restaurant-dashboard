/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RestaurantDto } from '../models/RestaurantDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RestaurantsService {
    /**
     * Criar um novo restaurante
     * @param requestBody
     * @returns RestaurantDto Restaurante criado com sucesso
     * @throws ApiError
     */
    public static restaurantControllerCreate(
        requestBody: RestaurantDto,
    ): CancelablePromise<RestaurantDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/restaurants',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dados inválidos`,
            },
        });
    }
    /**
     * Listar todos os restaurantes
     * @returns RestaurantDto Lista de restaurantes retornada com sucesso
     * @throws ApiError
     */
    public static restaurantControllerGetAll(): CancelablePromise<Array<RestaurantDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/restaurants',
        });
    }
    /**
     * Atualizar um restaurante existente
     * @param id ID do restaurante a ser atualizado
     * @param requestBody
     * @returns RestaurantDto Restaurante atualizado com sucesso
     * @throws ApiError
     */
    public static restaurantControllerUpdate(
        id: number,
        requestBody: RestaurantDto,
    ): CancelablePromise<RestaurantDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/restaurants/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dados inválidos`,
                401: `Não autorizado`,
                403: `Acesso negado`,
                404: `Restaurante não encontrado`,
            },
        });
    }
    /**
     * Get a restaurant by ID
     * @param id ID of the restaurant
     * @returns RestaurantDto Restaurant found
     * @throws ApiError
     */
    public static restaurantControllerGetById(
        id: number,
    ): CancelablePromise<RestaurantDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/restaurants/{id}',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden`,
                404: `Restaurant not found`,
            },
        });
    }
    /**
     * Get authenticated restaurant profile
     * @returns RestaurantDto Profile retrieved successfully
     * @throws ApiError
     */
    public static restaurantControllerGetProfile(): CancelablePromise<RestaurantDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/restaurants/profile',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get restaurant menus
     * @param id ID of the restaurant
     * @returns any Menus retrieved successfully
     * @throws ApiError
     */
    public static restaurantControllerGetMenus(
        id: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/restaurants/{id}/menus',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Restaurant not found`,
            },
        });
    }
}
