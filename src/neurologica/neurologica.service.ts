import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNeurologicaDto } from './dto/create-neurologica.dto';
import { UpdateNeurologicaDto } from './dto/update-neurologica.dto';
import { Neurologica } from './entities/neurologica.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { handleDBExceptions } from 'src/common/utils';

@Injectable()
export class NeurologicaService {
  private readonly logger = new Logger(NeurologicaService.name);

  constructor(
    @InjectRepository(Neurologica)
    private readonly neurologicaRepository: Repository<Neurologica>,
  ) {}

  async create(createNeurologicaDto: CreateNeurologicaDto) {
    try {
      const { alteracionesMarcha, riesgoCaida, barthel, ...neurologicaData } = createNeurologicaDto;

      // Mapear los campos de alteraciones de marcha
      const marchaData = alteracionesMarcha ? {
        marchaTrendelenburg: alteracionesMarcha.marchaTrendelenburg || false,
        marchaTuerca: alteracionesMarcha.marchaTuerca || false,
        marchaAtaxica: alteracionesMarcha.marchaAtaxica || false,
        marchaSegador: alteracionesMarcha.marchaSegador || false,
        marchaTijeras: alteracionesMarcha.marchaTijeras || false,
        marchaTabetica: alteracionesMarcha.marchaTabetica || false,
        marchaCoreica: alteracionesMarcha.marchaCoreica || false,
        marchaDistonica: alteracionesMarcha.marchaDistonica || false,
        otrasAlteraciones: alteracionesMarcha.otrasAlteraciones,
      } : {};

      // Mapear los campos de riesgo de caída
      const riesgoData = riesgoCaida ? {
        tiempoTimedUpGo: riesgoCaida.tiempoTimedUpGo,
        riesgoEvaluado: riesgoCaida.riesgoEvaluado,
        comentariosRiesgo: riesgoCaida.comentariosRiesgo,
      } : {};

      // Mapear los campos del índice de Barthel
      const barthelData = barthel ? {
        barthelVestirse: barthel.vestirse,
        barthelArreglarse: barthel.arreglarse,
        barthelDeposicion: barthel.deposicion,
        barthelMiccion: barthel.miccion,
        barthelUsoRetrete: barthel.usoRetrete,
        barthelTrasladarse: barthel.trasladarse,
        barthelDeambular: barthel.deambular,
        barthelEscaleras: barthel.escaleras,
      } : {};

      // Calcular el total de Barthel si se proporcionaron datos
      let barthelTotal = null;
      if (barthel) {
        barthelTotal = Object.values(barthel).reduce((total, value) => {
          return total + (typeof value === 'number' ? value : 0);
        }, 0);
      }

      const neurologica = this.neurologicaRepository.create({
        ...neurologicaData,
        ...marchaData,
        ...riesgoData,
        ...barthelData,
        barthelTotal,
      });

      await this.neurologicaRepository.save(neurologica);
      return { 
        message: 'Evaluación neurológica creada exitosamente', 
        neurologica 
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const offset = (page - 1) * limit;

    const [neurologicas, total] = await this.neurologicaRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      neurologicas,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const neurologica = await this.neurologicaRepository.findOne({
      where: { id },
    });

    if (!neurologica) {
      throw new NotFoundException(`Evaluación neurológica con ID ${id} no encontrada`);
    }

    return neurologica;
  }

  async update(id: string, updateNeurologicaDto: UpdateNeurologicaDto) {
    try {
      const { alteracionesMarcha, riesgoCaida, barthel, ...neurologicaData } = updateNeurologicaDto;

      // Buscar la evaluación existente
      const neurologica = await this.findOne(id);

      // Mapear los campos de alteraciones de marcha si se proporcionan
      const marchaData = alteracionesMarcha ? {
        marchaTrendelenburg: alteracionesMarcha.marchaTrendelenburg,
        marchaTuerca: alteracionesMarcha.marchaTuerca,
        marchaAtaxica: alteracionesMarcha.marchaAtaxica,
        marchaSegador: alteracionesMarcha.marchaSegador,
        marchaTijeras: alteracionesMarcha.marchaTijeras,
        marchaTabetica: alteracionesMarcha.marchaTabetica,
        marchaCoreica: alteracionesMarcha.marchaCoreica,
        marchaDistonica: alteracionesMarcha.marchaDistonica,
        otrasAlteraciones: alteracionesMarcha.otrasAlteraciones,
      } : {};

      // Mapear los campos de riesgo de caída si se proporcionan
      const riesgoData = riesgoCaida ? {
        tiempoTimedUpGo: riesgoCaida.tiempoTimedUpGo,
        riesgoEvaluado: riesgoCaida.riesgoEvaluado,
        comentariosRiesgo: riesgoCaida.comentariosRiesgo,
      } : {};

      // Mapear los campos del índice de Barthel si se proporcionan
      const barthelData = barthel ? {
        barthelVestirse: barthel.vestirse,
        barthelArreglarse: barthel.arreglarse,
        barthelDeposicion: barthel.deposicion,
        barthelMiccion: barthel.miccion,
        barthelUsoRetrete: barthel.usoRetrete,
        barthelTrasladarse: barthel.trasladarse,
        barthelDeambular: barthel.deambular,
        barthelEscaleras: barthel.escaleras,
      } : {};

      // Calcular el total de Barthel si se proporcionaron datos
      let barthelTotal = null;
      if (barthel) {
        barthelTotal = Object.values(barthel).reduce((total, value) => {
          return total + (typeof value === 'number' ? value : 0);
        }, 0);
      }

      // Actualizar los datos
      Object.assign(neurologica, {
        ...neurologicaData,
        ...marchaData,
        ...riesgoData,
        ...barthelData,
        ...(barthelTotal !== null && { barthelTotal }),
      });

      await this.neurologicaRepository.save(neurologica);
      return { 
        message: 'Evaluación neurológica actualizada exitosamente', 
        neurologica 
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async remove(id: string) {
    const neurologica = await this.findOne(id);
    await this.neurologicaRepository.remove(neurologica);
    return { message: 'Evaluación neurológica eliminada exitosamente' };
  }

  async findByCI(ci: string) {
    const neurologicas = await this.neurologicaRepository.find({
      where: { ci },
      order: {
        createdAt: 'DESC',
      },
    });

    return neurologicas;
  }
}
