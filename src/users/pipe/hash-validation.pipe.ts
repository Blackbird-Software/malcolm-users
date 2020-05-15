import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class HashValidationPipe implements PipeTransform {

    async transform(value: any, metadata: ArgumentMetadata) {

        if (!HashValidationPipe.isValid(value)) {
            throw new BadRequestException('Invalid hash provided. ');
        }

        return value;
    }

    static isValid(value: string): boolean {
        return (/[a-fA-F0-9]{32}/).test(value);
    }
}
