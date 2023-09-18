import { BadRequestException } from '@nestjs/common';
import isValidCPF from 'src/helpers/validateCPF';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customers' })
export class CustomerEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	cpf: string;

	@Column()
	color: string;

	@Column({ nullable: true })
	observation: string;

	static from(dto: Partial<CustomerEntity>) {
		const customer = new CustomerEntity();
		customer.id = dto.id;
		customer.name = dto.name;
		customer.email = dto.email;
		customer.cpf = customer.removeMaskCPF(dto.cpf);
		customer.color = dto.color;
		customer.observation = dto.observation;

		customer.validateCPF();
		return customer;
	}

	private validateCPF(): void {
		if (this.cpf) {
			const isValid = isValidCPF(this.cpf);
			if (!isValid) throw new BadRequestException('CPF inválido');
		}
	}

	private removeMaskCPF(cpf = this.cpf): string {
		return cpf.replace(/\D/g, '');
	}
}
