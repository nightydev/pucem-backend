import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(loginUserDto: LoginUserDto) {
    const { password, document } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { document },
      select: {
        document: true,
        password: true,
        id: true,
        isActive: true,
        name: true,
        lastName: true,
        role: true,
      },
      relations: ['team'],
    });

    if (!user) {
      throw new UnauthorizedException('Not valid credentials');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Not valid credentials');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive');
    }

    return {
      id: user.id,
      document: user.document,
      name: user.name,
      lastName: user.lastName,
      role: user.role,
      team: user.team,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
