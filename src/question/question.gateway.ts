import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from "@nestjs/websockets";
import { WsValidationPipe } from "src/common/decorators/ws-validation.decorator";
import { CreateQuestionDto } from "./dtos/create-question.dto";
import { QuestionService } from "./question.service";

@WebSocketGateway()
export class QuestionGateway {
  constructor(private readonly questionService: QuestionService) {}

  @SubscribeMessage("messageToServer")
  handle(): string {
    return "Hello";
    // return { event: "messageToClient", data: "Hello" };
  }

  @WsValidationPipe()
  @SubscribeMessage("create-question")
  async createQuestion(@MessageBody() createQuestionDto: CreateQuestionDto) {
    const question = await this.questionService.saveQuestion(createQuestionDto);
    return question;
  }
}
