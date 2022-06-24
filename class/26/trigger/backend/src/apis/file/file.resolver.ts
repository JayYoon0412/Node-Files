import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FileService } from "./file.service";
import { FileUpload, GraphQLUpload } from "graphql-upload"; //REST는 Multer사용

@Resolver()
export class FileResolver {

    constructor(private readonly fileService: FileService) {}

    @Mutation(()=>[String])
    uploadFile(
        @Args({name: 'files', type: ()=> [GraphQLUpload]}) files: FileUpload[]
    ){
        return this.fileService.upload({ files });
    }
}