import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from 'src/model';
import { CustomerRepository } from 'src/repository/';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomerEntity]),],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
