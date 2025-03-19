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
    let completedQuestionIdx = questions.findLastIndex(({isDone}) => isDone);
    let completedQuestion = questions[completedQuestionIdx];
    if (completedQuestionIdx < 0 && Date.now() > new Date(questions[0].startDate).getTime()) {
      completedQuestionIdx = 0;
      completedQuestion = questions[0];
    }
    const nextQuestion = questions[completedQuestionIdx+1];
    return {
      question: completedQuestion,
      nextQuestion: nextQuestion,
    }
  }

  updateState(question) {
    const { questions } = this.databaseService.get();
    questions[question.id] = question;
    this.databaseService.save({
      questions,
    });
  }
}
