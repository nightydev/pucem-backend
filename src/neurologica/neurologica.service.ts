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

private calcBarthelTotal(b?: Partial<{
  vestirse: number;
  arreglarse: number;
  deposicion: number;
  miccion: number;
  usoRetrete: number;
  trasladarse: number;
  deambular: number;
  escaleras: number;
}>) {
  if (!b) return null;
  const keys = [
    'vestirse',
    'arreglarse',
    'deposicion',
    'miccion',
    'usoRetrete',
    'trasladarse',
    'deambular',
    'escaleras',
  ] as const;

  let total = 0;
  for (const k of keys) total += Number(b[k] ?? 0);
  return Number.isNaN(total) ? null : total;
}
  async create(createNeurologicaDto: CreateNeurologicaDto) {
    try {
      const { alteracionesMarcha, riesgoCaida, barthel, ...neurologicaData } =
        createNeurologicaDto;

      // Mapear alteraciones de marcha
      const marchaData = alteracionesMarcha
        ? {
            marchaTrendelenburg:
              alteracionesMarcha.marchaTrendelenburg ?? false,
            marchaTuerca: alteracionesMarcha.marchaTuerca ?? false,
            marchaAtaxica: alteracionesMarcha.marchaAtaxica ?? false,
            marchaSegador: alteracionesMarcha.marchaSegador ?? false,
            marchaTijeras: alteracionesMarcha.marchaTijeras ?? false,
            marchaTabetica: alteracionesMarcha.marchaTabetica ?? false,
            marchaCoreica: alteracionesMarcha.marchaCoreica ?? false,
            marchaDistonica: alteracionesMarcha.marchaDistonica ?? false,
            otrasAlteraciones: alteracionesMarcha.otrasAlteraciones ?? null,
          }
        : {};

      // Mapear riesgo de caída
      const riesgoData = riesgoCaida
        ? {
            tiempoTimedUpGo: riesgoCaida.tiempoTimedUpGo ?? null,
            riesgoEvaluado: riesgoCaida.riesgoEvaluado ?? null,
            comentariosRiesgo: riesgoCaida.comentariosRiesgo ?? null,
          }
        : {};

      // Mapear Barthel (ítems + total)
      const barthelData = barthel
        ? {
            barthelVestirse: barthel.vestirse ?? null,
            barthelArreglarse: barthel.arreglarse ?? null,
            barthelDeposicion: barthel.deposicion ?? null,
            barthelMiccion: barthel.miccion ?? null,
            barthelUsoRetrete: barthel.usoRetrete ?? null,
            barthelTrasladarse: barthel.trasladarse ?? null,
            barthelDeambular: barthel.deambular ?? null,
            barthelEscaleras: barthel.escaleras ?? null,
          }
        : {};
      const barthelTotal = this.calcBarthelTotal(barthel);

      // Nuevos campos directos (del front)
      const extras = {
        cif: neurologicaData.cif ?? null,
        observacionesVistaAnterior:
          neurologicaData.observacionesVistaAnterior ?? null,
        observacionesVistaPosterior:
          neurologicaData.observacionesVistaPosterior ?? null,
        observacionesVistaLateralDerecha:
          neurologicaData.observacionesVistaLateralDerecha ?? null,
        observacionesVistaLateralIzquierda:
          neurologicaData.observacionesVistaLateralIzquierda ?? null,
        diagnosticoFisioterapeutico:
          neurologicaData.diagnosticoFisioterapeutico ?? null,
        planFisioterapeutico: neurologicaData.planFisioterapeutico ?? null,
      };

      // Crear entidad
      const neurologica = this.neurologicaRepository.create({
        ...neurologicaData, // name, ci, edad, diagnostico, etc.
        ...marchaData,
        ...riesgoData,
        ...barthelData,
        ...extras,
        barthelTotal,
      });

      await this.neurologicaRepository.save(neurologica);
      return {
        message: 'Evaluación neurológica creada exitosamente',
        neurologica,
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, page = 1 } = paginationDto;
    const offset = (page - 1) * limit;

    const [neurologicas, total] = await this.neurologicaRepository.findAndCount(
      {
        take: limit,
        skip: offset,
        order: { createdAt: 'DESC' },
      },
    );

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
      throw new NotFoundException(
        `Evaluación neurológica con ID ${id} no encontrada`,
      );
    }

    return neurologica;
  }

  async update(id: string, updateNeurologicaDto: UpdateNeurologicaDto) {
    try {
      const { alteracionesMarcha, riesgoCaida, barthel, ...neurologicaData } =
        updateNeurologicaDto;

      const neurologica = await this.findOne(id);

      // Alteraciones de la marcha
      if (alteracionesMarcha) {
        Object.assign(neurologica, {
          marchaTrendelenburg:
            alteracionesMarcha.marchaTrendelenburg ??
            neurologica.marchaTrendelenburg,
          marchaTuerca:
            alteracionesMarcha.marchaTuerca ?? neurologica.marchaTuerca,
          marchaAtaxica:
            alteracionesMarcha.marchaAtaxica ?? neurologica.marchaAtaxica,
          marchaSegador:
            alteracionesMarcha.marchaSegador ?? neurologica.marchaSegador,
          marchaTijeras:
            alteracionesMarcha.marchaTijeras ?? neurologica.marchaTijeras,
          marchaTabetica:
            alteracionesMarcha.marchaTabetica ?? neurologica.marchaTabetica,
          marchaCoreica:
            alteracionesMarcha.marchaCoreica ?? neurologica.marchaCoreica,
          marchaDistonica:
            alteracionesMarcha.marchaDistonica ?? neurologica.marchaDistonica,
          otrasAlteraciones:
            alteracionesMarcha.otrasAlteraciones ??
            neurologica.otrasAlteraciones,
        });
      }

      // Riesgo de caída
      if (riesgoCaida) {
        Object.assign(neurologica, {
          tiempoTimedUpGo:
            riesgoCaida.tiempoTimedUpGo ?? neurologica.tiempoTimedUpGo,
          riesgoEvaluado:
            riesgoCaida.riesgoEvaluado ?? neurologica.riesgoEvaluado,
          comentariosRiesgo:
            riesgoCaida.comentariosRiesgo ?? neurologica.comentariosRiesgo,
        });
      }

      // Barthel
      if (barthel) {
        Object.assign(neurologica, {
          barthelVestirse: barthel.vestirse ?? neurologica.barthelVestirse,
          barthelArreglarse:
            barthel.arreglarse ?? neurologica.barthelArreglarse,
          barthelDeposicion:
            barthel.deposicion ?? neurologica.barthelDeposicion,
          barthelMiccion: barthel.miccion ?? neurologica.barthelMiccion,
          barthelUsoRetrete:
            barthel.usoRetrete ?? neurologica.barthelUsoRetrete,
          barthelTrasladarse:
            barthel.trasladarse ?? neurologica.barthelTrasladarse,
          barthelDeambular: barthel.deambular ?? neurologica.barthelDeambular,
          barthelEscaleras: barthel.escaleras ?? neurologica.barthelEscaleras,
        });
        const total = this.calcBarthelTotal(barthel);
        if (total !== null) neurologica.barthelTotal = total;
      }

      // Nuevos campos directos (solo si vienen en el DTO)
      if ('cif' in neurologicaData)
        neurologica.cif = neurologicaData.cif ?? null;

      if ('observacionesVistaAnterior' in neurologicaData)
        neurologica.observacionesVistaAnterior =
          neurologicaData.observacionesVistaAnterior ??
          neurologica.observacionesVistaAnterior;

      if ('observacionesVistaPosterior' in neurologicaData)
        neurologica.observacionesVistaPosterior =
          neurologicaData.observacionesVistaPosterior ??
          neurologica.observacionesVistaPosterior;

      if ('observacionesVistaLateralDerecha' in neurologicaData)
        neurologica.observacionesVistaLateralDerecha =
          neurologicaData.observacionesVistaLateralDerecha ??
          neurologica.observacionesVistaLateralDerecha;

      if ('observacionesVistaLateralIzquierda' in neurologicaData)
        neurologica.observacionesVistaLateralIzquierda =
          neurologicaData.observacionesVistaLateralIzquierda ??
          neurologica.observacionesVistaLateralIzquierda;

      if ('diagnosticoFisioterapeutico' in neurologicaData)
        neurologica.diagnosticoFisioterapeutico =
          neurologicaData.diagnosticoFisioterapeutico ??
          neurologica.diagnosticoFisioterapeutico;

      if ('planFisioterapeutico' in neurologicaData)
        neurologica.planFisioterapeutico =
          neurologicaData.planFisioterapeutico ??
          neurologica.planFisioterapeutico;

      // Asigna el resto de campos simples, sólo si vienen en el DTO
      Object.entries(neurologicaData).forEach(([k, v]) => {
        if (
          ![
            'cif',
            'observacionesVistaAnterior',
            'observacionesVistaPosterior',
            'observacionesVistaLateralDerecha',
            'observacionesVistaLateralIzquierda',
            'diagnosticoFisioterapeutico',
            'planFisioterapeutico',
          ].includes(k)
        ) {
          if (typeof v !== 'undefined') {
            // @ts-ignore: index access
            neurologica[k] = v;
          }
        }
      });

      await this.neurologicaRepository.save(neurologica);
      return {
        message: 'Evaluación neurológica actualizada exitosamente',
        neurologica,
      };
    } catch (error) {
      handleDBExceptions(error, this.logger);
    }
  }

  async remove(id: string) {
    const neurologica = await this.findOne(id);
    await this.neurologicaRepository.remove(neurologica);
    return { message: 'Evaluación neurológica eliminada exitosamente' };
    // Alternativa segura:
    // await this.neurologicaRepository.delete(id);
    // return { message: 'Evaluación neurológica eliminada exitosamente' };
  }

  async findByCI(ci: string) {
    const neurologicas = await this.neurologicaRepository.find({
      where: { ci },
      order: { createdAt: 'DESC' },
    });
    return neurologicas;
  }
}
