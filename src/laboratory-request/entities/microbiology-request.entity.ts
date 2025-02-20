import { LaboratoryRequest } from '../entities/laboratory-request.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'microbiology-requests' })
export class MicrobiologyRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  muestra: string;

  @Column('text', {
    nullable: false,
  })
  sitio_anatomico: string;

  @Column('boolean', {
    nullable: false,
  })
  cultivo_y_antibiograma: boolean;

  @Column('boolean', {
    nullable: false,
  })
  cristalografia: boolean;

  @Column('boolean', {
    nullable: false,
  })
  gram: boolean;

  @Column('boolean', {
    nullable: false,
  })
  fresco: boolean;

  @Column('text', {
    nullable: false,
  })
  estudio_micologico_koh: string;

  @Column('text', {
    nullable: false,
  })
  cultivo_micotico: string;

  @Column('text', {
    nullable: false,
  })
  investigacion_paragonimus_spp: string;

  @Column('text', {
    nullable: false,
  })
  investigacion_histoplasma_spp: string;

  @Column('text', {
    nullable: false,
  })
  coloracion_zhiel_nielsen: string;

  @OneToOne(
    () => LaboratoryRequest,
    (laboratoryRequest) => laboratoryRequest.microbiologia,
    {
      nullable: false,
    },
  )
  @JoinColumn({ name: 'solicitud_laboratorio_id' })
  solicitud_laboratorio: LaboratoryRequest;
}
