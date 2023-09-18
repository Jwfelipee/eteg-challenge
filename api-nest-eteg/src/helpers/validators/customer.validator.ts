import { z } from 'zod';

const zodCustomerCreate = z.object({
	name: z
		.string()
		.min(3, {
			message: 'Nome deve ter no mínimo 3 caracteres',
		})
		.max(255),
	email: z
		.string()
		.email({
			message: 'Email inválido',
		})
		.min(3, {
			message: 'Email deve ter no mínimo 3 caracteres',
		})
		.max(255),
	cpf: z
		.string()
		.min(11, {
			message: 'CPF deve ter 11 dígitos',
		})
		.max(11, {
			message: 'CPF deve ter 11 dígitos',
		}),
	color: z
		.string()
		.min(3, {
			message: 'Cor deve ter no mínimo 3 caracteres',
		})
		.max(255),
	observation: z.string().optional().nullable(),
});

const zodCustomerUpdate = z.object({
	...zodCustomerCreate.shape,
	id: z.string().uuid(),
});

type CustomerCreate = z.infer<typeof zodCustomerCreate>;
type CustomerUpdate = z.infer<typeof zodCustomerUpdate>;

export { zodCustomerCreate, zodCustomerUpdate, CustomerCreate, CustomerUpdate };
