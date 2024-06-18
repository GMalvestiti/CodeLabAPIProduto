import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UpdateProdutoDto } from '../dto/update-produto.dto';
import { CreateProdutoDto } from '../dto/create-produto.dto';

@Entity('produto')
export class Produto {
  @PrimaryGeneratedColumn({ primaryKeyConstraintName: 'pk_produto' })
  id: number;

  @Column({ length: 60, nullable: false })
  descricao: string;

  @Column({ type: 'numeric', precision: 10, state: 2, nullable: false })
  precoCusto: number;

  @Column({ type: 'numeric', precision: 10, state: 2, nullable: false })
  precoVenda: number;

  @Column({ type: 'bytea', nullable: true })
  imagem: string;

  @Column({ nullable: true })
  ativo: boolean;

  @Column({ type: 'character varying', array: true, nullable: false })
  codigoBarras: string[];

  constructor(createProdutoDto: CreateProdutoDto | UpdateProdutoDto) {
    Object.assign(this, createProdutoDto);
  }
}
