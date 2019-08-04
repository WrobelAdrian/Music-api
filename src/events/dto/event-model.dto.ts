import { ApiModelProperty } from '@nestjs/swagger';

export class EventModelDto {
  @ApiModelProperty()
  readonly id: string;
  @ApiModelProperty()
  readonly title: string;
  @ApiModelProperty()
  readonly date: string;
  @ApiModelProperty()
  readonly description: string;
  @ApiModelProperty()
  readonly type: string;
  @ApiModelProperty()
  readonly createdAt: string;
}
