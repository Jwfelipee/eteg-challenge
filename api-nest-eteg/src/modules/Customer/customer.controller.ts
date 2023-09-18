import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerCreate, zodCustomerCreate } from 'src/helpers/validators';

@Controller('/v1/customer')
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	@Get()
	async loadCustomers(): Promise<any> {
		return await this.customerService.loadCustomers();
	}

	@Post()
	async createCustomer(@Body() input: CustomerCreate): Promise<void> {
		const validator = zodCustomerCreate.safeParse({ ...input, cpf: input.cpf.replace(/\D/g, '') }) as any;
		const message = validator?.error?.issues[0]?.message;
		if (message) throw new BadRequestException(message);
		await this.customerService.createCustomer(input);
	}
}
