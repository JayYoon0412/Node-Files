import { Catch, HttpException } from "@nestjs/common";

@Catch(HttpException)
//이제부터는 http 예외가 발생하면 데이터로 들어오게됌. 들어왔을때 어떻게 처리해줄지 여기서 지정.
export class HttpExceptionFilter implements HttpExceptionFilter{
    catch(exception: HttpException) {
        const status = exception.getStatus();
        const message = exception.message;

        console.log("==================================")
        console.log("예외기 발생")
        console.log(`Error Status: ${status}`)
        console.log(message)
        console.log("==================================")
    }
}