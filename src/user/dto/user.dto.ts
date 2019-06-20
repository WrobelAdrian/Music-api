import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
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
