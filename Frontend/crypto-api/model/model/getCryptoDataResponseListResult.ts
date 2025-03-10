/**
 * FinancialApp
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { GetCryptoDataResponse } from './getCryptoDataResponse';
import { ISuccess } from './iSuccess';
import { IError } from './iError';
import { IReason } from './iReason';


export interface GetCryptoDataResponseListResult { 
    readonly isFailed?: boolean;
    readonly isSuccess?: boolean;
    readonly reasons?: Array<IReason> | null;
    readonly errors?: Array<IError> | null;
    readonly successes?: Array<ISuccess> | null;
    readonly valueOrDefault?: Array<GetCryptoDataResponse> | null;
    readonly value?: Array<GetCryptoDataResponse> | null;
}

