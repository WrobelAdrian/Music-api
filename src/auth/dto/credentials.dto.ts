import { ApiModelProperty } from '@nestjs/swagger';

export class CredentialsDto {

  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly password: string;
}
