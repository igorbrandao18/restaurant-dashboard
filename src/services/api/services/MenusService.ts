/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MenuDto } from '../models/MenuDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MenusService {
    /**
     * Criar um novo menu
     * @param requestBody
     * @returns MenuDto Menu criado com sucesso
     * @throws ApiError
     */
    public static menuControllerCreate(
        requestBody: MenuDto,
    ): CancelablePromise<MenuDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/menus',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dados inválidos`,
                401: `Não autorizado`,
            },
        });
    }
    /**
     * Listar todos os menus do restaurante autenticado
     * @returns MenuDto Lista de menus retornada com sucesso
     * @throws ApiError
     */
    public static menuControllerGetAll(): CancelablePromise<Array<MenuDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/menus',
            errors: {
                401: `Não autorizado`,
            },
        });
    }
    /**
     * Atualizar um menu existente
     * @param id ID do menu a ser atualizado
     * @param requestBody
     * @returns MenuDto Menu atualizado com sucesso
     * @throws ApiError
     */
    public static menuControllerUpdate(
        id: number,
        requestBody: MenuDto,
    ): CancelablePromise<MenuDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/menus/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dados inválidos`,
                401: `Não autorizado`,
                403: `Acesso negado`,
                404: `Menu não encontrado`,
            },
        });
    }
}
