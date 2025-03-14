import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

export interface Credentials {
  password1: string;
  password2: string;
}

export interface Question {
  id: number;
  question: string;
  answer: string;
  startDate: string;
  isDone: boolean;
  media: string;
}

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  authenticate(@Body() credentials: Credentials) {
    return this.appService.authenticate(credentials);
  }

  @Get('state')
  @UseGuards(AuthGuard)
  getCurrentState() {
    return this.appService.getState();
  }

  @Put('state')
  @UseGuards(AuthGuard)
  updateState(@Body() question: Question) {
    this.appService.updateState(question);
  }
}
