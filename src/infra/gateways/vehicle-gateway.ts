import { useAuthStore } from "../../store/auth-store";
import { HttpClient } from "../http/http-client";

export class VehicleGateway {
    constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {}

	async getAll(): Promise<any> {
		const result = await this.httpClient.request({
			url: `${this.baseUrl}/vehicle`,
			method: 'get'
		});
		return result.body;
	}

	async getBy(field: string, value: string): Promise<any> {
		const result = await this.httpClient.request({
			url: `${this.baseUrl}/vehicle/search`,
			method: 'get',
			params: { field, value }
		});
		return result.body;
	}

	async create(input: CreateVehicleInput): Promise<any> {
		const { token } = useAuthStore()
		const result = await this.httpClient.request({
			url: `${this.baseUrl}/vehicle`,
			headers: {
				Authorization: `Bearer ${token}`
			},
			method: 'post',
			data: {
				prefix: input.prefix,
				vehicle: input.vehicle,
				brand: input.brand,
				model: input.model,
				plate: input.plate,
				asset_number: input.asset_number,
				color: input.color,
				year_manufacture: input.year_manufacture,
				year_model: input.year_model,
				fuel: input.fuel,
				chassis_number: input.chassis_number,
				secretary: input.secretary,
				unit: input.unit,
				observatio: input.observation
			}
		});
		return result.body;
	}
}

export type CreateVehicleInput = {
	prefix?: string;
	vehicle?: string;
	brand?: string;
	model?: string;
	plate?: string;
	asset_number?: string,
	color?: string;
	year_manufacture?: string;
	year_model?: string;
	fuel?: string,
	chassis_number?: string;
	secretary?: string;
	unit?: string;
	observation?: string
}