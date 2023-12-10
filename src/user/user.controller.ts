import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('me')
  getMe(@Request() req: any) {
    return this.userService.getMe(req.user);
  }

}
