import { Controller, Get, Post, Put, Delete, Param, Query, Body, NotFoundException, ParseIntPipe, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-User.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service'
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('Users')// localhost:3000/Users
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    //GET /Users?type=admin ==> []
    @Get()
    getAllUsers(@Query('type') type: 'admin' | 'user') {
        return this.usersService.getUsers(type);
    }

    //GET /Users/:id ==> { ... }
    @Get(':id')
    getOneUser(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.usersService.getUser(id);
        } catch (err) {
            throw new NotFoundException();
        }
    }

    //POST /Users 
    @Post()
    @UseGuards(AuthGuard)
    createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    //PUT /Users/:id ==> { ... }
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(+id, updateUserDto);
    }

    //DELETE /Users/:id 
    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.removeUser(+id);
    }

}

