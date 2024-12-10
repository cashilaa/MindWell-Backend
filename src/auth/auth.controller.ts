import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: any): Promise<{ token: string }> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: any): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
