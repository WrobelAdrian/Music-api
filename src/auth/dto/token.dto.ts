import { ApiModelProperty } from '@nestjs/swagger';

export class TokenDto {

  @ApiModelProperty()
  readonly id: string;

  @ApiModelProperty()
  readonly userId: string;

  @ApiModelProperty()
  readonly token: string;
}
