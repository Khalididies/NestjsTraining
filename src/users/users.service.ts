import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-User.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private Users = [
        { id: 0, name: 'khalid', type: 'admin' },
        { id: 1, name: 'khalil', type: 'user' },
        { id: 3, name: 'omar', type: 'user' },
    ]

    getUsers(type?: 'admin' | 'user') {
        if (type) {
            return this.Users.filter((user) => user.type === type);
        }

        return this.Users
    }

    getUser(id:number) {
        const user = this.Users.find((user)=>user.id === id)
        if (!user) {
            throw new Error('user not found')
        }

        return user;
    }

    createUser(createUserDto: CreateUserDto){
        const newUser ={
            ...createUserDto,
            id: Date.now(),
        }
        this.Users.push(newUser);

        return newUser;
    }

    updateUser(id:number,updateUserDto:UpdateUserDto){
        this.Users = this.Users.map((user)=>{
            if(user.id === id){
                return{...user,...updateUserDto}
            }

            return user
        });

        return this.getUser(id)
    }

    removeUser(id:number){
        const toBeRemoved = this.getUser(id);

        this.Users = this.Users.filter((user) => user.id !== id)

        return toBeRemoved;
    }
}
