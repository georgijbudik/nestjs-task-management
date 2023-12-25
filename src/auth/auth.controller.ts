import { AuthService } from './auth.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  Query,
  UseFilters,
  ConflictException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}
