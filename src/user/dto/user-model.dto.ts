import { ApiModelProperty } from '@nestjs/swagger';

export class UserModelDto {
  @ApiModelProperty()
  readonly firstName: string;

  @ApiModelProperty()
  readonly lastName: string;

  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly phoneNumber: string;

  @ApiModelProperty()
  readonly password: string;
}
