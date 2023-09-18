import { ConflictException, Injectable } from '@nestjs/common';
import { CustomerCreate } from 'src/helpers/validators';
import { CustomerEntity } from 'src/model';
import { CustomerRepository } from 'src/repository/customer.repository';

@Injectable()
export class CustomerService {
	constructor(private customerRepository: CustomerRepository) {}

	async loadCustomers(): Promise<CustomerEntity[]> {
		return await this.customerRepository.loadCustomers();
	}

	async createCustomer(input: CustomerCreate): Promise<void> {
		const customer = CustomerEntity.from(input);
		const customerExists = await this.customerRepository.alreadyExists(customer.id, customer.email, customer.cpf);
		if (customerExists) {
			throw new ConflictException('Cliente já cadastrado');
		}
		await this.customerRepository.save(customer);
	}
}
