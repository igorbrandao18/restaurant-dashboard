/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressDto } from '../models/AddressDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AddressesService {
    /**
     * Criar um novo endereço
     * @param requestBody
     * @returns AddressDto Endereço criado com sucesso
     * @throws ApiError
     */
    public static addressControllerCreate(
        requestBody: AddressDto,
    ): CancelablePromise<AddressDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/addresses',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dados inválidos`,
            },
        });
    }
    /**
     * Listar todos os endereços
     * @returns AddressDto Lista de endereços retornada com sucesso
     * @throws ApiError
     */
    public static addressControllerGetAll(): CancelablePromise<Array<AddressDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/addresses',
        });
    }
    /**
     * Atualizar um endereço existente
     * @param id ID do endereço a ser atualizado
     * @param requestBody
     * @returns AddressDto Endereço atualizado com sucesso
     * @throws ApiError
     */
    public static addressControllerUpdate(
        id: number,
        requestBody: AddressDto,
    ): CancelablePromise<AddressDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/addresses/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Dados inválidos`,
                404: `Endereço não encontrado`,
            },
        });
    }
}
