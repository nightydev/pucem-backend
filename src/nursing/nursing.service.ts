import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateNursingFormDto } from './dto/create-nursing-form.dto';
import { UpdateNursingFormDto } from './dto/update-nursing-form.dto';
import { NursingForm } from './interfaces/nursing-form.interface';

@Injectable()
export class NursingService {
  private readonly logger = new Logger(NursingService.name);
  private nursingForms: NursingForm[] = []; // Almacenamiento en memoria

  create(createNursingFormDto: CreateNursingFormDto) {
    const newForm: NursingForm = {
      userId: createNursingFormDto.userId,
      nombrePaciente: createNursingFormDto.nombrePaciente,
      edadPaciente: createNursingFormDto.edadPaciente,
      fechaValoracion: createNursingFormDto.fechaValoracion,
      dominio: createNursingFormDto.dominio,
      clase: createNursingFormDto.clase,
      etiquetasDiagnosticas: createNursingFormDto.etiquetasDiagnosticas,
      nocs: createNursingFormDto.nocs,
      indicadoresNoc: createNursingFormDto.indicadoresNoc,
      nics: createNursingFormDto.nics,
      actividadesNic: createNursingFormDto.actividadesNic,
    };

    this.nursingForms.push(newForm); // Guardar en memoria
    this.logger.log(`Formulario creado para el usuario: ${newForm.userId}`);
    return { message: 'Formulario de enfermería creado exitosamente', newForm };
  }

  findAll() {
    this.logger.log('Obteniendo todos los formularios de enfermería');
    return this.nursingForms;
  }

  findOne(userId: string) {
    const form = this.nursingForms.find((form) => form.userId === userId);
    if (!form) {
      this.logger.error(`Formulario no encontrado para el usuario: ${userId}`);
      throw new NotFoundException(
        `Formulario de enfermería para el usuario con ID ${userId} no encontrado`,
      );
    }
    this.logger.log(`Formulario encontrado para el usuario: ${userId}`);
    return form;
  }

  update(userId: string, updateNursingFormDto: UpdateNursingFormDto) {
    const formIndex = this.nursingForms.findIndex(
      (form) => form.userId === userId,
    );
    if (formIndex === -1) {
      this.logger.error(`Formulario no encontrado para el usuario: ${userId}`);
      throw new NotFoundException(
        `Formulario de enfermería para el usuario con ID ${userId} no encontrado`,
      );
    }

    const updatedForm = {
      ...this.nursingForms[formIndex],
      ...updateNursingFormDto,
    };
    this.nursingForms[formIndex] = updatedForm;

    this.logger.log(`Formulario actualizado para el usuario: ${userId}`);
    return {
      message: 'Formulario de enfermería actualizado exitosamente',
      updatedForm,
    };
  }

  remove(userId: string) {
    const formIndex = this.nursingForms.findIndex(
      (form) => form.userId === userId,
    );
    if (formIndex === -1) {
      this.logger.error(`Formulario no encontrado para el usuario: ${userId}`);
      throw new NotFoundException(
        `Formulario de enfermería para el usuario con ID ${userId} no encontrado`,
      );
    }

    this.nursingForms.splice(formIndex, 1); // Eliminar el formulario
    this.logger.log(`Formulario eliminado para el usuario: ${userId}`);
    return { message: 'Formulario de enfermería eliminado exitosamente' };
  }

  findByDominio(dominio: string) {
    const forms = this.nursingForms.filter((form) => form.dominio === dominio);
    this.logger.log(`Formularios encontrados para el dominio: ${dominio}`);
    return forms;
  }

  findByEtiqueta(etiqueta: string) {
    const forms = this.nursingForms.filter((form) =>
      form.etiquetasDiagnosticas.includes(etiqueta),
    );
    this.logger.log(`Formularios encontrados para la etiqueta: ${etiqueta}`);
    return forms;
  }
}
