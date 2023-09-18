import { Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/model';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CustomerRepository extends Repository<CustomerEntity> {
	constructor(private dataSource: DataSource) {
		super(CustomerEntity, dataSource.createEntityManager());
	}

	async loadCustomers(): Promise<CustomerEntity[]> {
		const results = await this.find();
		return results.map((result) => CustomerEntity.from(result));
	}

	async alreadyExists(id: string, email: string, cpf: string): Promise<boolean> {
		const customer = await this.findOne({ where: [{ email }, { cpf }, { id }] });
		return !!customer;
	}
}
