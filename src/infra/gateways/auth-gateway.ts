import { HttpClient } from "../http/http-client";

export default class AuthGateway {
    constructor (readonly httpClient: HttpClient, readonly baseUrl: string) {}

	async auth(username: string, password: string): Promise<any> {
		const result = await this.httpClient.request({
			url: `${this.baseUrl}/login`,
			method: 'post',
			data: { username, password }
		});
		return { token: result.body.token, status: result.statusCode };
	}
}