import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Credentials } from './app.controller';
import * as jwt from "jsonwebtoken";
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  private authConfig: Record<string, string>;

  constructor(
    private readonly configService: ConfigService,
    private readonly databaseService: DatabaseService,
  ) {
    this.authConfig = this.configService.getOrThrow('authConfig');
  }

  authenticate(credentials: Credentials) {
    if (
      this.authConfig.password1 !== credentials?.password1 ||
      this.authConfig.password2 !== credentials?.password2
    ) {
      throw new UnauthorizedException();
    }
    return jwt.sign({}, this.authConfig.privateKey, {
      expiresIn: '1d'
    });
  }

  getState() {
    const { questions } = this.databaseService.get();
    const completedQuestions = questions.filter(({isDone}) => isDone);
    const nextQuestion = questions.find(
      ({isDone, startDate}) => !isDone && Date.now() > new Date(startDate).getTime()
    );
    return nextQuestion || completedQuestions[completedQuestions.length - 1];
  }

  updateState(question) {
    const { questions } = this.databaseService.get();
    questions[question.id] = question;
    this.databaseService.save({
      questions,
    });
  }
}
