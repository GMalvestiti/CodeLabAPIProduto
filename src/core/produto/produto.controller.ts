import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { IResponse } from 'src/shared/interfaces/response.interface';
import { Produto } from './entities/produto.entity';
import { HttpResponse } from 'src/shared/classes/http-response';
import { ParseFindAllOrderPipe } from 'src/shared/pipes/parse-find-all-order.pipe';
import { IFindAllOrder } from 'src/shared/interfaces/find-all-order.interface';
import { IFindAllFilter } from 'src/shared/interfaces/find-all-filter.interface';
import { ParseFindAllFilterPipe } from 'src/shared/pipes/parse-find-all-filter.pipe';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async create(
    @Body() createProdutoDto: CreateProdutoDto,
  ): Promise<IResponse<Produto>> {
    const data = await this.produtoService.create(createProdutoDto);

    return new HttpResponse<Produto>(data).onCreated();
  }

  @Get(':page/:size/:order')
  async findAll(
    @Param('page') page: number,
    @Param('size') size: number,
    @Param('order', ParseFindAllOrderPipe) order: IFindAllOrder,
    @Query('filter', ParseFindAllFilterPipe)
    filter: IFindAllFilter | IFindAllFilter[],
  ): Promise<IResponse<Produto[]>> {
    const data = await this.produtoService.findAll(page, size, order, filter);

    return new HttpResponse<Produto[]>(data);
  }

  @Get(':id')
  async indOne(@Param('id') id: number) {
    const data = await this.produtoService.findOne(id);

    return new HttpResponse<Produto>(data);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProdutoDto: UpdateProdutoDto,
  ) {
    const data = await this.produtoService.update(id, updateProdutoDto);

    return new HttpResponse<Produto>(data).onUpdated();
  }

  @Delete(':id')
  async unactivate(@Param('id') id: number) {
    const data = await this.produtoService.unactivate(id);

    return new HttpResponse<boolean>(data).onDeleted();
  }
}
