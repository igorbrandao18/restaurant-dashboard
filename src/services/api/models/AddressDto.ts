/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type AddressDto = {
    /**
     * ID do cliente ao qual o endereço pertence
     */
    customerId: number;
    /**
     * Endereço completo (rua, número, complemento)
     */
    addressLine: string;
    /**
     * Cidade
     */
    city: string;
    /**
     * CEP
     */
    postalCode: string;
};

