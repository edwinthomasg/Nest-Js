import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Put, Query, UseFilters, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { Customer } from './customers.customdecorator';
import { CustomerDto } from './customers.dto';
import { CustomerInterceptor } from './customers.interceptor';
import { CustomersService } from './customers.service';
import { NotFoundFilter } from './notfound.filter';

@Controller('customers')
export class CustomersController {
    constructor(private customerService: CustomersService) {}
    
    @Get()
    greetBrowser() : string{
        return this.customerService.greetBrowser()
    }
    @Get("filter")
    sortByAge(@Query('age') age: number){
        return this.customerService.sortByAge(age)
    }
    @Get(":id")
    @UseFilters(NotFoundFilter)
    @UseInterceptors(CustomerInterceptor)
    getUserById(@Param('id', ParseIntPipe, ) id: number): any{
        return this.customerService.getUserById(id)
    }
    @Post()
    addUser(@Body(new ValidationPipe()) body: CustomerDto) : string{
        return this.customerService.addUser(body)
    }
    // Pipes can be added to custom decorators too
    @Put(":id")
    updateUser(@Customer(true, new ValidationPipe({validateCustomDecorators: true})) body: CustomerDto){
        return {body, msg: "updated"}
    }
}
