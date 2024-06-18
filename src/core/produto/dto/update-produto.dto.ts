import { PartialType } from '@nestjs/mapped-types';
import { CreateProdutoDto } from './create-produto.dto';
import { IsNotEmpty } from 'class-validator';
import { EMensagem } from 'src/shared/enums/mensagem.enum';

export class UpdateProdutoDto extends PartialType(CreateProdutoDto) {
  @IsNotEmpty({ message: `id ${EMensagem.NAO_PODE_SER_VAZIO}` })
  id: number;
}
