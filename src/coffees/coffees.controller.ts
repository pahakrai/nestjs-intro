import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Protocol } from '../common/decorators/protocol.decorator';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
  import { CoffeesService } from './coffees.service';
  
  @ApiTags('coffees')
  @UsePipes(ValidationPipe) // controller scoped pipes
  @Controller('coffees')
  export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}
  
    // @UsePipes(ValidationPipe) //  method scoped binding pipe
    // @ApiResponse({status: 403, description: 'Forbidden.'})
    @ApiForbiddenResponse({ description: 'Forbidden'})
    @Public()
    @Get()
    findAll(@Protocol() protocol: string, @Query() paginationQuery: PaginationQueryDto) {
      // const { limit, offset } = paginationQuery;
      return this.coffeesService.findAll(paginationQuery);
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.coffeesService.findOne(id);
    }
  
    @Post()
    create(@Body() body) {
      return this.coffeesService.create(body);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body(ValidationPipe) body) { // param based validation pipe binding
      return this.coffeesService.update(id, body);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.coffeesService.remove(id);
    }
  }